from langchain.prompts import ChatPromptTemplate
from typing import Dict, Any

from langchain_core.messages import SystemMessage

from typing import Dict

CLASSIFICATION_PROMPT = """
Task: Analyze the user's financial profile and classify them into one of the predefined categories based on their financial behavior, investments, and spending patterns. Return a JSON object with the classification and reasoning. No extra information is needed on JSON should be returned (No backticks or code blocks).

**Categories:**
- **Average_Investor**: You have a stable income, moderate expenses, some debt, and basic investments.
- **Investment_Master**: You maintain a high savings rate, invest across diverse asset classes, and have low debt.
- **Safe_Master**: You take a conservative financial approach, with high savings and low-risk investments.
- **High_Expenses**: You have a high income but also high expenses and multiple liabilities, limiting savings potential.

### **Analysis Criteria**
1. **Income to Expenses Ratio** = monthly income / monthly expenses  
2. **Savings Rate** = (income - expenses) / income  
3. **Investment Diversity** = number of different investment types  
4. **Debt to Income Ratio** = total monthly debt payments / monthly income  
5. **Risk Profile** = based on investment types and allocation  

### **Example Inputs & Outputs**
#### **Input Example:**
```json
{
    "basic_info": {
        "income": 6000,
        "monthly_expenses": 4500,
        "total_savings": 8000
    },
    "assets": [
        {"type": "Savings", "value": 8000}
    ],
    "liabilities": [
        {"type": "Credit Card", "amount": 3000}
    ]
}
```

### Output Example JSON:
```json
{
    "classification": "Average_Investor",
    "reasoning": "You have a high expense ratio (75% of income), limited investment diversity with only savings, and moderate credit card debt. This places you in the Average_Investor category, indicating room for improvement in savings and investment strategy  (No backticks or code blocks)."
}
```

### Your Task
Analyze the following financial profile and return a JSON object with classification and reasoning in the format:
```json
{
    "classification": "one_of_predefined_categories",
    "reasoning": "second_person_explanation"
}
```

Input Profile: {financial_data}
"""

GROUP1_ANALYSIS_PROMPT = """
Task: Provide personalized financial insights on investment opportunities, spending optimization, and goal achievement. Return a JSON object with the classification and reasoning. No extra information is needed on JSON should be returned  (No backticks or code blocks).

### **Analysis Requirements**
1. **Investment Recommendations** (suggest smart allocation based on risk and profile)
2. **Spending Optimization** (identify categories where user can cut expenses)
3. **Goal Achievement** (determine if user is on/off track and suggest improvements)

### **Example Inputs & Outputs**
#### **Input Example:**
```json
{
    "basic_info": {
        "income": 7000,
        "monthly_expenses": 5000
    },
    "assets": [
        {"type": "Stocks", "value": 50000}
    ]
}
```

### Output Example:

```json
{
    "investment_opportunities": [
        {
            "suggestion": "Diversify into Index Funds",
            "reasoning": "You are heavily invested in individual stocks, which can be volatile. Allocating $10,000 into index funds can help mitigate risk while maintaining strong returns.",
            "starting_amount": "$10,000",
            "expected_return": "8-10% annually"
        }
    ],
    "spending_optimization": [
        {
            "category": "Monthly Subscriptions",
            "current_spending": "$200",
            "potential_savings": "$1,200 annually",
            "suggestion": "You have multiple streaming and software subscriptions. Consolidating or eliminating unused services could save $100/month."
        }
    ],
    "goal_achievement": {
        "status": "Off Track",
        "missing_milestones": ["Emergency Fund"],
        "action_items": [
            "Build a $21,000 emergency fund (3x monthly expenses).",
            "Start contributing $750 per month to a 401k."
        ]
    }
}
```

### Your Task
Analyze the following financial profile and return structured insights in the required JSON format:

Input Profile: {financial_data}
"""

