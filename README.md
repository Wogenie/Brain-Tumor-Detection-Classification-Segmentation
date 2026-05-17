🧠 Brain Tumor Detection, Classification & Segmentation

A deep learning–based medical imaging system that detects, classifies, and segments brain tumors from MRI scans.

The system provides:

Tumor detection
Tumor classification
Segmentation mask generation
Confidence score
Web-based real-time interface
🚀 Features
🧠 Brain tumor detection from MRI images
🔬 Tumor classification (Glioma, Meningioma, Pituitary, No Tumor)
🎯 Tumor segmentation using deep learning model
📊 Prediction confidence score
🖼️ Upload MRI and view results instantly
🌐 Full-stack web application
🏗️ System Architecture
Frontend: HTML, CSS, JavaScript (UI for upload & results)
Backend: FastAPI handling inference
Model: CNN-based classification + segmentation (TensorFlow / Keras)
Processing Flow:
Image Upload → Preprocessing → Model Prediction → Segmentation → Output Display
📁 Project Structure
Brain Tumor Detection Classification Segmentation/
│
├── Web side/
│   ├── Frontend/
│   ├── Backend/
│   │   ├── main.py
│   │   ├── models/
│
├── Datasets/
├── web images result/
├── README.md
└── .gitignore
⚙️ Tech Stack
Python 🐍
TensorFlow / Keras 🤖
OpenCV 👁️
FastAPI ⚡
HTML, CSS, JavaScript 🌐
NumPy & Pandas 📊
📌 How It Works
Upload MRI image via web interface
Image is preprocessed (resize, normalization)
Deep learning model predicts:
Tumor presence
Tumor class
Segmentation mask
Results are displayed on UI
🧠 Tumor Classes
Glioma
Meningioma
Pituitary Tumor
No Tumor
📈 Performance
Accuracy: ~99% (depends on dataset/model)
Confidence Example: 99.97%
🖥️ UI Preview
<p align="center"> <img src="web images result/home page.jpeg" width="45%" /> <img src="web images result/predicted image.jpeg" width="45%" /> </p>
⚙️ How to Run the Project
1. Clone project
git clone <repo-url>
cd Brain-Tumor-Detection
2. Install dependencies
pip install -r requirements.txt
3. Run backend server
uvicorn Web side.Backend.main:app --reload
4. Open in browser
http://127.0.0.1:8000
5. Use the system
Upload MRI image
Get prediction
View segmentation mask
👨‍💻 Author

© 2026 Neural Engineers — Wogenie Liyew
Medical Imaging System | Biomedical Engineering Project

📜 License

For educational and research purposes only.
