import { useState, useEffect, useCallback } from "react";

const projects = [
  {
    id: "verizon-anomaly",
    tag: "Anomaly Detection · Online ML · Operations · Azure ML",
    title: "Wireless Carrier — Production Line Device Intake Model",
    subtitle: "Decision Tree · Online Inference · 35K Devices/Day · Azure ML · Power BI",
    summary: "Built an online anomaly detection model for a major wireless carrier's device grading and resale production line — the operation that receives, cleans, grades, and resells used phones. X-ray scanners at intake couldn't reliably count devices per box or detect anomalous device type mixes, creating downstream capacity shocks across every workstation. A decision tree model provided real-time estimates when scanner signal was insufficient, stabilizing workflow throughput at ~35,000 devices per day.",
    bullets: [
      "Decision tree deployed as online model: chosen for interpretability — line supervisors and workstation managers needed to understand and contest predictions, making a black-box model operationally unacceptable at this scale",
      "Two detection tasks in one model: (1) device count estimation when X-ray scanner confidence was below threshold, and (2) anomalous device type mix detection — flagging boxes where the expected blend of phone models didn't match intake patterns",
      "Downstream impact was the core business case: each workstation (intake, cleaning, grading) has different throughput capacity per device type; an anomalous mix or miscounted box arriving undetected causes cascading bottlenecks across the entire line",
      "Deployed via Azure ML — production environment with model versioning, monitoring, and online inference integration into the warehouse management system",
      "Model outputs extended to Power BI dashboards for business-level consumption — giving operations leadership daily visibility into intake accuracy, device mix anomalies, and workstation capacity forecasts without requiring direct model access",
    ],
    stack: ["Python", "Decision Tree", "Azure ML", "Power BI", "Online Inference", "scikit-learn"],
    impact: "Stabilized intake throughput for a ~35,000 device/day refurbishment operation at a major wireless carrier. Replaced unreliable X-ray scanner fallback logic with a defensible, auditable ML model that operations staff could trust and verify. Extended to Power BI for executive-level operational dashboards.",
    color: "#e53935",
  },
  {
    id: "amazon-did",
    tag: "Causal Inference · Content Intelligence · End-to-End Platform",
    title: "Amazon Content Optimization Platform",
    subtitle: "Compliance Check → Optimize → DiD Measurement → Catalog Defense · 12 Clients",
    summary: "Built a full-loop content intelligence platform at Momentum Commerce spanning 12 clients. Triggered by Amazon changing their compliance rules and deploying an AI optimization bot that was actively destroying client rankings with poor keyword choices. The system protects listings before optimization, proves lift after, and monitors against regression in production — four stages in one connected workflow.",
    bullets: [
      "Stage 1 — Compliance checker: validated listing content against Amazon guidelines before publishing, guarding against Amazon's own AI bot overwriting optimized copy with low-quality keyword stuffing that suppressed organic rankings",
      "Stage 2 — Control selection: regression-based grid search (up to 1,500 OLS fits per experiment) finds parallel control ASINs. UNITS ~ VIEWS + SPEND + EXP_GROUP + 0 — no intercept enforces the parallel trends assumption required for valid DiD",
      "Stage 3 — DiD measurement: metric ~ group + time + group_time regression; group_time coefficient is the causal lift estimate with p-value. 16 metrics per experiment including CVR, organic voice, organic appearances, and profit via fixed + variable cost margin model",
      "Stage 4 — CatalogMonitor: daily production monitor comparing listing content against source-of-truth Google Sheet; detects parent-child ASIN reassignments and variant structure changes; fires Slack alert + email with Excel diff on unauthorized changes",
    ],
    stack: ["Python", "statsmodels", "OLS / DiD", "Grid Search", "Snowflake", "Slack API", "Google Sheets API", "DS_Utils"],
    impact: "End-to-end content protection and measurement across 12 clients. Converted listing optimization from uncontrolled changes to a governed, causally measured, continuously defended workflow.",
    color: "#b2ff59",
  },
  {
    id: "repurchase-propensity",
    tag: "Machine Learning · Survival Analysis · Feature Engineering",
    title: "Repeat Buyer EDA + Repurchase Propensity Model",
    subtitle: "AUC 0.978 · 5,333 Buyers · Invalidated HubSpot ML · XGBoost Design",
    summary: "Led V1 EDA on 13 years of transaction data for a major RV manufacturer (5,333 repeat buyers, 10,649 purchases, 2012–2025). Discovered HubSpot's own ML scorer was anti-predictive at 0.401 AUC — below coin-flip. Built a propensity model scoring 0.978 AUC and designed the full Phase 2 framework including survival analysis for repurchase window probabilities.",
    bullets: [
      "Key EDA findings: median 1.6yr repurchase cycle, 96% model switch rate, 83% price upgrade rate, super-loyalist cohort repurchasing every 3–6 months — none visible in existing HubSpot scoring",
      "Head-to-head AUC benchmarks: our model (0.978) vs Lead Score v2 (0.791, explains 27%), HS Predictive Lead Score (0.701, 6%), HS Predictive Score v2 (0.401 — anti-predictive, Pearson -0.082). HubSpot trained on engagement signals anti-correlated with purchase",
      "Whitelist-based feature architecture: explicit _numeric_shared and _boolean_shared column lists prevent silent feature leakage — new fields sit in the dataframe but don't enter the model unless manually promoted",
      "Data stitching notebook: buyer/non-buyer journey merge, geo enrichment using the us library, dual territory dict lookup from official sales territory PDFs; survival analysis designed for 30/60/90/180-day repurchase window probabilities by product line",
    ],
    stack: ["Python", "pandas", "XGBoost", "LightGBM", "scikit-learn", "Survival Analysis", "Amperity", "HubSpot"],
    impact: "AUC 0.978 vs next-best 0.791. Invalidated HubSpot's ML scorer (worse than random). Quantified $58M+ accelerated revenue opportunity from a 10% reduction in repurchase cycle.",
    color: "#ff6d00",
  },
  {
    id: "anomaly-detection",
    tag: "Anomaly Detection · Production Systems · MLOps",
    title: "Multi-Signal Amazon Anomaly Detection Platform",
    subtitle: "Prophet · Multi-Rule Consensus · mc.alerting Package · Multi-Client",
    summary: "Built a production anomaly detection platform at Momentum Commerce monitoring Amazon performance across revenue, ad spend, glance views, buy box ownership, and inventory simultaneously for multiple clients. Prototyped in notebooks using Prophet time series modeling, then productized into a modular Python package with composable monitor and metric classes.",
    bullets: [
      "Prophet-based expected value modeling per ASIN per metric. Multi-rule consensus threshold (Triggered >= 2) before alerting — reduces false positives from single-signal noise on volatile ecommerce time series",
      "SalesShiftMonitor composes five metric types in one pass: SalesMetric, SpendMetric, GlancesMetric, BuyBoxMetric (Keepa ownership data), InventoryMetric — with trend description context appended to each alert explaining the likely cause",
      "BuyBoxMonitor detects ownership loss events via Keepa historic_buy_box_ownership: surfaces new seller identity, lost date, price delta vs last-held, and L7D revenue at risk — giving account teams an immediate action item",
      "TentpoleAlerting monitors hourly 1P + 3P order revenue during major events (Prime Day, Black Friday) via timezone-converted hour spine, pivoted Google Sheets output, and email delivery on a separate cadence from daily monitoring",
    ],
    stack: ["Python", "Prophet", "Snowflake", "pandas", "mc.alerting (internal)", "Slack API", "Google Sheets API", "Keepa"],
    impact: "Production multi-client alerting system catching revenue anomalies, buy box losses, and catalog hijacking before clients notice. Deployed across Momentum Commerce brand portfolio.",
    color: "#ff6e40",
  },
  {
    id: "construction-cost",
    tag: "Machine Learning · Feature Engineering · MLOps",
    title: "Class 5 Construction Cost Estimation",
    subtitle: "Georgia Tech Practicum · Random Forest · 150K Records · 11 Experiments",
    summary: "Inherited a drifted ML pipeline from a prior semester team whose model had lost ~50% of its R² on new data. Diagnosed root cause — over-reliance on unstable size-based predictors — and rebuilt feature architecture from scratch. Final Random Forest model explains >90% of variance and places 95% of predictions within the ±50% accuracy band required for Class 5 (0–2% project definition) estimates.",
    bullets: [
      "Root cause analysis: prior model's square footage predictor was sparsely and inconsistently reported — replaced with derived economic indicators, Area Cost Factors (ACF), and inflation-normalized targets using FRED PPI construction index (PCU236400236400)",
      "11 controlled experiments (exp_prior through exp10) isolating each feature class: economic indicators (+62% R²), categorical descriptors (+71%), TF-IDF text embeddings (+79%), inflation normalization, K-Means scope clusters — which drove the single largest jump to +158% R²",
      "Identified and excluded data-leaking features: ratio-based transforms involving the target produced artificially inflated R² — exp7 hit 98% threshold compliance before being ruled out as leakage, which is the kind of check most practitioners skip",
      "Modular, reproducible pipeline with version-controlled feature engineering and a prototype user-input inference path — translating high-level project descriptors into model-ready features for the sponsor's web application",
    ],
    stack: ["Python", "scikit-learn", "Random Forest", "XGBoost", "K-Means", "TF-IDF", "FRED API", "pandas"],
    impact: "+176% R² vs. inherited drifted baseline. 95% of predictions within Class 5 ±50% threshold. Delivered production-ready pipeline and user-facing inference prototype to the sponsor.",
    color: "#ff4081",
  },
  {
    id: "price-optimization",
    tag: "Optimization · Econometrics · Demand Modeling",
    title: "Amazon Price Optimization Engine",
    subtitle: "Constant-Elasticity Demand Model · Profit Maximization · scipy.optimize",
    summary: "Built a per-ASIN price optimization engine that fits a constant-elasticity demand model (log-log OLS), computes point price elasticity, and uses scipy.optimize to find the profit-maximizing price given fixed and variable cost structure. Deployed for Spreetail and CDD with buy box barrier logic — pricing above the competitor threshold drops units to zero.",
    bullets: [
      "Log-log demand model per parent ASIN: log(orders + modifier) = a + b·log(price) with time-decay weighting 0.995^days_ago — more recent price observations carry higher weight; modifier derived from IQR handles zero-unit days without log(0)",
      "Buy box filter: only trains on observations where buy_box_percentage > 0.5 — prevents the model from learning demand at prices where the buy box is already lost, which would underestimate true elasticity",
      "Profit function: (units(price)) x ((1 - variable_cost) x price - fixed_cost) — scipy.optimize.fmin finds the optimum; separate train/test and full-period coefficients computed in parallel for sensitivity comparison",
      "Barrier mode: models the competitor price ceiling — generates revenue curves that explicitly zero out above the buy box threshold, and computes alternative price scenarios (5–50% increments) with TACOS impact",
    ],
    stack: ["Python", "scikit-learn", "scipy.optimize", "numpy", "Snowflake", "pandas", "Plotly"],
    impact: "Per-ASIN profit-maximizing price recommendations with buy box constraints for Spreetail and CDD. Converted pricing from rule-of-thumb adjustments to elasticity-driven optimization.",
    color: "#64ffda",
  },
  {
    id: "arima-forecasting",
    tag: "Machine Learning · Time Series · MLOps",
    title: "RV Market Forecasting Pipeline",
    subtitle: "ARIMA · Per-State PDQ Grid Search · MAPE Holdout · Deployed Streamlit",
    summary: "Built a per-state ARIMA forecasting pipeline on 8 years of RV sales data with automated PDQ parameter tuning via MAPE-optimized grid search. Productized from Jupyter notebook into a deployed multi-tab Streamlit application on Cloud Run with client-facing scenario modeling.",
    bullets: [
      "Grid search across p(0-3), d(0-2), q(0-3) — 48 model candidates per state — selecting best by MAPE on 5-period holdout. 29-state coverage with separate manufacturer vs. total market dataframes, quarterly aggregation for media planning cadence",
      "Choropleth heatmaps of market potential gap (Total Market minus manufacturer) by state, investment tier scoring, and share capture scenarios for media planning",
      "Deployed to Cloud Run with Streamlit, IAP authentication, and HTTPS load balancing — accessible to clients without code access for live scenario modeling",
      "Adapted across multiple business units of a specialty vehicle OEM — separate competitive market definitions and segment-specific forecasting parameters per unit",
    ],
    stack: ["Python", "statsmodels", "ARIMA", "Streamlit", "Cloud Run", "GCP", "Plotly"],
    impact: "Converted a one-off notebook into a repeatable client-facing decision tool. Clients model investment scenarios in real time without analyst intervention.",
    color: "#69ff47",
  },
  {
    id: "paid-media-mart",
    tag: "Analytics Engineering · Data Platform",
    title: "Paid Media Data Mart",
    subtitle: "BigQuery · Dataform · 6 Ad Connectors · Three-Way Validated · Zero Delta",
    summary: "Designed and built a production data mart from scratch, unifying six ad platform connectors into a single consumption layer. Three-way validated across Google Ads, Funnel, and BigQuery with zero metric delta across 20/20 campaigns.",
    bullets: [
      "Architected staging, enriched, and consumption layer model in Dataform (SQLX) with dependency graph and incremental logic across all six connectors simultaneously",
      "Resolved complex data quality issues: network_type duplication, correlated subquery fan-out via ROW_NUMBER CTE, duplicate client rows — each requiring separate diagnostic and fix pattern",
      "Built DIM_TARGET_MAP dimension resolver and Google Sheets-fed Media Plan via Sheets API in Cloud Run microservice; shadow mode pipeline validated all six connectors to zero-diff before production promotion",
      "Dataform prod release config on-demand with manual trigger during shadow mode — controlled promotion pattern preventing untested changes from reaching client dashboards",
    ],
    stack: ["BigQuery", "Dataform", "Cloud Run", "GCP", "Python", "SQL"],
    impact: "Zero metric delta across all validation checks. Powers live HVT dashboards for a portfolio of automotive and recreational vehicle OEM clients.",
    color: "#00e5ff",
  },
  {
    id: "hanes-brand-leakage",
    tag: "EDA · Brand Intelligence · Causal Analysis",
    title: "Hanes Brand Leakage & Buy Box Analysis",
    subtitle: "Major Apparel Brand · 3P Seller Arbitrage · Revenue Erosion Quantification",
    summary: "Conducted deep EDA for a major clothing manufacturer to diagnose and quantify revenue erosion from third-party seller buy box capture. Combined Keepa historic buy box ownership data with retail performance data to estimate how much 1P revenue was displaced by 3P arbitrage — including a specific promo-driven arbitrage scenario.",
    bullets: [
      "Buy box win rate weighted by glance views across product dimension segments (category, silhouette, gender, price tier) — revealing which product categories had the highest 3P exposure by revenue impact",
      "Estimated revenue erosion: modeled expected revenue = actual revenue / buy box win rate, providing a counterfactual for revenue captured at 100% buy box ownership",
      "Reseller YoY analysis: identified top 3P sellers by estimated revenue, tracked monthly capture trends to distinguish opportunistic arbitrage from structured gray market activity",
      "Investigated a specific promotional arbitrage hypothesis: built best-reseller-offer comparison to test whether 3P sellers systematically undercut during Hanes promotional windows",
    ],
    stack: ["Python", "pandas", "Keepa", "Snowflake", "OLS regression", "seaborn", "Plotly"],
    impact: "Quantified 3P revenue displacement for a major national apparel brand. Provided the analytical foundation for a buy box defense strategy and pricing controls.",
    color: "#ea80fc",
  },
  {
    id: "lead-routing",
    tag: "Automation · Anomaly Detection · Data Engineering",
    title: "ALIGN Lead Routing Failure Analysis",
    subtitle: "SQL Classification · Make.com · HubSpot · 11K Records/Week",
    summary: "Built a comprehensive SQL classification system for a dealer network lead routing program processing ~11,000 records weekly. Discovered a critical 0.2% successful routing rate — a near-total failure invisible in all existing reporting.",
    bullets: [
      "Five-case classification logic: routing violations, organic reconversion, unenrollment/override, enrollment, currently held — all resolved in a single SQL pass with no post-processing",
      "Built align_status_snapshot table with dealer attribution fields for longitudinal tracking of routing health over time",
      "Implemented Make.com three-scenario automation chain replacing manual HubSpot operations across all 11K weekly records",
      "Integrated MySQL tracking layer and HubSpot property writes for operational monitoring visible to account teams without SQL access",
    ],
    stack: ["SQL", "MySQL", "HubSpot", "Make.com", "Python", "BigQuery"],
    impact: "Surfaced systemic routing failure hidden from all existing dashboards. Became the analytical foundation for dealer program reform.",
    color: "#e040fb",
  },
  {
    id: "call-center",
    tag: "Operations Research · Simulation · Forecasting",
    title: "Call Center Staffing Optimization",
    subtitle: "SimPy · Queueing Theory · ARIMA Volume Forecast · Capacity Planning",
    summary: "Analyzed a 4-agent call center operating at 205% capacity with 34% service level. Built discrete event simulation and ARIMA volume forecasting to produce data-driven staffing recommendations with scenario modeling.",
    bullets: [
      "Identified 205% capacity utilization and 34% service level through queueing analysis of historical call logs across inbound, voicemail, and callback channels",
      "Built SimPy discrete event simulation modeling throughput, voicemail rates, and callback volume under different staffing scenarios",
      "Layered ARIMA time series forecast on inbound call volume as dynamic input to simulation — scenario outputs tied to projected volume, not static assumptions",
      "Routing consistency analysis identified systemic call misallocation amplifying the capacity problem beyond what headcount alone could solve",
    ],
    stack: ["Python", "SimPy", "statsmodels", "ARIMA", "pandas", "numpy"],
    impact: "Quantified staffing gap with statistical rigor. Provided scenario-based staffing bands tied to projected call volume for a data-driven hiring decision.",
    color: "#ffd740",
  },
  {
    id: "gcp-platform",
    tag: "MLOps · Data Platform · Infrastructure",
    title: "End-to-End GCP ML Platform",
    subtitle: "Cloud Run · IAP · Dataform · Streamlit · Multi-Client · Sole Engineer",
    summary: "Architected and sole-engineered a shared GCP data platform supporting a multi-client analytics portfolio. Everything from raw ingestion through transformation, modeling, and client-facing app delivery — built and operated by one person across five enterprise clients.",
    bullets: [
      "GCP project: paid-and-performance-data-mart (us-central1). Cloud Run services: media-config-app and media-config-app-staging with environment parity between staging and production",
      "Global HTTPS load balancing with Identity-Aware Proxy (IAP) for client authentication without per-user credential management or VPN requirements",
      "Dataform prod release config on-demand with manual trigger during shadow mode — controlled promotion to production; known silent failure mode on stg_google_ads view creation documented with manual BQ console workaround",
      "Parallel Azure/Fabric migration architecture for a major OEM client: Azure Data Factory, Synapse, Fabric, Power BI delivery pipeline coordinated across four stakeholders with a hard launch deadline",
    ],
    stack: ["GCP", "Cloud Run", "BigQuery", "Dataform", "Streamlit", "Azure", "Fabric", "Docker"],
    impact: "Sole engineer delivering production infrastructure replacing fragmented, manual reporting across five enterprise clients simultaneously.",
    color: "#40c4ff",
  },
];

