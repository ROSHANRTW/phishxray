import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [tab, setTab] = useState("personal");

  // If user is null, redirect to signup and prevent crash
  useEffect(() => {
    if (!user) navigate("/signup");
    // eslint-disable-next-line
  }, [user]);

  // Use default values if user/profile is null
  const [profile, setProfile] = useState(
    user || { username: "", email: "", gender: "Male", country: "" }
  );
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [passwordMsg, setPasswordMsg] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [error, setError] = useState("");

  // Safe avatarSrc: handle null/undefined gender
  const avatarSrc =
    (editMode ? tempProfile?.gender : profile?.gender) === "Female"
      ? "/images/girlprofile.jpg"
      : "/images/manprofile.jpg";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setTempProfile(profile);
    setEditMode(true);
  };

  const handleSave = async () => {
    setError("");
    try {
      const res = await fetch(`/api/auth/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempProfile),
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        setUser(data.user);
        setEditMode(false);
      } else {
        setError(data.error || "Update failed");
      }
    } catch {
      setError("Server error");
    }
  };

  const triggerPasswordMessage = () => {
    setPasswordMsg(true);
    setTimeout(() => setPasswordMsg(false), 4000);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account permanently?"
      )
    ) {
      await fetch(`/api/user/${user._id}`, { method: "DELETE" });
      setUser(null);
      navigate("/signup");
    }
  };

  // Determine which tab to show based on sidebar selection
  const [sidebarTab, setSidebarTab] = useState("profile");

  useEffect(() => {
    if (sidebarTab === "profile") setTab("personal");
    else if (sidebarTab === "history") setTab("history");
    else if (sidebarTab === "settings") setTab("security");
  }, [sidebarTab]);

  // Prevent rendering if user is null (redirect will happen)
  if (!user) return null;

  return (
    <div className={styles.container}>
      {/* Profile Sidebar */}
      <aside className={styles.profileSidebar}>
        <h2 className={styles.logo}>PHISHXRAY</h2>
        <nav className={styles.nav}>
          <a
            href="/"
            className={styles.navLink}
            style={{ fontWeight: "bold" }}
          >
            Home
          </a>
          <a
            href="/dashboard"
            className={`${styles.navLink} ${
              sidebarTab === "dashboard" ? styles.active : ""
            }`}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={`${styles.navLink} ${
              sidebarTab === "profile" ? styles.active : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setSidebarTab("profile");
            }}
          >
            Profile
          </a>
          <a
            href="#"
            className={`${styles.navLink} ${
              sidebarTab === "history" ? styles.active : ""
            }`}
            onClick={() => setSidebarTab("history")}
          >
            Scan History
          </a>
          <a
            href="#"
            className={`${styles.navLink} ${
              sidebarTab === "settings" ? styles.active : ""
            }`}
            onClick={() => setSidebarTab("settings")}
          >
            Settings
          </a>
        </nav>
      </aside>

      <main className={styles.main}>
        <div className={styles.card} style={{ position: "relative" }}>
          {/* Edit Profile button at top right of card */}
          {sidebarTab === "profile" && !editMode && (
            <button
              className={styles.editTextButton}
              onClick={handleEdit}
              style={{
                position: "absolute",
                top: 18,
                right: 28,
                background: "none",
                border: "none",
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              Edit Profile
            </button>
          )}
          {sidebarTab === "profile" && editMode && (
            <button
              className={styles.editTextButton}
              onClick={handleSave}
              style={{
                position: "absolute",
                top: 18,
                right: 28,
                background: "none",
                border: "none",
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              Save
            </button>
          )}
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <img
              src={avatarSrc}
              alt="Avatar"
              className={styles.avatar}
            />
            <div className={styles.profileDetails}>
              <h1 className={styles.profileName}>
                {profile.username}
              </h1>
              <span className={styles.roleBadge}>Standard User</span>
              <p className={styles.profileEmail}>{profile.email}</p>
            </div>
          </div>
          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
          {/* Tabs */}
          {sidebarTab === "profile" && (
            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${styles.activeTab}`}
              >
                Personal Info
              </button>
            </div>
          )}
          {sidebarTab === "history" && (
            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${styles.activeTab}`}
              >
                Scan History
              </button>
            </div>
          )}
          {sidebarTab === "settings" && (
            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${styles.activeTab}`}
              >
                Security
              </button>
            </div>
          )}

          {sidebarTab === "profile" && (
            <div className={styles.tabContent}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="username"
                  value={editMode ? tempProfile.username : profile.username}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={editMode ? tempProfile.country : profile.country}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Gender</label>
                <select
                  name="gender"
                  value={editMode ? tempProfile.gender : profile.gender}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="text"
                  value={editMode ? tempProfile.email : profile.email}
                  readOnly
                />
              </div>
            </div>
          )}

          {/* Scan History Tab */}
          {sidebarTab === "history" && (
            <div className={styles.tabContent}>No scan history found.</div>
          )}

          {/* Security Tab */}
          {sidebarTab === "settings" && (
            <div className={styles.tabContent}>
              <button
                className={styles.actionButton}
                onClick={triggerPasswordMessage}
              >
                Change Password
              </button>
              {passwordMsg && (
                <div className={styles.successMsg}>
                  Password reset link has been sent to your email.
                </div>
              )}

              <button
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                Delete Account Permanently
              </button>
              {deleteMsg && (
                <div className={styles.errorMsg}>
                  Your account has been scheduled for deletion.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}