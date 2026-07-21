from pydantic import BaseModel
from typing import Dict, List, Optional

class BasicInfo(BaseModel):
    name: str
    age: int
    income: float
    monthly_expenses: float
    total_savings: float
    employment_status: str
    job_title: str
    city: str
    currency: str
    monthly_salary_date: str

class Asset(BaseModel):
    type: str
    value: float
    loan_balance: float

class Liability(BaseModel):
    type: str
    amount: float
    emi: float

class Transaction(BaseModel):
    category: str
    amount: float
    transaction_date: str
    transaction_type: str
    account: str
    merchant: str

class FinancialProfile(BaseModel):
    user_id: str
    data: Dict

class InvestmentRecommendation(BaseModel):
    suggestion: str
    reasoning: str
    starting_amount: str

class SpendingOptimization(BaseModel):
    category: str
    potential_savings: str
    suggestion: str

class Group1Response(BaseModel):
    investment_opportunities: List[InvestmentRecommendation]
    spending_optimization: List[SpendingOptimization]
    goal_achievement: Dict[str, str]

class TransactionPattern(BaseModel):
    type: str
    amount: float
    concern: Optional[str]

class Group2Response(BaseModel):
    patterns: Dict[str, List[TransactionPattern]]
    recommendations: str

class PassiveIncomeOpportunity(BaseModel):
    type: str
    potential: str
    action: str

class Group3Response(BaseModel):
    passive_income: List[PassiveIncomeOpportunity]
    savings: Dict[str, str]
    budgeting: Dict[str, str]

class ClassificationResponse(BaseModel):
    classification: str
    reasoning: str

class FinancialAnalysisResponse(BaseModel):
    classification: ClassificationResponse
    group1_insights: Group1Response
    group2_insights: Group2Response
    group3_insights: Group3Response