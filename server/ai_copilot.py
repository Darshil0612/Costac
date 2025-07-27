from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import requests
import re

app = Flask(__name__)
CORS(app)

uploaded_df = None
GROQ_API_KEY = "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"
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct"

def clean_column_names(df):
    df.columns = df.columns.str.replace("\n", " ", regex=True)
    df.columns = df.columns.str.strip()
    df.columns = df.columns.str.replace(r"Unnamed: \d+", "", regex=True)
    df.columns = [col if col else f"Column{i}" for i, col in enumerate(df.columns)]
    if df.columns[0].lower().startswith("data import"):
        df.rename(columns={df.columns[0]: "Account"}, inplace=True)
    return df

def detect_metrics(df):
    financial_keywords = ["revenue", "income", "net", "profit", "expenses", "cogs", "cost", "gross", "sales"]
    detected = [col for col in df.columns if any(word in col.lower() for word in financial_keywords)]
    return detected[:5]

def generate_data_summary(df: pd.DataFrame) -> str:
    df = clean_column_names(df)
    summary = f"✅ The uploaded dataset has {df.shape[0]} rows and {df.shape[1]} columns.\n"

    key_metrics = ["Total Income", "Total Expenses", "Gross Profit", "Net Operating Income", "Net Income"]
    found = {}

    if "Account" in df.columns:
        for metric in key_metrics:
            row = df[df["Account"].astype(str).str.strip().str.lower() == metric.lower()]
            if not row.empty:
                try:
                    # Drop the 'Account' column and convert rest to numeric
                    values = pd.to_numeric(row.drop(columns=["Account"], errors="ignore").values.flatten(), errors='coerce')
                    values = values[~pd.isnull(values)]
                    if len(values) > 0:
                        found[metric] = values.sum()
                except Exception:
                    continue

    if found:
        summary += "\n📊 Key Financials:\n"
        for k, v in found.items():
            summary += f"- {k}: ${v:,.2f}\n"
    else:
        summary += "\n⚠️ No recognizable financial values (like Net Income) found in the 'Account' column."

    # Sample Accounts
    if "Account" in df.columns:
        sample_accounts = df["Account"].dropna().unique()
        sample_accounts = [acct.strip() for acct in sample_accounts if acct and acct.strip().lower() != "account"]
        summary += "\n\n📌 Sample Accounts:\n- " + ", ".join(sample_accounts[:5])

    return summary.strip()


@app.route('/analyze', methods=['POST'])
def analyze():
    global uploaded_df
    file = request.files.get('file')
    if not file:
        return jsonify({"summary": "❌ No file uploaded"}), 400

    try:
        if file.filename.endswith(".csv"):
            uploaded_df = pd.read_csv(file)
        else:
            uploaded_df = pd.read_excel(file, engine='openpyxl')

        uploaded_df = clean_column_names(uploaded_df)
        summary = generate_data_summary(uploaded_df)
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"summary": f"❌ Error reading file: {str(e)}"}), 500

@app.route('/ask', methods=['POST'])
def ask():
    global uploaded_df
    if uploaded_df is None:
        return jsonify({"answer": "❌ Please upload a sheet first."}), 400

    data = request.get_json()
    question = data.get("question", "").strip()
    if not question:
        return jsonify({"answer": "❌ No question provided."}), 400

    summary_context = generate_data_summary(uploaded_df)

    user_prompt = (
    f"Here is a quick summary of their financial data:\n\n{summary_context}\n\n"
    f"The user asks: \"{question}\"\n\n"
    "Reply as if you're advising them in person. Be insightful, supportive, and human."
)

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a smart and friendly financial advisor helping a business owner review their uploaded P&L report. "
                    "Use clear, helpful language. Give 2-3 insights such as trends, irregularities, or advice. Avoid technical terms."
                )
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}"
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        answer = response.json()['choices'][0]['message']['content']
        return jsonify({"answer": answer.strip()})
    except Exception as e:
        return jsonify({"answer": f"❌ Error contacting LLM: {str(e)}"}), 500

if __name__ == "__main__":
    print("🚀 Starting Flask server on http://localhost:5001")
    app.run(debug=True, port=5001)
