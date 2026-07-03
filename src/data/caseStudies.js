export const caseStudies = [
  {
    id: "construction-cost",
    label: "Machine Learning",
    title: "Class 5 Construction Cost Estimation",
    subtitle: "Georgia Tech Practicum · Random Forest · Feature Engineering",
    kicker: "Machine Learning · Feature Engineering · Decision Support",
    summary:
      "A machine learning pipeline for early-stage construction estimating, designed to turn sparse project descriptions, geography, inflation, and historical line-item patterns into a more reliable conceptual cost signal.",
    decision: "Estimate earlier with less false confidence",
    output: "Prediction pipeline + model diagnostics",
    role: "Data science, feature design, modeling",
    projectType: "Academic / generalized work sample. Proprietary and identifying details removed.",
    signals: [
      "Project text",
      "Geography",
      "Inflation",
      "Scope clusters",
      "Historical cost",
    ],
    methods: [
      "Python",
      "scikit-learn",
      "Random Forest",
      "XGBoost",
      "K-Means",
      "TF-IDF",
      "FRED API",
    ],
    problem:
      "Class 5 estimates are often needed before clean scope, drawings, or reliable quantities exist. The goal was not false precision — it was a better directional signal for conceptual planning.",
    challenge:
      "The inherited pipeline had drifted and relied too heavily on unstable size-based predictors. Useful signal had to be extracted from text, geography, units, timing, and repeated scope patterns without leaking the target.",
    approach: [
      "Diagnosed the inherited model drift and identified unstable square-footage dependence as a major failure mode.",
      "Normalized costs for inflation using construction price index data and added geographic cost adjustment signals.",
      "Converted project descriptions into text features and added K-Means scope clusters to capture repeated project patterns.",
      "Tested feature groups through controlled experiments and excluded target-leaking ratio features even when they improved headline metrics.",
    ],
    metrics: [
      { value: "150K", label: "approximate records represented in the modeling workflow" },
      { value: "+176%", label: "R² improvement against the inherited drifted baseline" },
      { value: "95%", label: "predictions within Class 5 ±50% threshold" },
    ],
    whatItShows:
      "The value was not just the model. It was the translation layer: identifying what could be trusted, where uncertainty lived, how to prevent leakage, and how to explain the output as decision support rather than deterministic truth.",
    impact:
      "+176% R² versus inherited drifted baseline. 95% of predictions within Class 5 ±50% threshold. Delivered a reproducible pipeline and user-facing inference prototype.",
    image: {
      type: "img",
      src: "/portfolio-images/case_construction_cost.png",
      caption: "model performance dashboard — predicted vs actual and residual analysis",
    },
    color: "#ff4081",
  },
  {
    id: "amazon-content",
    label: "Analytics Platform",
    title: "Amazon Content Optimization Platform",
    subtitle: "Compliance · Optimization · Causal Measurement · Catalog Defense",
    kicker: "Causal Inference · Content Intelligence · End-to-End Platform",
    summary:
      "A full-loop content intelligence platform that connected marketplace compliance, content optimization, causal lift measurement, and catalog monitoring into one governed workflow.",
    decision: "Know which listing changes worked — and keep them from regressing",
    output: "Optimization workflow + DiD measurement + production monitor",
    role: "Analytics platform design, causal measurement, automation",
    projectType: "Prior professional work sample. Client-identifying details and proprietary data removed.",
    signals: [
      "Listing content",
      "Control ASINs",
      "Sales metrics",
      "Traffic metrics",
      "Catalog changes",
    ],
    methods: [
      "Python",
      "statsmodels",
      "OLS / DiD",
      "Grid Search",
      "Snowflake",
      "Slack API",
      "Google Sheets API",
    ],
    problem:
      "Content optimization was not just a copywriting problem. Marketplace rule changes and automated content edits created operational risk: listings could be changed, measured poorly, or quietly overwritten after optimization.",
    challenge:
      "The work required a connected system: validate content before publishing, select reasonable controls, measure whether changes drove lift, and monitor the catalog after launch to detect unauthorized regression.",
    approach: [
      "Built a compliance-checking layer to validate listing content against marketplace rules before publishing.",
      "Designed regression-based control selection to identify comparable ASINs and support parallel-trends assumptions.",
      "Measured lift using difference-in-differences regression across business metrics like conversion rate, organic visibility, and profit.",
      "Created a catalog monitor that compared live listing content against source-of-truth records and alerted teams when unauthorized changes appeared.",
    ],
    metrics: [
      { value: "12", label: "client contexts supported by the platform workflow" },
      { value: "16", label: "metrics evaluated per experiment" },
      { value: "1.5K", label: "OLS fits in larger control-selection searches" },
    ],
    whatItShows:
      "This was decision infrastructure, not a dashboard. The platform made optimization measurable, defensible, and operationally protected after publication.",
    impact:
      "Converted listing optimization from uncontrolled changes into a governed, causally measured, continuously defended workflow.",
    image: {
      type: "img",
      src: "/portfolio-images/case_amazon_content_did.png",
      caption: "difference-in-differences dashboard — intervention, control, and measured lift",
    },
    color: "#b2ff59",
  },
  {
    id: "amazon-anomaly",
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
