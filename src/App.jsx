import { useState } from "react";
import ContactModal from "./components/ContactModal.jsx";
import PrivacySecurity from "./components/PrivacySecurity.jsx";
import CaseStudyModal from "./components/CaseStudyModal.jsx";
import { caseStudies } from "./data/caseStudies.js";

const workProcess = [
  {
    title: "01 — Clarify the Current State",
    text: "Map the data sources, reports, workflows, metrics, and business questions already in motion so the real problem becomes visible.",
  },
  {
    title: "02 — Design the System",
    text: "Define what needs to be trusted, connected, automated, or rebuilt so the team has a practical path forward.",
  },
  {
    title: "03 — Build the Signal",
    text: "Create the reporting logic, data foundation, workflow, model, or AI-ready system needed to support better decisions.",
  },
];

const faqs = [
  {
    question: "Do we need to know exactly what we need before reaching out?",
    answer:
      "No. Many Signalcraft projects begin with a messy business problem, not a finished technical request. You may know that reporting is unreliable, manual work is slowing the team down, or leadership wants better answers from the data. Part of the work is helping define what should be built and why.",
  },
    {
    question: "Can you help if we already started?",
    answer:
      "Yes. Signalcraft can step into existing data work at different depths, from fixing reporting logic and dashboard issues to shaping deeper analytics, automation, modeling, or AI-ready infrastructure. The work starts by understanding what the system is supposed to help the business decide or change. From there, we focus on the pieces that create usable signal — not just more reports.",
    },
    {
    question: "Is this dashboard work, data science, automation, or AI?",
    answer:
      "It can involve all of those, but Signalcraft is not limited to one tool or deliverable. The work usually starts with a business question and then moves backward into the data, systems, and logic needed to answer it reliably. Sometimes the right answer is a dashboard. Sometimes it is a cleaner data model, an automated workflow, a forecasting process, or an AI-ready foundation.",
  },
  {
    question: "What kinds of companies are a good fit?",
    answer:
      "Signalcraft is built for growing companies whose data has outgrown spreadsheets, disconnected reports, and manual processes. This is often a good fit for marketing-led, sales-led, operations-heavy, or founder-led businesses that need clearer measurement and better decision support but do not have a full internal data team.",
  },
  {
    question: "What problems do you help solve?",
    answer:
      "Common problems include unreliable reporting, disconnected marketing and sales data, manual spreadsheet workflows, unclear campaign performance, messy CRM data, inconsistent metrics, lack of source-of-truth reporting, and uncertainty around how to prepare for practical AI use.",
  },
  {
    question: "Do you replace our existing tools?",
    answer:
      "Usually, no. Signalcraft often works with the tools a company already uses, such as HubSpot, GA4, ad platforms, spreadsheets, databases, Power BI, Looker, or cloud data systems. The goal is to make the existing data environment more reliable, connected, and useful before adding unnecessary complexity.",
  },
  {
    question: "What does AI-ready mean?",
    answer:
      "AI-ready means your data is clean enough, connected enough, and well-defined enough to support useful automation, scoring, forecasting, segmentation, or decision support. AI is only as good as the business logic and data foundation underneath it.",
  },
  {
    question: "Can you work with our agency or internal team?",
    answer:
      "Yes. Signalcraft can support internal teams, agency partners, or leadership directly. The work often sits between strategy, analytics, operations, and technical execution, helping translate business needs into systems that can actually be built and used.",
  },
  {
    question: "What is the best first step?",
    answer:
      "The best first step is usually a focused audit or discovery project. This creates a map of the current data environment, identifies the biggest gaps, and produces a prioritized roadmap for what to fix, automate, or build next.",
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
                  How we work
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
              <h2>AI does not replace judgment. It raises the cost of not having it.</h2>
            </div>
            <div className="bodyCopy">
              <p>
                When the data is messy and the questions are unclear, AI does not create clarity. It creates more output. Signalcraft helps teams build the foundation underneath better decisions.
              </p>
              <p>
              When the data is messy, the questions are unclear, or the business context is missing, AI does not create clarity. It creates more output. Signalcraft helps teams build the data foundation, logic, and decision systems needed to make AI useful — not just louder.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="section altSection">
          <div className="wrap">
            <p className="eyebrow">How we work</p>
            <h2>Start with what needs to change. Build only what creates signal.</h2>

            <div className="bodyCopy serviceIntro">
              <p>
                Most teams do not need another disconnected dashboard or another vague AI idea. They need a clearer
                way to understand what is happening in the business, where the data is breaking down, and what should
                be built next.
              </p>
              <p>
                Signalcraft starts by mapping the current state: the tools, reports, workflows, spreadsheets, metrics,
                and business questions already in motion. From there, we identify what is trustworthy, what is fragile,
                what is missing, and what is blocking better decisions.
              </p>
              <p>
                Then we turn that clarity into practical systems: operationalizable reporting logic, a shared data foundation,
                automated workflows, AI-ready datasets, or models that help teams score, forecast, segment, or prioritize.
              </p>
            </div>

            <div className="cardGrid processGrid">
              {workProcess.map((step) => (
                <article className="serviceCard processCard" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section">
          <div className="wrap">
            <p className="eyebrow">Selected work</p>
            <h2>Real work that turns scattered data into operational clarity.</h2>

            <p className="sectionIntro">
              Selected examples are generalized from prior work. Examples are anonymized to protect client and proprietary information.
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

        <section id="faq" className="section faqSection">
          <div className="wrap faqWrap">
            <p className="eyebrow">FAQ</p>
            <h2>Questions before the work starts.</h2>
            <p className="faqIntro">
              You do not need to have the technical answer before reaching out. Most projects begin with a business
              problem that needs to be clarified.
            </p>

            <div className="faqList">
              {faqs.map((faq) => (
                <details className="faqItem" key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
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
              <h2>Built by someone who knows where signal gets lost.</h2>
            </div>

            <div className="bodyCopy aboutCopy">
              <p>
                Signalcraft Analytics is led by Charlie May, a data scientist and machine learning engineer based in Indianapolis. His work sits where analytics engineering, machine learning, data platforms, and business decision-making meet.
              </p>
              <p>              
                Charlie came to this work through a 12-year career in digital commerce — building systems, leading teams, and being accountable for business results when the data foundation was not built for what the business needed next.
              </p>
              <p>
                That experience shaped a practical point of view: start with what needs to change, expose the assumptions underneath the data, and build only what creates clearer decisions.
              </p>
              <p>
                He is completing an M.S. in Data Analytics at Georgia Tech and has built production work across forecasting, anomaly detection, causal measurement, pricing, operational modeling, and data infrastructure.
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
