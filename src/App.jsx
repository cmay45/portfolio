import { useState } from "react";
import ContactModal from "./components/ContactModal.jsx";
import PrivacySecurity from "./components/PrivacySecurity.jsx";
import CaseStudyModal from "./components/CaseStudyModal.jsx";
import { caseStudies } from "./data/caseStudies.js";

const symptoms = [
  "Your forecast keeps missing, but nobody can explain why.",
  "Demand, staffing, inventory, or capacity changes faster than your planning cycle.",
  "Finance and operations are making different assumptions about the same business.",
  "An important estimate still depends mostly on someone's judgment and a spreadsheet.",
  "You have historical data that should improve a decision, but nobody has turned it into a usable model.",
  "Problems become obvious only after they hit revenue, margin, customers, or operations.",
  "You have dashboards everywhere but very little ability to predict what happens next.",
];

const capabilities = [
  {
    title: "Forecasting & planning models",
    text: "Estimate demand, revenue, volume, capacity, cost, and other uncertain business outcomes.",
  },
  {
    title: "Predictive models",
    text: "Prioritize customers, opportunities, risks, and operational outcomes using evidence instead of intuition alone.",
  },
  {
    title: "Early-warning systems",
    text: "Detect meaningful changes across financial, commercial, and operational signals before they become larger problems.",
  },
  {
    title: "Decision models",
    text: "Combine multiple sources of evidence into repeatable scenarios, recommendations, and decision support.",
  },
  {
    title: "Measurement & causal analysis",
    text: "Determine whether an intervention actually changed the outcome the business cares about.",
  },
  {
    title: "Analytical foundations",
    text: "Build the governed data layer when the current environment cannot support trustworthy modeling.",
  },
];

const diagnosticOutputs = [
  "The decision to improve, who owns it, and the current baseline",
  "Which data and assumptions can responsibly support the decision",
  "Whether forecasting, statistical modeling, machine learning, optimization, or automation is justified",
  "How improvement can be measured against the current approach",
  "What it will take to put the solution into a production workflow",
];

const process = [
  {
    title: "1. Start with the decision",
    text: "Define the business decision that needs to improve, who owns it, what action should change, and what evidence is required to act with confidence.",
  },
  {
    title: "2. Establish trust in the signal",
    text: "Trace the data, expose assumptions, resolve definition conflicts, and determine what the available evidence can responsibly support.",
  },
  {
    title: "3. Build the smallest useful solution",
    text: "Use the right level of analytics, forecasting, machine learning, or AI to improve the decision without adding complexity for its own sake.",
  },
  {
    title: "4. Put it into the workflow",
    text: "Operationalize what works so the signal becomes a repeatable part of how sales, marketing, operations, or finance actually makes decisions.",
  },
];

const work = ["wireless-intake", "construction-cost", "amazon-anomaly", "purchase-propensity", "media-data-platform", "amazon-content"]
  .map((id) => caseStudies.find((study) => study.id === id))
  .filter(Boolean);


