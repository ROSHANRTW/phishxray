import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", color: "#15156b" }}>404</h1>
      <p role="alert" style={{ color: "black" }}>Sorry, the page you are looking for was not found.</p>
      <button
        style={{
          marginTop: "30px",
          padding: "12px 32px",
          background: "#15156b",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "1.1rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}