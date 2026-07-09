export const caseStudies = [
  {
    id: "construction-cost",
    cardTitle: "AI-assisted cost estimates from limited project inputs",
    cardSummary:
      "A construction estimating workflow needed earlier cost ranges without false precision. I built the modeling layer that grounded AI-generated estimates in historical cost, geography, inflation, and scope signals.",
    label: "Machine Learning",
    title: "Class 5 Construction Cost Estimation",
    subtitle: "Georgia Tech Practicum · Random Forest · Feature Engineering",
    kicker: "Machine Learning · Feature Engineering · Decision Support",
    summary:
      "A machine learning pipeline that fed an AI-generated cost estimate workflow, turning user inputs, project descriptions, geography, inflation, and historical line-item patterns into a more reliable conceptual estimating signal.",
    decision: "Generate earlier AI-assisted estimates with less false confidence",
    output: "Model ensemble inputs + AI-assisted estimate workflow",
    role: "Data science, feature design, modeling, AI workflow design",
    projectType: "Academic / generalized work sample. Proprietary and identifying details removed.",
    signals: [
      "Project text",
      "Geography",
      "Inflation",
      "Scope clusters",
      "Historical cost",
      "User estimate inputs",
      "AI estimate context",
    ],
    methods: [
      "Python",
      "scikit-learn",
      "Random Forest",
      "XGBoost",
      "K-Means",
      "TF-IDF",
      "FRED API",
      "AI-assisted estimation",
    ],
    problem:
      "Class 5 estimates are often needed before clean scope, drawings, or reliable quantities exist. The goal was to support an AI-generated estimate experience that could use limited user inputs without pretending the estimate was more precise than the data allowed.",
    challenge:
      "The inherited pipeline had drifted and relied too heavily on unstable size-based predictors. The AI-facing workflow needed trustworthy model inputs from text, geography, units, timing, and repeated scope patterns without leaking the target or overclaiming certainty.",
    approach: [
      "Diagnosed the inherited model drift and identified unstable square-footage dependence as a major failure mode.",
      "Normalized costs for inflation using construction price index data and added geographic cost adjustment signals.",
      "Converted project descriptions into text features and added K-Means scope clusters to capture repeated project patterns.",
      "Tested feature groups through controlled experiments and excluded target-leaking ratio features even when they improved headline metrics.",
      "Structured the model outputs so they could feed an AI-generated cost estimate using user-provided project inputs and signals from multiple models.",
    ],
    metrics: [
      { value: "150K", label: "approximate records represented in the modeling workflow" },
      { value: "+176%", label: "R² improvement against the inherited drifted baseline" },
      { value: "95%", label: "predictions within Class 5 ±50% threshold" },
    ],
    whatItShows:
      "The value was not just the model. It was the translation layer between predictive modeling and AI-assisted estimation: deciding what could be trusted, where uncertainty lived, how to prevent leakage, and how to keep generated estimates grounded in model evidence.",
    impact:
      "+176% R² versus inherited drifted baseline. 95% of predictions within Class 5 ±50% threshold. Delivered a reproducible modeling pipeline designed to support a user-facing, AI-assisted cost estimate experience.",
    image: {
      type: "img",
      src: "/portfolio-images/case_construction_cost.png",
      caption: "model performance dashboard — predicted vs actual and residual analysis",
    },
    color: "#ff4081",
  },
  {
    id: "amazon-content",
    cardTitle: "AI-generated listing updates with keyword safeguards",
    cardSummary:
      "An ecommerce content workflow used AI to draft product listing improvements, scored them against keyword ranking signals, and used causal measurement to prove approved updates worked.",
    label: "Analytics Platform",
    title: "Amazon Content Optimization Platform",
    subtitle: "Compliance · Optimization · Causal Measurement · Catalog Defense",
    kicker: "Causal Inference · Content Intelligence · End-to-End Platform",
    summary:
      "A full-loop content intelligence platform that used AI to draft improved listing content, scored proposed updates against keyword ranking signals, and then used causal measurement to prove the changes worked.",
    decision: "Use AI to improve listings without harming keyword performance",
    output: "AI content workflow + keyword scoring + DiD proof layer",
    role: "AI workflow design, scoring logic, causal measurement, automation",
    projectType: "Prior professional work sample. Client-identifying details and proprietary data removed.",
    signals: [
      "Listing content",
      "AI-generated drafts",
      "Control ASINs",
      "Sales metrics",
      "Traffic metrics",
      "Catalog changes",
      "Keyword rankings",
      "Content quality scores",
    ],
    methods: [
      "Python",
      "statsmodels",
      "OLS / DiD",
      "Grid Search",
      "Snowflake",
      "Slack API",
      "Google Sheets API",
      "AI-assisted content generation",
    ],
    problem:
      "Content optimization was not just a copywriting problem. AI could accelerate the first draft of improved listing content, but every proposed update still had to be checked against keyword ranking signals so optimization did not accidentally reduce discoverability.",
    challenge:
      "The work required a connected system: generate draft listing updates, score them against the ranking terms that mattered, prevent changes that would lower the score, measure whether approved updates drove lift, and monitor the catalog after launch.",
    approach: [
      "Used AI to create the initial pass at updated listing information, giving teams a faster starting point for product titles, bullets, and content structure.",
      "Scored proposed content against keyword ranking signals so updates could be blocked or revised when they risked decreasing search relevance.",
      "Designed regression-based control selection to identify comparable ASINs and support parallel-trends assumptions.",
      "Used difference-in-differences regression as the proof layer to show whether the AI-assisted content workflow produced measurable lift across business metrics like conversion rate, organic visibility, and profit.",
      "Created a catalog monitor that compared live listing content against source-of-truth records and alerted teams when unauthorized changes appeared.",
    ],
    metrics: [
      { value: "AI", label: "generated first-pass listing updates for human review" },
      { value: "16", label: "metrics evaluated in the causal proof layer" },
      { value: "1.5K", label: "OLS fits in larger control-selection searches" },
    ],
    whatItShows:
      "This was AI decision infrastructure, not a content toy. The system used AI for speed, scoring for guardrails, and causal inference for proof — so optimization became measurable, defensible, and operationally protected after publication.",
    impact:
      "Converted AI-assisted listing optimization from uncontrolled content changes into a governed workflow with keyword safeguards, causal proof, and continuous catalog defense.",
    image: {
      type: "img",
      src: "/portfolio-images/case_amazon_content_did.png",
      caption: "difference-in-differences dashboard — intervention, control, and measured lift",
    },
    color: "#b2ff59",
  },
  {
    id: "amazon-anomaly",
    cardTitle: "Early warning system for marketplace performance shifts",
    cardSummary:
      "A monitoring platform combined revenue, ad spend, traffic, buy box, and inventory signals so teams could detect meaningful business movement before it became a client-facing surprise.",
    label: "Anomaly Detection",
    title: "Multi-Signal Amazon Anomaly Detection Platform",
    subtitle: "Prophet · Multi-Rule Consensus · Marketplace Monitoring",
    kicker: "Anomaly Detection · Production Systems · MLOps",
    summary:
      "A production monitoring framework that combined revenue, ad spend, glance views, buy box ownership, and inventory signals to detect unusual business movement before it became buried in standard reporting.",
    decision: "Detect meaningful business movement before the client does",
    output: "Reusable anomaly detection package + alerting workflow",
    role: "Modeling, package design, alert logic, production monitoring",
    projectType: "Prior professional work sample. Client-identifying details and proprietary data removed.",
    signals: [
      "Revenue",
      "Ad spend",
      "Glance views",
      "Buy box ownership",
      "Inventory",
    ],
    methods: [
      "Python",
      "Prophet",
      "Snowflake",
      "Alerting package",
      "Slack API",
      "Google Sheets API",
      "AI-assisted content generation",
      "Keepa",
    ],
    problem:
      "Marketplace performance shifts often show up across multiple signals at once, but standard reporting treats those signals separately. Teams needed earlier warning when revenue, traffic, inventory, or ownership moved in ways that mattered.",
    challenge:
      "Single-signal alerts create noise. The system needed to distinguish ordinary volatility from meaningful business movement and attach enough context for account teams to act.",
    approach: [
      "Modeled expected values per ASIN and metric using time-series forecasts.",
      "Combined multiple monitor classes for sales, spend, traffic, buy box ownership, and inventory in one pass.",
      "Used multi-rule consensus before alerting to reduce false positives from ordinary ecommerce volatility.",
      "Included trend descriptions and likely-cause context so alerts were not just pings, but operational prompts.",
    ],
    metrics: [
      { value: "5", label: "core signal families monitored together" },
      { value: "2+", label: "rules required before alerting" },
      { value: "24/7", label: "production-style monitoring posture" },
    ],
    whatItShows:
      "Good alerting is not just anomaly math. It is signal design: knowing what changes matter, how to reduce noise, and how to provide enough context for a human decision.",
    impact:
      "Production multi-client alerting system catching revenue anomalies, buy box losses, and catalog issues before they became client-facing surprises.",
    image: {
      type: "img",
      src: "/portfolio-images/case_anomaly_detection.png",
      caption: "multi-signal anomaly dashboard — forecast, observed values, and alert context",
    },
    color: "#ff6e40",
  },
  {
    id: "wireless-intake",
    cardTitle: "Production-line intake model for operational bottlenecks",
    cardSummary:
      "A high-volume refurbishment operation needed trustworthy fallback logic when scanner signals failed. I built an interpretable model that stabilized downstream capacity planning.",
    label: "Predictive Operations",
    title: "Wireless Carrier — Production Line Device Intake Model",
    subtitle: "Decision Tree · Online Inference · Operational Throughput",
    kicker: "Anomaly Detection · Online ML · Operations",
    summary:
      "An online model for a high-volume device refurbishment production line, built to stabilize intake when scanner signals could not reliably count devices or detect anomalous device mixes.",
    decision: "Keep the production line moving when scanner confidence is low",
    output: "Interpretable intake model + operational dashboard signal",
    role: "Modeling, inference logic, operational translation",
    projectType: "Prior professional work sample. Identifying details generalized.",
    signals: [
      "Scanner confidence",
      "Box count",
      "Device mix",
      "Throughput",
      "Workstation capacity",
    ],
    methods: [
      "Python",
      "Decision Tree",
      "Azure ML",
      "Power BI",
      "Online Inference",
      "scikit-learn",
    ],
    problem:
      "X-ray scanners at intake could not always count devices per box or detect unusual device mixes. Those misses created downstream capacity shocks across cleaning, grading, and resale workflows.",
    challenge:
      "The model had to work in an operational environment where supervisors needed to understand and contest predictions. A black-box model would have been hard to trust at production-line speed.",
    approach: [
      "Used an interpretable decision tree to estimate device count when scanner confidence fell below threshold.",
      "Added device-mix anomaly detection to flag boxes that did not match expected intake patterns.",
      "Designed outputs around downstream capacity planning rather than abstract model accuracy alone.",
      "Extended model outputs into business-facing dashboards so operations leadership could monitor intake accuracy and anomaly patterns.",
    ],
    metrics: [
      { value: "35K", label: "devices per day in the production environment" },
      { value: "2", label: "detection tasks combined in the model" },
      { value: "1", label: "auditable decision path for operations teams" },
    ],
    whatItShows:
      "Operational ML has to earn trust. The best model is not always the most complex one — it is the one that fits the decision environment, gives users a reason to believe it, and improves the workflow.",
    impact:
      "Stabilized intake throughput for a high-volume refurbishment operation by replacing unreliable scanner fallback logic with a defensible, auditable ML model.",
    image: {
      type: "svg",
      caption: "decision tree — intake classification logic | ~35K devices/day",
    },
    color: "#e53935",
  },
];

export function getCaseStudy(id) {
  return caseStudies.find((study) => study.id === id);
}
