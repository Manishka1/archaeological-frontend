import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("soil");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset state when switching mode
  useEffect(() => {
    setFile(null);
    setPreview(null);
    setResult(null);
  }, [mode]);

  const handleFile = (e) => {
    const img = e.target.files[0];
    if (!img) return;
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const analyze = async () => {
    if (!file) return alert("Upload an image first");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const endpoint =
      mode === "soil"
        ? "https://archaeological-backend-cfjr.onrender.com/soil"
        : "https://archaeological-backend-cfjr.onrender.com/vegetation";

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="app">
      {/* TECH BACKGROUND */}
      <div className="tech-bg"></div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">⟁</div>
          <span className="brand">Archaeological Site Mapping</span>
        </div>
        <nav className="nav-links">
          <a href="#overview">Overview</a>
          <a href="#theory">Theory</a>
          <a href="#models">Models</a>
          <a href="#analysis">Analysis</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="overview" className="hero">
        <h1>AI‑Driven Archaeological Intelligence</h1>
        <p>
          An industrial‑grade platform combining soil science, vegetation
          analysis, and deep learning to assist archaeological exploration.
        </p>
      </section>

      {/* THEORY */}
      <section id="theory" className="section two-col">
        <div className="panel">
  <h2>Role of Soil in Archaeology</h2>

  <p>
    Soil acts as a long‑term record of both natural processes and human activity.
    Over centuries, settlements alter soil composition through construction,
    agriculture, and material usage.
  </p>
<div className="panel">
  <ul className="inline-list">
    <li>
      <b>Alluvial soils</b> are commonly associated with ancient riverbanks and
      floodplains where early civilizations settled.
    </li>

    <li>
      <b>Clay‑rich soils</b> may indicate areas used for construction, pottery
      production, or water‑retention structures.
    </li>

    <li>
      <b>Red and black soils</b> often reflect mineral composition, oxidation
      processes, and long‑term land‑use patterns.
    </li>
  </ul>
</div>
  <p>
    By analyzing visual soil characteristics such as color, texture, and surface
    structure, AI models can rapidly classify soil types and help archaeologists
    identify areas with a higher probability of human occupation.
  </p>
</div>
<div className="panel">
  <h2>Vegetation & Subsurface Signals</h2>

  <p>
    Vegetation growth is closely linked to what lies beneath the surface.
    Buried walls, foundations, ditches, and ancient roads modify soil depth,
    moisture retention, and nutrient distribution, which in turn influences
    plant health and growth patterns above them.
  </p>
<div className="panel">
  <ul className="inline-list">
    <li>
      <b>Crop marks</b> appear as variations in plant height or color caused by
      subsurface structures affecting root access to water and nutrients.
    </li>

    <li>
      <b>Soil marks</b> are visible differences in exposed soil tone that emerge
      where buried features alter soil composition.
    </li>

    <li>
      <b>Vegetation stress patterns</b> highlight areas of reduced or enhanced
      growth, often outlining hidden archaeological remains.
    </li>
  </ul>
</div>
  <p>
    Although these signals are often subtle and difficult to detect visually,
    AI-based segmentation models can accurately identify and quantify them.
    Vegetation analysis enables archaeologists to scan large landscapes using
    aerial or ground imagery and pinpoint locations with a high potential for
    buried archaeological features.
  </p>
</div>

      </section>

      {/* MODELS */}
      <section id="models" className="section models">
        <h2>AI Models Used</h2>
        <div className="model-grid">
          <div className="model-card">
            <h3>Soil Classification</h3>
            <p><b>Model:</b> MobileNetV3</p>
            <div className="panel">
  <p>
    The soil analysis module is built using <b>MobileNetV3</b>, a lightweight
    convolutional neural network optimized for efficient image classification.
    The model is trained to identify distinct soil types by learning visual
    patterns such as color distribution, texture variations, and surface
    irregularities present in soil images.
  </p>

  <ul className="inline-list">
    <li>
      <b>High accuracy with low computational cost</b>, making it suitable for
      resource-constrained environments.
    </li>

    <li>
      <b>Robust performance on field-captured images</b>, including variations
      in lighting and terrain conditions.
    </li>

    <li>
      <b>Fast inference speed</b>, enabling near real-time soil classification
      during surveys.
    </li>
  </ul>

  <p>
    By balancing speed and accuracy, the MobileNetV3-based soil classification
    system allows archaeologists to make rapid, informed decisions during
    preliminary site assessments and large-scale landscape analysis.
  </p>
</div>

          </div>

          <div className="model-card">
            <h3>Vegetation Segmentation</h3>
            <p><b>Model:</b> SegFormer‑B0</p>
            <div className="panel">
    <p>
    The vegetation mapping module is powered by <b>SegFormer-B0</b>, a
    transformer-based semantic segmentation model designed to capture both
    fine-grained details and global spatial context. Unlike traditional
    convolutional networks, transformer architectures analyze long-range
    relationships across the entire image, improving understanding of complex
    natural scenes.
  </p>

  <ul className="inline-list">
    <li>
      <b>Long-range spatial dependency capture</b>, enabling recognition of
      large-scale vegetation patterns.
    </li>

    <li>
      <b>Effective handling of complex natural textures</b>, such as mixed
      vegetation and uneven terrain.
    </li>

    <li>
      <b>Precise pixel-level segmentation</b>, producing accurate vegetation
      and non-vegetation masks.
    </li>
  </ul>

  <p>
    In this platform, SegFormer is trained to separate vegetation from
    non-vegetation areas. The resulting segmentation masks allow accurate
    calculation of vegetation coverage percentages, helping archaeologists
    detect anomalous growth patterns that may indicate subsurface
    archaeological features.
  </p>
</div>

          </div>
        </div>
      </section>

      {/* ANALYSIS */}
      <section id="analysis" className="section analysis">
        <h2>Interactive Analysis</h2>

        <div className="mode-switch">
          <button
            className={mode === "soil" ? "active" : ""}
            onClick={() => setMode("soil")}
          >
            Soil Analysis
          </button>
          <button
            className={mode === "vegetation" ? "active" : ""}
            onClick={() => setMode("vegetation")}
          >
            Vegetation Mapping
          </button>
        </div>

        <div className="analysis-card">
          <input type="file" accept="image/*" onChange={handleFile} />
          {preview && <img src={preview} alt="preview" />}
          <button onClick={analyze} disabled={loading}>
            {loading ? "Processing..." : "Run Analysis"}
          </button>

          {result && mode === "soil" && (
            <div className="result">
              <h3>Detected Soil Type</h3>
              <p className="highlight">{result.soil_type}</p>
              <p>Confidence: {result.confidence}%</p>
            </div>
          )}

          {result && mode === "vegetation" && (
            <div className="result">
              <h3>Vegetation Coverage</h3>
              <div className="bar">
                <div
                  className="veg"
                  style={{ width: `${result.vegetation_percent}%` }}
                >
                  {result.vegetation_percent}%
                </div>
                <div
                  className="nonveg"
                  style={{ width: `${result.non_vegetation_percent}%` }}
                >
                  {result.non_vegetation_percent}%
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          Archaeological Site Mapping Platform  
          <br />
          Industrial AI for Cultural Heritage & Spatial Intelligence
        </p>
      </footer>
    </div>
  );
}

export default App;