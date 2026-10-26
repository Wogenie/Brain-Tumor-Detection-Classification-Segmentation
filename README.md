# 🧠 BrainScan AI — Brain Tumor Detection, Classification & Segmentation

An AI-powered medical imaging application that analyzes brain MRI images using deep learning. The system combines a **ResNet-based encoder and U-Net decoder architecture** with a React frontend and FastAPI backend to produce brain tumor classification and segmentation results.

The application supports four classification categories: **No Tumor, Glioma, Meningioma, and Pituitary Tumor**.

## 🖥️ Application Preview

<!-- Update these paths if your image filenames or folders differ. -->


---

## ✨ Key Features

- 🧠 Brain MRI image analysis
- 🔬 Four-class tumor classification
- 🎯 Pixel-level segmentation mask generation
- 📊 Predicted class confidence score
- 🖼️ MRI upload, preview, and result visualization
- ⚡ TensorFlow/Keras model inference through FastAPI
- ⚛️ React-based frontend
- 🐳 Dockerized application using Docker Compose

---

## 🏗️ System Architecture

BrainScan AI uses a frontend-backend architecture in which React communicates with a Python API that loads and executes the trained Keras model.

```text
                  USER
                   |
                   v
           REACT FRONTEND
          MRI Upload / Results
                   |
                   v
              FASTAPI
            POST /predict
                   |
                   v
          IMAGE PREPROCESSING
           Resize: 256 x 256
          Normalize pixels: /255
                   |
                   v
        RESNET ENCODER + UNET
               DECODER
                   |
          +--------+--------+
          |                 |
          v                 v
   CLASSIFICATION       SEGMENTATION
    OUTPUT HEAD          OUTPUT HEAD
          |                 |
          v                 v
     Tumor Class        Predicted Mask
     + Confidence       PNG / Base64
          |                 |
          +--------+--------+
                   |
                   v
             JSON RESPONSE
                   |
                   v
            REACT RESULTS UI
```

### Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, JavaScript, CSS |
| Backend API | Python, FastAPI |
| Deep Learning | TensorFlow, Keras |
| Model Architecture | ResNet Encoder + U-Net Decoder |
| Image Processing | NumPy, OpenCV |
| Containerization | Docker, Docker Compose |
| Web Serving | Nginx |

---

## 🧠 Deep Learning Architecture

The model uses a **ResNet-style encoder and U-Net-style decoder** to learn image features and generate spatial segmentation predictions. In the current backend, the saved Keras model returns two outputs: a classification result and a segmentation mask.

### 1. Input and Preprocessing

The input MRI image passes through preprocessing before model inference.

```text
Original MRI Image
        |
        v
Decode RGB Image
        |
        v
Resize to 256 x 256
        |
        v
Convert to Float32
        |
        v
Normalize Pixels to [0, 1]
        |
        v
Model Input: (1, 256, 256, 3)
```

The input image is resized to `256 × 256`, converted to floating-point values, and divided by 255 to normalize pixel intensities.

### 2. ResNet Encoder — Feature Extraction

The encoder extracts increasingly abstract visual features from the MRI.

```text
Input MRI
    |
    v
Convolution + Feature Extraction
    |
    v
Residual Block
    |
    +----> Feature Map 1
    |
    v
Deeper Residual Block
    |
    +----> Feature Map 2
    |
    v
Deeper Residual Block
    |
    +----> Feature Map 3
    |
    v
Deep Semantic Features
```

**What does ResNet contribute?**

ResNet uses residual connections that allow information to bypass convolutional layers and combine with their outputs.

Conceptually:

\[
y = F(x) + x
\]

Here, \(x\) is the input to a residual block and \(F(x)\) is the learned transformation. This design helps information and gradients flow through deeper networks.

As the encoder goes deeper, it learns features ranging from simple edges and textures to more complex anatomical patterns.

The encoder also provides feature maps at multiple spatial resolutions for use by the decoder.

### 3. U-Net Decoder — Spatial Reconstruction

The decoder uses the encoded features to reconstruct a spatially detailed segmentation map.

```text
          Deep Feature Map
                 |
                 v
             Upsampling
                 |
                 + <--- Encoder Feature Map
                 |
                 v
          Convolution Layers
                 |
                 v
             Upsampling
                 |
                 + <--- Earlier Encoder Feature Map
                 |
                 v
          Convolution Layers
                 |
                 v
          Segmentation Head
                 |
                 v
          Predicted Mask
```

**What does U-Net contribute?**

U-Net uses a contracting path to capture features and an expanding path to recover spatial detail. Skip connections transfer encoder features directly to corresponding decoder stages.

These connections help combine:

- **Deep semantic information:** what patterns the model has learned.
- **Fine spatial information:** where those patterns occur in the image.

The decoder produces a segmentation mask in which pixel values represent predicted foreground or tumor-region intensity, depending on how the model was trained.

The exact number of residual blocks, decoder stages, and feature channels depends on the saved model implementation.

### 4. Classification and Segmentation Outputs

The FastAPI implementation expects the model to return two outputs:

**Classification output**

```python
predictions[0][0]
```

The backend selects the class with the highest score:

```python
pred_class = CLASS_NAMES[
    np.argmax(predictions[0][0])
]
```

The class order is:

1. No Tumor
2. Glioma
3. Meningioma
4. Pituitary

The maximum class score is converted to a percentage and returned as `class_confidence`.

