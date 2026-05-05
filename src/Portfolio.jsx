/**
 * charlesmayanalytics.com — Portfolio
 *
 * IMAGE SETUP:
 *   Copy the `portfolio-images/` folder into your project's `public/` directory.
 *   Images will be served from /portfolio-images/<slug>.jpg
 *
 *   Three projects use inline SVG (no file needed):
 *     verizon-anomaly   → DecisionTreeSVG
 *     price-optimization → PriceOptSVG
 *     lead-routing       → LeadFunnelSVG
 */

import { useState, useEffect, useCallback } from "react";

// ─── SVG Mockups for the three projects without screenshots ───────────────────

const DecisionTreeSVG = ({ color }) => (
  <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
    <rect width="680" height="220" fill="#080812" />
    {/* ── grid lines ── */}
    {[40,80,120,160,200].map(y => <line key={y} x1="0" y1={y} x2="680" y2={y} stroke="#0e0e22" strokeWidth="1"/>)}

    {/* ── edges ── */}
    {/* root → left */}
    <path d="M340,52 C340,70 190,70 190,88" fill="none" stroke="#252548" strokeWidth="1.5"/>
    {/* root → right */}
    <path d="M340,52 C340,70 490,70 490,88" fill="none" stroke="#252548" strokeWidth="1.5"/>
    {/* left → mix check */}
    <path d="M190,112 C190,130 110,130 110,148" fill="none" stroke="#252548" strokeWidth="1.5"/>
    {/* left → clear */}
    <path d="M190,112 C190,130 270,130 270,148" fill="none" stroke="#252548" strokeWidth="1.5"/>
    {/* mix → flag */}
    <path d="M110,168 C110,178 70,178 70,188" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
    {/* mix → ok */}
    <path d="M110,168 C110,178 150,178 150,188" fill="none" stroke="#252548" strokeWidth="1.5"/>
    {/* right → wms */}
    <path d="M490,112 L490,148" fill="none" stroke="#252548" strokeWidth="1.5"/>

    {/* ── edge labels ── */}
    <text x="248" y="74" fill="#3a3a5a" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">conf &lt; 0.5</text>
    <text x="432" y="74" fill="#3a3a5a" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">conf ≥ 0.5</text>
    <text x="128" y="136" fill="#3a3a5a" fontSize="8" fontFamily="IBM Plex Mono" textAnchor="middle">mix flag</text>
    <text x="250" y="136" fill="#3a3a5a" fontSize="8" fontFamily="IBM Plex Mono" textAnchor="middle">mix ok</text>
    <text x="85" y="182" fill={color} fontSize="8" fontFamily="IBM Plex Mono" fillOpacity="0.8">yes</text>
    <text x="145" y="182" fill="#3a3a5a" fontSize="8" fontFamily="IBM Plex Mono">no</text>

    {/* ── nodes ── */}
    {/* root */}
    <rect x="240" y="20" width="200" height="32" rx="4" fill="#12122a" stroke="#2a2a52" strokeWidth="1"/>
    <text x="340" y="33" fill="#9090c8" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">X-Ray Scanner</text>
    <text x="340" y="46" fill="#6060a0" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">confidence threshold</text>

    {/* left: count model */}
    <rect x="108" y="88" width="164" height="24" rx="4" fill="#12122a" stroke="#2a2a52" strokeWidth="1"/>
    <text x="190" y="105" fill="#9090c8" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">Decision Tree → Count Est.</text>

    {/* right: scanner ok */}
    <rect x="408" y="88" width="164" height="24" rx="4" fill="#12122a" stroke="#2a2a52" strokeWidth="1"/>
    <text x="490" y="105" fill="#9090c8" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">Scanner Sufficient</text>

    {/* mix check */}
    <rect x="46" y="148" width="128" height="20" rx="4" fill="#12122a" stroke="#2a2a52" strokeWidth="1"/>
    <text x="110" y="162" fill="#9090c8" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">Device Mix Anomalous?</text>

    {/* count ok */}
    <rect x="196" y="148" width="148" height="20" rx="4" fill="#12122a" stroke="#2a2a52" strokeWidth="1"/>
    <text x="270" y="162" fill="#9090c8" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">Count Verified → WMS</text>

    {/* flag leaf */}
    <rect x="28" y="188" width="84" height="22" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
    <text x="70" y="203" fill={color} fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle" fontWeight="600">⚠ FLAG BOX</text>

    {/* clear leaf */}
    <rect x="118" y="188" width="64" height="22" rx="4" fill="#12122a" stroke="#2a2a52" strokeWidth="1"/>
    <text x="150" y="203" fill="#6060a0" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">CLEAR</text>

    {/* wms leaf */}
    <rect x="422" y="148" width="136" height="20" rx="4" fill="#12122a" stroke="#2a2a52" strokeWidth="1"/>
    <text x="490" y="162" fill="#6060a0" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">→ WMS Direct</text>

    {/* caption */}
    <text x="672" y="214" fill="#2a2a42" fontSize="8" fontFamily="IBM Plex Mono" textAnchor="end">decision tree — intake classification logic  |  ~35K devices/day</text>
  </svg>
);

