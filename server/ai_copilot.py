from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import requests
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app)

uploaded_df = None
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct"

# 🔧 Clean column names
def clean_column_names(df):
    df.columns = df.columns.str.replace("\n", " ", regex=True)
    df.columns = df.columns.str.strip()
    df.columns = df.columns.str.replace(r"Unnamed: \d+", "", regex=True)
    df.columns = [col if col else f"Column{i}" for i, col in enumerate(df.columns)]
    if df.columns[0].lower().startswith("data import"):
        df.rename(columns={df.columns[0]: "Account"}, inplace=True)
    return df

# 📊 Extract key metrics from 'Account' row values
def extract_totals(df):
    totals = {}
    keywords = {
        "Total Income": "Total Income",
        "Gross Profit": "Gross Profit",
        "Total Expenses": "Total Expenses",
        "Net Operating Income": "Net Operating Income",
        "Net Income": "Net Income"
    }

    if "Account" not in df.columns:
        return totals

    account_col = df["Account"].astype(str).str.strip()

    for label, display in keywords.items():
        match = df[account_col == label]
        if not match.empty:
            try:
                # Look for first numeric value in the row
                numeric = pd.to_numeric(match.iloc[0][1:], errors='coerce')
                value = numeric.dropna().iloc[0]
                totals[display] = value
            except Exception:
                continue

    return totals

# 📑 Generate summary for LLM
def generate_data_summary(df: pd.DataFrame) -> str:
    df = clean_column_names(df)
    totals = extract_totals(df)

    summary = f"✅ The uploaded dataset has {df.shape[0]} rows and {df.shape[1]} columns.\n"
    if totals:
        summary += "\n📊 Key Financials:\n"
        for key, value in totals.items():
            summary += f"- {key}: ${value:,.2f}\n"
    else:
        summary += "\n⚠️ Could not find standard financial totals like 'Net Income'."

    if "Account" in df.columns:
        sample_accounts = df["Account"].dropna().unique()[:5]
        if len(sample_accounts) > 0:
            summary += "\n\n📌 Sample Accounts:\n- " + ", ".join(map(str, sample_accounts))

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
        f"Here is a summary of the uploaded P&L data:\n\n{summary_context}\n\n"
        f"The user asks: \"{question}\"\n\n"
        "You are a friendly financial advisor. Give helpful, human, non-technical advice. Use real values from the summary where useful."
    )

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a smart and supportive financial advisor helping a small business owner review their uploaded P&L sheet. "
                    "Avoid technical terms. Give 2-3 insights. Speak naturally and clearly."
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
