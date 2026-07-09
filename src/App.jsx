import { useState } from "react";
import ContactModal from "./components/ContactModal.jsx";
import PrivacySecurity from "./components/PrivacySecurity.jsx";
import CaseStudyModal from "./components/CaseStudyModal.jsx";
import { caseStudies } from "./data/caseStudies.js";

const services = [
  {
    title: "01 — Clarify the Current State",
    text: "Map the data sources, reports, workflows, metrics, and business questions already in motion so the real problem becomes visible.",
  },
  {
    title: "Data & Analytics Infrastructure",
    text: "Build the trusted layer between platforms: data marts, semantic logic, measurement rules, and reporting foundations leaders can rely on.",
  },
  {
    title: "AI-Ready Data Systems",
    text: "Identify where AI can responsibly accelerate analysis, content, forecasting, or operations — and where the data, logic, or governance is not ready yet.",
  },
  {
    title: "Applied Modeling & Signal Design",
    text: "Create forecasting, scoring, anomaly detection, segmentation, and causal measurement systems tied to real business decisions.",
  },
];

const symptoms = [
  "Your systems are connected, but decisions are still unclear.",
  "People keep asking for “one more pull” because no one trusts the dashboard enough to act.",
  "Metrics change depending on which platform someone opens.",
  "AI tools are producing more output than your team can verify.",
  "Teams are debating definitions instead of making decisions.",
  "Data science work is being attempted without the statistical judgment, context, or ownership it requires.",
];

const process = [
  {
    title: "1. Diagnose the decision system",
    text: "Clarify the business question, who owns the decision, what evidence matters, and where current data or AI workflows break down.",
  },
  {
    title: "2. Map current vs. ideal state",
    text: "Review connected sources, definitions, platform logic, model opportunities, AI risks, and the gaps between available data and usable signal.",
  },
  {
    title: "3. Build the trusted layer",
    text: "Design the infrastructure, measurement logic, models, or AI workflow needed to make the decision repeatable and defensible.",
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
                Data and AI strategy for teams with <span>connected systems but unclear decisions.</span>
              </h1>
              <p className="heroLead">
                Signalcraft helps organizations turn fragmented platforms, conflicting metrics, and AI pressure
                into trusted decision infrastructure.
              </p>

              <div className="heroActions">
                <a className="primaryBtn" href="#approach">
                  Start with a diagnostic
                </a>
                <a className="secondaryBtn" href="#work">View case studies</a>
              </div>
            </div>
          </div>
        </section>

        <section id="view" className="section symptomSection">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Symptoms</p>
              <h2>Modern companies do not usually lack data. They lack direction.</h2>
            </div>
            <div className="bodyCopy">
              <p>
                The problem is not having too few sources. It is having too many connected systems without a trusted
                decision layer between platforms, teams, metrics, and AI tools.
              </p>

              <div className="symptomList">
                {symptoms.map((symptom) => (
                  <p key={symptom}>{symptom}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="section aiPrincipleSection">
          <div className="wrap principleBox">
            <p className="eyebrow">AI-forward, judgment-led</p>
            <h2>AI does not replace analytical judgment. It exposes where judgment was missing.</h2>
            <p>
              Signalcraft helps teams use AI where it belongs: grounded in trusted data, clear definitions,
              statistical discipline, and business context.
            </p>
          </div>
        </section>

        <section id="services" className="section altSection">
          <div className="wrap">
            <p className="eyebrow">What we do</p>
            <h2>Decision infrastructure for teams that need clarity before they scale analytics or AI.</h2>

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

        <section className="section processSection">
          <div className="wrap">
            <div className="sectionHeaderWithAction">
              <div>
                <p className="eyebrow">How we work</p>
                <h2>Start with the decision, not the tool.</h2>
              </div>
              <button className="primaryBtn" type="button" onClick={() => setContactOpen(true)}>
                Start a conversation
              </button>
            </div>

            <div className="processGrid">
              {process.map((step) => (
                <article className="processCard" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>

            <p className="processNote">
              Most engagements begin with a focused diagnostic: clarify the decision, inspect the current data and AI environment,
              then define the practical roadmap before building anything larger.
            </p>
          </div>
        </section>

        <section id="work" className="section">
          <div className="wrap">
            <p className="eyebrow">Case studies</p>
            <h2>Business problems solved with data science, AI workflows, and decision infrastructure.</h2>

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
                  <h3>{item.cardTitle || item.title}</h3>
                  <p>{item.cardSummary || item.summary}</p>
                  <span className="workCardCta">View case study →</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section ctaSection">
          <div className="wrap ctaBox">
            <p className="eyebrow">Start here</p>
            <h2>Bring the unclear decision.</h2>
            <p>
              The best place to begin is usually not a dashboard, a model, or an AI workflow. It is the decision
              your team needs to make, the evidence required to trust it, and the system needed to make it repeatable.
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
              <h2>Built by someone who understands data, AI, systems, and business consequences.</h2>
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