const PriceOptSVG = ({ color }) => {
  const W = 680, H = 220;
  const lx = 56, rx = 620, by = 185, ty = 22;
  const pw = rx - lx, ph = by - ty;

  // Revenue curve: R(p) = p * D(p), inverted-U peaking ~mid
  // We'll parameterize x from 0..1 across price axis
  const revPoints = Array.from({ length: 80 }, (_, i) => {
    const t = i / 79;
    const p = lx + t * pw;
    const rev = ph * 4 * t * (1 - t) * 0.88; // parabola peak at t=0.5
    return `${p},${by - rev}`;
  }).join(" ");

  // Profit curve: similar shape but shifted right, narrower
  const profPoints = Array.from({ length: 80 }, (_, i) => {
    const t = i / 79;
    const p = lx + t * pw;
    const prof = ph * 3.8 * Math.max(0, (t - 0.18) * (0.92 - t)) / (0.37 * 0.37) * 0.37 * 0.37 * 0.78;
    return `${p},${by - prof}`;
  }).join(" ");

  // Optimal price at t=0.62 (profit max)
  const optT = 0.62;
  const optX = lx + optT * pw;

  // Buy box ceiling at t=0.80
  const bbT = 0.80;
  const bbX = lx + bbT * pw;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <rect width={W} height={H} fill="#080812" />

      {/* grid */}
      {[0.25, 0.5, 0.75].map(t => {
        const x = lx + t * pw;
        return <line key={t} x1={x} y1={ty} x2={x} y2={by} stroke="#0e0e22" strokeWidth="1" strokeDasharray="3,4"/>;
      })}
      {[0.25, 0.5, 0.75].map(t => {
        const y = ty + t * ph;
        return <line key={t} x1={lx} y1={y} x2={rx} y2={y} stroke="#0e0e22" strokeWidth="1"/>;
      })}

      {/* axes */}
      <line x1={lx} y1={ty} x2={lx} y2={by} stroke="#252548" strokeWidth="1"/>
      <line x1={lx} y1={by} x2={rx} y2={by} stroke="#252548" strokeWidth="1"/>

      {/* revenue curve fill */}
      <polygon points={`${lx},${by} ${revPoints} ${rx},${by}`} fill={color} fillOpacity="0.05"/>
      {/* revenue curve line */}
      <polyline points={revPoints} fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.5"/>

      {/* profit curve fill */}
      <polygon points={`${lx},${by} ${profPoints} ${rx},${by}`} fill={color} fillOpacity="0.08"/>
      {/* profit curve line */}
      <polyline points={profPoints} fill="none" stroke={color} strokeWidth="2.5"/>

      {/* buy box ceiling */}
      <line x1={bbX} y1={ty} x2={bbX} y2={by} stroke="#ef5350" strokeWidth="1" strokeDasharray="5,4" strokeOpacity="0.7"/>

      {/* optimal price line */}
      <line x1={optX} y1={ty + 20} x2={optX} y2={by} stroke={color} strokeWidth="1.5" strokeDasharray="4,3" strokeOpacity="0.9"/>

      {/* optimal dot */}
      <circle cx={optX} cy={by - ph * 0.68} r="4" fill={color} fillOpacity="0.9"/>
      <circle cx={optX} cy={by - ph * 0.68} r="7" fill={color} fillOpacity="0.15"/>

      {/* labels */}
      <text x={W/2} y={H - 3} fill="#3a3a5a" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle">Price →</text>
      <text x="14" y={H/2} fill="#3a3a5a" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle" transform={`rotate(-90,14,${H/2})`}>Revenue / Profit →</text>

      <text x={optX + 6} y={ty + 34} fill={color} fontSize="8.5" fontFamily="IBM Plex Mono" fontWeight="600">p*</text>
      <text x={optX + 6} y={ty + 46} fill={color} fontSize="8" fontFamily="IBM Plex Mono" opacity="0.8">optimal</text>

      <text x={bbX + 6} y={ty + 34} fill="#ef5350" fontSize="8.5" fontFamily="IBM Plex Mono" opacity="0.8">buy box</text>
      <text x={bbX + 6} y={ty + 46} fill="#ef5350" fontSize="8" fontFamily="IBM Plex Mono" opacity="0.8">ceiling</text>

      {/* legend */}
      <line x1={lx + 8} y1={ty + 12} x2={lx + 28} y2={ty + 12} stroke={color} strokeWidth="1.5" strokeOpacity="0.5"/>
      <text x={lx + 32} y={ty + 16} fill={color} fontSize="8" fontFamily="IBM Plex Mono" opacity="0.7">revenue</text>
      <line x1={lx + 86} y1={ty + 12} x2={lx + 106} y2={ty + 12} stroke={color} strokeWidth="2.5"/>
      <text x={lx + 110} y={ty + 16} fill={color} fontSize="8" fontFamily="IBM Plex Mono">profit</text>

      <text x={rx} y={H - 3} fill="#2a2a42" fontSize="8" fontFamily="IBM Plex Mono" textAnchor="end">scipy.optimize — per-ASIN constant-elasticity demand model</text>
    </svg>
  );
};

const LeadFunnelSVG = ({ color }) => {
  const stages = [
    { label: "Records Processed",     count: "11,000 / wk",  pct: 1.00, color: "#3a3a5a" },
    { label: "Routing Violations",    count: "~4,200",        pct: 0.78, color: "#5a3a5a" },
    { label: "Organic Reconversion",  count: "~3,100",        pct: 0.56, color: "#4a3a6a" },
    { label: "Unenrollment / Override", count: "~2,400",      pct: 0.38, color: "#3a3a6a" },
    { label: "Enrollment",            count: "~1,200",        pct: 0.22, color: "#3a4a6a" },
    { label: "Currently Held",        count: "~80",           pct: 0.06, color: "#2a3a5a" },
    { label: "Successfully Routed",   count: "22  (0.2%)",   pct: 0.015, color: color },
  ];

  const topY = 16, rowH = 24, gap = 2;
  const maxW = 580, startX = 50;

  return (
    <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <rect width="680" height="220" fill="#080812" />

      {stages.map((s, i) => {
        const y = topY + i * (rowH + gap);
        const barW = maxW * s.pct;
        const isLast = i === stages.length - 1;
        return (
          <g key={i}>
            {/* bar */}
            <rect x={startX} y={y} width={barW} height={rowH - 2} rx="2"
              fill={isLast ? color : "#16163a"}
              stroke={isLast ? color : s.color}
              strokeWidth={isLast ? 1.5 : 1}
              fillOpacity={isLast ? 0.25 : 1}
            />
            {/* label */}
            <text x={startX + 8} y={y + 15}
              fill={isLast ? color : "#6060a0"}
              fontSize="9" fontFamily="IBM Plex Mono"
              fontWeight={isLast ? "600" : "400"}>
              {s.label}
            </text>
            {/* count */}
            <text x={startX + barW + 8} y={y + 15}
              fill={isLast ? color : "#3a3a5a"}
              fontSize="9" fontFamily="IBM Plex Mono">
              {s.count}
            </text>
          </g>
        );
      })}

      {/* left axis */}
      <line x1={startX} y1={topY} x2={startX} y2={topY + stages.length * (rowH + gap) - gap} stroke="#252548" strokeWidth="1"/>

      {/* caption */}
      <text x="672" y="214" fill="#2a2a42" fontSize="8" fontFamily="IBM Plex Mono" textAnchor="end">
        SQL five-case classification  |  Make.com automation  |  11K records / week
      </text>
    </svg>
  );
};

