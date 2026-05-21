# 🧠 Brain Tumor Detection, Classification & Segmentation

A deep learning–based medical imaging system that detects, classifies, and segments brain tumors from MRI scans.  
This system is a full-stack AI application that integrates a web interface with a deep learning backend to provide real-time medical image analysis.

---
### 🏠 Home Page
![Home Page](https://github.com/Wogenie/Brain-Tumor-Detection-Classification-Segmentation/blob/026c88efb9e5f08b5f239f542865535a84dd9695/web%20images%20result/home%20page.jpeg)

### 🔍 Prediction Result
![model predicted result]([web_images_result/result_page.jpeg](https://github.com/Wogenie/Brain-Tumor-Detection-Classification-Segmentation/blob/026c88efb9e5f08b5f239f542865535a84dd9695/web%20images%20result/predicted%20image.jpeg))
---
## 🚀 Key Capabilities

- 🧠 Brain tumor detection from MRI scans  
- 🔬 Tumor classification (Glioma, Meningioma, Pituitary, No Tumor)  
- 🎯 Tumor segmentation (tumor localization mask)  
- 📊 Confidence score for predictions  
- 🖼️ Real-time MRI upload and visualization  
- 🌐 Full-stack web application (Frontend + Backend + AI Model)

---

## 🏗️ System Architecture

- **Frontend:** HTML, CSS, JavaScript (user interface)  
- **Backend:** FastAPI handling API requests and inference  
- **AI Model:** CNN-based classification + segmentation (TensorFlow / Keras)  
- **Processing Flow:** Image preprocessing → Model inference → Prediction → Visualization  

---

## 🔄 System Workflow

```text
MRI Image Upload
      ↓
Frontend (UI)
      ↓
FastAPI Backend
      ↓
Preprocessing (resize, normalize)
      ↓
Deep Learning Model
   ├── Classification (Tumor Type)
   └── Segmentation (Tumor Mask)
      ↓
Confidence Score Calculation
      ↓
Results Sent to Frontend
      ↓
Visualization in Web UI
```

---

## 📁 Project Structure

```
Brain Tumor Detection Classification Segmentation/
│
├── Web side/
│   ├── Frontend/
│   │   ├── HTML / CSS / JS files
│   │
│   ├── Backend/
│   │   ├── main.py
│   │   ├── models/
│   │   │   ├── trained_model.keras
│
├── Datasets/
├── web_images_result/
├── README.md
└── .gitignore
```

---

## 📌 How It Works

- Upload MRI image via web interface  
- Image is preprocessed (resize, normalization)  
- Deep learning model performs inference  
  - Tumor detection  
  - Tumor classification  
  - Tumor segmentation  
- Results are returned to backend  
- Frontend displays prediction and segmentation mask  

---

## 🧠 Tumor Classes

- Glioma  
- Meningioma  
- Pituitary Tumor  
- No Tumor  

---

## 📈 Performance

- Accuracy: ~99% (depending on dataset/model)  
- Confidence Example: 99.97%  

---

## 🖥️ UI Preview

<p align="center">
  <img src="web_images_result/home_page.jpeg" width="45%" />
  <img src="web_images_result/predicted_image.jpeg" width="45%" />
</p>

---

## ⚙️ How to Run the Project

```bash
git clone <repo-url>
cd Brain-Tumor-Detection
pip install -r requirements.txt
uvicorn Web_side.Backend.main:app --reload
```

Then open:

```
http://127.0.0.1:8000
```

---

## 👨‍💻 Author

© 2026 Neural Engineers — Wogenie Liyew  
Medical Imaging System | Biomedical Engineering Project  

---

## 📜 License

This project is for educational and research purposes only.
