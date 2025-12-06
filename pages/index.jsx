import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';

export default function Home() {
  const [popupData, setPopupData] = useState({ title: '', desc: '' });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Charts
    const makePieChart = (id, labels, data) => {
      const canvas = document.getElementById(id);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      return new Chart(ctx, {
        type: 'pie',
        data: { labels, datasets: [{ data, backgroundColor: ['#ff69b4','#ff1493','#ffb6c1','#ff7eb9','#ff99cc'], borderWidth: 0 }] },
        options: {
          animation: { duration: 1500, easing: 'easeOutQuart', animateRotate: true, animateScale: true },
          hover: { mode: null },
          plugins: {
            legend: { position: 'bottom' },
            tooltip: { enabled: true, backgroundColor: 'rgba(255,105,180,0.9)', titleColor: '#000', bodyColor: '#000', borderColor: '#ff69b4', borderWidth: 1 }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    };

    makePieChart('winChart', ['Wins', 'Losses'], [65, 35]);
    makePieChart('kdaChart', ['Kills', 'Deaths', 'Assists'], [15, 10, 75]);
    makePieChart('playedChart', ['RTS', 'RPG', 'Gacha', 'MOBA', 'Sports'], [55, 20, 18, 12, 5]);

    // Background scroll
    const sections = document.querySelectorAll('section[data-bgcolor]');
    const lerpColor = (a, b, t) => {
      const ah = parseInt(a.replace('#', ''), 16), ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
      const bh = parseInt(b.replace('#', ''), 16), br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
      const rr = Math.round(ar + t * (br - ar)), rg = Math.round(ag + t * (bg - ag)), rb = Math.round(ab + t * (bb - ab));
      return `rgb(${rr},${rg},${rb})`;
    };

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const secTop = sec.offsetTop;
        const secBottom = secTop + sec.offsetHeight;
        if (scrollY >= secTop && scrollY < secBottom) {
          const t = (scrollY - secTop) / sec.offsetHeight;
          const nextColor = sections[i + 1] ? sections[i + 1].dataset.bgcolor : sec.dataset.bgcolor;
          document.body.style.background = lerpColor(sec.dataset.bgcolor, nextColor, t);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openPopup = (title, desc) => {
    setPopupData({ title, desc });
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <Head>
        <title>Phantom — Gamer Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="site-header" role="banner">
        <nav role="navigation" className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills & Playstyle</a></li>
            <li><a href="#stats">Statistics</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#socials">Socials</a></li>
          </ul>
        </nav>
      </header>

      {isPopupOpen && (
        <div className="popup" onClick={e => e.target === e.currentTarget && closePopup()} style={{ display: 'flex', opacity: 1 }}>
          <div className="popup-content">
            <h3>{popupData.title}</h3>
            <p>{popupData.desc}</p>
            <button className="close-btn" onClick={closePopup}>Back</button>
          </div>
        </div>
      )}

      <main className="main">
        <div className="main-content-wrapper">
          {/* Home Section */}
          <section id="home" className="section home" tabIndex="-1" data-bgcolor="#1a001a">
            <div className="home-inner">
              <div className="home-left">
                <div className="avatar-wrap">
                  <img src="/assets/aj.png" alt="Phantom profile" className="avatar" />
                </div>
                <h2 className="greeting">Greetings Visitor,</h2>
                <h1 className="hero">I am <span className="phantom">Phantom</span></h1>
              </div>
              <div className="home-right">
                <blockquote className="quote">
                  “Sweat saves blood, blood saves lives, but brains saves both.”
                </blockquote>
                <p className="quote-author">
                  <a href="https://www.britannica.com/biography/Erwin-Rommel" target="_blank" rel="noopener noreferrer">
                    — Field Marshal Erwin Johannes Eugen Rommel (1891–1944)
                  </a>
                </p>
                <p className="intro">
                  An RTS and RPG player who thrives in team-based gameplay. I enjoy both commanding the field with calculated strategy in real-time battles and taking on a tank or support role in RPG games to keep the team strong and coordinated. My focus is on planning, balance, and teamwork that lead every squad to victory.
                </p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="section skills" tabIndex="-1" data-bgcolor="#2e002e">
            <h2 className="section-title">SKILLS & PLAYSTYLES</h2>
            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-circle" onClick={() => openPopup('Strategic Thinking', 'Always analyzing maps, enemy patterns, and timing.')}>Strategic Thinking</div>
              </div>
              <div className="skill-item">
                <div className="skill-circle" onClick={() => openPopup('Tactical Adaptability', 'Quick to shift plans when team dynamics change.')}>Tactical Adaptability</div>
              </div>
              <div className="skill-item">
                <div className="skill-circle" onClick={() => openPopup('Support-Oriented', 'Focused on sustainability and protection for the squad.')}>Support-Oriented</div>
              </div>
              <div className="skill-item">
                <div className="skill-circle" onClick={() => openPopup('Communication', 'Calm and clear, ensuring everyone stays in sync.')}>Communication</div>
              </div>
              <div className="skill-item">
                <div className="skill-circle" onClick={() => openPopup('Leadership', 'Guides without controlling, enhances team flow.')}>Leadership</div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section id="stats" className="section stats" tabIndex="-1" data-bgcolor="#3a003a">
            <h2 className="section-title">STATISTICS</h2>
            <div className="statistics-container">
              <div className="stat-box">
                <h3>Win Rate</h3>
                <canvas id="winChart" width="200" height="200"></canvas>
                <p><strong>65%</strong> Wins · <strong>35%</strong> Losses</p>
              </div>
              <div className="stat-box">
                <h3>K / D / A</h3>
                <canvas id="kdaChart" width="200" height="200"></canvas>
                <p><strong>15%</strong> Kills · <strong>10%</strong> Deaths · <strong>75%</strong> Assists</p>
              </div>
              <div className="stat-box">
                <h3>Game Preferences</h3>
                <canvas id="playedChart" width="200" height="200"></canvas>
                <p><strong>55%</strong> RTS · <strong>20%</strong> RPG · <strong>18%</strong> Gacha · <strong>12%</strong> MOBA · <strong>5%</strong> Sports</p>
              </div>
            </div>
          </section>

          {/* About Me Section */}
          <section id="about" className="section about" tabIndex="-1" data-bgcolor="#4d004d">
            <h2 className="section-title">ABOUT ME</h2>
            <div className="about-card about-grid">
              <div className="about-left-box">
                <p><span className="icon">👤</span><strong>Full Name:</strong><br />Aldrich Jay B. Francisco</p>
                <p><span className="icon">💼</span><strong>Occupation:</strong><br />Student</p>
                <p><span className="icon">📍</span><strong>Location:</strong><br />Camarines Sur, Philippines</p>
              </div>
              <div className="about-right-box">
                <p><span className="icon">📞</span><strong>Contact:</strong><br />09817186455</p>
                <p><span className="icon">🎓</span><strong>Education:</strong><br />Bachelor of Science in Computer Science</p>
                <p><span className="icon">🗣️</span><strong>Languages:</strong><br />English, Filipino</p>
              </div>
            </div>
          </section>

          {/* Socials Section */}
          <section id="socials" className="section socials" tabIndex="-1" data-bgcolor="#2e002e">
            <h2 className="section-title">SOCIALS</h2>
            <div className="socials-wrap">
              <a className="social-link" href="https://www.facebook.com/aldrichjay.francisco.7" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a className="social-link" href="https://www.instagram.com/phantom7974/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a className="social-link" href="https://www.tiktok.com/@phantomgreediness723?_t=ZS-90Qj7IvCbQ0&_r=1" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a className="social-link" href="https://www.youtube.com/channel/UC9Wf3mwtPV0zgW_uWgpx41w" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a className="social-link" href="mailto:aldrichjayfrancisco33@gmail.com" target="_blank" rel="noopener noreferrer">Gmail</a>
              <a className="social-link" href="#">Discord: phantomgreed23</a>
            </div>
          </section>
        </div>

        <footer className="site-footer">
          <small>© 2025 Phantom Portfolio</small>
        </footer>
      </main>
    </>
  );
}