GROUP2_ANALYSIS_PROMPT = """
Task: Analyze the user's transactions to identify regular behaviors, spending deviations, and potential concerns. Return a JSON object with the classification and reasoning. No extra information is needed on JSON should be returned.

### **Analysis Requirements**
1. **Identify Recurring Transactions** (patterns of frequent spending)
2. **Detect Unusual Spending** (transactions significantly above the norm)
3. **Assess Financial Impact** (how spending affects financial health)

### **Example Inputs & Outputs**
#### **Input Example:**
```json
{
    "transactions": [
        {"category": "Dining", "amount": 500, "date": "2024-01-01"}
    ]
}
```

### Output Example:

```json
{
    "patterns": {
        "regular_transactions": [
            {
                "category": "Dining",
                "average_amount": 500,
                "frequency": "Monthly"
            }
        ],
        "deviations": [
            {
                "type": "Unusual Spending",
                "amount": 1500,
                "date": "2024-01-15",
                "concern": "Your dining expense was 300% above average in January."
            }
        ]
    },
    "recommendations": {
        "immediate_actions": [
            "Set a monthly dining budget alert at $600.",
            "Review unnecessary subscriptions to free up cash flow."
        ],
        "profile_impact": "High discretionary spending may limit your investment capacity."
    }
}
```

### Your Task
Analyze the following transactions and return structured insights in the required JSON format:

Input Profile: {financial_data}
"""

GROUP3_ANALYSIS_PROMPT = """
Task: Provide personalized recommendations for passive income, savings strategies, and budgeting. Return a JSON object with the classification and reasoning. No extra information is needed on JSON should be returned  (No backticks or code blocks).

### **Analysis Requirements**
1. **Suggest Passive Income Streams** (based on user’s assets and risk tolerance)
2. **Optimize Savings Allocation** (how best to distribute funds)
3. **Provide a Structured Budget Plan** (breakdown of spending categories)

### **Example Inputs & Outputs**
#### **Input Example:**
```json
{
    "basic_info": {
        "income": 6000,
        "total_savings": 30000
    },
    "assets": [
        {"type": "Property", "value": 300000}
    ]
}
```

### Output Example:

```json
{
    "passive_income": {
        "opportunities": [
            {
                "type": "Property Rental",
                "potential_income": "$2000 monthly",
                "initial_investment": "$10,000",
                "action_steps": [
                    "Convert basement into a rental unit.",
                    "Research local rental regulations."
                ]
            }
        ]
    },
    "savings_optimization": {
        "monthly_allocation": {
            "emergency_fund": "20% ($1200)",
            "retirement": "30% ($1800)",
            "investment": "30% ($1800)",
            "short_term": "20% ($1200)"
        },
        "milestones": {
            "3_months": "Build emergency fund to $18,000",
            "6 months": "Max out IRA contribution"
        }
    },
    "budgeting": {
        "recommended_splits": {
            "essential_expenses": "50% ($3000)",
            "investments": "30% ($1800)",
            "discretionary": "20% ($1200)"
        },
        "specific_targets": {
            "housing": "< $2000",
            "transportation": "< $500",
            "utilities": "< $300"
        }
    }
}
```

### Your Task
Analyze the following profile and return structured insights in the required JSON format:

Input Profile: {financial_data}
"""


class PromptService:
    def __init__(self):
        self.prompts = self._initialize_prompts()

    def _initialize_prompts(self) -> Dict[str, ChatPromptTemplate]:
        return {
            "classification": ChatPromptTemplate.from_messages(
                [
                    SystemMessage(content=CLASSIFICATION_PROMPT),
                    ("human", "{financial_data}"),
                ]
            ),
            "group1_analysis": ChatPromptTemplate.from_messages(
                [
                    SystemMessage(content=GROUP1_ANALYSIS_PROMPT),
                    ("human", "{financial_data}"),
                ]
            ),
            "group2_analysis": ChatPromptTemplate.from_messages(
                [
                    SystemMessage(content=GROUP2_ANALYSIS_PROMPT),
                    ("human", "{financial_data}"),
                ]
            ),
            "group3_analysis": ChatPromptTemplate.from_messages(
                [
                    SystemMessage(content=GROUP3_ANALYSIS_PROMPT),
                    ("human", "{financial_data}"),
                ]
            ),
        }

    def get_prompt(self, prompt_type: str) -> ChatPromptTemplate:
        return self.prompts.get(prompt_type)
