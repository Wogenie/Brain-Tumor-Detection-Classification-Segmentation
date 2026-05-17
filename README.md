🧠 Brain Tumor Detection, Classification & Segmentation
A deep learning-based medical imaging system that detects, classifies, and segments brain tumors from MRI scans.
✨ Features

🧠 Brain tumor detection from MRI images
🔬 Tumor classification (Glioma, Meningioma, Pituitary, No Tumor)
🎯 Precise tumor segmentation using deep learning
📊 Confidence score for every prediction
🖼️ Real-time visualization of results and segmentation masks
🌐 Modern full-stack web application


🏗️ System Architecture

Frontend: HTML, CSS, JavaScript
Backend: FastAPI
Models: CNN (Classification) + U-Net style (Segmentation) built with TensorFlow/Keras
Pipeline: Image Upload → Preprocessing → Dual Model Inference → Visualization


📁 Project Structure
textBrain-Tumor-Detection/
├── Web side/
│   ├── Frontend/               # HTML, CSS, JS files
│   └── Backend/
│       ├── main.py             # FastAPI application
│       ├── models/             # Trained model files
│       └── utils.py            # Helper functions
├── Datasets/                   # Training datasets
├── models/                     # Best trained models
├── web_images_result/          # Screenshots for README
├── requirements.txt
├── README.md
└── .gitignore

🧠 Tumor Classes

Glioma
Meningioma
Pituitary Tumor
No Tumor


📈 Performance

Accuracy: ~99% (on standard Brain Tumor MRI Dataset)
Example Confidence: 99.97%


🖥️ UI Preview

  <img src="web_images_result/home_page.jpeg" width="45%" alt="Home Page">
  <img src="web_images_result/predicted_image.jpeg" width="45%" alt="Prediction Result">


⚙️ How It Works

User uploads an MRI scan through the web interface
Image is preprocessed (resized & normalized)
Classification model predicts tumor type and confidence
If a tumor is detected, the segmentation model generates a tumor mask
Results (label, confidence, and overlay) are displayed instantly


🚀 How to Run the Project
Prerequisites

Python 3.11
Recommended: Create and activate a virtual environment

Step-by-step Setup

Clone the repositoryBashgit clone <your-repo-url>
cd Brain-Tumor-Detection
Install dependenciesBashpip install -r requirements.txt
Run the FastAPI BackendBashcd "Web side/Backend"
uvicorn main:app --reload
Open your browser and go to:
http://127.0.0.1:8000
Upload an MRI image and get instant predictions.


⚡ Tech Stack

Python 🐍
TensorFlow / Keras 🤖
FastAPI ⚡
OpenCV & Pillow
HTML, CSS, JavaScript
NumPy


👨‍💻 Author
© 2026 Neural Engineers — Wogenie Liyew
Medical Imaging System | Biomedical Engineering Project

📜 License
This project is for educational and research purposes only. It is not intended for clinical diagnosis or medical use.