**Segmentation output**

```python
predictions[1][0]
```

The predicted mask is converted into an 8-bit image, encoded as PNG, and returned to React as a Base64 data URL.

This lets the frontend display the segmentation output directly in an image element.

> **Important:** The confidence score is the model's reported class score, not a guarantee that the prediction is correct. A segmentation mask is also a model prediction and should not be treated as confirmed tumor localization.

---

## 🔄 Prediction Workflow

### Prediction Results
![Brain Tumor Detection Result](Frontend/public/result%202.jpg)


1. The user selects a JPG/JPEG MRI image in React.
2. React sends the image as multipart form data to FastAPI.
3. FastAPI reads and preprocesses the image.
4. TensorFlow runs the trained Keras model.
5. The model produces classification and segmentation outputs.
6. FastAPI returns the class, confidence score, status, and encoded mask.
7. React displays the prediction and segmentation result.

---

## 📡 API Reference

### `GET /`

Checks that the API is available.

Example response:

```json
{
  "message": "API Working"
}
```

### `POST /predict`

Runs inference on an uploaded MRI image.

**Request**

- Content type: `multipart/form-data`
- File field: `file`
- Supported format in the current implementation: JPEG/JPG

Example using Python:

```python
import requests

url = "http://127.0.0.1:8000/predict"

with open("brain_mri.jpg", "rb") as image:
    response = requests.post(
        url,
        files={"file": image}
    )

print(response.json())
```

Example response structure:

```json
{
  "status": "Tumor Detected",
  "class": "Glioma",
  "class_confidence": 98.42,
  "segmentation_mask": "data:image/png;base64,..."
}
```

The values above are illustrative, not a measured prediction. The actual response depends on the uploaded image and model output.

---

## 🐳 Run with Docker

Docker Compose runs the React frontend and FastAPI backend as separate services.

### Prerequisites

- Docker Desktop with its engine running
- Git and Git LFS
- Sufficient disk space for TensorFlow dependencies and the trained models

### 1. Clone the repository

```bash
git lfs install

git clone https://github.com/Wogenie/Brain-Tumor-Detection-Classification-Segmentation.git

cd Brain-Tumor-Detection-Classification-Segmentation

git lfs pull
```

Git LFS retrieves the large `.keras` model files.

### 2. Build and start the application

Run this command in the project root, where `docker-compose.yml` is located:

```bash
docker compose up --build
```

### 3. Open the application

| Service | URL |
|---|---|
| React website | http://localhost:8080 |
| FastAPI documentation | http://localhost:8000/docs |
| FastAPI health check | http://localhost:8000/ |

The frontend sends requests through `/api/predict`, which Nginx forwards to the FastAPI service.

To stop the services:

```bash
docker compose down
```

To inspect container status:

```bash
docker compose ps
```

To view backend logs:

```bash
docker compose logs -f backend
```

---

## 💻 Run Locally Without Docker

### Backend

Open a terminal in the backend directory, create and activate a Python virtual environment, and install the dependencies.

```bash
python -m venv .venv
```

On Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Run FastAPI from the directory containing `main.py`:

```bash
uvicorn main:app --reload --port 8000
```

Make sure the trained model exists at the path configured in the backend code.

### Frontend

Open another terminal in the React frontend directory:

```bash
npm install
npm run dev
```

Open the Vite URL displayed in your terminal, usually:

```text
http://localhost:5173
```

For local development, the Vite proxy should forward `/api` requests to `http://127.0.0.1:8000`.

---

## 📁 Project Structure

The following is the expected structure for the Dockerized application. Directory capitalization should match your actual repository and Docker configuration.

```text
Brain-Tumor-Detection-Classification-Segmentation/
│
├── docker-compose.yml
├── .gitignore
├── README.md
│
├── Backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── main.py
│   └── Models/
│       ├── resUnet_model.keras
│       └── unet_arch_model.keras
│
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    ├── vite.config.js
    ├── .dockerignore
    ├── public/
    └── src/
        ├── App.jsx
        ├── App.css
        └── main.jsx
```

The two model filenames above reflect the model files associated with the repository. The current FastAPI code loads `Models/resUnet_model.keras`; the other model is not used by that particular code path unless configured separately.

---

## 📈 Model Performance and Evaluation

The model returns a predicted class score and a segmentation mask. Reliable evaluation should be performed on an independent test set that was not used for training or model selection.

Recommended classification metrics include:

- Accuracy
- Precision and recall per class
- Macro F1-score
- Confusion matrix

Recommended segmentation metrics include:

- Dice similarity coefficient
- Intersection over Union (IoU)
- Sensitivity for the tumor region

No independently verified benchmark is claimed in this README. Report measured performance together with the test dataset, sample size, and evaluation method.

---

## ⚠️ Medical Disclaimer

BrainScan AI is an educational and research project. Its predictions are **not a medical diagnosis** and must not be used as a substitute for professional medical advice, radiological interpretation, or clinical evaluation.

The model's results may be affected by image quality, preprocessing, training data, and differences between datasets. Any clinical use would require appropriate validation and oversight.

---

## 👨‍💻 Author

**Wogenie Liyew**  
Neural Engineers  
Brain MRI Classification and Segmentation Project

## 📜 License

This project is intended for educational and research purposes only.


---

*Built with React, FastAPI, TensorFlow/Keras, and Docker.*
