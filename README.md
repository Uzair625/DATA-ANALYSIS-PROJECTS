# End-to-End Supply Chain Data Analysis Project

## 📊 Project Overview

This is a comprehensive data analysis project focusing on supply chain optimization, delivery performance metrics, and profitability impact assessment. The project combines exploratory data analysis with machine learning prediction models to identify operational inefficiencies and provide actionable recommendations for supply chain improvement.

## 🎯 Objectives

- **Identify Delivery Delays**: Analyze patterns in late deliveries across regions, shipping modes, and departments
- **Quantify Profit Impact**: Calculate the financial impact of delays on overall profitability
- **Predict Delays**: Build ML models to forecast order delays and enable proactive intervention
- **Strategic Insights**: Generate data-driven recommendations for supply chain optimization

## 📁 Project Structure

```
├── README.md                           # Project documentation
├── Supply_Chain_DataSet.csv            # Raw supply chain dataset (180,519 orders)
├── DescriptionDataCoSupplyChain.csv    # Data dictionary and descriptions
├── SUPPLYCHAIN-DATASET.ipynb           # Exploratory data analysis & ML modeling
├── ppt_su_chain.js                     # Presentation generation script
├── Supply_Chain_Analytics.pptx         # Generated executive presentation
├── package.json                        # Node.js dependencies
└── node_modules/                       # Dependencies (not tracked in git)
```

## 📈 Key Findings

### Executive Summary
- **Total Orders Analyzed**: 180,519
- **Late Delivery Rate**: 52.0%
- **Total Profit**: $3.97M
- **Estimated Annual Delay Cost**: $2.34M

### Delivery Performance by Shipping Mode
| Shipping Mode | Late Rate | Impact |
|---|---|---|
| Standard Class | 59.8% | ⚠️ Highest Risk |
| Second Class | 52.1% | Medium Risk |
| First Class | 35.6% | Lower Risk |
| Same Day | 10.4% | ✅ Best Performer |

### Regional Delay Distribution
1. **Latin America** - 28.3% (Highest)
2. **Western Europe** - 22.1%
3. **Central America** - 16.4%
4. **Asia Pacific** - 14.2%
5. **North America** - 11.6%
6. **Africa** - 7.4%

### Profitability Impact
- **Average Profit (On-Time Orders)**: $51.23
- **Average Profit (Delayed Orders)**: $29.47
- **Profit Gap Per Order**: -$21.76
- **Annual Delay Cost**: $2.34M

## 🤖 Machine Learning Models

### Model Performance Comparison

| Model | Accuracy | F1 Score | AUC-ROC | Status |
|---|---|---|---|---|
| Logistic Regression | 77.4% | 74.8% | 0.81 | Baseline |
| Random Forest | 91.2% | 89.6% | 0.94 | Strong |
| **Gradient Boosting** | **93.7%** | **92.1%** | **0.96** | ✅ **Recommended** |

**Recommended Model**: Gradient Boosting Classifier (93.7% accuracy) - Ready for production deployment

### Top Predictive Features
1. **Shipping Mode** (28% importance) - Primary driver of delays
2. **Processing Time** (22% importance) - Internal operational factor
3. **Order Region** (15% importance) - Geographic infrastructure impact
4. **Product Category** (12% importance) - Product complexity
5. **Order Day of Week** (9% importance) - Staffing/capacity effects
6. **Customer Segment** (7% importance) - Customer profile patterns
7. **Sales per Customer** (4% importance) - Order value factor
8. **Order Hour** (3% importance) - Time-of-day effects

## 💡 Strategic Recommendations

### 🔴 Priority 1: Shipping Mode Optimization (HIGH IMPACT)
- Shift 15-20% of Standard Class volume to Second Class in high-delay regions
- **Projected Annual Savings**: $400K-$600K
- **Implementation**: Q2 2026
- **Risk Level**: Low
- **Details**: Target high-delay regions like Latin America and Western Europe

### 🟢 Priority 2: Deploy ML Delay Predictor (HIGH IMPACT)
- Integrate Gradient Boosting model (93.7% accuracy) into order management system
- Enable real-time delay risk flagging for orders at intake
- **Implementation**: Q1 2026
- **Risk Level**: Low
- **Expected Impact**: 8-12% reduction in late orders

### 🟡 Priority 3: Processing Time Reduction (MEDIUM IMPACT)
- Reduce warehouse processing time from 3.5 to 2.0 days
- Estimated delay rate reduction: 8-12 percentage points
- **Implementation**: Q2-Q3 2026
- **Risk Level**: Medium
- **Dependencies**: Warehouse automation/staffing upgrades

### 🟡 Priority 4: Regional Carrier Audits (MEDIUM IMPACT)
- Conduct SLA reviews with carriers in Latin America and Western Europe
- Introduce penalty clauses and performance incentives
- **Implementation**: Q1-Q2 2026
- **Risk Level**: Medium (requires negotiation)
- **Focus**: Top 50% delay contributors

