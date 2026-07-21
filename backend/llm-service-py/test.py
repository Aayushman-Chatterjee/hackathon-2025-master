import json
import requests

# Example profile data (from your provided example)
# profile_data = {
#     "id": 1,
#     "name": "Alice Johnson",
#     "key": "Real_Estate_Master",
#     "data": {
#         "basic_info": {
#         "name": "Alice Johnson",
#         "age": 32,
#         "income": 9000,
#         "monthly_expenses": 6000,
#         "total_savings": 15000,
#         "employment_status": "Employed",
#         "job_title": "Investment Banker",
#         "city": "New York",
#         "currency": "USD",
#         "monthly_salary_date": "2025-01-01",
#       },
#       "assets": {
#         "asset_1": {
#           "type": "Stocks",
#           "value": 200000,
#         },
#         "asset_2": {
#           "type": "Crypto",
#           "value": 50000,
#         },
#       },
#       "liabilities": {
#         "liability_1": {
#           "type": "Credit Card Debt",
#           "amount": 15000,
#           "emi": 500,
#         },
#       },
#       "profile_score": {
#         "score": 20,
#         "last_updated": "2025-01-01",
#       },
#       "spending_data": {
#         "spending_1": {
#           "category": "Stocks Investment",
#           "amount": 1000,
#           "transaction_date": "2025-01-02",
#           "transaction_type": "Debit",
#           "account": "Bank Account",
#           "merchant": "Robinhood",
#         },
#         "spending_2": {
#           "category": "Luxury Dining",
#           "amount": 300,
#           "transaction_date": "2025-01-05",
#           "transaction_type": "Debit",
#           "account": "Bank Account",
#           "merchant": "Ruth's Chris Steak House",
#         },
#       },
#       "transactions": {
#         "transactions_1": {
#           "category": "Home Loan Payment",
#           "amount": 1500,
#           "transaction_date": "2025-01-05",
#           "transaction_type": "Debit",
#           "account": "Bank Account",
#           "merchant": "Wells Fargo Mortgage",
#         },
#         "transactions_2": {
#           "category": "Home Loan Payment",
#           "amount": 30000,
#           "transaction_date": "2025-01-05",
#           "transaction_type": "Debit",
#           "account": "Bank Account",
#           "merchant": "Wells Fargo Mortgage",
#         },
#         "transactions_3": {
#           "category": "Home Loan Payment",
#           "amount": 2500,
#           "transaction_date": "2025-01-05",
#           "transaction_type": "Credit",
#           "account": "Bank Account",
#           "merchant": "Wells Fargo Mortgage",
#         },
#         "transactions_4": {
#           "category": "Home Loan Payment",
#           "amount": 2500,
#           "transaction_date": "2025-01-05",
#           "transaction_type": "Credit",
#           "account": "Bank Account",
#           "merchant": "Wells Fargo Mortgage",
#         },
#         "transactions_5": {
#           "category": "Home Loan Payment",
#           "amount": 6500,
#           "transaction_date": "2025-01-05",
#           "transaction_type": "Debit",
#           "account": "Bank Account",
#           "merchant": "Wells Fargo Mortgage",
#         },
#       },
#     },
#     "description": "Become a pro in real estate investments."
# }

profile_data = {
    "user_id": "5",
    "data": {
        "basic_info": {
            "name": "Grace Adams",
            "age": 38,
            "type": "Safe_Master",
            "currency": "USD",
        },
        "profile_score": {"score": 92, "last_updated": "2025-01-01"},
        "assets": [
            {"id": "asset_1", "type": "Home", "value": 20000},
            {"id": "asset_2", "type": "Car", "value": 20000},
            {"id": "asset_3", "type": "Retirement Fund", "value": 25000},
            {"id": "asset_4", "type": "Bonds", "value": 10000},
            {"id": "asset_5", "type": "Gold", "value": 10000},
        ],
        "liabilities": [
            {"id": "liability_1", "type": "Home Loan", "amount": 200000, "emi": 1500},
            {"id": "liability_2", "type": "Car Loan", "amount": 10000, "emi": 400},
            {
                "id": "liability_3",
                "type": "Credit Card Debt",
                "amount": 2000,
                "emi": 100,
            },
        ],
        "transactions": [
            {
                "id": "transaction_1",
                "category": "Salary",
                "amount": 8000,
                "transaction_date": "2025-01-01",
                "transaction_type": "Credit",
            },
            {
                "id": "transaction_2",
                "category": "Investment Return",
                "amount": 500,
                "transaction_date": "2025-01-02",
                "transaction_type": "Credit",
            },
            {
                "id": "transaction_3",
                "category": "Dividend",
                "amount": 200,
                "transaction_date": "2025-01-03",
                "transaction_type": "Credit",
            },
            {
                "id": "transaction_4",
                "category": "Refund",
                "amount": 100,
                "transaction_date": "2025-01-04",
                "transaction_type": "Credit",
            },
            {
                "id": "transaction_5",
                "category": "Gift",
                "amount": 150,
                "transaction_date": "2025-01-05",
                "transaction_type": "Credit",
            },
            {
                "id": "transaction_6",
                "category": "Bonus",
                "amount": 1000,
                "transaction_date": "2025-01-06",
                "transaction_type": "Credit",
            },
            {
                "id": "transaction_7",
                "category": "Side Hustle",
                "amount": 200,
                "transaction_date": "2025-01-07",
                "transaction_type": "Credit",
            },
        ],
        "goals": [
            {
                "id": "goal_1",
                "date": "2025-02-14T00:00:00.000Z",
                "type": "adas",
                "amount": 123123,
            }
        ],
        "investments": [
            {"id": "investments_1", "type": "eqeqw", "return": "5", "amount": 123}
        ],
        "insurances": [{"id": "insurances_1", "type": "wrwe", "amount": "3123"}],
    },
}


# Get full analysis
response = requests.post(
    "https://hackathon-llm-v1-1082494551684.us-central1.run.app/analyze",
    # "http://localhost:5000/analyze",
    json=profile_data,
)

# # Get just classification
# classification = requests.post(
#     "http://localhost:5000/classify",
#     json=profile_data
# )

print(response.json())

with open("output.json", "w") as f:
    json.dump(response.json(), f)


# with open("classification.json", "w") as f:
#     json.dump(classification.json(), f)
