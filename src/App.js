import React, { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
    setResult(null);
  };

  const analyzeImage = async () => {
    if (!file) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend not running");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🌱 Soil & Vegetation Analyzer</h1>

      <input type="file" accept="image/*" onChange={handleFile} />

      {preview && <img src={preview} alt="preview" className="preview" />}

      <button onClick={analyzeImage}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="card">
          <h2>
            Soil Type:{" "}
            <span className={result.soil_type === "Clay" ? "clay" : ""}>
              {result.soil_type}
            </span>
          </h2>

          <p>Confidence: {result.confidence}%</p>

          <div className="bar">
            <div
              className="veg"
              style={{ width: `${result.vegetation_percent}%` }}
            >
              Vegetation {result.vegetation_percent}%
            </div>
            <div
              className="nonveg"
              style={{ width: `${result.non_vegetation_percent}%` }}
            >
              Non‑Vegetation {result.non_vegetation_percent}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;