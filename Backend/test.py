import tensorflow as tf
from tensorflow.models.keras import load_model

print(tf.__version__)
'''
7ms/step - Classification_output_accuracy: 0.9919 - Classification_output_loss: 0.0236 - Segmentation_output_accuracy: 0.9886 - Segmentation_output_loss: 0.0061 - loss: 0.0298 - val_Classification_output_accuracy: 0.9224 - val_Classification_output_loss: 0.2495 - val_Segmentation_output_accuracy: 0.9880 - val_Segmentation_output_loss: 0.0467 - val_loss: 0.2823
Epoch 19/20
113/113 ━━━━━━━━━━━━━━━━━━━━ 84s 555ms/step - Classification_output_accuracy: 0.9939 - Classification_output_loss: 0.0189 - Segmentation_output_accuracy: 0.9886 - Segmentation_output_loss: 0.0056 - loss: 0.0245 - val_Classification_output_accuracy: 0.9435 - val_Classification_output_loss: 0.2708 - val_Segmentation_output_accuracy: 0.9877 - val_Segmentation_output_loss: 0.0128 - val_loss: 0.2577
Epoch 20/20
113/113 ━━━━━━━━━━━━━━━━━━━━ 61s 537ms/step - Classification_output_accuracy: 0.9967 - Classification_output_loss: 0.0082 - Segmentation_output_accuracy: 0.9887 - Segmentation_output_loss: 0.0047 - loss: 0.0129 - val_Classification_output_accuracy: 0.9176 - val_Classification_output_loss: 0.2936 - val_Segmentation_output_accuracy: 0.9881 - val_Segmentation_output_loss: 0.0195 - val_loss: 0.3252
<keras.src.callbacks.history.History at 0x7b6dbf4beb40>
'''
