
import { useEffect, useRef, useState } from "react";
import "./App.css";

const API_URL = "/api";

function App() {
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  function selectFile(selectedFile) {
    if (!selectedFile) return;

    // The current FastAPI backend uses tf.image.decode_jpeg().
    const isJpeg =
      selectedFile.type === "image/jpeg" ||
      /\.(jpe?g)$/i.test(selectedFile.name);

    if (!isJpeg) {
      setError("Please select a JPG or JPEG image.");
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setError("Please select an image smaller than 15 MB.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError("");
  }

  function handleFileChange(event) {
    selectFile(event.target.files?.[0]);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  }

  async function analyzeImage() {
    if (!file) {
      setError("Please select an MRI image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      // Must match FastAPI: predict(file: UploadFile = File(...))
      formData.append("file", file);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(
          data.error || data.detail || "Prediction failed."
        );
      }

      if (
        !data.class ||
        data.class_confidence === undefined ||
        !data.status
      ) {
        throw new Error("The backend returned an unexpected response.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
        "Could not connect to FastAPI. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetApp() {
    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
    setLoading(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const confidence = Number(result?.class_confidence);

  return (
    <>
      {/* NAVIGATION */}
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">+</span>
          <span>BrainScan</span>
          <span className="brand-light">AI</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#analyze">Analyze MRI</a>
          <a href="#technology">Technology</a>
          <a href="#about">About</a>
        </div>

        <a className="nav-cta" href="#analyze">
          Start Analysis →
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="pulse-dot" />
            AI-POWERED MEDICAL IMAGING
          </div>

          <h1>
            Brain MRI.
            <br />
            <span>Smarter insights.</span>
          </h1>

          <p>
            Upload an MRI image to explore AI-based brain tumor
            classification and segmentation results.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#analyze">
              Analyze an MRI <span>→</span>
            </a>

            <a className="button button-secondary" href="#technology">
              Explore the AI
            </a>
          </div>

          <div className="hero-note">
            <span>●</span>
            Research and educational support tool
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="scan-frame">
            <div className="scan-label">
              <span>BRAIN IMAGING</span>
              <span>MRI / AI</span>
            </div>

            <img
              src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85"
              alt="Medical science visualization"
            />

            <div className="scan-overlay">
              <span>IMAGE ANALYSIS</span>
              <span className="scan-line" />
              <span>AI</span>
            </div>
          </div>

          <div className="floating-card floating-top">
            <span className="mini-icon">⌕</span>
            <div>
              <strong>Image analysis</strong>
              <small>AI model processing</small>
            </div>
          </div>

          <div className="floating-card floating-bottom">
            <span className="mini-icon">✓</span>
            <div>
              <strong>Segmentation</strong>
              <small>Visual mask output</small>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>CLASSIFICATION</span>
          <span>SEGMENTATION</span>
          <a href="#analyze">SCROLL TO ANALYZE ↓</a>
        </div>
      </section>

      {/* TECHNOLOGY STRIP */}
      <div className="trust-strip">
        <span>TENSORFLOW</span>
        <span>RESUNET</span>
        <span>DEEP LEARNING</span>
        <span>FASTAPI</span>
        <span>REACT</span>
      </div>

      {/* UPLOAD AND ANALYSIS */}
      <section className="section analysis-section" id="analyze">
        <div className="section-heading">
          <span className="eyebrow">MRI WORKSPACE</span>
          <h2>Analyze your MRI</h2>
          <p>Select a JPG or JPEG image to start the prediction.</p>
        </div>

        <div className="analysis-layout">
          {/* UPLOAD PANEL */}
          <div className="upload-panel">
            <div className="panel-heading">
              <div>
                <span className="step-label">STEP 01</span>
                <h3>Upload MRI scan</h3>
              </div>
              <span className="panel-symbol">↑</span>
            </div>

            <div
              className={`drop-zone ${dragging ? "dragging" : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              {preview ? (
                <img
                  src={preview}
                  className="upload-preview"
                  alt="Selected MRI preview"
                />
              ) : (
                <div className="upload-icon">↑</div>
              )}

              <h4>
                {file ? file.name : "Choose an MRI image"}
              </h4>

              <p>
                {file
                  ? "Image ready for analysis."
                  : "Drag and drop your JPG/JPEG image here."}
              </p>

              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,image/jpeg"
                hidden
                onChange={handleFileChange}
              />

              <button
                type="button"
                className="button choose-button"
                onClick={() => inputRef.current?.click()}
                disabled={loading}
              >
                {file ? "Change image" : "Browse files"}
              </button>
            </div>

            {file && (
              <div className="file-details">
                <span className="file-icon">▧</span>
                <div>
                  <strong>{file.name}</strong>
                  <small>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </small>
                </div>

                <button
                  type="button"
                  className="remove-file"
                  onClick={resetApp}
                  disabled={loading}
                  aria-label="Remove selected image"
                >
                  ×
                </button>
              </div>
            )}

            <div className="upload-meta">
              <span>JPG / JPEG format</span>
              <span>Maximum 15 MB</span>
            </div>

            <button
              type="button"
              className="button button-primary analyze-button"
              onClick={analyzeImage}
              disabled={!file || loading}
            >
              {loading ? "Analyzing..." : "Analyze MRI"}
              {!loading && <span>→</span>}
            </button>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <p className="privacy-note">
              AI predictions are experimental and must not replace
              professional medical evaluation.
            </p>
          </div>

          {/* INFORMATION PANEL */}
          <div className="analysis-info">
            <div className="info-top">
              <span className="eyebrow">AI PIPELINE</span>
              <span className="live-indicator">
                <span className="status-dot" />
                MODEL WORKFLOW
              </span>
            </div>

            <h3>From scan to AI output.</h3>
            <p>
              Your image passes through the FastAPI endpoint and
              TensorFlow model before the prediction is returned.
            </p>

            <div className="pipeline">
              <div className="pipeline-step">
                <span className="pipeline-number">01</span>
                <div>
                  <strong>Image preprocessing</strong>
                  <p>Resize to 256 × 256 and normalize pixels.</p>
                </div>
                <span className="pipeline-check">✓</span>
              </div>

              <div className="pipeline-step">
                <span className="pipeline-number">02</span>
                <div>
                  <strong>Model prediction</strong>
                  <p>Classify the image and generate a mask.</p>
                </div>
                <span className="pipeline-check">✓</span>
              </div>

              <div className="pipeline-step">
                <span className="pipeline-number">03</span>
                <div>
                  <strong>Display results</strong>
                  <p>Show the predicted class, confidence, and mask.</p>
                </div>
                <span className="pipeline-check">✓</span>
              </div>
            </div>

            <div className="info-callout">
              <span>ⓘ</span>
              <p>
                A model prediction is not a medical diagnosis.
                Consult a qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <section className="loading-card" aria-live="polite">
          <div className="loader" />
          <h3>Analyzing your image</h3>
          <p>
            FastAPI is processing the MRI with your TensorFlow model.
          </p>
        </section>
      )}

      {/* RESULTS */}
      {result && (
        <section
          className="section results-section"
          id="results"
          ref={resultsRef}
        >
          <div className="section-heading">
            <span className="eyebrow">ANALYSIS COMPLETE</span>
            <h2>Prediction results</h2>
            <p>Results returned by your FastAPI model.</p>
          </div>

          <div className="result-status">
            <span className="status-dot" />
            {result.status}
          </div>

          <div className="result-metrics">
            <div className="metric-card">
              <span className="metric-label">PREDICTED CLASS</span>
              <strong>{result.class}</strong>
              <small>Model classification output</small>
            </div>

            <div className="metric-card">
              <span className="metric-label">CLASS CONFIDENCE</span>
              <strong>
                {Number.isFinite(confidence)
                  ? `${confidence.toFixed(2)}%`
                  : "N/A"}
              </strong>
              <small>Reported by the model</small>
            </div>

            <div className="metric-card">
              <span className="metric-label">IMAGE STATUS</span>
              <strong>{result.status}</strong>
              <small>Backend response</small>
            </div>
          </div>

          <div className="result-images">
            <div className="result-image-card">
              <div className="result-image-heading">
                <div>
                  <span className="step-label">INPUT</span>
                  <h3>Original MRI</h3>
                </div>
              </div>

              <img src={preview} alt="Original uploaded MRI" />
            </div>

            <div className="result-image-card">
              <div className="result-image-heading">
                <div>
                  <span className="step-label">MODEL OUTPUT</span>
                  <h3>Segmentation mask</h3>
                </div>
              </div>

              {result.segmentation_mask ? (
                <img
                  src={result.segmentation_mask}
                  alt="Predicted brain tumor segmentation mask"
                />
              ) : (
                <div className="mask-placeholder">
                  <span>▧</span>
                  <strong>No segmentation mask returned</strong>
                  <p>Check the segmentation output of your backend.</p>
                </div>
              )}
            </div>
          </div>

          <div className="result-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={resetApp}
            >
              Analyze another image ↻
            </button>
          </div>

          <p className="medical-disclaimer">
            For research and educational use only. These results are
            not a confirmed diagnosis and should be reviewed by a
            qualified medical professional.
          </p>
        </section>
      )}

      {/* TECHNOLOGY */}
      <section className="section technology-section" id="technology">
        <div className="section-heading">
          <span className="eyebrow">THE TECHNOLOGY</span>
          <h2>One workflow. Two outputs.</h2>
          <p>Classification and segmentation from your model.</p>
        </div>

        <div className="technology-grid">
          <div className="technology-card">
            <span className="tech-number">01 / CLASSIFICATION</span>
            <span className="tech-icon">⌕</span>
            <h3>Tumor classification</h3>
            <p>
              Predicts one of the model's classes: No Tumor, Glioma,
              Meningioma, or Pituitary.
            </p>
            <div className="tech-footer">
              <span>TensorFlow</span>
              <span>Class prediction</span>
            </div>
          </div>

          <div className="technology-card featured-tech">
            <span className="tech-number">02 / SEGMENTATION</span>
            <span className="tech-icon">▧</span>
            <h3>Segmentation mask</h3>
            <p>
              Returns the predicted mask encoded as a PNG image,
              ready to display in the React interface.
            </p>
            <div className="tech-footer">
              <span>ResUNet</span>
              <span>Mask output</span>
            </div>
          </div>

          <div className="technology-card">
            <span className="tech-number">03 / INTEGRATION</span>
            <span className="tech-icon">⌘</span>
            <h3>API integration</h3>
            <p>
              React uploads the image to FastAPI and renders the
              JSON response.
            </p>
            <div className="tech-footer">
              <span>React</span>
              <span>FastAPI</span>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section workflow-section">
        <div className="workflow-intro">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>Three steps to your results.</h2>
          <p>
            Upload an image, let the model process it, and inspect
            the returned outputs.
          </p>
        </div>

        <div className="workflow-list">
          <div className="workflow-row">
            <span className="workflow-number">01</span>
            <h3>Upload a JPG/JPEG MRI</h3>
            <span className="workflow-arrow">↗</span>
            <p>Select an image from your device.</p>
          </div>

          <div className="workflow-row">
            <span className="workflow-number">02</span>
            <h3>Run the model</h3>
            <span className="workflow-arrow">↗</span>
            <p>FastAPI calls the trained TensorFlow model.</p>
          </div>

          <div className="workflow-row">
            <span className="workflow-number">03</span>
            <h3>View predictions</h3>
            <span className="workflow-arrow">↗</span>
            <p>Review classification and segmentation outputs.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="about-content">
          <span className="eyebrow">ABOUT BRAINSCAN AI</span>
          <h2>AI for brain MRI research.</h2>
          <p>
            This application connects a React interface to a FastAPI
            service running a TensorFlow brain imaging model.
          </p>
          <a className="text-link" href="#analyze">
            Try the analysis workflow →
          </a>
        </div>

        <div className="about-visual">
          <div className="about-orbit">MEDICAL AI</div>
          <div className="about-center">
            <span>✳</span>
            <strong>AI</strong>
            <small>BRAIN IMAGING</small>
          </div>
          <div className="about-caption">
            CLASSIFICATION + SEGMENTATION
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <a className="brand" href="#home">
            <span className="brand-icon">+</span>
            <span>BrainScan</span>
            <span className="brand-light">AI</span>
          </a>

          <p>AI-assisted brain MRI research interface.</p>

          <a className="back-to-top" href="#home">
            BACK TO TOP ↑
          </a>
        </div>

        <div className="footer-bottom">
          <span>BrainScan AI</span>
          <span>Research and educational use only.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
