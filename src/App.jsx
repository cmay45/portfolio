import { useState } from "react";
import ContactModal from "./components/ContactModal.jsx";
import PrivacySecurity from "./components/PrivacySecurity.jsx";
import CaseStudyModal from "./components/CaseStudyModal.jsx";
import { caseStudies } from "./data/caseStudies.js";

const services = [
  {
    title: "Connect the Data",
    text: "Bring customer, marketing, CRM, sales, inventory, and operational data into a trustworthy analytical foundation.",
  },
  {
    title: "Find the Signal",
    text: "Use measurement, forecasting, experimentation, segmentation, and machine learning to understand what customer behavior is actually telling you.",
  },
  {
    title: "Operationalize the Decision",
    text: "Turn analysis into repeatable systems that help marketing, sales, operations, and finance decide what to do next.",
  },
  {
    title: "Scale the System",
    text: "Move successful analytics and AI from one-off solutions into reusable, governed systems that can support more teams, more decisions, and more complexity over time.",
  },
];

const businessIntelligence = [
  {
    title: "Attribution → Channel Strategy",
    text: "Understand how paid media, organic channels, dealers, sales teams, and other touchpoints cooperate or compete to create demand.",
  },
  {
    title: "Lead Scoring → Demand & Pipeline Intelligence",
    text: "Turn customer behavior and propensity into a stronger sales prioritization tool and a forward-looking signal for pipeline health and demand planning.",
  },
  {
    title: "Forecasting → Marketing Investment",
    text: "Connect historical performance, seasonality, demand signals, and channel activity to right-size spend and improve the overall marketing mix.",
  },
  {
    title: "Inventory → Demand Activation",
    text: "Use product availability, geography, pipeline, and customer demand to identify where marketing should create more demand — and where it should not.",
  },
  {
    title: "Segmentation → Commercial Strategy",
    text: "Turn customer behavior into meaningful groups that can inform sales coverage, lifecycle strategy, product planning, and customer economics.",
  },
  {
    title: "Experimentation → Incremental Growth",
    text: "Separate correlation from causation so leaders can understand whether marketing activity actually changed customer behavior and created incremental value.",
  },
];

const process = [
  {
    title: "1. Start with the decision",
    text: "Define the business decision that needs to improve, who owns it, what action should change, and what evidence is required to act with confidence.",
  },
  {
    title: "2. Build trust in the signal",
    text: "Trace the data, expose assumptions, establish shared definitions, and determine what the available evidence can responsibly support.",
  },
  {
    title: "3. Put intelligence into the workflow",
    text: "Use the right level of analytics, forecasting, machine learning, or AI and operationalize it so the result becomes a repeatable part of how the business works.",
  },
];

const work = caseStudies;


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
          <div className="heroArt" aria-hidden="true" />
          <div className="heroShade" aria-hidden="true" />
          <div className="heroSunAura" aria-hidden="true" />
          <div className="signalWash" aria-hidden="true" />

          <div className="wrap heroGrid">
            <div className="heroCopy">
              <p className="eyebrow">Signal first. Tools second.</p>
              <h1>
                 Turning marketing and customer data into <span>intelligence for sales, operations, and finance.</span>
              </h1>
              <p className="heroLead">
                Signalcraft helps companies turn customer and marketing data into trusted signals for sales, operations, and finance — from pipeline prioritization and demand planning to inventory decisions and financial forecasting.
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
              <p className="eyebrow">Where marketing becomes business intelligence</p>
              <h2>The best marketing data should not stop in marketing.</h2>
            </div>
            <div className="bodyCopy">
              <p>
                Marketing sits close to the customer and often sees changes in demand before they appear in booked revenue.
                Connected to sales, inventory, operational, and financial data, those signals can help the whole business decide what to do next.
              </p>

              <div className="symptomList">
                {businessIntelligence.map((item) => (
                  <p key={item.title}>
                    <strong>{item.title}</strong><br />
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* <section id="approach" className="section aiPrincipleSection">
          <div className="wrap principleBox">
            <p className="eyebrow">The idea</p>
            <h2>Marketing sees demand early. Signalcraft makes that signal usable.</h2>
            <p>
              Customer behavior can become a stronger input to sales prioritization, demand planning, inventory strategy,
              marketing investment, and financial forecasting when the underlying data and decision logic are built to be trusted.
            </p>
          </div>
        </section> */}

        <section id="services" className="section altSection">
          <div className="wrap">
            <p className="eyebrow">What we do</p>
            <h2>Marketing often sees changes in customer demand before they appear elsewhere in the business. Signalcraft helps translate those signals into intelligence sales, operations, and finance can use.</h2>

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
              Sometimes the answer is SQL. Sometimes forecasting. Sometimes machine learning or an LLM.
              Complexity is useful only when it improves the decision and can be sustained by the organization.
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
            <p className="eyebrow">Start here</p>
            <h2>Your marketing data may already contain signals the rest of your business needs.</h2>
            <p>
              Start with a focused diagnostic to identify where customer and marketing data could improve decisions
              across sales, operations, and finance — and what has to be true for those signals to be trusted.
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
              <h2>Business thinking first. Technical depth when the problem requires it.</h2>
            </div>

            <div className="bodyCopy aboutCopy">
              <p>
                Signalcraft Analytics is led by Charlie May, whose career has spanned digital strategy, marketing analytics,
                data science, data engineering, and applied AI.
              </p>
              <p>
                That progression shapes how Signalcraft works: start with the business question, understand the customer and
                operational context, and then build the data and intelligence necessary to improve the decision.
              </p>
              <p>
                Charlie is completing an M.S. in Data Analytics at Georgia Tech and has built production work across forecasting,
                anomaly detection, causal measurement, pricing, operational modeling, machine learning, and data infrastructure.
              </p>
              <p>
                The goal is not more dashboards, more models, or more AI. It is better information moving between the people
                responsible for demand, revenue, operations, and financial performance.
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