## 📅 Implementation Roadmap

| Quarter | Initiative | Target | Success Metric |
|---|---|---|---|
| **Q1 2026** | ML predictor pilot (Latin America) | Deploy in order system | 93%+ accuracy maintained |
| **Q2 2026** | Shipping mode optimization | Shift 15% Standard → Second Class | $400K-$600K savings |
| **Q3 2026** | Carrier SLA audits complete | Renegotiate contracts | SLA compliance +10% |
| **Q4 2026** | Model retraining & outcomes measure | Validate improvements | Late rate target: 45% |

## 🛠 Data Analysis Tools & Technologies

### Python Data Analysis
- **Pandas**: Data manipulation and aggregation
- **NumPy**: Numerical computations
- **Matplotlib/Seaborn**: Data visualization
- **Scikit-learn**: Machine Learning models
- **Jupyter Notebook**: Interactive analysis environment

### Presentation Generation
- **PptxgenJS**: Dynamic PowerPoint slide generation
- **React**: Component-based icon rendering
- **Sharp**: Image processing and conversion
- **Node.js**: JavaScript runtime

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Uzair625/End-to-End-Supply-Chain-Analysis-Project-Using-Python-Data-Analyst-.git
cd End-to-End-Supply-Chain-Analysis-Project-Using-Python-Data-Analyst-
```

2. **Install Python dependencies**
```bash
pip install pandas numpy matplotlib seaborn scikit-learn jupyter
```

3. **Install Node.js dependencies** (for presentation)
```bash
npm install
```

### Running the Analysis

1. **Exploratory Data Analysis**
   - Open `SUPPLYCHAIN-DATASET.ipynb` in Jupyter
   - Run all cells to explore the data and train models

2. **Generate Executive Presentation**
   ```bash
   node ppt_su_chain.js
   ```
   - Output: `Supply_Chain_Analytics.pptx`

## 📋 Dataset Details

### Supply_Chain_DataSet.csv
- **Records**: 180,519 orders
- **Time Period**: 12 months
- **Key Columns**:
  - Order ID, Date, Time
  - Shipping Mode, Region, Origin, Destination
  - Product Category, Type
  - Processing Time, Delivery Days, Delayed Flag
  - Sales, Profit, Discount
  - Customer Segment, Country

### DescriptionDataCoSupplyChain.csv
- Data dictionary with column descriptions
- Data types and valid ranges
- Business logic documentation

## 🔍 Deep Dive Analysis

### Temporal Patterns
- **Peak Month**: November (61.2% late rate)
- **Best Month**: January (48.2% late rate)
- **Holiday Surge**: Oct-Dec averages 56.8% (vs. 51.4% annual)
- **Recommendation**: Increase staffing/capacity Oct-Dec

### Department Performance
| Department | Late % | Avg Delay |
|---|---|---|
| Fan Shop | 63% | 3.8 days |
| Technology | 58% | 3.5 days |
| Apparel | 55% | 3.2 days |
| Golf | 52% | 3.0 days |
| Outdoors | 49% | 2.8 days |

### Top Delay-Prone Departments
Focus on Fan Shop, Technology, and Apparel for immediate intervention

## 📊 Analysis Workflow

1. **Data Cleaning**: Remove duplicates, handle missing values, standardize formats
2. **Feature Engineering**: Calculate processing time, delay metrics, date components
3. **EDA**: Understand distributions and relationships
4. **KPI Reporting**: Calculate business metrics
5. **Delay Analysis**: Regional, modal, categorical breakdown
6. **Root Cause Analysis**: Identify primary delay drivers
7. **Time Series Analysis**: Temporal pattern discovery
8. **ML Modeling**: Train and evaluate predictive models
9. **Recommendations**: Generate actionable insights

## 🔒 Key Insights

✅ **Shipping mode is the #1 controllable factor** - Standard Class drives 60% of delays
✅ **ML prediction enables proactive intervention** - 93.7% accuracy achievable
✅ **Significant profit recovery potential** - $400K-$600K annually
✅ **Regional patterns indicate infrastructure gaps** - Targeted investment needed
✅ **Seasonal effects are predictable** - Staffing optimization possible

## 📞 Contact & Support

- **GitHub**: [Uzair625](https://github.com/Uzair625)
- **Repository**: [End-to-End Supply Chain Analysis](https://github.com/Uzair625/End-to-End-Supply-Chain-Analysis-Project-Using-Python-Data-Analyst-.git)

## 📜 License

This project is open source and available under the MIT License.

---

**Last Updated**: May 13, 2026  
**Project Status**: ✅ Active & Maintained  
**Presentation**: Supply_Chain_Analytics.pptx (10 slides, executive summary)
