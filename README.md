# 🧠 Brain Tumor Detection, Classification & Segmentation

A deep learning–based medical imaging system that **detects**, **classifies**, and **segments** brain tumors from MRI scans.

This is a full-stack AI application that integrates a modern web interface with a deep learning backend for real-time medical image analysis.

---

## 🚀 Key Capabilities

- 🧠 Brain tumor detection from MRI scans
- 🔬 Tumor classification (Glioma, Meningioma, Pituitary, No Tumor)
- 🎯 Tumor segmentation (pixel-level tumor mask)
- 📊 Confidence scores for predictions
- 🖼️ Real-time MRI upload and visualization
- 🌐 Full-stack web application (Frontend + Backend + AI Model)

---

## 🏗️ System Architecture

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** FastAPI
- **AI Model:** CNN-based classification + segmentation (TensorFlow / Keras)
- **Processing Flow:** Image preprocessing → Model inference → Post-processing → Visualization

---

## 🔄 System Workflow

```mermaid
graph TD
    A[MRI Image Upload] --> B[Frontend UI]
    B --> C[FastAPI Backend]
    C --> D[Preprocessing<br>(Resize + Normalize)]
    D --> E[Deep Learning Model]
    E --> F[Classification<br>(Tumor Type)]
    E --> G[Segmentation<br>(Tumor Mask)]
    F & G --> H[Confidence Score]
    H --> I[Results to Frontend]
    I --> J[Visualization + Results]
📌 How It Works

Upload an MRI image via the web interface
Image is preprocessed (resized + normalized)
Deep learning model performs inference:
Tumor detection
Tumor classification (Glioma / Meningioma / Pituitary / No Tumor)
Tumor segmentation

Results with confidence scores are returned
Frontend displays prediction and segmentation mask overlay


🧠 Tumor Classes

Glioma
Meningioma
Pituitary Tumor
No Tumor


📈 Performance

Accuracy: ~99% (on test dataset)
Example Confidence: 99.97%


🖥️ UI Preview

  <img src="web_images_result/home_page.jpeg" width="45%" alt="Home Page">
  <img src="web_images_result/predicted_image.jpeg" width="45%" alt="Prediction Result">


⚙️ How to Run the Project

Clone the repositoryBashgit clone <repo-url>
cd Brain-Tumor-Detection
Install dependenciesBashpip install -r requirements.txt
Run the backend serverBashuvicorn "Web side.Backend.main:app" --reload
Open in browser
Go to: http://127.0.0.1:8000


👨‍💻 Author
© 2026 Neural Engineers — Wogenie Liyew
Medical Imaging System | Biomedical Engineering Project

📜 License
This project is for educational and research purposes only.