function PageOrbitBackground() {
  return (
    <div className="siteBackground" aria-hidden="true">
      <div className="siteStars" />
      <div className="siteGlow siteGlowLeft" />
      <div className="siteGlow siteGlowRight" />
      <span className="pageOrbit pageOrbitGold" />
      <span className="pageOrbit pageOrbitMagenta" />
      <span className="pageOrbit pageOrbitLavender" />
      <span className="pageOrbit pageOrbitBlue" />
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
      <PageOrbitBackground />

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
          <a href="#services">How we work</a>
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
          <a href="#services" onClick={() => setMenuOpen(false)}>How we work</a>
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
          <div className="heroArt" aria-hidden="true" />
          <div className="heroShade" aria-hidden="true" />
          <div className="heroSunAura" aria-hidden="true" />
          <div className="signalWash" aria-hidden="true" />

          <div className="wrap heroGrid">
            <div className="heroCopy">
              <p className="eyebrow">Decision intelligence & applied analytics</p>
              <h1>
                Advanced analytics for <span>decisions too important to leave to dashboards.</span>
              </h1>
              <p className="heroLead">
                Signalcraft builds forecasting, predictive models, anomaly detection, causal analysis, and decision systems that help finance, operations, and technology leaders make better decisions about revenue, demand, capacity, inventory, cost, and risk.
              </p>

              <div className="heroActions">
                <button className="primaryBtn" type="button" onClick={() => setContactOpen(true)}>
                  Start a Conversation
                </button>
                <a className="secondaryBtn" href="#work">View Case Studies</a>
              </div>
            </div>
          </div>
        </section>

        <section id="view" className="section symptomSection">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Does this sound familiar?</p>
              <h2>The problem usually shows up before anyone calls it an analytics problem.</h2>
            </div>
            <div className="bodyCopy">
              <p>
                Signalcraft is most useful when the business has plenty of data but still lacks confidence in an important decision.
              </p>

              <div className="symptomList">
                {symptoms.map((symptom) => (
                  <p key={symptom}>{symptom}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="section altSection capabilitiesSection">
          <div className="wrap">
            <p className="eyebrow">What Signalcraft builds</p>
            <h2>Models and decision systems for questions reporting alone cannot answer.</h2>
            <div className="capabilitiesGrid">
              {capabilities.map((capability) => (
                <article className="serviceCard" key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </article>
              ))}
            </div>
            <p className="processNote">
              BI tells you what happened. Advanced analytics estimates what happens next. Decision intelligence connects that evidence to what the business should actually do.
            </p>
          </div>
        </section>

        <section id="diagnostic" className="section diagnosticSection">
          <div className="wrap diagnosticBox">
            <div className="diagnosticIntro">
              <p className="eyebrow">The front door</p>
              <h2>Start with one decision your team does not fully trust.</h2>
              <p>
                A Signalcraft Decision Diagnostic is a focused engagement designed to define the decision, establish the current baseline, determine which evidence can be trusted, choose the modeling approach the problem actually justifies, and map the shortest path into production.
              </p>
              <button className="primaryBtn" type="button" onClick={() => setContactOpen(true)}>
                Start a Conversation
              </button>
            </div>

            <div className="diagnosticDeliverables">
              <p className="diagnosticLabel">What the diagnostic clarifies</p>
              {diagnosticOutputs.map((output) => (
                <div className="diagnosticItem" key={output}>
                  <span aria-hidden="true">→</span>
                  <p>{output}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section altSection">
          <div className="wrap">
            <p className="eyebrow">How Signalcraft works</p>
            <h2>Start with the decision. Earn trust in the signal. Then build only what the business can use.</h2>

            <div className="processGrid processGridFour">
              {process.map((step) => (
                <article className="processCard" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>

            <p className="processNote">
              Sometimes the answer is SQL. Sometimes forecasting, statistical modeling, machine learning, optimization, or an LLM. The model has to survive contact with production: complexity is useful only when it improves the decision and can be sustained by the organization.
            </p>
          </div>
        </section>

        <section id="work" className="section">
          <div className="wrap">
            <p className="eyebrow">Case studies</p>
            <h2>Built for business problems that dashboards alone could not solve.</h2>

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
            <p className="eyebrow">Bring the decision, forecast, or model you don't trust</p>
            <h2>Start with the consequential decision your team keeps revisiting, debating, or working around.</h2>
            <p>
              Signalcraft will help establish the baseline, determine what evidence can be trusted, choose the right analytical approach, and turn it into a measurable decision system the business can actually use.
            </p>
            <button className="primaryBtn" type="button" onClick={() => setContactOpen(true)}>
              Start a Conversation
            </button>
          </div>
        </section>

        <section id="about" className="section aboutSection">
          <div className="wrap split aboutSplit">
            <div>
              <p className="eyebrow">Founder-led. Hands-on.</p>
              <h2>Business judgment first. Technical depth when the decision requires it.</h2>
            </div>

            <div className="bodyCopy aboutCopy">
              <p>
                Signalcraft Analytics is led by Charlie May. He spent the first half of his career operating businesses and digital products before moving deliberately into hands-on data science, analytics engineering, machine learning, and applied AI.
              </p>
              <p>
                That combination allows Signalcraft to move from business question to data architecture to statistical model to production workflow without losing sight of the decision the system exists to improve.
              </p>
              <p>
                Charlie is completing an M.S. in Analytics at Georgia Tech, formalizing the engineering, statistics, and analytical methods behind work spanning forecasting, anomaly detection, causal measurement, operational modeling, machine learning, and cloud data infrastructure.
              </p>
              <p>
                The goal is not more dashboards, more models, or more AI. It is better forecasts, earlier warnings, stronger estimates, and more defensible decisions across financial, operational, and commercial performance.
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
