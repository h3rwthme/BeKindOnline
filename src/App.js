import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const FLOATING_WORDS = [
  { text: "Jelek banget", x: 8, y: 15, delay: 0 },
  { text: "Ga ada yang mau berteman", x: 72, y: 8, delay: 0.6 },
  { text: "Norak.", x: 85, y: 22, delay: 1.2 },
  { text: "Mending ga usah eksis", x: 5, y: 42, delay: 0.3 },
  { text: "Goblok.", x: 78, y: 48, delay: 0.9 },
  { text: "Pathetic.", x: 82, y: 68, delay: 1.5 },
  { text: "Ga ada yang peduli sama lo", x: 3, y: 70, delay: 0.7 },
  { text: "Malu-maluin", x: 45, y: 85, delay: 1.1 },
];

const STATS = [
  { number: "41%", label: "remaja Indonesia pernah mengalami cyberbullying", icon: "📱" },
  { number: "1 dari 3", label: "korban tidak pernah menceritakan kepada siapapun", icon: "🔇" },
  { number: "70%", label: "saksi tidak mengambil tindakan ketika melihat bullying online", icon: "👁️" },
  { number: "2x", label: "lebih tinggi risiko depresi pada korban cyberbullying", icon: "💔" },
];

const SIGNS = [
  { title: "Menarik Diri", desc: "Menghindari perangkat digital atau tiba-tiba tidak mau menggunakan media sosial", icon: "🚪" },
  { title: "Perubahan Emosi", desc: "Tampak cemas, sedih, atau marah—terutama setelah menggunakan ponsel", icon: "🌊" },
  { title: "Gangguan Tidur", desc: "Susah tidur atau mimpi buruk, sering terbangun di malam hari", icon: "🌙" },
  { title: "Prestasi Menurun", desc: "Nilai di sekolah turun atau kehilangan minat pada hal yang biasanya disukai", icon: "📉" },
  { title: "Menyalahkan Diri", desc: "Sering berkata 'aku salah', 'aku memang jelek', atau hal-hal negatif tentang diri sendiri", icon: "🪞" },
  { title: "Menghindari Sosial", desc: "Tidak mau pergi sekolah atau bertemu teman-teman secara langsung", icon: "🏠" },
];

const STEPS = [
  {
    num: "01",
    title: "Jangan Balas",
    desc: "Reaksi adalah bahan bakar bagi pelaku. Diam bukan kelemahan—itu adalah kontrol.",
    color: "#4a9eff"
  },
  {
    num: "02",
    title: "Simpan Bukti",
    desc: "Screenshot percakapan, catat tanggal dan waktu. Bukti adalah kekuatanmu.",
    color: "#ff6b6b"
  },
  {
    num: "03",
    title: "Blokir Pelaku",
    desc: "Kamu berhak memilih siapa yang ada di ruang digitalmu. Blokir bukan kalah.",
    color: "#51cf66"
  },
  {
    num: "04",
    title: "Cerita ke Orang Terpercaya",
    desc: "Orang tua, guru, konselor. Kamu tidak harus menghadapi ini sendiri.",
    color: "#fcc419"
  },
  {
    num: "05",
    title: "Laporkan",
    desc: "Gunakan fitur laporan di platform. Lapor ke pihak sekolah atau kepolisian jika perlu.",
    color: "#cc5de8"
  },
];

