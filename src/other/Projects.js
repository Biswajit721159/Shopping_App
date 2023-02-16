import React from "react";

export default function Projects() {
  return (
    <div className="container mt-5" >
      <div className="row">
      <div className="card mx-4 mt-5" style={{ width: "310px", minHeight: "150px",color: "#96908F" }}>
          <div className="card-body">
            <h2 className="card-title">Call Logs System</h2>
            <ul className="hello">
              <li className="nav-item">HTML</li>
              <li className="nav-item">CSS</li>
              <li className="nav-item">React-js</li>
            </ul>
            <a
              href="https://call-logs.vercel.app/"
              className="btn btn-primary"
            >
              Go To Webside
            </a>
          </div>
        </div>
        <div className="card mx-4 mt-5" style={{ width: "310px", minHeight: "150px",color: "#96908F" }}>
          <div className="card-body">
            <h2 className="card-title">Crud-operation</h2>
            <ul className="hello">
              <li className="nav-item">HTML</li>
              <li className="nav-item">CSS</li>
              <li className="nav-item">React-js</li>
            </ul>
            <a
              href="https://crud-opertion.vercel.app/"
              className="btn btn-primary"
            >
              Go To Webside
            </a>
          </div>
        </div>
        <div className="card mx-4 mt-5" style={{ width: "310px", minHeight: "150px",color: "#96908F" }}>
          <div className="card-body">
            <h2 className="card-title">Text Change App</h2>
            <ul className="hello">
              <li className="nav-item">HTML</li>
              <li className="nav-item">CSS</li>
              <li className="nav-item">React-js</li>
            </ul>
            <a
              href="https://biswajit721159.github.io/my-react-app/"
              className="btn btn-primary"
            >
              Go To Webside
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
