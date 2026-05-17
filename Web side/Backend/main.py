import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"


from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np

import cv2
import base64  # to read the image

app=FastAPI()

app.add_middleware(
                CORSMiddleware,
                allow_origins=["*"],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"],
                )

def combined_loss(y_true, y_pred):
    bce = tf.keras.losses.binary_crossentropy(y_true, y_pred)
    dice = 1 - (2 * tf.reduce_sum(y_true * y_pred) + 1) / (tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) + 1
    )
    return bce + dice

path = 'models/resUnet_model.keras'
model = tf.keras.models.load_model(
    path,
    compile = False,
    custom_objects={
        'combined_loss': combined_loss
    }
)

CLASS_NAMES=[ "No Tumor",
              "Glioma",
              "Meningioma",
              "Pituitary"
]

async def process_image(file):
    contents=await file.read()
    img=tf.image.decode_jpeg(contents, channels=3)
    img=tf.image.resize(img,[256,256])
    img=tf.cast(img,tf.float32)/255.0
    img=tf.expand_dims(img,axis=0)
    return img

@app.get("/")
def home():
    return {"message":"API Working"}

@app.post("/predict")
async def predict(file: UploadFile=File(...)):
    image=await process_image(file)
    predictions = model.predict(image)

    pred_class = CLASS_NAMES[np.argmax(predictions[0][0])]    # CLASS
    if pred_class == CLASS_NAMES[0]:
        pred_status = 'No Tomur Detected'      #STATUS
    else:
        pred_status = 'Tomur Detected'
    class_confidence = round(float(np.max(predictions[0][0])*100), 2)   #CONFIDECE

    
    pred_mask = predictions[1][0]   # numpy array into list
    mask = pred_mask.squeeze()
    mask = (mask*255).astype(np.uint8)
    mask = np.ascontiguousarray(mask)
    success, buffer = cv2.imencode('.png', mask) # 
    if not success:
        return {'error':'masking encoding failed'}

    mask_base64 = base64.b64encode(buffer).decode('utf-8')
    segmented_image = f"data:image/png;base64,{mask_base64}"

    return{
        'status':pred_status,
        "class":pred_class,
        "class_confidence":class_confidence,
        "segmentation_mask":segmented_image #pred_mask # segmented_image,
    }
    # return {"message":'Hello prediction'}



