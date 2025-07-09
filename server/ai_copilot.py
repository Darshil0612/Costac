
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import pandas as pd

app = Flask(__name__)
CORS(app)

uploaded_df = None

@app.route('/analyze', methods=['POST'])
def analyze():
    global uploaded_df
    file = request.files['file']
    uploaded_df = pd.read_excel(file)
    summary = f"Sheet uploaded successfully. It contains {uploaded_df.shape[0]} rows and {uploaded_df.shape[1]} columns."
    return jsonify({"summary": summary})

@app.route('/ask', methods=['POST'])
def ask():
    global uploaded_df
    if uploaded_df is None:
        return jsonify({"answer": "Please upload a sheet first."})
    data = request.get_json()
    question = data.get("question", "")
    df_str = uploaded_df.head(10).to_csv(index=False)

    prompt = f"""You are a financial assistant. Here's a sample of the data:\n{df_str}\n\nNow answer this question: {question}"""
    openai.api_key = "sk-..."  # Replace securely

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful financial assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        answer = response['choices'][0]['message']['content']
        return jsonify({"answer": answer.strip()})
    except Exception as e:
        return jsonify({"answer": f"Error: {str(e)}"})