const RESOURCES = [
  { name: "Into The Light Indonesia", desc: "Konseling & pencegahan bunuh diri", contact: "119 ext 8", url: "https://www.intothelightid.org", type: "hotline" },
  { name: "Yayasan Pulih", desc: "Layanan psikologi & konseling", contact: "(021) 788-42580", url: "https://yayasanpulih.org", type: "konseling" },
  { name: "Komnas Perlindungan Anak", desc: "Perlindungan hak anak", contact: "021-315-0858", url: "https://komnaspa.wordpress.com", type: "hukum" },
  { name: "Kominfo Aduan Konten", desc: "Lapor konten berbahaya online", contact: "aduankonten.id", url: "https://aduankonten.id", type: "laporan" },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedSection({ children, className = "" }) {
  const [ref, visible] = useIntersection();
  return (
    <div ref={ref} className={`anim-section ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { href: "#tentang", label: "Tentang" },
    { href: "#fakta", label: "Fakta" },
    { href: "#tanda", label: "Kenali Tanda" },
    { href: "#langkah", label: "Apa yang Harus Dilakukan" },
    { href: "#bantuan", label: "Cari Bantuan" },
  ];
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        <span className="logo-words">Words</span>
        <span className="logo-behind">Behind</span>
      </a>
      <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <ul className={`nav-links ${open ? 'nav-open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  return (
    <section id="hero" className="hero">
      <div className="hero-noise" />
      <div className="hero-gradient" />
      {FLOATING_WORDS.map((w, i) => (
        <div
          key={i}
          className="floating-word"
          style={{ left: `${w.x}%`, top: `${w.y}%`, animationDelay: `${w.delay}s` }}
        >
          <span className="chat-bubble">{w.text}</span>
        </div>
      ))}
      <div className={`hero-content ${loaded ? 'hero-loaded' : ''}`}>
        <p className="hero-overline">Kampanye Anti-Cyberbullying</p>
        <h1 className="hero-title">
          <em>Words</em>
          <span className="hero-title-block">Behind</span>
          <span className="hero-title-screen">THE SCREEN</span>
        </h1>
        <p className="hero-sub">
          Kata-kata di balik layar bisa melukai lebih dalam dari yang kamu kira.<br />
          Bersama, kita bisa mengubah lanskap digital menjadi tempat yang lebih aman.
        </p>
        <div className="hero-cta">
          <a href="#tentang" className="btn-primary">Pelajari Lebih Lanjut</a>
          <a href="#bantuan" className="btn-ghost">Butuh Bantuan?</a>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="tentang" className="section-about">
      <AnimatedSection>
        <div className="about-grid">
          <div className="about-text">
            <span className="section-tag">Tentang Cyberbullying</span>
            <h2>Bukan Sekadar<br /><em>Lelucon Online</em></h2>
            <p>Cyberbullying adalah tindakan agresif yang disengaja, dilakukan berulang oleh individu atau kelompok melalui media digital. Ini bukan sensitivitas berlebihan. Ini bukan drama remaja biasa.</p>
            <p>Dampaknya nyata: kecemasan, depresi, isolasi sosial, bahkan pemikiran untuk menyakiti diri sendiri. Setiap pesan kejam yang dikirim meninggalkan bekas—bahkan setelah dihapus.</p>
          </div>
          <div className="about-cards">
            {[
              { icon: "💬", title: "Verbal", desc: "Penghinaan, ancaman, komentar menyakitkan di media sosial" },
              { icon: "📸", title: "Visual", desc: "Menyebarkan foto/video memalukan tanpa persetujuan" },
              { icon: "🚫", title: "Pengucilan", desc: "Sengaja mengecualikan seseorang dari grup online" },
              { icon: "🎭", title: "Peniruan", desc: "Membuat akun palsu untuk merusak reputasi seseorang" },
            ].map((c, i) => (
              <div key={i} className="about-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="card-icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

function Stats() {
  return (
    <section id="fakta" className="section-stats">
      <div className="stats-bg" />
      <AnimatedSection>
        <div className="stats-header">
          <span className="section-tag">Data & Fakta</span>
          <h2>Angka yang<br /><em>Tidak Bisa Diabaikan</em></h2>
        </div>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

function Signs() {
  return (
    <section id="tanda" className="section-signs">
      <AnimatedSection>
        <div className="section-header">
          <span className="section-tag">Kenali Tanda-Tanda</span>
          <h2>Apakah Seseorang yang<br /><em>Kamu Kenal Sedang Berjuang?</em></h2>
          <p className="section-desc">Korban cyberbullying sering menyembunyikan penderitaannya. Kenali sinyal ini.</p>
        </div>
        <div className="signs-grid">
          {SIGNS.map((s, i) => (
            <div key={i} className="sign-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="sign-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

function Steps() {
  return (
    <section id="langkah" className="section-steps">
      <div className="steps-bg" />
      <AnimatedSection>
        <div className="section-header">
          <span className="section-tag">Panduan Tindakan</span>
          <h2>Jika Kamu atau Temanmu<br /><em>Mengalaminya</em></h2>
        </div>
        <div className="steps-list">
          {STEPS.map((s, i) => (
            <div key={i} className="step-item" style={{ '--accent': s.color, animationDelay: `${i * 0.1}s` }}>
              <div className="step-num" style={{ color: s.color }}>{s.num}</div>
              <div className="step-body">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
              <div className="step-line" style={{ background: s.color }} />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

function Resources() {
  return (
    <section id="bantuan" className="section-resources">
      <AnimatedSection>
        <div className="section-header">
          <span className="section-tag">Cari Bantuan</span>
          <h2>Kamu Tidak<br /><em>Harus Sendirian</em></h2>
          <p className="section-desc">Jika kamu atau seseorang yang kamu kenal membutuhkan bantuan, hubungi sumber daya ini.</p>
        </div>
        <div className="resources-grid">
          {RESOURCES.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="resource-type">{r.type}</div>
              <h4>{r.name}</h4>
              <p>{r.desc}</p>
              <div className="resource-contact">{r.contact}</div>
              <div className="resource-arrow">→</div>
            </a>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

function Pledge() {
  const [signed, setSigned] = useState(false);
  return (
    <section className="section-pledge">
      <AnimatedSection>
        <div className="pledge-box">
          <div className="pledge-glow" />
          <span className="section-tag">Ambil Sikap</span>
          <h2>Aku Berjanji untuk<br /><em>#BeKindOnline</em></h2>
          <p>Bergabunglah dengan ribuan orang yang berkomitmen untuk membuat internet menjadi tempat yang lebih aman dan lebih baik.</p>
          {!signed ? (
            <button className="btn-pledge" onClick={() => setSigned(true)}>
              ✊ Aku Ikut Berjanji
            </button>
          ) : (
            <div className="pledge-confirmed">
              <span className="pledge-check">✓</span>
              <p>Terima kasih. Setiap tindakan baik membuat perbedaan.</p>
              <div className="share-links">
                <span>Sebarkan:</span>
                <a href="https://twitter.com/intent/tweet?text=Aku+berjanji+untuk+%23BeKindOnline+%E2%80%94+bergabunglah+bersamaku+dalam+melawan+cyberbullying!" target="_blank" rel="noopener noreferrer">Twitter/X</a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-words">Words</span>
          <span className="logo-behind">Behind</span>
          <span className="footer-tagline">the screen.</span>
        </div>
        <p className="footer-mission">Kampanye edukasi untuk menciptakan ekosistem digital yang sehat, aman, dan manusiawi bagi semua.</p>
        <div className="footer-hashtag">#BeKindOnline</div>
        <div className="footer-links">
          <a href="#tentang">Tentang</a>
          <a href="#fakta">Fakta</a>
          <a href="#tanda">Tanda-Tanda</a>
          <a href="#langkah">Langkah</a>
          <a href="#bantuan">Bantuan</a>
        </div>
        <p className="footer-copy">© 2026 Words Behind The Screen. Dibuat untuk kesadaran publik.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <About />
      <Stats />
      <Signs />
      <Steps />
      <Resources />
      <Pledge />
      <Footer />
    </div>
  );
}
