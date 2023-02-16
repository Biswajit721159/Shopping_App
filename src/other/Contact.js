import React from "react";
export default function Contact() {
  return (
    <div className="container mt-5">
      <div className="row">
      <div
          className="container mx-5 mt-5"style={{ width: "150px", minHeight: "150px", color: "#96908F" }}>
          <div className="card-body">
            <a
              href="https://www.linkedin.com/in/biswajit-ghosh-21a415209"
              className="btn btn-secondary"
            >
              <h2>Linkedin</h2>
            </a>
          </div>
        </div>

        <div
          className="container mx-5 mt-5"style={{ width: "150px", minHeight: "150px", color: "#96908F" }}>
          <div className="card-body">
            <a
              href="https://github.com/Biswajit721159"
              className="btn btn-warning"
            >
              <h2>Github</h2>
            </a>
          </div>
        </div>

        <div
          className="container mx-5 mt-5"style={{ width: "150px", minHeight: "150px", color: "#96908F" }}>
          <div className="card-body">
            <a
              href="https://drive.google.com/file/d/14RbxKM1gkghHGGlZe_FB6nO2nGAIfe3_/view?usp=drivesdk"
              className="btn btn-danger"
            >
              <h2>Resume</h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