// ─── Image registry ────────────────────────────────────────────────────────────
// Real images: paths relative to /public/portfolio-images/
// SVG components: rendered inline, receive the project accent color as prop

const PROJECT_IMAGES = {
  "verizon-anomaly":       { type: "svg",   component: DecisionTreeSVG,
                             caption: "decision tree — intake classification" },
  "amazon-did":            { type: "img",   src: "/portfolio-images/did.jpg",
                             caption: "parallel trends validation — DiD regression  |  16 metrics per experiment" },
  "repurchase-propensity": { type: "img",   src: "/portfolio-images/auc_propensity.jpg",
                             caption: "roc curve comparison — model vs HubSpot ML scorers" },
  "anomaly-detection":     { type: "img",   src: "/portfolio-images/anomaly_detection.jpg",
                             caption: "prophet forecast with multi-rule anomaly flags" },
  "construction-cost":     { type: "img",   src: "/portfolio-images/construction_estimate.jpg",
                             caption: "predicted vs actual — class 5 ±50% threshold band" },
  "price-optimization":    { type: "svg",   component: PriceOptSVG,
                             caption: "profit-maximizing price — buy box ceiling constraint  |  scipy.optimize" },
  "arima-forecasting":     { type: "img",   src: "/portfolio-images/forecast_map.jpg",
                             caption: "choropleth — market opportunity gap by state  |  streamlit / cloud run" },
  "paid-media-mart":       { type: "img",   src: "/portfolio-images/lineage_diagram.jpg",
                             caption: "dataform lineage — staging → enriched → consumption  |  6 connectors" },
  "apparel-brand-leakage": { type: "img",   src: "/portfolio-images/hanes_buybox.jpg",
                             caption: "buy box ownership — 1P vs 3P capture  |  keepa + snowflake" },
  "lead-routing":          { type: "svg",   component: LeadFunnelSVG,
                             caption: "five-case sql classification  |  11k records/week  |  0.2% routing rate" },
  "call-center":           { type: "img",   src: "/portfolio-images/call_center.jpg",
                             caption: "call volume eda — inbound / voicemail / callback  |  simpy simulation" },
  "gcp-platform":          { type: "img",   src: "/portfolio-images/architecture.jpg",
                             caption: "gcp architecture — cloud run · bigquery · dataform · iap" },
};

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects = [
  {
    id: "verizon-anomaly",
    tag: "Anomaly Detection  —  Online ML  —  Operations",
    title: "Wireless Carrier — Production Line Device Intake Model",
    subtitle: "Decision Tree  —  Online Inference  —  35K Devices/Day   Power BI",
    summary: "Built an online anomaly detection model for a major wireless carrier's device grading and resale production line — the operation that receives, cleans, grades, and resells used phones. X-ray scanners at intake couldn't reliably count devices per box or detect anomalous device type mixes, creating downstream capacity shocks across every workstation. A decision tree model provided real-time estimates when scanner signal was insufficient, stabilizing workflow throughput at ~35,000 devices per day.",
    bullets: [
      "Decision tree deployed as online model: chosen for interpretability — line supervisors and workstation managers needed to understand and contest predictions, making a black-box model operationally unacceptable at this scale",
      "Two detection tasks in one model: (1) device count estimation when X-ray scanner confidence was below threshold, and (2) anomalous device type mix detection — flagging boxes where the expected blend of phone models didn't match intake patterns",
      "Downstream impact was the core business case: each workstation (intake, cleaning, grading) has different throughput capacity per device type; an anomalous mix or miscounted box arriving undetected causes cascading bottlenecks across the entire line",
      "Deployed via Azure — production environment with model versioning, monitoring, and online inference integration into the warehouse management system",
      "Model outputs extended to Power BI dashboards for business-level consumption — giving operations leadership daily visibility into intake accuracy, device mix anomalies, and workstation capacity forecasts without requiring direct model access",
    ],
    stack: ["Python", "Decision Tree", "Azure ML", "Power BI", "Online Inference", "scikit-learn"],
    impact: "Stabilized intake throughput for a ~35,000 device/day refurbishment operation at a major wireless carrier. Replaced unreliable X-ray scanner fallback logic with a defensible, auditable ML model that operations staff could trust and verify. Extended to Power BI for executive-level operational dashboards.",
    color: "#e53935",
  },
  {
    id: "amazon-did",
    tag: "Causal Inference  —  Content Intelligence  —  End-to-End Platform",
    title: "Amazon Content Optimization Platform",
    subtitle: "Compliance Check → Optimize → DiD Measurement → Catalog Defense  —  12 Clients",
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
    tag: "Machine Learning  —  Survival Analysis  —  Feature Engineering",
    title: "Repeat Buyer EDA + Repurchase Propensity Model",
    subtitle: "AUC 0.978  —  5,333 Buyers  —  Invalidated HubSpot ML  —  XGBoost Design",
    summary: "Led V1 EDA on 13 years of transaction data for a major RV manufacturer (5,333 repeat buyers, 10,649 purchases, 2012–2025). Discovered HubSpot's own ML scorer was anti-predictive at 0.401 AUC — below coin-flip. Built a propensity model scoring 0.978 AUC and designed the full Phase 2 framework including survival analysis for repurchase window probabilities.",
    bullets: [
      "Head-to-head AUC benchmarks: our model (0.978) vs Lead Score (0.791, explains 27%), HS Predictive Lead Score (0.701, 6%), Hubspots Predictive Score (0.401 — anti-predictive, Pearson -0.082). HubSpot trained on engagement signals anti-correlated with purchase",
      "Whitelist-based feature architecture: explicit _numeric_shared and _boolean_shared column lists prevent silent feature leakage — new fields sit in the dataframe but don't enter the model unless manually promoted",
      "Data stitching notebook: buyer/non-buyer journey merge, geo enrichment using the us library, dual territory dict lookup from sales territories; survival analysis designed for 30/60/90/180-day repurchase window probabilities by product line",
    ],
    stack: ["Python",  "XGBoost", "LightGBM", "scikit-learn", "Survival Analysis", "Amperity", "HubSpot"],
    impact: "AUC 0.978 vs next-best 0.791. Invalidated HubSpot's ML scorer (worse than random). Quantified $58M+ accelerated revenue opportunity from a 10% reduction in repurchase cycle.",
    color: "#ff6d00",
  },
  {
    id: "anomaly-detection",
    tag: "Anomaly Detection  —  Production Systems  —  MLOps",
    title: "Multi-Signal Amazon Anomaly Detection Platform",
    subtitle: "Prophet  —  Multi-Rule Consensus  —  mc.alerting Package  —  Multi-Client",
    summary: "Built a production anomaly detection platform at Momentum Commerce monitoring Amazon performance across revenue, ad spend, glance views, buy box ownership, and inventory simultaneously for multiple clients. Prototyped in notebooks using Prophet time series modeling, then productized into a modular Python package with composable monitor and metric classes.",
    bullets: [
      "Prophet-based expected value modeling per ASIN per metric. Multi-rule consensus threshold (Triggered >= 2) before alerting — reduces false positives from single-signal noise on volatile ecommerce time series",
      "SalesShiftMonitor composes five metric types in one pass: SalesMetric, SpendMetric, GlancesMetric, BuyBoxMetric (Keepa ownership data), InventoryMetric — with trend description context appended to each alert explaining the likely cause",
      "BuyBoxMonitor detects ownership loss events via Keepa historic_buy_box_ownership: surfaces new seller identity, lost date, price delta vs last-held, and L7D revenue at risk — giving account teams an immediate action item",
      "TentpoleAlerting monitors hourly 1P + 3P order revenue during major events (Prime Day, Black Friday) via timezone-converted hour spine, pivoted Google Sheets output, and email delivery on a separate cadence from daily monitoring",
    ],
    stack: ["Python", "Prophet", "Snowflake", "mc.alerting (internal)", "Slack API", "Google Sheets API", "Keepa"],
    impact: "Production multi-client alerting system catching revenue anomalies, buy box losses, and catalog hijacking before clients notice. Deployed across Momentum Commerce brand portfolio.",
    color: "#ff6e40",
  },
  {
    id: "construction-cost",
    tag: "Machine Learning  —  Feature Engineering  —  MLOps",
    title: "Class 5 Construction Cost Estimation",
    subtitle: "Georgia Tech Practicum  —  Random Forest  —  150K Records  —  11 Experiments",
    summary: "Inherited a drifted ML pipeline from a prior semester team whose model had lost ~50% of its R² on new data. Diagnosed root cause — over-reliance on unstable size-based predictors — and rebuilt feature architecture from scratch. Final Random Forest model explains >90% of variance and places 95% of predictions within the ±50% accuracy band required for Class 5 (0–2% project definition) estimates.",
    bullets: [
      "Root cause analysis: prior model's square footage predictor was sparsely and inconsistently reported — replaced with derived economic indicators, Area Cost Factors (ACF), and inflation-normalized targets using FRED PPI construction index (PCU236400236400)",
      "11 controlled experiments (exp_prior through exp10) isolating each feature class: economic indicators (+62% R²), categorical descriptors (+71%), TF-IDF text embeddings (+79%), inflation normalization, K-Means scope clusters — which drove the single largest jump to +158% R²",
      "Identified and excluded data-leaking features: ratio-based transforms involving the target produced artificially inflated R² — exp7 hit 98% threshold compliance before being ruled out as leakage, which is the kind of check most practitioners skip",
      "Modular, reproducible pipeline with version-controlled feature engineering and a prototype user-input inference path — translating high-level project descriptors into model-ready features for the sponsor's web application",
    ],
    stack: ["Python", "scikit-learn", "Random Forest", "XGBoost", "K-Means", "TF-IDF", "FRED API" ],
    impact: "+176% R² vs. inherited drifted baseline. 95% of predictions within Class 5 ±50% threshold. Delivered production-ready pipeline and user-facing inference prototype to the sponsor.",
    color: "#ff4081",
  },
  {
    id: "price-optimization",
    tag: "Optimization  —  Econometrics  —  Demand Modeling",
    title: "Amazon Price Optimization Engine",
    subtitle: "Constant-Elasticity Demand Model  —  Profit Maximization  —  scipy.optimize",
    summary: "Contributed to a per-ASIN price optimization engine (supporting role) that fits a constant-elasticity demand model (log-log OLS), computes point price elasticity, and uses scipy.optimize to find the profit-maximizing price given fixed and variable cost structure. Deployed for select clients with buy box barrier logic — pricing above the competitor threshold drops units to zero.",
    bullets: [
      "Log-log demand model per parent ASIN: log(orders + modifier) = a + b·log(price) with time-decay weighting 0.995^days_ago — more recent price observations carry higher weight; modifier derived from IQR handles zero-unit days without log(0)",
      "Buy box filter: only trains on observations where buy_box_percentage > 0.5 — prevents the model from learning demand at prices where the buy box is already lost, which would underestimate true elasticity",
      "Profit function: (units(price)) x ((1 - variable_cost) x price - fixed_cost) — scipy.optimize.fmin finds the optimum; separate train/test and full-period coefficients computed in parallel for sensitivity comparison",
      "Barrier mode: models the competitor price ceiling — generates revenue curves that explicitly zero out above the buy box threshold, and computes alternative price scenarios (5–50% increments) with TACOS impact",
    ],
    stack: ["Python", "scikit-learn", "scipy.optimize", "numpy", "Snowflake",  "Plotly"],
    impact: "Per-ASIN profit-maximizing price recommendations with buy box constraints for Spreetail and CDD. Converted pricing from rule-of-thumb adjustments to elasticity-driven optimization.",
    color: "#64ffda",
  },
  {
    id: "arima-forecasting",
    tag: "Machine Learning  —  Time Series  —  MLOps",
    title: "RV Market Forecasting Pipeline",
    subtitle: "ARIMA  —  Per-State PDQ Grid Search  —  MAPE Holdout  —  Deployed Streamlit",
    summary: "Built a per-state ARIMA forecasting pipeline on 8 years of RV sales data with automated PDQ parameter tuning via MAPE-optimized grid search. Productized from Jupyter notebook into a deployed multi-tab Streamlit application on Cloud Run with client-facing scenario modeling.",
    bullets: [
      "Grid search across p(0-3), d(0-2), q(0-3) — 48 model candidates per state — selecting best by MAPE on 5-period holdout. US state coverage with separate manufacturer vs. total market dataframes, quarterly aggregation for media planning cadence",
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
    tag: "Analytics Engineering  —  Data Platform",
    title: "Paid Media Data Mart",
    subtitle: "BigQuery  —  Dataform  —  6 Ad Connectors  —  Three-Way Validated  —  Zero Delta",
    summary: "Designed and built a production data mart from scratch, unifying ad platform connectors into a single consumption layer. Three-way validated across ad platforms, ETL, and BigQuery with zero metric delta across campaigns.",
    bullets: [
      "Architected staging, enriched, and consumption layer model in Dataform (SQLX) with dependency graph and incremental logic across all six connectors simultaneously",
      "Resolved complex data quality issues: network_type duplication, correlated subquery fan-out, duplicate client rows — each requiring separate diagnostic and fix pattern",
      "Built target dimension resolver and Google Sheets-fed Media Plan via Sheets API in Cloud Run microservice; shadow mode pipeline validated all connectors to zero-diff before production promotion",
      "Dataform prod release config on-demand with manual trigger during shadow mode — controlled promotion pattern preventing untested changes from reaching client dashboards",
    ],
    stack: ["BigQuery", "Dataform", "Cloud Run", "GCP", "Python", "SQL"],
    impact: "Zero metric delta across all validation checks. Powers live HVT dashboards for a portfolio of clients.",
    color: "#00e5ff",
  },
  {
    id: "apparel-brand-leakage",
    tag: "EDA  —  Brand Intelligence  —  Causal Analysis",
    title: "National Apparel Brand — Buy Box Leakage Analysis",
    subtitle: "Major Apparel Brand  —  3P Seller Arbitrage  —  Revenue Erosion Quantification",
    summary: "Conducted deep EDA for a major national apparel brand to diagnose and quantify revenue erosion from third-party seller buy box capture. Combined Keepa historic buy box ownership data with retail performance data to estimate how much 1P revenue was displaced by 3P arbitrage — including a specific promo-driven arbitrage scenario.",
    bullets: [
      "Buy box win rate weighted by glance views across product dimension segments (category, silhouette, gender, price tier) — revealing which product categories had the highest 3P exposure by revenue impact",
      "Estimated revenue erosion: modeled expected revenue = actual revenue / buy box win rate, providing a counterfactual for revenue captured at 100% buy box ownership",
      "Reseller YoY analysis: identified top 3P sellers by estimated revenue, tracked monthly capture trends to distinguish opportunistic arbitrage from structured gray market activity",
      "Investigated a specific promotional arbitrage hypothesis: built best-reseller-offer comparison to test whether 3P sellers were systematically undercutting during the client's promotional windows",
    ],
    stack: ["Python",  "Keepa", "Snowflake", "OLS regression", "seaborn", "Plotly"],
    impact: "Quantified 3P revenue displacement for a major national apparel brand. Provided the analytical foundation for a buy box defense strategy and pricing controls.",
    color: "#ea80fc",
  },
  {
    id: "lead-routing",
    tag: "Automation  —  Anomaly Detection  —  Data Engineering",
    title: "Dealer Network Lead Routing Failure Analysis",
    subtitle: "SQL Classification  Make.com  HubSpot  11K Records/Week",
    summary: "Built a comprehensive SQL classification system for a dealer network lead routing program processing ~11,000 records weekly. Discovered a critical 0.2% successful routing rate — a near-total failure invisible in all existing reporting.",
    bullets: [
      "Five-case classification logic: routing violations, organic reconversion, unenrollment/override, enrollment, currently held — all resolved in a single SQL pass with no post-processing",
      "Built daily snapshot table with seller attribution fields for tracking of routing health over time",
      "Implemented Make.com three-scenario automation chain replacing manual HubSpot operations across all 11K weekly records",
      "Integrated MySQL tracking layer and HubSpot property writes for operational monitoring visible to account teams without SQL access",
    ],
    stack: ["SQL", "MySQL", "HubSpot", "Make.com", "Python", "BigQuery"],
    impact: "Surfaced systemic routing failure hidden from all existing dashboards.",
    color: "#e040fb",
  },
  {
    id: "call-center",
    tag: "Operations Research  —  Simulation  —  Forecasting",
    title: "Call Center Staffing Optimization",
    subtitle: "SimPy  —  Queueing Theory  —  ARIMA Volume Forecast  —  Capacity Planning",
    summary: "Analyzed a multi-agent call center operating at 205% capacity with 34% service level. Built discrete event simulation and ARIMA volume forecasting to produce data-driven staffing recommendations with scenario modeling.",
    bullets: [
      "Identified 205% capacity utilization and 34% service level through queueing analysis of historical call logs across inbound, voicemail, and callback channels",
      "Built SimPy discrete event simulation modeling throughput, voicemail rates, and callback volume under different staffing scenarios",
      "Layered ARIMA time series forecast on inbound call volume as dynamic input to simulation — scenario outputs tied to projected volume, not static assumptions",
      "Routing consistency analysis identified systemic call misallocation amplifying the capacity problem beyond what headcount alone could solve",
    ],
    stack: ["Python", "SimPy", "statsmodels", "ARIMA",  "numpy"],
    impact: "Quantified staffing gap with statistical rigor. Provided scenario-based staffing bands tied to projected call volume for a data-driven hiring decision.",
    color: "#ffd740",
  },
  {
    id: "gcp-platform",
    tag: "MLOps  —  Data Platform  —  Infrastructure",
    title: "End-to-End GCP ML Platform",
    subtitle: "Cloud Run  —  IAP  —  Dataform  —  Streamlit  —  Multi-Client  —  Sole Engineer",
    summary: "Architected and sole-engineered a shared GCP data platform supporting a multi-client analytics portfolio. Everything from raw ingestion through transformation, modeling, and client-facing app delivery — built and operated by one person across five enterprise clients.",
    bullets: [
      "GCP project: paid-and-performance-data-mart (us-central1). Cloud Run services: media configuration app and staging with environment parity between staging and production",
      "Global HTTPS load balancing with Identity-Aware Proxy (IAP) for client authentication without per-user credential management or VPN requirements",
      "Dataform prod release config on-demand with manual trigger during shadow mode — controlled promotion to production; known silent failure mode on media channel view creation documented with manual BQ console workaround",
    ],
    stack: ["GCP", "Cloud Run", "BigQuery", "Dataform", "Streamlit", "Docker"],
    impact: "Sole engineer delivering production infrastructure replacing fragmented, manual reporting with scalable platform for all enterprise clients with flexibility to transition legacy platform to new concurrently.",
    color: "#40c4ff",
  },
];

const skills = {
  "Languages": ["Python", "SQL", "R", "PySpark"],
  "ML / Modeling": ["ARIMA / Time Series", "XGBoost / LightGBM", "Random Forest", "Survival Analysis", "Anomaly Detection", "Regression & Classification", "Clustering / Segmentation", "Causal Inference / DiD", "LLM Integrations", "Media Mix Modeling"],
  "Data Engineering": ["BigQuery", "Snowflake", "Dataform", "DBT", "Azure Data Factory", "Synapse / Fabric", "Cloud Run", "ETL Pipeline Design"],
  "MLOps / Infra": ["GCP (full stack)", "Azure ML", "DataRobot", "Azure", "Docker", "Streamlit", "IAP / Auth", "CI/CD via Cloud Build"],
  "Analytics": ["Looker / Data Studio", "Power BI", "Google Analytics 4", "Multi-touch Attribution", "HubSpot Analytics"],
};

// ─── Main component ────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState(null);
  const [dark, setDark] = useState(false);
  const activeIndex = active !== null ? projects.findIndex(p => p.id === active) : -1;

  const openModal  = (id) => setActive(id);
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
      if (e.key === "Escape")      closeModal();
      if (e.key === "ArrowRight")  goNext();
      if (e.key === "ArrowLeft")   goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  const selected = active ? projects.find(p => p.id === active) : null;

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const t = dark ? {
    pageBg: "#0e0e1e", headerBg: "#13132a", headerBorder: "#252548",
    cardBg: "#1e1e38", cardBorder: "#2e2e52", cardHoverBg: "#242444", cardHoverBorder: "#3a3a62",
    modalBg: "#1a1a38", modalBorder: "#2e2e52", modalHeaderBg: "#1a1a38", modalDivider: "#252548",
    pillBg: "#26264a", pillBorder: "#363660", pillText: "#a0a0d0",
    stackBg: "#16163a", stackBorder: "#2a2a52", stackText: "#9090c8",
    impactBg: "#13133a", skillBg: "#16163a", skillBorder: "#2a2a52", skillText: "#9090c8",
    skillHoverBg: "#1e1e48", navBtnBg: "#26264a", navBtnBorder: "#363660", navBtnText: "#a0a0d0",
    closeBg: "#26264a", closeBorder: "#363660", closeText: "#a0a0d0",
    scrollThumb: "#38386a", nameText: "#e8eaf6", subtitleText: "#8890c0", bodyText: "#7880b0",
    sectionLabel: "#5060a0", cardTitle: "#dde2f8", cardSubtitle: "#6070a8", cardBody: "#9098b8",
    modalTagText: "#7080b0", modalTitle: "#e8eaf6", modalBody: "#b0b8d8",
    bulletText: "#b0b8d8", impactText: "#b0b8d0", footerText: "#404880",
    toggleBg: "#26264a", toggleBorder: "#363660", toggleText: "#9090c8", counterText: "#7080b0",
    imgBg: "#080812", imgBorder: "rgba(255,255,255,0.06)", captionText: "#3a3a5a",
  } : {
    pageBg: "#f5f5f0", headerBg: "#ffffff", headerBorder: "#e0e0ec",
    cardBg: "#ffffff", cardBorder: "#e0e0ec", cardHoverBg: "#ffffff", cardHoverBorder: "#c8c8e0",
    modalBg: "#ffffff", modalBorder: "#e0e0ec", modalHeaderBg: "#ffffff", modalDivider: "#eeeef8",
    pillBg: "#eeeef8", pillBorder: "#d8d8ec", pillText: "#5858a0",
    stackBg: "#f2f2f8", stackBorder: "#e0e0f0", stackText: "#5050a0",
    impactBg: "#f8f8fc", skillBg: "#f2f2f8", skillBorder: "#dcdcf0", skillText: "#4040a0",
    skillHoverBg: "#eaeaf8", navBtnBg: "#f2f2f8", navBtnBorder: "#dcdcf0", navBtnText: "#4040a0",
    closeBg: "#f2f2f8", closeBorder: "#dcdcf0", closeText: "#5050a0",
    scrollThumb: "#c8c8d8", nameText: "#1a1a2e", subtitleText: "#7070b0", bodyText: "#444468",
    sectionLabel: "#9090c0", cardTitle: "#1a1a2e", cardSubtitle: "#7878b0", cardBody: "#44446a",
    modalTagText: "#9090c0", modalTitle: "#1a1a2e", modalBody: "#2e2e50",
    bulletText: "#2a2a4a", impactText: "#2a2a4a", footerText: "#9090b8",
    toggleBg: "#f2f2f8", toggleBorder: "#dcdcf0", toggleText: "#5050a0", counterText: "#9090c0",
    imgBg: "#f0f0f8", imgBorder: "rgba(0,0,0,0.07)", captionText: "#aaaacc",
  };

  const accentText = (color) => {
    if (!dark) {
      const darkMap = {
        "#e53935": "#b71c1c", "#b2ff59": "#558b2f", "#ff6d00": "#e65100",
        "#ff6e40": "#bf360c", "#ff4081": "#ad1457", "#64ffda": "#00695c",
        "#69ff47": "#2e7d32", "#00e5ff": "#006064", "#ea80fc": "#6a1b9a",
        "#e040fb": "#6a1b9a", "#ffd740": "#f57f17", "#40c4ff": "#01579b",
      };
      return darkMap[color] || color;
    }
    return color;
  };

  // ── Render modal image (Option B — inline between header and body) ─────────
  const renderModalImage = (proj) => {
    const entry = PROJECT_IMAGES[proj.id];
    if (!entry) return null;
    const ac = accentText(proj.color);

    const wrapper = (children, caption) => (
      <div style={{ margin: "0 28px 4px" }}>
        <div style={{
          borderRadius: 4,
          overflow: "hidden",
          background: t.imgBg,
          border: `1px solid ${t.imgBorder}`,
          lineHeight: 0,
        }}>
          {children}
        </div>
        {caption && (
          <div style={{
            fontSize: 8.5, color: t.captionText, fontFamily: "'IBM Plex Mono',monospace",
            marginTop: 5, textAlign: "right", letterSpacing: "0.04em",
          }}>
            {caption}
          </div>
        )}
      </div>
    );

    if (entry.type === "svg") {
      const SvgComp = entry.component;
      return wrapper(<SvgComp color={ac} />, entry.caption);
    }

    // portrait images (architecture) get centered with constrained width
    const isPortrait = proj.id === "gcp-platform";
    const imgStyle = isPortrait
      ? { display: "block", maxWidth: 380, width: "100%", margin: "0 auto" }
      : { display: "block", width: "100%", maxHeight: 260, objectFit: "contain" };

    return wrapper(
      <img src={entry.src} alt={entry.caption} style={imgStyle} loading="lazy" />,
      entry.caption
    );
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Mono','Courier New',monospace", background: t.pageBg, color: t.nameText, minHeight: "100vh", padding: 0, overflowX: "hidden", transition: "background 0.2s, color 0.2s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { border-radius: 2px; }
        .proj-card { border-radius: 6px; padding: 20px; cursor: pointer; transition: all 0.18s ease; position: relative; overflow: hidden; }
        .proj-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent); opacity: 0; transition: opacity 0.18s; }
        .proj-card:hover::before { opacity: 1; }
        .proj-card:hover { transform: translateY(-2px); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(10,10,30,0.6); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.18s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-box { border-radius: 10px; width: 100%; max-width: 740px; max-height: 88vh; overflow-y: auto; position: relative; animation: slideUp 0.2s ease; }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .modal-box::-webkit-scrollbar { width: 4px; }
        .modal-header { padding: 24px 28px 20px; position: sticky; top: 0; z-index: 2; }
        .modal-body { padding: 20px 28px 28px; }
        .nav-btn { width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; border: 1px solid; }
        .nav-btn:disabled { opacity: 0.3; cursor: default; }
        .close-x { width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; border: 1px solid; flex-shrink: 0; }
        .toggle-btn { border-radius: 20px; padding: 5px 14px; cursor: pointer; font-size: 11px; font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.05em; transition: all 0.15s; border: 1px solid; }
      `}</style>

      {/* ── Modal ── */}
      {selected && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ background: t.modalBg, border: `1px solid ${accentText(selected.color)}44`, boxShadow: `0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px ${accentText(selected.color)}22` }}>

            {/* accent bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${accentText(selected.color)}, ${accentText(selected.color)}66)`, borderRadius: "10px 10px 0 0" }} />

            {/* sticky header */}
            <div className="modal-header" style={{ background: t.modalHeaderBg, borderBottom: `1px solid ${t.modalDivider}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.15em", color: t.modalTagText, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{selected.tag}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: t.modalTitle, lineHeight: 1.2, marginBottom: 4 }}>{selected.title}</div>
                  <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: accentText(selected.color), fontWeight: 500 }}>{selected.subtitle}</div>
                </div>
                <button className="close-x" style={{ background: t.closeBg, borderColor: t.closeBorder, color: t.closeText }} onClick={closeModal} title="Close (Esc)">✕</button>
              </div>
            </div>

            {/* ── OPTION B: image inline between header and body ── */}
            <div style={{ paddingTop: 20 }}>
              {renderModalImage(selected)}
            </div>

            {/* body */}
            <div className="modal-body">
              <p style={{ fontSize: 13, color: t.modalBody, lineHeight: 1.8, marginBottom: 22 }}>{selected.summary}</p>
              <div style={{ marginBottom: 22 }}>
                {selected.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 11, fontSize: 13, lineHeight: 1.7, color: t.bulletText }}>
                    <span style={{ color: accentText(selected.color), flexShrink: 0, marginTop: 1, fontWeight: 600 }}>→</span>
                    {b}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 6 }}>
                {selected.stack.map(s => (
                  <span key={s} style={{ display: "inline-block", padding: "3px 8px", borderRadius: 3, fontSize: 11, background: t.stackBg, border: `1px solid ${accentText(selected.color)}33`, color: t.stackText, fontFamily: "'IBM Plex Mono',monospace", margin: "2px 2px 2px 0" }}>{s}</span>
                ))}
              </div>
              <div style={{ background: t.impactBg, borderLeft: `3px solid ${accentText(selected.color)}`, padding: "11px 16px", borderRadius: "0 4px 4px 0", fontSize: 12.5, color: t.impactText, marginTop: 18, fontStyle: "italic" }}>
                <span style={{ color: accentText(selected.color), fontStyle: "normal", fontWeight: 600, marginRight: 6 }}>impact:</span>
                {selected.impact}
              </div>
            </div>

            {/* nav footer */}
            <div style={{ padding: "14px 28px 20px", borderTop: `1px solid ${t.modalDivider}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button className="nav-btn" style={{ background: t.navBtnBg, borderColor: t.navBtnBorder, color: t.navBtnText }} onClick={goPrev} disabled={activeIndex === 0} title="Previous (←)">←</button>
              <span style={{ fontSize: 11, color: t.counterText, fontFamily: "'IBM Plex Mono',monospace" }}>{activeIndex + 1} / {projects.length}</span>
              <button className="nav-btn" style={{ background: t.navBtnBg, borderColor: t.navBtnBorder, color: t.navBtnText }} onClick={goNext} disabled={activeIndex === projects.length - 1} title="Next (→)">→</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ background: t.headerBg, borderBottom: `1px solid ${t.headerBorder}`, padding: "28px 48px 24px", boxShadow: dark ? "none" : "0 1px 8px rgba(0,0,0,0.04)", transition: "background 0.2s" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 30, fontWeight: 700, color: t.nameText, letterSpacing: "-0.01em" }}>
                  Charles (Charlie) May
                </div>
                <button className="toggle-btn" style={{ background: t.toggleBg, borderColor: t.toggleBorder, color: t.toggleText }} onClick={() => setDark(!dark)}>
                  {dark ? "☀ light" : "☾ dark"}
                </button>
              </div>
              <div style={{ fontSize: 12, color: t.subtitleText, marginBottom: 14, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: "0.03em" }}>
                Data Science and ML Engineer — Analytics Engineer — Data Platform — Production ML Systems
              </div>
              <div style={{ fontSize: 12.5, color: t.bodyText, lineHeight: 1.8, maxWidth: 560 }}>
                I'm a data scientist and ML engineer based in Indianapolis, where I live with my five daughters and two doodles.
                I came to this work through a 12-year career in digital commerce — building things, running teams, and eventually realizing the most interesting problems were in the data underneath everything.
                That led me back to school (M.S. Data Analytics, Georgia Tech, one final class to go.) and forward into production ML work I'm genuinely proud of.
                This portfolio exists because the work is real and worth showing — production systems, rigorous methodology, and problems that actually mattered to the businesses they were built for.
                I'm currently Director of Data Science & Analytics at Element Three, a marketing agency, where I build data infrastructure and analytics platforms for the agency and its clients.{/* I'm open to consulting opportunities in analytics engineering, ML engineering, or data platform work. */}
              </div>
            </div>
            <div style={{ textAlign: "right", minWidth: 170 }}>
              {[
                ["#e53935","Wireless Carrier / Azure ML"],["#b2ff59","Content Platform"],["#ff6d00","Propensity Model"],
                ["#ff6e40","Anomaly Detection"],["#ff4081","GT Practicum"],["#64ffda","Price Optimization"],
                ["#69ff47","Time Series ML"],["#00e5ff","Data Engineering"],["#ea80fc","Brand Intelligence"],
                ["#e040fb","Lead Routing"],["#ffd740","Simulation / OR"],["#40c4ff","MLOps Infra"],
              ].map(([c, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 10, color: t.sectionLabel, fontFamily: "'IBM Plex Mono',monospace" }}>{label}</span>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: dark ? c : accentText(c), display: "inline-block" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 48px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", color: t.sectionLabel, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 20 }}>
          // projects — click to expand
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
          {projects.map(p => (
            <div key={p.id} className="proj-card" style={{ "--accent": accentText(p.color), background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: dark ? "none" : "0 1px 4px rgba(0,0,0,0.05)" }} onClick={() => openModal(p.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 3, fontSize: 10, fontWeight: 500, letterSpacing: "0.05em", background: t.pillBg, border: `1px solid ${t.pillBorder}`, color: t.pillText, fontFamily: "'IBM Plex Mono',monospace" }}>
                  {p.tag.split(" — ")[0].split(" · ")[0]}
                </span>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: dark ? p.color : accentText(p.color), flexShrink: 0, marginTop: 3, boxShadow: dark ? `0 0 6px ${p.color}` : "none" }} />
              </div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 600, color: t.cardTitle, marginBottom: 4, lineHeight: 1.3 }}>{p.title}</div>
              <div style={{ fontSize: 10.5, color: t.cardSubtitle, marginBottom: 10, fontFamily: "'IBM Plex Mono',monospace" }}>{p.subtitle}</div>
              <div style={{ fontSize: 12, color: t.cardBody, lineHeight: 1.65 }}>{p.summary.slice(0, 115)}…</div>
              <div style={{ marginTop: 12 }}>
                {p.stack.slice(0, 4).map(s => (
                  <span key={s} style={{ display: "inline-block", padding: "3px 8px", borderRadius: 3, fontSize: 11, background: t.stackBg, border: `1px solid ${t.stackBorder}`, color: t.stackText, fontFamily: "'IBM Plex Mono',monospace", margin: "2px 2px 2px 0" }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Skills ── */}
        <div style={{ marginTop: 52 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: t.sectionLabel, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", borderTop: `1px solid ${t.headerBorder}`, paddingTop: 24, marginBottom: 24 }}>
            // technical skills
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <div style={{ fontSize: 10, color: t.sectionLabel, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'IBM Plex Mono',monospace" }}>{group}</div>
                <div>
                  {items.map(item => (
                    <span key={item} style={{ display: "inline-block", padding: "4px 10px", margin: "3px 3px 3px 0", borderRadius: 3, fontSize: 11.5, background: t.skillBg, border: `1px solid ${t.skillBorder}`, color: t.skillText, fontFamily: "'IBM Plex Mono',monospace", transition: "all 0.15s" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: `1px solid ${t.headerBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 11, color: t.footerText, fontFamily: "'IBM Plex Mono',monospace" }}>M.S. Data Analytics — Georgia Tech (in progress) — Indianapolis, IN</div>
        </div>
      </div>
    </div>
  );
}
