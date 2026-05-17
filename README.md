🧠 Brain Tumor Detection, Classification & Segmentation

A deep learning–based medical imaging system that detects, classifies, and segments brain tumors from MRI scans. The system provides real-time predictions including tumor presence, tumor type, confidence score, and segmentation mask visualization.

🚀 Features
🧠 Brain tumor detection from MRI images
🔬 Tumor classification (e.g., Glioma, Meningioma, Pituitary, etc.)
🎯 Segmentation mask generation for tumor localization
📊 Confidence score for predictions
🖼️ Upload and visualize MRI results in real-time
🌐 Web-based interface (Frontend + Backend system)
🧪 Output Example
Prediction Status: Tumor Detected
Tumor Type: Glioma
Confidence Score: 99.97%
Uploaded MRI: Displayed image
Predicted Mask: Segmentation output mask
🏗️ System Architecture
Frontend: Web interface for uploading MRI scans and displaying results
Backend: FastAPI / Flask server handling inference
Deep Learning Model: CNN-based classification + segmentation network (TensorFlow / Keras)
Processing: Image preprocessing → model prediction → mask generation
📁 Project Structure
Brain Tumor Detection Classification Segmentation/
│
├── Web side/
│   ├── Frontend/
│   └── Backend/
│
├── Datasets/
├── web images result/
├── models/
├── README.md
└── .gitignore
⚙️ Tech Stack
Python 🐍
TensorFlow / Keras 🤖
OpenCV 👁️
FastAPI / Flask ⚡
HTML, CSS, JavaScript 🌐
NumPy & Pandas 📊
📌 How It Works
Upload MRI image
Image is preprocessed (resize, normalization)
Deep learning model predicts:
Tumor presence
Tumor class
Segmentation mask
Results are displayed on UI
📷 UI Preview
MRI upload interface
Prediction results panel
Segmentation mask visualization
🧠 Tumor Classes
Glioma
Meningioma
Pituitary Tumor
No Tumor
📈 Performance
Accuracy: ~99% (depending on dataset/model)
Confidence Score Example: 99.97%

## 🖥️ UI Preview

<p align="center">
  <img src="web images result/home_page.jpeg" width="45%" />
  <img src="web images result/predicted_image.jpeg" width="45%" />
</p>

---

⚙️ How to Run the Project

First, go to the Web side / Frontend directory:

cd "Web side/Frontend"

Then activate the virtual environment (ml_env) which contains Python 3.11, compatible with the TensorFlow model:

ml_env\Scripts\activate

Next, go to the Backend directory:

cd "../Backend"

Run the FastAPI backend server using Uvicorn:

uvicorn main:app --reload

Once the server starts, open the link shown in the terminal (usually):

http://127.0.0.1:8000

Then open it in your browser and test the application by uploading an MRI image.

👨‍💻 Author

© 2026 Neural Engineers - WOGENIE LIYEW
Medical Imaging System | Biomedical Engineering Project

📜 License

This project is for educational and research purposes.
