import React, { useEffect, useState } from "react";

export default function About() {
  let arr = "Biswajit Ghosh";

  return (
    <div className="container mt-5">
      {<h1>Hi there 👋, I'm {arr}</h1>}
      <p className="container mt-5">
        From my childhood I was always interested in how things works, what is
        the mechanism behind it. From there, I fall in love with exploring and
        creating new things. After sometime, I was introduced to programming,
        and it gives me the opportunity to bring my ideas to life. After that, I
        learned many programming languages and technologies to build new things.
        Currently, I'm working on MERN stack and hoping to learn more to get
        constant dopamine hits 🚀🚀
      </p>
      <h1 className="container mt-5">Skills</h1>
      <div className="row">
        <div
          className="card mx-4 mt-3"
          style={{ width: "80px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">C</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "130px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">C++</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "130px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">DSA</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "150px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">OOPS</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "130px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">SQL</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "150px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">HTML</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="card mx-4 mt-3"
          style={{ width: "130px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">CSS</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "180px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">React-js</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "220px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">Java Script</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "100px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">OS</h2>
          </div>
        </div>
        <div
          className="card mx-4 mt-3"
          style={{ width: "130px", minHeight: "30px", color: "#96908F" }}
        >
          <div className="card-body">
            <h2 className="card-title">PHP</h2>
          </div>
        </div>
      </div>

      <h2 className="container mt-5">Online Profiles</h2>
      <div className="row">
        <div
          className="mx-4 mt-3"
          style={{ width: "200px", minHeight: "30px", color: "#96908F" }}
        >
          <a
            href="https://leetcode.com/biswajit2329/"
            className="btn btn-primary"
          >
            <h4 className="card-title">Leetcode</h4>
          </a>
        </div>
        <div
          className="mx-4 mt-3"
          style={{ width: "200px", minHeight: "30px", color: "#96908F" }}
        >
          <a
            href="https://www.codechef.com/users/romanbiwajit29"
            className="btn btn-secondary"
          >
            <h4 className="card-title">Codechef</h4>
          </a>
        </div>
        <div
          className="mx-4 mt-3"
          style={{ width: "250px", minHeight: "30px", color: "#96908F" }}
        >
          <a
            href="https://codeforces.com/profile/biswajit94"
            className="btn btn-info"
          >
            <h4 className="card-title">Codeforces</h4>
          </a>
        </div>
        <div
          className=" mx-4 mt-3"
          style={{ width: "250px", minHeight: "30px", color: "#3BEB30" }}
        >
          <a
            href="https://www.hackerrank.com/bg5050525"
            className="btn btn-success"
          >
            <h4 className="card-title">Hackerrank</h4>
          </a>
        </div>
      </div>

      <h2 className="container mt-5">Certifications</h2>
      <div className="row">
        <div
          className="mx-2 mt-3"
          style={{ width: "850px", minHeight: "30px", color: "#3BEB30" }}
        >
          <a
            href="https://www.udemy.com/certificate/UC-26a3a337-e4b3-4221-981f-d6a7d2bd9ba2/"
            className="btn btn-light"
          >
            <h4 className="card-title">
              Mastering to Data Structure And Algorithm in c++
            </h4>
          </a>
        </div>
      </div>
      <div className="row">
        <div
          className="mx-2 mt-3"
          style={{ width: "850px", minHeight: "30px", color: "#96908F" }}
        >
          <a
            href="https://www.udemy.com/certificate/UC-45f374f2-b638-41a1-8503-bf6ba08f1368/"
            className="btn btn-light"
          >
            <h4 className="card-title">
              Learn C++ Programming -Beginner to Advance
            </h4>
          </a>
        </div>
      </div>
      <div className="row">
        <div
          className="mx-2 mt-3"
          style={{ width: "850px", minHeight: "30px", color: "#96908F" }}
        >
          <a className="btn btn-light">
            <h4 className="card-title">
              Problem Solving Through Programming in C
            </h4>
          </a>
        </div>
      </div>

      <h1 className="container mt-5"></h1>
    </div>
  );
}
