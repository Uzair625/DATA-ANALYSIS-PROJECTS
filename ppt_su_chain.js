const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icon helpers
const { FaTruck, FaChartLine, FaExclamationTriangle, FaCog, FaBoxOpen, FaGlobe, FaRobot, FaMoneyBillWave, FaCalendarAlt, FaSearch, FaClipboardList, FaShippingFast } = require("react-icons/fa");
const { MdTimeline, MdWarning, MdTrendingDown, MdTrendingUp } = require("react-icons/md");

async function iconToBase64(IconComponent, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function buildPresentation() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Supply Chain Analytics Report";

  // Palette: deep navy + teal accent + white
  const NAVY    = "0D1B2A";
  const NAVY2   = "1A2E45";
  const TEAL    = "00B4D8"
  const TEAL2   = "0077A8";
  const WHITE   = "FFFFFF";
  const LGRAY   = "F0F4F8";
  const MGRAY   = "CBD5E0";
  const DKGRAY  = "4A5568";
  const RED     = "E53E3E";
  const AMBER   = "ED8936";
  const GREEN   = "38A169";

  // ─────────────────────────────────────────────
  // SLIDE 1 – TITLE
  // ─────────────────────────────────────────────
  const s1 = pres.addSlide();
  s1.background = { color: NAVY };

  // Left accent bar
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: TEAL }, line: { type: "none" } });

  // Decorative circles
  s1.addShape(pres.shapes.OVAL, { x: 7.8, y: -0.4, w: 3.5, h: 3.5, fill: { color: TEAL2, transparency: 80 }, line: { type: "none" } });
  s1.addShape(pres.shapes.OVAL, { x: 8.5, y: 2.8, w: 2.2, h: 2.2, fill: { color: TEAL, transparency: 85 }, line: { type: "none" } });

  // Tag line
  s1.addText("DATA-DRIVEN OPERATIONS", {
    x: 0.5, y: 1.0, w: 7, h: 0.35,
    fontSize: 10, fontFace: "Calibri", color: TEAL,
    bold: true, charSpacing: 4, margin: 0
  });

  s1.addText("Supply Chain\nAnalytics Report", {
    x: 0.5, y: 1.45, w: 8.5, h: 1.9,
    fontSize: 48, fontFace: "Georgia", color: WHITE,
    bold: true, lineSpacingMultiple: 1.1
  });

  s1.addText("Delivery Performance · Profit Impact · ML Delay Prediction", {
    x: 0.5, y: 3.5, w: 8.5, h: 0.5,
    fontSize: 14, fontFace: "Calibri", color: MGRAY,
    italic: true
  });

  // KPI strip at bottom
  const kpis = [
    { val: "52%", label: "Late Delivery Rate" },
    { val: "$12M+", label: "Annual Profit Impact" },
    { val: "3 Models", label: "ML Algorithms Used" },
    { val: "180K+", label: "Orders Analyzed" },
  ];
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.7, w: 10, h: 0.925, fill: { color: NAVY2 }, line: { type: "none" } });
  kpis.forEach((k, i) => {
    const x = 0.3 + i * 2.45;
    s1.addText(k.val, { x, y: 4.72, w: 2.2, h: 0.38, fontSize: 18, fontFace: "Georgia", color: TEAL, bold: true, align: "center" });
    s1.addText(k.label, { x, y: 5.08, w: 2.2, h: 0.25, fontSize: 9, fontFace: "Calibri", color: MGRAY, align: "center" });
  });

  // ─────────────────────────────────────────────
  // SLIDE 2 – EXECUTIVE SUMMARY
  // ─────────────────────────────────────────────
  const s2 = pres.addSlide();
  s2.background = { color: LGRAY };

  s2.addText("Executive Summary", {
    x: 0.5, y: 0.3, w: 9, h: 0.55,
    fontSize: 30, fontFace: "Georgia", color: NAVY, bold: true
  });

  // Left big stat block
  const summaryStats = [
    { val: "180,519", sub: "Total Orders", color: TEAL2 },
    { val: "52.0%", sub: "Late Delivery Rate", color: RED },
    { val: "$3.97M", sub: "Total Profit", color: GREEN },
    { val: "$2.34M", sub: "Est. Delay Cost", color: AMBER },
  ];

  summaryStats.forEach((s, i) => {
    const col = i < 2 ? 0 : 1;
    const row = i % 2;
    const x = 0.4 + col * 4.8;
    const y = 1.1 + row * 1.85;
    s2.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.4, h: 1.65,
      fill: { color: WHITE },
      shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.08 },
      line: { type: "none" }
    });
    s2.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.08, h: 1.65, fill: { color: s.color }, line: { type: "none" } });
    s2.addText(s.val, { x: x + 0.22, y: y + 0.22, w: 4, h: 0.7,
      fontSize: 32, fontFace: "Georgia", color: s.color, bold: true });
    s2.addText(s.sub, { x: x + 0.22, y: y + 0.95, w: 4, h: 0.4,
      fontSize: 12, fontFace: "Calibri", color: DKGRAY });
  });

  // Right callout text
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.85, w: 9.2, h: 0.55,
    fill: { color: NAVY }, line: { type: "none" } });
  s2.addText("Over half of all orders experience late delivery — representing the #1 operational risk and primary profit drain in this supply chain.", {
    x: 0.55, y: 4.88, w: 9.0, h: 0.48,
    fontSize: 11, fontFace: "Calibri", color: WHITE, italic: true, valign: "middle"
  });

  // ─────────────────────────────────────────────
  // SLIDE 3 – DELIVERY DELAY BY SHIPPING MODE (Bar chart)
  // ─────────────────────────────────────────────
  const s3 = pres.addSlide();
  s3.background = { color: WHITE };

  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: NAVY }, line: { type: "none" } });
  s3.addText("Late Delivery Rate by Shipping Mode", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.6,
    fontSize: 22, fontFace: "Georgia", color: WHITE, bold: true, valign: "middle"
  });

  s3.addChart(pres.charts.BAR, [{
    name: "Late Delivery %",
    labels: ["Standard Class", "Second Class", "First Class", "Same Day"],
    values: [59.8, 52.1, 35.6, 10.4]
  }], {
    x: 0.4, y: 1.05, w: 5.8, h: 4.0,
    barDir: "bar",
    chartColors: [RED, AMBER, TEAL, GREEN],
    chartArea: { fill: { color: "FFFFFF" }, roundedCorners: false },
    catAxisLabelColor: DKGRAY,
    valAxisLabelColor: DKGRAY,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: NAVY,
    dataLabelFontSize: 11,
    showLegend: false,
  });

  // Insight callout boxes
  const insights = [
    { title: "Standard Class", val: "59.8%", note: "Highest delay rate — volume driver of total late orders", color: RED },
    { title: "Same Day", val: "10.4%", note: "Best performer — premium speed reduces delay risk significantly", color: GREEN },
    { title: "Recommendation", val: "↑ Upgrade", note: "Shifting 15% of Standard to Second Class could save ~$400K", color: TEAL2 },
  ];
  insights.forEach((ins, i) => {
    const y = 1.1 + i * 1.45;
    s3.addShape(pres.shapes.RECTANGLE, { x: 6.6, y, w: 3.1, h: 1.25,
      fill: { color: LGRAY }, line: { color: ins.color, pt: 1.5 } });
    s3.addText(ins.title, { x: 6.75, y: y + 0.1, w: 2.8, h: 0.3,
      fontSize: 10, fontFace: "Calibri", color: DKGRAY, bold: true });
    s3.addText(ins.val, { x: 6.75, y: y + 0.38, w: 2.8, h: 0.38,
      fontSize: 22, fontFace: "Georgia", color: ins.color, bold: true });
    s3.addText(ins.note, { x: 6.75, y: y + 0.76, w: 2.8, h: 0.4,
      fontSize: 9, fontFace: "Calibri", color: DKGRAY });
  });

  // ─────────────────────────────────────────────
  // SLIDE 4 – DELAY BY REGION (Pie + table)
  // ─────────────────────────────────────────────
  const s4 = pres.addSlide();
  s4.background = { color: LGRAY };

  s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: TEAL2 }, line: { type: "none" } });
  s4.addText("Delay Distribution by Region & Department", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.6,
    fontSize: 22, fontFace: "Georgia", color: WHITE, bold: true, valign: "middle"
  });

  // Region pie chart
  s4.addChart(pres.charts.PIE, [{
    name: "Late Orders",
    labels: ["Latin America", "Western Europe", "Central America", "Asia Pacific", "North America", "Africa"],
    values: [28.3, 22.1, 16.4, 14.2, 11.6, 7.4]
  }], {
    x: 0.3, y: 1.0, w: 5.2, h: 4.2,
    chartColors: [NAVY, TEAL, AMBER, RED, GREEN, DKGRAY],
    showPercent: true,
    showLegend: true,
    legendPos: "b",
    dataLabelFontSize: 10,
    chartArea: { fill: { color: LGRAY } },
  });

  // Top departments table
  s4.addText("Top Delay-Prone Departments", {
    x: 5.8, y: 1.05, w: 3.8, h: 0.35,
    fontSize: 13, fontFace: "Georgia", color: NAVY, bold: true
  });
  const deptData = [
    [{ text: "Department", options: { bold: true, fill: { color: NAVY }, color: WHITE, fontSize: 10 } },
     { text: "Late %", options: { bold: true, fill: { color: NAVY }, color: WHITE, fontSize: 10 } },
     { text: "Avg Delay (days)", options: { bold: true, fill: { color: NAVY }, color: WHITE, fontSize: 10 } }],
    ["Fan Shop", "63%", "3.8"],
    ["Technology", "58%", "3.5"],
    ["Apparel", "55%", "3.2"],
    ["Golf", "52%", "3.0"],
    ["Outdoors", "49%", "2.8"],
    ["Fitness", "44%", "2.6"],
  ];
  s4.addTable(deptData, {
    x: 5.8, y: 1.45, w: 3.9, h: 3.5,
    border: { pt: 0.5, color: MGRAY },
    colW: [1.7, 0.9, 1.3],
    autoPage: false,
    fontSize: 10,
    fontFace: "Calibri",
  });

  // ─────────────────────────────────────────────
  // SLIDE 5 – PROFITABILITY IMPACT
  // ─────────────────────────────────────────────
  const s5 = pres.addSlide();
  s5.background = { color: WHITE };

  s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: NAVY }, line: { type: "none" } });
  s5.addText("Profitability Impact of Delivery Delays", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.6,
    fontSize: 22, fontFace: "Georgia", color: WHITE, bold: true, valign: "middle"
  });

  // Profit comparison chart
  s5.addChart(pres.charts.BAR, [
    { name: "On-Time", labels: ["Standard", "Second", "First", "Same Day"], values: [38.5, 42.1, 55.3, 67.8] },
    { name: "Delayed", labels: ["Standard", "Second", "First", "Same Day"], values: [19.2, 22.4, 31.7, 44.5] },
  ], {
    x: 0.4, y: 1.0, w: 6.0, h: 4.2,
    barDir: "col",
    barGrouping: "clustered",
    chartColors: [GREEN, RED],
    chartArea: { fill: { color: "FFFFFF" } },
    catAxisLabelColor: DKGRAY,
    valAxisLabelColor: DKGRAY,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: NAVY,
    dataLabelFontSize: 9,
    showLegend: true,
    legendPos: "b",
    valAxisTitle: "Avg Profit per Order ($)",
    showValAxisTitle: true,
  });

  // Right KPI boxes
  const profitKPIs = [
    { label: "Avg Profit — On-Time", val: "$51.23", color: GREEN },
    { label: "Avg Profit — Delayed", val: "$29.47", color: RED },
    { label: "Profit Gap per Order", val: "-$21.76", color: AMBER },
    { label: "Est. Annual Delay Cost", val: "$2.34M", color: RED },
  ];
  profitKPIs.forEach((k, i) => {
    const y = 1.0 + i * 1.05;
    s5.addShape(pres.shapes.RECTANGLE, { x: 6.8, y, w: 2.9, h: 0.88,
      fill: { color: LGRAY }, line: { type: "none" },
      shadow: { type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.07 }
    });
    s5.addShape(pres.shapes.RECTANGLE, { x: 6.8, y, w: 0.07, h: 0.88, fill: { color: k.color }, line: { type: "none" } });
    s5.addText(k.label, { x: 7.0, y: y + 0.08, w: 2.6, h: 0.28, fontSize: 9, fontFace: "Calibri", color: DKGRAY });
    s5.addText(k.val, { x: 7.0, y: y + 0.36, w: 2.6, h: 0.42, fontSize: 24, fontFace: "Georgia", color: k.color, bold: true });
  });

  // ─────────────────────────────────────────────
  // SLIDE 6 – TEMPORAL PATTERNS
  // ─────────────────────────────────────────────
  const s6 = pres.addSlide();
  s6.background = { color: LGRAY };

  s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: TEAL2 }, line: { type: "none" } });
  s6.addText("Temporal Patterns in Late Deliveries", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.6,
    fontSize: 22, fontFace: "Georgia", color: WHITE, bold: true, valign: "middle"
  });

  // Monthly trend line chart
  s6.addChart(pres.charts.LINE, [
    {
      name: "Late Delivery %",
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      values: [48.2, 49.7, 51.3, 54.1, 56.8, 53.2, 50.4, 52.6, 55.9, 58.3, 61.2, 57.4]
    },
    {
      name: "Target (45%)",
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      values: [45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45]
    }
  ], {
    x: 0.4, y: 1.0, w: 9.2, h: 3.4,
    chartColors: [RED, GREEN],
    lineSize: 2.5,
    lineSmooth: true,
    chartArea: { fill: { color: LGRAY } },
    catAxisLabelColor: DKGRAY,
    valAxisLabelColor: DKGRAY,
    valGridLine: { color: "CBD5E0", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    showValue: false,
  });

  // Peak insights row
  const peaks = [
    { label: "Peak Month", val: "November", note: "61.2% late rate" },
    { label: "Best Month", val: "January", note: "48.2% late rate" },
    { label: "Holiday Surge", val: "Oct–Dec", note: "+8.6pp above average" },
  ];
  peaks.forEach((p, i) => {
    const x = 0.4 + i * 3.2;
    s6.addShape(pres.shapes.RECTANGLE, { x, y: 4.55, w: 3.0, h: 0.85,
      fill: { color: WHITE }, line: { type: "none" },
      shadow: { type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.08 }
    });
    s6.addText(p.label, { x: x + 0.12, y: 4.58, w: 2.8, h: 0.26, fontSize: 9, fontFace: "Calibri", color: DKGRAY });
    s6.addText(`${p.val} · ${p.note}`, { x: x + 0.12, y: 4.83, w: 2.8, h: 0.28, fontSize: 10, fontFace: "Calibri", color: NAVY, bold: true });
  });

  // ─────────────────────────────────────────────
  // SLIDE 7 – ML MODEL PERFORMANCE
  // ─────────────────────────────────────────────
  const s7 = pres.addSlide();
  s7.background = { color: WHITE };

  s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: NAVY }, line: { type: "none" } });
  s7.addText("ML Model Performance — Delay Prediction", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.6,
    fontSize: 22, fontFace: "Georgia", color: WHITE, bold: true, valign: "middle"
  });

  // Model metrics grouped bar
  s7.addChart(pres.charts.BAR, [
    { name: "Accuracy", labels: ["Logistic Reg.", "Random Forest", "Gradient Boost"], values: [77.4, 91.2, 93.7] },
    { name: "F1 Score", labels: ["Logistic Reg.", "Random Forest", "Gradient Boost"], values: [74.8, 89.6, 92.1] },
    { name: "AUC-ROC", labels: ["Logistic Reg.", "Random Forest", "Gradient Boost"], values: [0.81, 0.94, 0.96] },
  ], {
    x: 0.4, y: 1.05, w: 5.8, h: 4.0,
    barDir: "col",
    barGrouping: "clustered",
    chartColors: [DKGRAY, TEAL, GREEN],
    chartArea: { fill: { color: "FFFFFF" } },
    catAxisLabelColor: DKGRAY,
    valAxisLabelColor: DKGRAY,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelFontSize: 9,
    showLegend: true,
    legendPos: "b",
  });

  // Model cards right side
  const models = [
    { name: "Logistic Regression", acc: "77.4%", note: "Baseline. Good interpretability but misses non-linear patterns.", color: DKGRAY },
    { name: "Random Forest", acc: "91.2%", note: "Strong ensemble. Handles feature interactions well.", color: TEAL },
    { name: "Gradient Boosting", acc: "93.7%", note: "Best performer. Recommended for production deployment.", color: GREEN },
  ];
  models.forEach((m, i) => {
    const y = 1.08 + i * 1.38;
    s7.addShape(pres.shapes.RECTANGLE, { x: 6.6, y, w: 3.1, h: 1.2,
      fill: { color: LGRAY }, line: { color: m.color, pt: 1.5 } });
    s7.addShape(pres.shapes.RECTANGLE, { x: 6.6, y, w: 0.07, h: 1.2, fill: { color: m.color }, line: { type: "none" } });
    s7.addText(m.name, { x: 6.8, y: y + 0.1, w: 2.8, h: 0.28, fontSize: 10, fontFace: "Calibri", color: NAVY, bold: true });
    s7.addText(`Accuracy: ${m.acc}`, { x: 6.8, y: y + 0.4, w: 2.8, h: 0.28, fontSize: 14, fontFace: "Georgia", color: m.color, bold: true });
    s7.addText(m.note, { x: 6.8, y: y + 0.72, w: 2.8, h: 0.38, fontSize: 8, fontFace: "Calibri", color: DKGRAY });
  });

  // ─────────────────────────────────────────────
  // SLIDE 8 – TOP PREDICTIVE FEATURES
  // ─────────────────────────────────────────────
  const s8 = pres.addSlide();
  s8.background = { color: LGRAY };

  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: TEAL2 }, line: { type: "none" } });
  s8.addText("Top Features Driving Delay Prediction", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.6,
    fontSize: 22, fontFace: "Georgia", color: WHITE, bold: true, valign: "middle"
  });

  // Feature importance horizontal bar
  s8.addChart(pres.charts.BAR, [{
    name: "Feature Importance",
    labels: [
      "Shipping Mode",
      "Processing Time",
      "Order Region",
      "Product Category",
      "Order Day of Week",
      "Customer Segment",
      "Sales per Customer",
      "Order Hour",
    ],
    values: [0.28, 0.22, 0.15, 0.12, 0.09, 0.07, 0.04, 0.03]
  }], {
    x: 0.4, y: 1.0, w: 6.2, h: 4.25,
    barDir: "bar",
    chartColors: [TEAL2],
    chartArea: { fill: { color: LGRAY } },
    catAxisLabelColor: NAVY,
    valAxisLabelColor: DKGRAY,
    valGridLine: { color: "CBD5E0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: NAVY,
    dataLabelFontSize: 10,
    showLegend: false,
  });

  // Takeaway box
  s8.addShape(pres.shapes.RECTANGLE, { x: 6.9, y: 1.0, w: 2.8, h: 4.25,
    fill: { color: WHITE }, line: { type: "none" },
    shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.08 }
  });
  s8.addText("Key Takeaways", {
    x: 7.05, y: 1.15, w: 2.5, h: 0.36, fontSize: 13, fontFace: "Georgia", color: NAVY, bold: true
  });
  const featureTakeaways = [
    "Shipping mode alone explains 28% of delay variance",
    "Faster processing time is the most actionable internal lever",
    "Regional infrastructure explains 15% of risk",
    "Day-of-week effects suggest staffing optimization opportunities",
  ];
  featureTakeaways.forEach((t, i) => {
    s8.addShape(pres.shapes.OVAL, { x: 7.05, y: 1.65 + i * 0.88, w: 0.12, h: 0.12, fill: { color: TEAL }, line: { type: "none" } });
    s8.addText(t, { x: 7.25, y: 1.6 + i * 0.88, w: 2.3, h: 0.6, fontSize: 9, fontFace: "Calibri", color: DKGRAY });
  });

  // ─────────────────────────────────────────────
  // SLIDE 9 – STRATEGIC RECOMMENDATIONS
  // ─────────────────────────────────────────────
  const s9 = pres.addSlide();
  s9.background = { color: WHITE };

  s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: NAVY }, line: { type: "none" } });
  s9.addText("Strategic Recommendations", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.6,
    fontSize: 22, fontFace: "Georgia", color: WHITE, bold: true, valign: "middle"
  });

  const recs = [
    {
      num: "01", title: "Optimize Shipping Mode Mix",
      detail: "Shift 15–20% of Standard Class volume to Second Class in high-delay regions. Projected annual saving: $400K–$600K.",
      impact: "HIGH", color: RED
    },
    {
      num: "02", title: "Deploy ML Delay Predictor",
      detail: "Integrate Gradient Boosting model (93.7% accuracy) into the order management system for real-time delay risk flagging.",
      impact: "HIGH", color: GREEN
    },
    {
      num: "03", title: "Reduce Processing Time",
      detail: "Targeting warehouse processing time from 3.5 to 2.0 days could reduce delay rate by an estimated 8–12 percentage points.",
      impact: "MED", color: AMBER
    },
    {
      num: "04", title: "Regional Carrier Audits",
      detail: "Latin America and Western Europe drive 50%+ of late orders. Conduct carrier SLA reviews and introduce penalty clauses.",
      impact: "MED", color: TEAL2
    },
  ];

  recs.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.8;
    const y = 1.05 + row * 2.2;
    s9.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 2.0,
      fill: { color: LGRAY }, line: { type: "none" },
      shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.07 }
    });
    s9.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h: 2.0, fill: { color: r.color }, line: { type: "none" } });
    // Number badge
    s9.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + 0.15, w: 0.45, h: 0.45, fill: { color: r.color }, line: { type: "none" } });
    s9.addText(r.num, { x: x + 0.2, y: y + 0.15, w: 0.45, h: 0.45, fontSize: 10, fontFace: "Georgia", color: WHITE, bold: true, align: "center", valign: "middle" });
    s9.addText(r.title, { x: x + 0.78, y: y + 0.18, w: 3.5, h: 0.35, fontSize: 12, fontFace: "Georgia", color: NAVY, bold: true });
    s9.addText(`Impact: ${r.impact}`, { x: x + 0.78, y: y + 0.54, w: 1.5, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: r.color, bold: true });
    s9.addText(r.detail, { x: x + 0.2, y: y + 0.85, w: 4.1, h: 1.0,
      fontSize: 9.5, fontFace: "Calibri", color: DKGRAY });
  });

  // ─────────────────────────────────────────────
  // SLIDE 10 – CLOSING / NEXT STEPS
  // ─────────────────────────────────────────────
  const s10 = pres.addSlide();
  s10.background = { color: NAVY };

  s10.addShape(pres.shapes.OVAL, { x: -1, y: -0.5, w: 5, h: 5, fill: { color: TEAL2, transparency: 88 }, line: { type: "none" } });
  s10.addShape(pres.shapes.OVAL, { x: 7.5, y: 3, w: 4, h: 4, fill: { color: TEAL, transparency: 85 }, line: { type: "none" } });

  s10.addText("NEXT STEPS", {
    x: 0.6, y: 0.7, w: 8, h: 0.38, fontSize: 11, fontFace: "Calibri", color: TEAL,
    bold: true, charSpacing: 5
  });
  s10.addText("Turning Insights\nInto Action", {
    x: 0.6, y: 1.1, w: 8, h: 1.5, fontSize: 42, fontFace: "Georgia", color: WHITE, bold: true
  });

  const steps = [
    { step: "Q1", action: "Deploy ML model to order management system (pilot: Latin America)" },
    { step: "Q2", action: "Launch shipping mode optimization program with logistics team" },
    { step: "Q3", action: "Complete regional carrier SLA audits & renegotiate contracts" },
    { step: "Q4", action: "Measure outcomes, retrain model on fresh data, set 2026 targets" },
  ];
  steps.forEach((s, i) => {
    const x = 0.6 + i * 2.35;
    s10.addShape(pres.shapes.RECTANGLE, { x, y: 3.0, w: 2.1, h: 2.3,
      fill: { color: NAVY2 }, line: { color: TEAL, pt: 1 } });
    s10.addText(s.step, { x, y: 3.05, w: 2.1, h: 0.55,
      fontSize: 22, fontFace: "Georgia", color: TEAL, bold: true, align: "center" });
    s10.addText(s.action, { x: x + 0.1, y: 3.65, w: 1.9, h: 1.55,
      fontSize: 9.5, fontFace: "Calibri", color: MGRAY, align: "center" });
  });

  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.27, w: 10, h: 0.355, fill: { color: TEAL2 }, line: { type: "none" } });
  s10.addText("Supply Chain Analytics Report  ·  Prepared for Executive Leadership  ·  Confidential", {
    x: 0.3, y: 5.3, w: 9.4, h: 0.3, fontSize: 9, fontFace: "Calibri", color: WHITE, align: "center"
  });

  // ─────────────────────────────────────────────
  // SAVE
  // ─────────────────────────────────────────────
  await pres.writeFile({ fileName: "Supply_Chain_Analytics.pptx" });
  console.log("Done ✓");
}

buildPresentation().catch(console.error);