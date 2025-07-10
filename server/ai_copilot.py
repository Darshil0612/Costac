from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import openai

app = Flask(__name__)
CORS(app)

uploaded_df = None

@app.route('/analyze', methods=['POST'])
def analyze():
    global uploaded_df
    file = request.files.get('file')
    if not file:
        return jsonify({"summary": "No file uploaded"}), 400

    try:
        # Force engine to handle most common Excel formats
        uploaded_df = pd.read_excel(file, engine='openpyxl')
        summary = f"✅ Sheet uploaded successfully. It contains {uploaded_df.shape[0]} rows and {uploaded_df.shape[1]} columns."
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"summary": f"❌ Error reading file: {str(e)}"}), 500

@app.route('/ask', methods=['POST'])
def ask():
    global uploaded_df
    if uploaded_df is None:
        return jsonify({"answer": "Please upload a sheet first."}), 400

    data = request.get_json()
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"answer": "No question provided."}), 400

    # Show top rows only to keep prompt small
    df_str = uploaded_df.head(10).to_csv(index=False)

    # 👇 Add your key here securely (load from .env in prod)
    openai.api_key = "sk-..."  # 🔐 Replace with your actual API key

    prompt = f"""You are a financial assistant. Here's a sample of the data:\n{df_str}\n\nNow answer this question: {question}"""

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
        return jsonify({"answer": f"❌ Error processing question: {str(e)}"}), 500

if __name__ == "__main__":
    print("🚀 Starting Flask server on http://localhost:5001")
    app.run(debug=True, port=5001)
