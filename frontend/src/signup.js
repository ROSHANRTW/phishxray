import React, { useState, useEffect, useRef } from "react";
import styles from "./Signup.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function Signup() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const authRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    if (authRef.current) {
      if (isLoginMode) authRef.current.classList.add(styles.active);
      else authRef.current.classList.remove(styles.active);
    }
  }, [isLoginMode]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = isLoginMode ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        navigate("/dashboard");
      } else {
        setError(data.msg || data.error || "Something went wrong");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className={styles["signup-wrapper"]}>
      <div
        className={styles.container}
        id="authBox"
        data-aos="zoom-in"
        ref={authRef}
      >
        <div className={styles.left}>
          <h2>{isLoginMode ? "Welcome Back!" : "Join PhishXray"}</h2>
          <p>
            {isLoginMode
              ? "Login to explore phishing detection tools."
              : "Secure your digital presence & join our trusted community."}
          </p>
          <form onSubmit={handleSubmit}>
            {/* Full Name input only for Sign Up */}
            {!isLoginMode && (
              <div className={styles["input-group"]}>
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className={styles["input-group"]}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles["input-group"]}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Removed country and gender fields */}
            {error && (
              <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
            )}
            <button className={styles.btn} type="submit">
              {isLoginMode ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className={styles.switch}>
            {isLoginMode ? "I have no account?" : "Already have an account?"}{" "}
            <span onClick={() => setIsLoginMode((prev) => !prev)}>
              {isLoginMode ? "Sign Up" : "Login"}
            </span>
          </p>
          <div className={styles["social-login"]}>
            <button type="button">Google</button>
          </div>
        </div>
        <div className={styles.right}>
          <h2>{isLoginMode ? "Welcome Back!" : "Welcome"}</h2>
          <p>Login to explore phishing detection tools.</p>
          <DotLottieReact
            src="https://lottie.host/865aab3f-bf44-4a6f-8180-08519acc8fff/okbQ6lDNMY.lottie"
            loop
            autoplay
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}
