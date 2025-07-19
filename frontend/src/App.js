import React, { useEffect, useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';
import UserProfile from './profile';
import Signup from './signup';
import { UserProvider, useUser } from './UserContext';

const AppContent = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo">PhishXray</div>
        <div className={`nav-container${navOpen ? ' open' : ''}`}>
          <ul className={`nav-links${navOpen ? ' open' : ''}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Scan</Link></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Community</a></li>
          </ul>
          <div
            className="profile-icon cursor-pointer"
            onClick={() => navigate('/profile')}
            title="Profile"
          >
            <Link to="/profile">
              <img
                src={
                  !user
                    ? "/images/defaultprofile.jpg"
                    : user.gender === "Female"
                    ? "/images/girlprofile.jpg"
                    : "/images/manprofile.jpg"
                }
                alt="Profile"
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
              />
            </Link>

          </div>
          <div
            className={`hamburger${navOpen ? ' open' : ''}`}
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero">
                <div className="hero-content">
                  <img src="/images/phishxraylogo.png" alt="PhishXray Logo" className="hero-logo" />
                  <div className="hero-text" data-aos="fade-left">
                    <h1>PhishXray – Your First Line of Defense Against Phishing!</h1>
                    <p>🔍 Check any email, link, or website for potential phishing threats.</p>
                    <p>Instant alerts when a scam is detected! Stay vigilant & browse safely.</p>
                    <button
                      className="hero-button"
                      data-aos="zoom-in"
                      onClick={() => navigate('/signup')}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </section>

              <section className="features">
                <h2>PhishXray Features</h2>
                <div className="cards-container">
                  {[
                    { icon: 'fa-envelope', title: 'Email', text: 'Scan emails for phishing threats.' },
                    { icon: 'fa-link', title: 'Links', text: 'Check any suspicious link quickly.' },
                    { icon: 'fa-globe', title: 'Website', text: 'Detect phishing websites in real-time.' },
                    { icon: 'fa-exclamation-triangle', title: 'Phishing Threats', text: 'Browse reported phishing pages.' }
                  ].map((feature, idx) => (
                    <div className="card" data-aos={idx % 2 === 0 ? 'flip-left' : 'flip-right'} key={feature.title}>
                      <div className="card-icon">
                        <i className={`fas ${feature.icon}`}></i>
                      </div>
                      <div className="card-title" style={{ color: 'black' }}>{feature.title}</div>
                      <p className="card-text">{feature.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="statistics" data-aos="fade-up">
                <h1 className="section-title">📊 Real-Time Threat Reports</h1>
                <p className="section-subtitle">Live insights to monitor, track, and act on phishing threats around the globe.</p>
                <div className="chart">
                  <img src='./images/phishing_report.png'/>
                </div>
              </section>

              <section className="cta" data-aos="fade-up">
                <div className="cta-content">
                  <div className="cta-text">
                    <h1>Join the PhishXray Community</h1>
                    <p>Stay one step ahead of phishing attacks by joining a growing community of cybersecurity-aware users.</p>
                    <p>Whether you're a beginner or a pro, PhishXray empowers you to stay protected and protect others.</p>
                    <h2>Why Join PhishXray?</h2>
                    <ul className="cta-features">
                      <li>✅ <strong>Early Alerts</strong> – Be the first to know about new phishing threats.</li>
                      <li>🛡️ <strong>Community Support</strong> – Share experiences, get advice & tips from cybersecurity enthusiasts.</li>
                      <li>📊 <strong>Report & Analyze</strong> – Contribute by reporting suspicious emails, links, or websites.</li>
                      <li>🚀 <strong>Access Exclusive Features</strong> – Unlock tools, tutorials & in-depth phishing analysis.</li>
                      <li>💬 <strong>Direct Interaction</strong> – Talk with experts, participate in discussions, and grow with the community.</li>
                    </ul>
                    {/* 404 page on Join Community button */}
                    <button
                      className="cta-button"
                      data-aos="zoom-in"
                      onClick={() => navigate('/404')}
                    >
                      Join Community
                    </button>
                  </div>
                  <div className="cta-image">
                    <img src="./images/women.png" alt="PhishXray Community" />
                  </div>
                </div>
              </section>

              <section className="contact">
                <h2>Contact Us</h2>
                <form onSubmit={e => { e.preventDefault(); navigate('/404'); }}>
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email" required />
                  <input type="tel" placeholder="Contact Number" required />
                  <textarea placeholder="Your Message" required></textarea>
                  <button type="submit">Submit</button>
                </form><br/>

                <h3>Join Our Community</h3>
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-discord"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
              </section>

              <footer>
                <p>&copy; 2025 PhishXray. All Rights Reserved.</p>
                <div className="footer-links">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                </div>
              </footer>
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