const skills = {
  "Languages": ["Python", "SQL", "R", "PySpark"],
  "ML / Modeling": ["ARIMA / Time Series", "XGBoost / LightGBM", "Random Forest", "Survival Analysis", "Anomaly Detection", "Regression & Classification", "Clustering / Segmentation", "Causal Inference / DiD", "Media Mix Modeling"],
  "Data Engineering": ["BigQuery", "Dataform (dbt equivalent)", "Azure Data Factory", "Synapse / Fabric", "Cloud Run", "ETL Pipeline Design"],
  "MLOps / Infra": ["GCP (full stack)", "Azure ML", "DataRobot", "Azure", "Docker", "Streamlit", "IAP / Auth", "CI/CD via Cloud Build"],
  "Analytics": ["Looker / Data Studio", "Power BI", "Google Analytics 4", "Multi-touch Attribution", "HubSpot Analytics"],
};

export default function Portfolio() {
  const [active, setActive] = useState(null);
  const activeIndex = active !== null ? projects.findIndex(p => p.id === active) : -1;

  const openModal = (id) => setActive(id);
  const closeModal = () => setActive(null);
  const goNext = useCallback(() => {
    if (activeIndex < projects.length - 1) setActive(projects[activeIndex + 1].id);
  }, [activeIndex]);
  const goPrev = useCallback(() => {
    if (activeIndex > 0) setActive(projects[activeIndex - 1].id);
  }, [activeIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (active === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goNext, goPrev]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  const selected = active ? projects.find(p => p.id === active) : null;

  return (
    <div style={{ fontFamily: "\'IBM Plex Mono\',\'Courier New\',monospace", background: "#f5f5f0", color: "#1a1a2e", minHeight: "100vh", padding: 0, overflowX: "hidden" }}>
      <style>{`
        @import url(\'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&display=swap\');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f5f5f0; }
        ::-webkit-scrollbar-thumb { background: #c8c8d8; border-radius: 2px; }
        .proj-card {
          background: #ffffff;
          border: 1px solid #e0e0ec;
          border-radius: 6px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.18s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .proj-card::before {
          content: \'\';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.18s;
        }
        .proj-card:hover::before { opacity: 1; }
        .proj-card:hover {
          border-color: #c8c8e0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.09);
          transform: translateY(-2px);
        }
        .tag-pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.05em;
          background: #eeeef8;
          border: 1px solid #d8d8ec;
          color: #5858a0;
          font-family: \'IBM Plex Mono\', monospace;
        }
        .stack-tag {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 11px;
          background: #f2f2f8;
          border: 1px solid #e0e0f0;
          color: #5050a0;
          font-family: \'IBM Plex Mono\', monospace;
          margin: 2px 2px 2px 0;
        }
        .bullet-line {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 11px;
          font-size: 13px;
          line-height: 1.7;
          color: #2a2a4a;
        }
        .bullet-line::before {
          content: \'→\';
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 1px;
          font-weight: 600;
        }
        .impact-box {
          background: #f8f8fc;
          border-left: 3px solid var(--accent);
          padding: 11px 16px;
          border-radius: 0 4px 4px 0;
          font-size: 12.5px;
          color: #2a2a4a;
          margin-top: 18px;
          font-style: italic;
        }
        .skill-item {
          display: inline-block;
          padding: 4px 10px;
          margin: 3px 3px 3px 0;
          border-radius: 3px;
          font-size: 11.5px;
          background: #f2f2f8;
          border: 1px solid #dcdcf0;
          color: #4040a0;
          font-family: \'IBM Plex Mono\', monospace;
          transition: all 0.15s;
        }
        .skill-item:hover { background: #eaeaf8; color: #2a2a80; border-color: #c0c0e8; }
        .section-label {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #9090c0;
          text-transform: uppercase;
          font-family: \'IBM Plex Mono\', monospace;
        }
        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 20, 40, 0.55);
          backdrop-filter: blur(3px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.18s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-box {
          background: #ffffff;
          border-radius: 10px;
          width: 100%;
          max-width: 740px;
          max-height: 88vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06);
          animation: slideUp 0.2s ease;
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .modal-box::-webkit-scrollbar { width: 4px; }
        .modal-box::-webkit-scrollbar-thumb { background: #d0d0e8; border-radius: 2px; }
        .modal-header {
          padding: 24px 28px 20px;
          border-bottom: 1px solid #eeeef8;
          position: sticky;
          top: 0;
          background: #ffffff;
          z-index: 2;
        }
        .modal-body { padding: 24px 28px 28px; }
        .nav-btn {
          background: #f2f2f8;
          border: 1px solid #dcdcf0;
          color: #4040a0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .nav-btn:hover:not(:disabled) { background: #e8e8f8; color: #2020a0; border-color: #c0c0e8; }
        .nav-btn:disabled { opacity: 0.3; cursor: default; }
        .close-x {
          background: #f2f2f8;
          border: 1px solid #dcdcf0;
          color: #5050a0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .close-x:hover { background: #ffe8ec; border-color: #ffb0c0; color: #c00040; }
      `}</style>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ "--accent": selected.color }}>
            {/* Accent bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${selected.color}, ${selected.color}88)`, borderRadius: "10px 10px 0 0" }} />

            {/* Modal header */}
            <div className="modal-header">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="section-label" style={{ marginBottom: 6 }}>{selected.tag}</div>
                  <div style={{ fontFamily: "\'Fraunces\', serif", fontSize: 20, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.2, marginBottom: 4 }}>{selected.title}</div>
                  <div style={{ fontSize: 11, fontFamily: "\'IBM Plex Mono\', monospace", color: selected.color, fontWeight: 500 }}>{selected.subtitle}</div>
                </div>
                <button className="close-x" onClick={closeModal} title="Close (Esc)">✕</button>
              </div>
            </div>

            {/* Modal body */}
            <div className="modal-body">
              <p style={{ fontSize: 13, color: "#2e2e50", lineHeight: 1.8, marginBottom: 22 }}>{selected.summary}</p>
              <div style={{ marginBottom: 22 }}>
                {selected.bullets.map((b, i) => <div key={i} className="bullet-line">{b}</div>)}
              </div>
              <div style={{ marginBottom: 6 }}>
                {selected.stack.map(s => <span key={s} className="stack-tag" style={{ borderColor: `${selected.color}40`, color: "#3a3a80" }}>{s}</span>)}
              </div>
              <div className="impact-box" style={{ "--accent": selected.color }}>
                <span style={{ color: selected.color, fontStyle: "normal", fontWeight: 600, marginRight: 6 }}>impact:</span>
                {selected.impact}
              </div>
            </div>

            {/* Navigation footer */}
            <div style={{ padding: "14px 28px 20px", borderTop: "1px solid #eeeef8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button className="nav-btn" onClick={goPrev} disabled={activeIndex === 0} title="Previous (←)">←</button>
              <span style={{ fontSize: 11, color: "#9090c0", fontFamily: "\'IBM Plex Mono\', monospace" }}>
                {activeIndex + 1} / {projects.length}
              </span>
              <button className="nav-btn" onClick={goNext} disabled={activeIndex === projects.length - 1} title="Next (→)">→</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e0e0ec", padding: "32px 48px 28px", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "\'Fraunces\', serif", fontSize: 30, fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.01em", marginBottom: 4 }}>
                Charlie May
              </div>
              <div style={{ fontSize: 12, color: "#7070b0", marginBottom: 16, fontFamily: "\'IBM Plex Mono\', monospace", letterSpacing: "0.03em" }}>
                ML Engineer · Analytics Engineer · Data Platform · Production ML Systems
              </div>
              <div style={{ fontSize: 12.5, color: "#444468", lineHeight: 1.8, maxWidth: 560 }}>
                ML engineer and data platform architect with production work across the full modeling lifecycle.
                Deployed online anomaly detection in a 35K devices/day wireless carrier refurbishment warehouse (Azure ML)
                and a multi-signal Amazon monitoring platform (Prophet + multi-rule consensus) across a dozen clients.
                Causal inference practitioner — built a four-stage content optimization platform and a regression-based DiD framework for ecommerce experiments.
                Sole engineer on a multi-client paid media data mart (BigQuery / Dataform / Cloud Run).
                M.S. Data Analytics, Georgia Tech (in progress). 12-year background in digital commerce.
              </div>
            </div>
            <div style={{ textAlign: "right", minWidth: 170 }}>
              {[
                ["#e53935","Wireless Carrier / Azure ML"],["#5b8a00","Content Platform"],["#c64600","Propensity Model"],
                ["#c04000","Anomaly Detection"],["#c4005a","GT Practicum"],["#007a6a","Price Optimization"],
                ["#2a7a00","Time Series ML"],["#006a80","Data Engineering"],["#800080","Brand Intelligence"],
                ["#700090","Lead Routing"],["#8a7000","Simulation / OR"],["#005a90","MLOps Infra"],
              ].map(([c, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 10, color: "#9090b8", fontFamily: "\'IBM Plex Mono\',monospace" }}>{label}</span>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 48px" }}>
        <div className="section-label" style={{ marginBottom: 20 }}>// projects — click to expand</div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
          {projects.map(p => (
            <div key={p.id} className="proj-card" style={{ "--accent": p.color }} onClick={() => openModal(p.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span className="tag-pill">{p.tag.split(" · ")[0]}</span>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: p.color, flexShrink: 0, marginTop: 3 }} />
              </div>
              <div style={{ fontFamily: "\'Fraunces\', serif", fontSize: 15, fontWeight: 600, color: "#1a1a2e", marginBottom: 4, lineHeight: 1.3 }}>{p.title}</div>
              <div style={{ fontSize: 10.5, color: "#7878b0", marginBottom: 10, fontFamily: "\'IBM Plex Mono\',monospace" }}>{p.subtitle}</div>
              <div style={{ fontSize: 12, color: "#44446a", lineHeight: 1.65 }}>{p.summary.slice(0, 115)}…</div>
              <div style={{ marginTop: 12 }}>
                {p.stack.slice(0, 4).map(s => <span key={s} className="stack-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ marginTop: 52 }}>
          <div className="section-label" style={{ borderTop: "1px solid #e0e0ec", paddingTop: 24, marginBottom: 24 }}>// technical skills</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <div className="section-label" style={{ marginBottom: 10 }}>{group}</div>
                <div>{items.map(item => <span key={item} className="skill-item">{item}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid #e0e0ec", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 11, color: "#9090b8", fontFamily: "\'IBM Plex Mono\',monospace" }}>M.S. Data Analytics · Georgia Tech (in progress) · Indianapolis, IN</div>
          <div style={{ fontSize: 11, color: "#9090b8", fontFamily: "\'IBM Plex Mono\',monospace" }}>Target: $140–175K · Remote · Sr. Analytics Engineer / ML Engineer / Data Platform</div>
        </div>
      </div>
    </div>
  );
}
