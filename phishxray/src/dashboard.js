import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import styles from "./dashboard.module.css";
import { useUser } from "./UserContext";

const ScanInput = ({ type }) => {
  switch (type) {
    case "email":
      return <input type="email" placeholder="Enter email address" />;
    case "file":
      return <input type="file" />;
    case "link":
      return <input type="text" placeholder="Paste link here" />;
    case "website":
      return <input type="text" placeholder="Enter website URL" />;
    default:
      return null;
  }
};

export default function Dashboard() {
  const [selected, setSelected] = useState("email");
  const { user } = useUser();

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const handleSelection = (type) => {
    setSelected(type);
  };

  return (
    <div className={styles["dashboard-root"]}>
      <aside className={styles["profile-sidebar"]} data-aos="fade-right">
        <div className={styles["profile-section"]}>
          <Link to="/profile">
            <img
              src={user?.gender === "Female" ? "/images/girlprofile.jpg" : "/images/manprofile.jpg"}
              alt="Profile"
              className={styles["profile-img"]}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
        <nav className={styles["sidebar-nav"]}>
          <ul>
            <li>
              <Link to="/" className={styles["home-link"]}>Home</Link>
            </li>
            <li
              className={selected === "email" ? styles.active : ""}
              onClick={() => handleSelection("email")}
            >
              Email Scan
            </li>
            <li
              className={selected === "file" ? styles.active : ""}
              onClick={() => handleSelection("file")}
            >
              File Scan
            </li>
            <li
              className={selected === "link" ? styles.active : ""}
              onClick={() => handleSelection("link")}
            >
              Link Scan
            </li>
            <li
              className={selected === "website" ? styles.active : ""}
              onClick={() => handleSelection("website")}
            >
              Website Scan
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles["dashboard-main"]} data-aos="fade-left">
        <h1>Welcome, {user?.name || "User"}!</h1>
        <p>Select a scan option to get started</p>
        <div className={styles["scan-input-area"]} data-aos="zoom-in">
          <ScanInput type={selected} />
          <button className={styles["scan-btn"]} data-aos="fade-up">
            Scan Now
          </button>
        </div>
      </main>
    </div>
  );
}
