import React from "react";

export default function Forbidden() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{ fontSize: "4rem", color: "#15156b" }}>403</h1>
      <p>Access Forbidden. You do not have permission to view this page.</p>
      <a href="/" style={{
        display: "inline-block",
        marginTop: "30px",
        padding: "12px 32px",
        background: "#15156b",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "6px"
      }}>Go Home</a>
    </div>
  );
}