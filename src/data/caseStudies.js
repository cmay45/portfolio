export const caseStudies = [
  {
    id: "purchase-propensity",
    cardTitle: "Replace a legacy lead score with a signal that predicts purchase",
    cardSummary:
      "The existing lead score put buyers at the top of the list only about half the time. A behavioral propensity model increased the purchase rate among the highest-ranked 20% of leads from roughly 52% to 88% — giving sales a much cleaner priority list.",
    label: "Prediction & Prioritization",
    title: "Purchase Propensity Modeling from Customer Behavior",
    subtitle: "Behavioral Signals · Gradient Boosting · Lead Prioritization",
    kicker: "Propensity Modeling · Customer Intelligence · Sales Prioritization",
    summary:
      "A first-purchase propensity model that turned CRM, web, email, form, ecommerce, timing, and dealer-context signals into a ranked probability of purchase — then tested that signal directly against the existing lead score.",
    decision: "Which customers should sales and nurture workflows prioritize?",
    output: "Purchase propensity score + ranked lead population + model comparison",
    role: "Feature design, modeling, validation, scoring, business interpretation",
    projectType: "Prior professional work sample. Organization and client-identifying details removed.",
    signals: [
      "Direct sales contact request",
      "High-intent forms",
      "Brochure requests",
      "Web visits",
      "Email engagement",
      "Signal recency",
      "Signal velocity",
      "Ecommerce behavior",
      "Dealer assignment",
      "Geography",
    ],
    methods: [
      "Python",
      "scikit-learn",
      "Gradient Boosting",
      "SHAP",
      "ROC / PR evaluation",
      "Stratified cross-validation",
      "Logistic regression comparison",
      "Decile scoring",
    ],
    problem:
      "A high-consideration consumer brand had years of customer behavior across CRM, web, email, forms, ecommerce, and dealer interactions. The existing lead score summarized engagement and fit, but it did not directly answer the commercial question: who is actually most likely to purchase?",
    challenge:
      "The model needed to use pre-purchase behavioral signals, work across a population of more than one million mature contacts, produce an actionable ranked score, and demonstrate whether it contained information beyond the legacy lead score rather than merely creating another number for sales to ignore.",
    approach: [
      "Built the first-purchase feature set around pre-purchase behavioral signals, including form activity, web engagement, email behavior, signal recency and velocity, ecommerce activity, and dealer context.",
      "Filtered to contacts with at least five years of observable history, leaving 1,055,491 mature contacts from a 1.71M-contact source population.",
      "Trained a gradient-boosted classifier on a 148,248-contact development sample and validated performance with a held-out test set plus five-fold stratified cross-validation.",
      "Used feature importance and SHAP analysis to understand which behaviors drove the prediction instead of treating the model as a black box.",
      "Compared modeled propensity directly with the existing lead score on 118,339 contacts that had both values, testing propensity alone, lead score alone, and the two combined.",
      "Exported ranked propensity scores so the model could support routing, prioritization, and nurture decisions rather than remain an offline analysis.",
    ],
    metrics: [
      { value: "~88%", label: "purchase rate among the highest-ranked 20% by propensity" },
      { value: "~52%", label: "purchase rate among the highest-ranked 20% by legacy lead score" },
      { value: "0.979", label: "propensity ROC AUC (technical validation)" },
    ],
    whatItShows:
      "The business result was clearer than the model metric alone: among the highest-ranked 20% of leads, roughly 88% of those prioritized by behavioral propensity purchased versus about 52% under the legacy lead score. The analysis also identified which customer behaviors carried the strongest purchase signal and showed that the legacy score added essentially no useful predictive information once propensity was available.",
    impact:
      "Created a ranked, interpretable purchase signal for sales and nurture prioritization. At the top 20% of the ranked population, purchase rate improved from roughly 52% under the legacy score to roughly 88% under propensity. For technical validation, propensity reached 0.979 AUC versus 0.791 for the legacy score, and combining the two did not improve on propensity alone.",
    image: {
      type: "propensity",
      caption: "behavioral signal interpretation + predictive comparison against the legacy lead score",
    },
    color: "#58e1cf",
  },
  {
    id: "media-data-platform",
    cardTitle: "Build a governed analytical foundation before scaling reporting or AI",
    cardSummary:
      "Campaign and planning data was fragmented across sources, while transformations were repeated downstream in reporting. I built a GCP media data platform that standardized the data in BigQuery/Dataform and opened governed self-service access through MCP.",
    label: "Analytical Foundation",
    title: "GCP Media Data Platform",
    subtitle: "Cloud Run · BigQuery · Dataform · API · MCP",
    kicker: "Data Engineering · Governed Analytics · AI-Ready Architecture",
    summary:
      "A production-oriented media data platform that consolidated campaign and planning data into a governed analytical layer, reduced repeated reporting logic, and created a trusted foundation for dashboards, analysis, and controlled AI access.",
    decision: "How do we make media reporting trustworthy, reusable, and accessible without duplicating logic?",
    output: "Staging pipeline + curated models + governed BigQuery mart + MCP access",
    role: "Platform architecture, ingestion design, modeling, governance, AI access pattern",
    projectType: "Prior professional work sample. Organization and client-identifying details removed.",
    signals: [
      "Campaign plans",
      "Manual media files",
      "Campaign status data",
      "External platform data",
      "Governed dimensions",
      "Standardized measures",
    ],
    methods: [
      "Google Cloud Platform",
      "Cloud Run",
      "BigQuery",
      "Dataform",
      "API ingestion",
      "SQL / dbt-style modeling",
      "Claude",
      "MCP",
    ],
    problem:
      "Media data lived across campaign plans, manual files, campaign-status sources, and external systems. Reporting logic was fragmented and difficult to scale, with transformations repeated downstream across dashboards, channels, clients, and dimensions.",
    challenge:
      "The team needed a reliable path from raw source data to reporting without making dashboards responsible for business logic. The platform also needed governed access patterns so analysts and future AI workflows could query trusted data rather than bypassing the modeled layer.",
    approach: [
      "Built API-based and scheduled ingestion into Cloud Run with raw-data validation and a staging layer in BigQuery.",
      "Moved recurring transformations upstream into Dataform-managed curated models so definitions could be reused rather than recreated in individual dashboards.",
      "Created a governed BigQuery data mart as the shared analytical source for standardized reporting and operational analysis.",
      "Structured the pipeline in distinct source, staging, curated-model, and consumption layers to make lineage and ownership easier to understand.",
      "Added role-based MCP access through Claude so users could ask questions of governed data while preserving the same trusted analytical layer used by reporting.",
    ],
    metrics: [
      { value: "1", label: "governed source of truth replacing repeated downstream transformations" },
      { value: "5", label: "clear architecture layers from source through reporting and self-service access" },
      { value: "MCP", label: "controlled AI access to trusted analytical data" },
    ],
    whatItShows:
      "AI access is only as useful as the data layer beneath it. By centralizing transformation logic and creating governed models first, the same platform could support more reliable dashboards, analyst workflows, and conversational access without creating competing definitions of the business.",
    impact:
      "Standardized fragmented media data into a cleaner governed pipeline, improved reporting reliability and usability, reduced duplicated transformation logic, and created a scalable foundation for future integrations and analytics work.",
    image: {
      type: "media-platform",
      caption: "source → staging → curated models → governed data mart → reporting, with controlled MCP self-service access",
    },
    color: "#7ccdff",
  },
  {
    id: "construction-cost",
    cardTitle: "Earlier construction estimates without false precision",
    cardSummary:
      "Early-stage estimates had too little scope for confident pricing. I rebuilt the modeling layer around historical cost, geography, inflation, and scope signals — improving R² 176% from the inherited drifted baseline and keeping 95% of predictions within the Class 5 range.",
    label: "Cost & Forecasting",
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
    cardTitle: "Faster listing optimization with proof and guardrails",
    cardSummary:
      "AI could speed up product-content changes, but uncontrolled edits risked search performance. I built a governed workflow that generated drafts, protected keyword relevance, and used causal measurement across 16 metrics to prove whether approved changes created lift.",
    label: "Measurement & Causal Analysis",
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
    cardTitle: "Detect business problems before they become surprises",
    cardSummary:
      "Revenue, traffic, ad spend, buy box, and inventory were monitored separately, making meaningful shifts easy to miss. I combined them into a multi-signal warning system that surfaced actionable movement before it became a client-facing surprise.",
    label: "Early Warning",
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
    cardTitle: "Keep a 35K-device production line moving when scanners fail",
    cardSummary:
      "Scanner uncertainty was creating downstream capacity shocks in a ~35K-device-per-day refurbishment operation. I built an auditable fallback model that estimated intake and flagged unusual device mixes so operations could plan capacity with more confidence.",
    label: "Operations & Capacity",
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
