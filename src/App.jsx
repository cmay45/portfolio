import { useState } from "react";
import ContactModal from "./components/ContactModal.jsx";
import PrivacySecurity from "./components/PrivacySecurity.jsx";
import CaseStudyModal from "./components/CaseStudyModal.jsx";
import { caseStudies } from "./data/caseStudies.js";

const symptoms = [
  "Your CRM says pipeline is healthy, but sales does not trust it.",
  "Marketing, sales, operations, and finance have different versions of the same number.",
  "You have dashboards everywhere, but the real decision still happens in a spreadsheet.",
  "Demand is changing before your planning and forecasting systems are detecting it.",
  "Your team keeps asking analysts for another data pull instead of trusting what already exists.",
  "You want to use AI or automation, but you do not trust the underlying data enough to act on it.",
];

const diagnosticOutputs = [
  "The decision to improve and who owns it",
  "The systems, data, and definitions influencing it",
  "What signals can be trusted — and what cannot yet",
  "Analytics, forecasting, automation, or AI opportunities worth pursuing",
  "The smallest practical next step with a clear business purpose",
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

const work = ["purchase-propensity", "media-data-platform", "amazon-anomaly", "wireless-intake", "amazon-content", "construction-cost"]
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
              <p className="eyebrow">Signal first. Tools second.</p>
              <h1>
                Turning customer and marketing data into <span>trusted signals for revenue, demand, inventory, and growth.</span>
              </h1>
              <p className="heroLead">
                Signalcraft helps companies connect customer and commercial behavior to the decisions that follow — across sales, operations, and finance. Start with one consequential decision, determine what evidence can be trusted, and build only what improves the decision.
              </p>

              <div className="heroActions">
                <button className="primaryBtn" type="button" onClick={() => setContactOpen(true)}>
                  Bring the unclear decision
                </button>
                <a className="secondaryBtn" href="#work">View case studies</a>
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

        <section id="diagnostic" className="section diagnosticSection">
          <div className="wrap diagnosticBox">
            <div className="diagnosticIntro">
              <p className="eyebrow">The front door</p>
              <h2>Start with one decision your team does not fully trust.</h2>
              <p>
                A Signalcraft Decision Diagnostic is a focused engagement designed to determine what evidence exists, what can be trusted, where the gaps are, and whether analytics or AI can materially improve the decision.
              </p>
              <button className="primaryBtn" type="button" onClick={() => setContactOpen(true)}>
                Bring the unclear decision
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
              Sometimes the answer is SQL. Sometimes forecasting. Sometimes machine learning or an LLM. Complexity is useful only when it improves the decision and can be sustained by the organization.
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
            <p className="eyebrow">Bring the unclear decision</p>
            <h2>Start with the decision your team keeps revisiting, debating, or working around.</h2>
            <p>
              Signalcraft will help determine what evidence exists, what can be trusted, what is missing, and the smallest practical change that could improve the decision.
            </p>
            <button className="primaryBtn" type="button" onClick={() => setContactOpen(true)}>
              Bring the unclear decision
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
                Signalcraft Analytics is led by Charlie May. His career began in digital commerce, marketing, and business leadership before moving deliberately into hands-on analytics, data engineering, machine learning, and applied AI.
              </p>
              <p>
                That path matters to clients: the work starts with the commercial or operational decision, not with a preferred technology. The same person helping define the problem can trace the data, test the signal, build the model, and help put the result into a real workflow.
              </p>
              <p>
                Charlie is completing an M.S. in Analytics at Georgia Tech, formalizing the engineering, statistics, and analytical methods behind work spanning forecasting, anomaly detection, causal measurement, operational modeling, machine learning, and cloud data infrastructure.
              </p>
              <p>
                The goal is not more dashboards, more models, or more AI. It is better evidence moving between the people responsible for demand, revenue, operations, and financial performance.
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
