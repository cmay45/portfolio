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

function PropensityVisual() {
  const factors = [
    { label: "Direct sales contact request", note: "strongest indicator of likely purchase", strength: 100 },
    { label: "Recent high-intent activity", note: "active research and product interest", strength: 82 },
    { label: "Website engagement", note: "more pages and deeper engagement", strength: 69 },
    { label: "Email engagement", note: "opens, clicks, and consistent activity", strength: 60 },
    { label: "Ecommerce behavior", note: "product views and cart activity", strength: 46 },
    { label: "Recency of activity", note: "more recent activity increased likelihood", strength: 43 },
    { label: "Velocity of engagement", note: "increasing activity over time", strength: 40 },
    { label: "Dealer / sales assignment context", note: "account and territory context", strength: 31 },
  ];

  return (
    <div className="caseCustomVisual propensityVisual propensityStoryVisual">
      <section className="visualPanel priorityPanel">
        <p className="visualEyebrow">Which score would you want your sales team working from?</p>
        <h4>Actual purchase rate among the highest-ranked 20% of leads</h4>

        <div className="priorityCompare">
          <article className="priorityCard legacyPriorityCard">
            <span className="priorityLabel">Legacy lead score</span>
            <strong className="priorityNumber">~52%</strong>
            <span className="priorityPurchased">actually purchased</span>
            <small>Among the highest-ranked 20% of leads</small>
            <div className="priorityVerdict legacyVerdict">Nearly 1 in 2 prioritized leads did not purchase.</div>
          </article>

          <article className="priorityCard propensityPriorityCard">
            <span className="priorityLabel">Behavioral propensity model</span>
            <strong className="priorityNumber">~88%</strong>
            <span className="priorityPurchased">actually purchased</span>
            <small>Among the highest-ranked 20% of leads</small>
            <div className="priorityVerdict propensityVerdict">Nearly 7 in 8 prioritized leads became buyers.</div>
          </article>
        </div>

        <div className="salesQuestion">
          <strong>Do you want your sales team spending nearly half of its highest-priority effort on people who don’t buy?</strong>
          <span>Behavioral propensity produced a materially cleaner priority list — more buyers, fewer non-buyers, and better use of sales time.</span>
        </div>
      </section>

      <section className="visualPanel factorPanel">
        <p className="visualEyebrow">What behavior actually signaled purchase intent?</p>
        <h4>Real customer behavior carried the strongest signal.</h4>
        <div className="factorBars">
          {factors.map((factor) => (
            <div className="factorBarRow" key={factor.label}>
              <div className="factorBarCopy">
                <strong>{factor.label}</strong>
                <small>{factor.note}</small>
              </div>
              <div className="factorBarTrack" aria-hidden="true">
                <span style={{ width: `${factor.strength}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="technicalDetail">
          <span>For the technical buyer</span>
          <div className="technicalMetrics">
            <strong>Legacy AUC: 0.791</strong>
            <strong>Propensity AUC: 0.979</strong>
            <strong>Combined AUC: 0.978</strong>
          </div>
          <small>Adding the legacy lead score to the propensity model did not meaningfully improve performance.</small>
        </div>
      </section>
    </div>
  );
}

function MediaLineageGraph() {
  const nodes = [
    { x: 18, y: 30, w: 118, h: 32, label: "Campaign plans", sub: "source" },
    { x: 18, y: 78, w: 118, h: 32, label: "Manual files", sub: "source" },
    { x: 18, y: 126, w: 118, h: 32, label: "External APIs", sub: "source" },
    { x: 176, y: 78, w: 120, h: 36, label: "Cloud Run", sub: "ingestion + validation", accent: true },
    { x: 338, y: 48, w: 128, h: 36, label: "BigQuery raw", sub: "landing / staging" },
    { x: 338, y: 112, w: 128, h: 36, label: "BigQuery staging", sub: "validated inputs" },
    { x: 510, y: 40, w: 130, h: 36, label: "Dataform models", sub: "transform + enrich", accent: true },
    { x: 510, y: 108, w: 130, h: 36, label: "Governed metrics", sub: "shared logic", accent: true },
    { x: 684, y: 74, w: 128, h: 42, label: "Curated mart", sub: "trusted source", strong: true },
    { x: 854, y: 34, w: 126, h: 34, label: "Dashboards", sub: "reporting" },
    { x: 854, y: 90, w: 126, h: 34, label: "Analysis", sub: "decision support" },
    { x: 854, y: 146, w: 126, h: 34, label: "Claude + MCP", sub: "governed AI access", accent: true },
  ];

  const edges = [
    [136, 46, 176, 90], [136, 94, 176, 94], [136, 142, 176, 98],
    [296, 92, 338, 66], [296, 98, 338, 130],
    [466, 66, 510, 58], [466, 130, 510, 126],
    [640, 58, 684, 86], [640, 126, 684, 104],
    [812, 88, 854, 51], [812, 94, 854, 107], [812, 101, 854, 163],
  ];

  return (
    <div className="mediaLineage" aria-label="Media analytics platform lineage">
      <div className="lineageHeader">
        <div>
          <span className="visualEyebrow">Governed analytics lineage</span>
          <h4>One transformation layer. Multiple trusted consumers.</h4>
        </div>
        <span className="lineageHint">dbt / Dataform-style view</span>
      </div>
      <svg viewBox="0 0 1000 208" role="img" aria-label="Sources flow through Cloud Run, BigQuery and Dataform into a curated mart used by dashboards, analysis and Claude through MCP">
        <defs>
          <marker id="mediaArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(88,225,207,0.62)" />
          </marker>
        </defs>

        <text x="18" y="18" className="lineageGroupLabel">SOURCES</text>
        <text x="176" y="18" className="lineageGroupLabel">INGEST</text>
        <text x="338" y="18" className="lineageGroupLabel">STAGING</text>
        <text x="510" y="18" className="lineageGroupLabel">MODELS</text>
        <text x="684" y="18" className="lineageGroupLabel">MART</text>
        <text x="854" y="18" className="lineageGroupLabel">CONSUMPTION</text>

        {edges.map((edge, i) => {
          const [x1, y1, x2, y2] = edge;
          const mid = (x1 + x2) / 2;
          return (
            <path
              key={i}
              d={`M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`}
              className="lineageEdge"
              markerEnd="url(#mediaArrow)"
            />
          );
        })}

        {nodes.map((node) => (
          <g key={`${node.label}-${node.x}`}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx="8"
              className={`lineageNode ${node.accent ? "lineageNodeAccent" : ""} ${node.strong ? "lineageNodeStrong" : ""}`}
            />
            <circle cx={node.x + 11} cy={node.y + 11} r="3" className={node.accent || node.strong ? "lineageDotAccent" : "lineageDot"} />
            <text x={node.x + 20} y={node.y + 14} className="lineageNodeTitle">{node.label}</text>
            <text x={node.x + 20} y={node.y + 26} className="lineageNodeSub">{node.sub}</text>
          </g>
        ))}
      </svg>
      <div className="lineageTakeaway">
        <strong>AI did not get a side door.</strong>
        <span>Claude queried the same governed mart and business logic used by reporting and analysis.</span>
      </div>
    </div>
  );
}

function MediaPlatformVisual() {
  const stages = [
    { title: "Sources", items: ["Plans + files", "Campaign status", "External APIs"] },
    { title: "Ingest", items: ["Cloud Run", "Validation", "Raw landing"] },
    { title: "Model", items: ["Dataform", "Transforms", "Governed logic"] },
    { title: "Serve", items: ["BigQuery mart", "Standard measures", "Authorized access"] },
    { title: "Consume", items: ["Dashboards", "Analysis", "Claude + MCP"] },
  ];

  return (
    <div className="caseCustomVisual mediaPlatformVisual">
      <MediaLineageGraph />

      <div className="platformFlow compactPlatformFlow">
        {stages.map((stage, index) => (
          <div className="platformStageWrap" key={stage.title}>
            <section className="platformStage compactPlatformStage">
              <div className="platformStageHead">
                <span className="platformStep">0{index + 1}</span>
                <h4>{stage.title}</h4>
              </div>
              <ul>
                {stage.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            {index < stages.length - 1 ? <span className="platformArrow" aria-hidden="true">→</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseVisual({ study }) {
  if (study.image?.type === "svg") {
    return <DecisionTreeVisual color={study.color} />;
  }

  if (study.image?.type === "propensity") {
    return <PropensityVisual />;
  }

  if (study.image?.type === "media-platform") {
    return <MediaPlatformVisual />;
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

            <div className="caseSignalMethodGrid">
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
            </div>
          </div>
        </section>

        <section className="caseFooter">
          <button className="primaryBtn" type="button" onClick={onContact}>
            Discuss a similar problem
          </button>
        </section>
      </article>
    </div>
  );
}
