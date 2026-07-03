function DecisionTreeVisual({ color = "#58e1cf" }) {
  return (
    <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="220" fill="rgba(2,6,7,0.36)" />
      {[40, 80, 120, 160, 200].map((y) => (
        <line key={y} x1="0" y1={y} x2="680" y2={y} stroke="rgba(238,248,247,0.06)" strokeWidth="1" />
      ))}

      <path d="M340,52 C340,70 190,70 190,88" fill="none" stroke="rgba(238,248,247,0.16)" strokeWidth="1.5" />
      <path d="M340,52 C340,70 490,70 490,88" fill="none" stroke="rgba(238,248,247,0.16)" strokeWidth="1.5" />
      <path d="M190,112 C190,130 110,130 110,148" fill="none" stroke="rgba(238,248,247,0.16)" strokeWidth="1.5" />
      <path d="M190,112 C190,130 270,130 270,148" fill="none" stroke="rgba(238,248,247,0.16)" strokeWidth="1.5" />
      <path d="M110,168 C110,178 70,178 70,188" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.75" />
      <path d="M110,168 C110,178 150,178 150,188" fill="none" stroke="rgba(238,248,247,0.16)" strokeWidth="1.5" />
      <path d="M490,112 L490,148" fill="none" stroke="rgba(238,248,247,0.16)" strokeWidth="1.5" />

      <rect x="240" y="20" width="200" height="32" rx="6" fill="rgba(255,255,255,0.055)" stroke="rgba(238,248,247,0.14)" />
      <text x="340" y="33" fill="rgba(238,248,247,0.78)" fontSize="9" fontFamily="monospace" textAnchor="middle">X-Ray Scanner</text>
      <text x="340" y="46" fill="rgba(238,248,247,0.44)" fontSize="9" fontFamily="monospace" textAnchor="middle">confidence threshold</text>

      <rect x="108" y="88" width="164" height="24" rx="6" fill="rgba(255,255,255,0.055)" stroke="rgba(238,248,247,0.14)" />
      <text x="190" y="105" fill="rgba(238,248,247,0.72)" fontSize="9" fontFamily="monospace" textAnchor="middle">Decision Tree → Count Est.</text>

      <rect x="408" y="88" width="164" height="24" rx="6" fill="rgba(255,255,255,0.055)" stroke="rgba(238,248,247,0.14)" />
      <text x="490" y="105" fill="rgba(238,248,247,0.72)" fontSize="9" fontFamily="monospace" textAnchor="middle">Scanner Sufficient</text>

      <rect x="46" y="148" width="128" height="20" rx="6" fill="rgba(255,255,255,0.055)" stroke="rgba(238,248,247,0.14)" />
      <text x="110" y="162" fill="rgba(238,248,247,0.72)" fontSize="9" fontFamily="monospace" textAnchor="middle">Device Mix Anomalous?</text>

      <rect x="196" y="148" width="148" height="20" rx="6" fill="rgba(255,255,255,0.055)" stroke="rgba(238,248,247,0.14)" />
      <text x="270" y="162" fill="rgba(238,248,247,0.72)" fontSize="9" fontFamily="monospace" textAnchor="middle">Count Verified → WMS</text>

      <rect x="28" y="188" width="84" height="22" rx="6" fill={color} fillOpacity="0.13" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
      <text x="70" y="203" fill={color} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">FLAG BOX</text>

      <rect x="118" y="188" width="64" height="22" rx="6" fill="rgba(255,255,255,0.045)" stroke="rgba(238,248,247,0.10)" />
      <text x="150" y="203" fill="rgba(238,248,247,0.46)" fontSize="9" fontFamily="monospace" textAnchor="middle">CLEAR</text>

      <rect x="422" y="148" width="136" height="20" rx="6" fill="rgba(255,255,255,0.045)" stroke="rgba(238,248,247,0.10)" />
      <text x="490" y="162" fill="rgba(238,248,247,0.46)" fontSize="9" fontFamily="monospace" textAnchor="middle">→ WMS Direct</text>
    </svg>
  );
}

function CaseVisual({ study }) {
  if (study.image?.type === "svg") {
    return <DecisionTreeVisual color={study.color} />;
  }

  if (study.image?.type === "img") {
    return (
      <img
        src={study.image.src}
        alt={study.image.caption || study.title}
        loading="lazy"
      />
    );
  }

  return null;
}

export default function CaseStudyModal({ study, onClose, onContact }) {
  if (!study) return null;

  return (
    <div className="caseOverlay" role="presentation" onMouseDown={onClose}>
      <article
        className="caseModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="caseClose" type="button" onClick={onClose} aria-label="Close case study">
          ×
        </button>

        <section className="caseHero">
          <div className="caseTitleBlock">
            <div className="caseKicker">{study.kicker}</div>
            <h2 id="case-title">{study.title}</h2>
            <p className="caseSummary">{study.summary}</p>

            <div className="caseMetaStrip">
              <div className="caseMetaPill">
                <span>Decision</span>
                <strong>{study.decision}</strong>
              </div>
              <div className="caseMetaPill">
                <span>Output</span>
                <strong>{study.output}</strong>
              </div>
              <div className="caseMetaPill">
                <span>Role</span>
                <strong>{study.role}</strong>
              </div>
            </div>

            <div className="caseTldrVisual">
              <div className="caseVisual">
                <CaseVisual study={study} />
              </div>
              {study.image?.caption ? (
                <p className="caseCaption">{study.image.caption}</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="caseBody">
          <aside className="caseSideRail">
            <div className="caseRailPanel">
              <h4>Project type</h4>
              <p>{study.projectType}</p>
            </div>

            <div className="caseRailPanel">
              <h4>Signals used</h4>
              <div className="caseTagList">
                {study.signals.map((signal) => (
                  <span className="caseTag" key={signal}>{signal}</span>
                ))}
              </div>
            </div>

            <div className="caseRailPanel">
              <h4>Methods</h4>
              <div className="caseTagList">
                {study.methods.map((method) => (
                  <span className="caseTag" key={method}>{method}</span>
                ))}
              </div>
            </div>
          </aside>

          <div className="caseContentStack">
            <div className="caseSectionGrid">
              <section className="caseContentPanel">
                <h3>The decision problem</h3>
                <p>{study.problem}</p>
              </section>

              <section className="caseContentPanel">
                <h3>The analytical challenge</h3>
                <p>{study.challenge}</p>
              </section>
            </div>

            <section className="caseContentPanel">
              <h3>Approach</h3>
              <ul>
                {study.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="caseMetricRow">
                {study.metrics.map((metric) => (
                  <div className="caseMetric" key={metric.value + metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="caseContentPanel">
              <h3>What this work shows</h3>
              <p>{study.whatItShows}</p>
            </section>

            <section className="caseImpactPanel">
              <h3>Impact</h3>
              <p>{study.impact}</p>
            </section>
          </div>
        </section>

        <section className="caseFooter">
          <p>
            Selected work samples are generalized from academic and prior professional work.
            Client-identifying details and proprietary data have been removed.
          </p>
          <button className="primaryBtn" type="button" onClick={onContact}>
            Discuss a similar problem
          </button>
        </section>
      </article>
    </div>
  );
}
