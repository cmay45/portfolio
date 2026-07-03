import { useState } from "react";
import ContactModal from "./components/ContactModal.jsx";
import PrivacySecurity from "./components/PrivacySecurity.jsx";
import CaseStudyModal from "./components/CaseStudyModal.jsx";
import { caseStudies } from "./data/caseStudies.js";

const services = [
  {
    title: "Data Clarity & Strategy",
    text: "Clarify business questions, decision owners, definitions, assumptions, and what the data can responsibly answer.",
  },
  {
    title: "Analytics Infrastructure",
    text: "Build durable data marts, semantic layers, measurement logic, and reporting foundations that do not collapse under scrutiny.",
  },
  {
    title: "Decision Science & Modeling",
    text: "Forecasting, segmentation, scoring, anomaly detection, and applied ML tied to real operational decisions.",
  },
  {
    title: "Responsible AI Enablement",
    text: "Use AI where it accelerates the work, while preserving context, lineage, judgment, and accountability.",
  },
];

const work = caseStudies;

function OrbitField() {
  return (
    <div className="orbitMap" aria-hidden="true">
      <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(560 285)">
          <g transform="rotate(-14)">
            <ellipse className="orbit teal" rx="54" ry="18" />
          </g>

          <g transform="rotate(8)">
            <ellipse className="orbit white" rx="88" ry="29" />
            <circle className="twinkleDot dotWhite fade1" cx="-71.2" cy="17.0" r="1.15" />
          </g>

          <g transform="rotate(-23)">
            <ellipse className="orbit blue" rx="124" ry="42" />
          </g>

          <g transform="rotate(16)">
            <ellipse className="orbit gold" rx="168" ry="58" />
            <circle className="twinkleDot dotGold fade2" cx="145.5" cy="-29.0" r="1.15" />
          </g>

          <g transform="rotate(-9)">
            <ellipse className="orbit teal" rx="214" ry="76" />
          </g>

          <g transform="rotate(24)">
            <ellipse className="orbit purple" rx="266" ry="94" />
          </g>

          <g transform="rotate(-18)">
            <ellipse className="orbit blue" rx="324" ry="116" />
            <circle className="twinkleDot dotBlue fade3" cx="247.8" cy="74.7" r="1.15" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeCaseStudy = caseStudies.find((study) => study.id === activeCaseStudyId);

  if (showPrivacy) {
    return (
      <>
        <PrivacySecurity onBack={() => setShowPrivacy(false)} onContact={() => setContactOpen(true)} />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        <CaseStudyModal
          study={activeCaseStudy}
          onClose={() => setActiveCaseStudyId(null)}
          onContact={() => {
            setActiveCaseStudyId(null);
            setContactOpen(true);
          }}
        />
      </>
    );
  }

  return (
    <>
      <header className="siteHeader">
        <a
          className="brand"
          href="#top"
          aria-label="Signalcraft Analytics home"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/signalcraft-logo-header.png" alt="Signalcraft Analytics" />
        </a>

        <nav className="navLinks desktopNav" aria-label="Main navigation">
          <a href="#services">What we do</a>
          <a href="#work">Case studies</a>
          <a href="#about">About</a>
          <button type="button" onClick={() => setContactOpen(true)}>Contact</button>
        </nav>

        <button
          className="menuToggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`mobileMenu ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>What we do</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Case studies</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setContactOpen(true);
            }}
          >
            Contact
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroArt" />
          <div className="signalWash" />
          <OrbitField />

          <div className="wrap heroGrid">
            <div className="heroCopy">
              <p className="eyebrow">Signal first. Tools second.</p>
              <h1>
                Turn data noise into <span>decision-ready signal.</span>
              </h1>
              <p className="heroLead">
                Signalcraft Analytics helps organizations find the signal hidden inside messy data,
                unreliable metrics, fragmented systems, and AI-assisted workflows — then build the decision
                infrastructure needed to act with confidence.
              </p>

              <div className="heroActions">
                <a className="primaryBtn" href="#services">
                  What we do
                </a>
                <a className="secondaryBtn" href="#work">View selected work</a>
              </div>
            </div>
          </div>
        </section>

        <section id="view" className="section">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Our view</p>
              <h2>More output is not the same as better thinking.</h2>
            </div>
            <div className="bodyCopy">
              <p>
                Modern teams have more dashboards, more tools, more AI-generated summaries, and more data than ever.
                But many still struggle to answer basic business questions with confidence.
              </p>
              <p>
                Signalcraft builds the layer between data and decision: the logic, infrastructure, modeling,
                measurement, and judgment required to turn raw information into something leaders can actually use.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="section altSection">
          <div className="wrap">
            <p className="eyebrow">What we do</p>
            <h2>Decision infrastructure for messy business reality.</h2>

            <div className="cardGrid">
              {services.map((service) => (
                <article className="serviceCard" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section">
          <div className="wrap">
            <p className="eyebrow">Selected work</p>
            <h2>Work samples that turn messy signals into operational clarity.</h2>

            <p className="sectionIntro">
              Selected examples are generalized from academic and prior professional work. Client-identifying
              details and proprietary data have been removed.
            </p>

            <div className="workGrid">
              {work.map((item) => (
                <button
                  className="workCard"
                  key={item.id}
                  type="button"
                  onClick={() => setActiveCaseStudyId(item.id)}
                >
                  <p className="workLabel">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="workCardCta">View case study →</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section ctaSection">
          <div className="wrap ctaBox">
            <p className="eyebrow">Start here</p>
            <h2>Bring the messy question.</h2>
            <p>
              The best place to begin is usually not a dashboard, a model, or an AI workflow. It is the decision you
              need to make and the evidence required to trust it.
            </p>
            <button className="primaryBtn" type="button" onClick={() => setContactOpen(true)}>
              Start a conversation
            </button>
          </div>
        </section>

        <section id="about" className="section aboutSection">
          <div className="wrap split aboutSplit">
            <div>
              <p className="eyebrow">About</p>
              <h2>Built by someone who has lived inside messy business systems.</h2>
            </div>

            <div className="bodyCopy aboutCopy">
              <p>
                Signalcraft Analytics is led by Charlie May, a data scientist and ML engineer based in Indianapolis.
                His work sits where analytics engineering, machine learning, data platforms, and business decision-making meet.
              </p>
              <p>
                Charlie came to this work through a 12-year career in digital commerce — building systems, running teams,
                and learning that the most important problems are often buried in the data underneath the work.
              </p>
              <p>
                He is completing an M.S. in Data Analytics at Georgia Tech and has built production work across forecasting,
                anomaly detection, causal measurement, pricing, operational modeling, and data infrastructure.
              </p>
              <p>
                The through-line is simple: reduce noise, expose assumptions, and build decision systems people can actually trust.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footerInner">
          <div>
            <p className="footerBrand">© Signalcraft Analytics</p>
            
          </div>
          <div className="footerLegal">
            <button type="button" onClick={() => setShowPrivacy(true)}>Privacy & Security</button>
          </div>
        </div>
      </footer>

      <CaseStudyModal
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudyId(null)}
        onContact={() => {
          setActiveCaseStudyId(null);
          setContactOpen(true);
        }}
      />

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
