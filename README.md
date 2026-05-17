# 🧠 Brain Tumor Detection, Classification & Segmentation

A deep learning–based medical imaging system that detects, classifies, and segments brain tumors from MRI scans.

This system is an AI application that integrates a web interface with a deep learning backend to provide real-time medical image analysis.

---

## 🚀 Key Capabilities

* **🧠 Brain Tumor Detection:** Identifies the presence of a tumor from MRI scans.
* **🔬 Tumor Classification:** Categorizes tumors into specific types (Glioma, Meningioma, Pituitary, or No Tumor).
* **🎯 Tumor Segmentation:** Generates a precise localization mask highlighting the tumor region.
* **📊 Confidence Scores:** Provides probabilistic confidence metrics for predictions.
* **🖼️ Real-Time Visualization:** Allows instant MRI upload and interactive results display.
* **🌐 Web Integration:** Seamlessly connects a user-friendly frontend with a high-performance backend.

---

## 🏗️ System Architecture

* **Frontend:** HTML, CSS, JavaScript (User Interface)
* **Backend:** FastAPI (Handling API requests, image routing, and model inference)
* **AI Model:** CNN-based classification and segmentation (TensorFlow / Keras)
* **Processing Flow:** Image preprocessing $\rightarrow$ Model inference $\rightarrow$ Joint classification/segmentation $\rightarrow$ Web visualization

---

## 🔄 System Workflow

```text
       [ MRI Image Upload ]
                │
                ▼
          Frontend (UI)
                │
                ▼
         FastAPI Backend
                │
                ▼
 Preprocessing (Resize & Normalize)
                │
                ▼
       Deep Learning Model
        ├── Classification (Tumor Type)
        └── Segmentation (Tumor Mask)
                │
                ▼
   Confidence Score Calculation
                │
                ▼
    Results Sent to Frontend
                │
                ▼
     Visualization in Web UI
Brain-Tumor-Detection/
│
├── Web_side/
│   ├── Frontend/
│   │   └── index.html (HTML/CSS/JS files)
│   │
│   └── Backend/
│       ├── main.py
│       └── models/
│           └── trained_model.keras
│
├── Datasets/
├── web_images_result/
│   ├── home_page.jpeg
│   └── predicted_image.jpeg
├── README.md
└── .gitignore
