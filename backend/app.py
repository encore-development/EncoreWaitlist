from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Google Sheets setup - lazy initialization
sheet = None

def get_sheet():
    global sheet
    if sheet is None:
        scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
        credentials_json = os.getenv("GOOGLE_CREDENTIALS_JSON")
        credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

        if credentials_json:
            creds_dict = json.loads(credentials_json)
            credentials = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
        elif credentials_path:
            credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_path, scope)
        else:
            raise EnvironmentError("Set GOOGLE_CREDENTIALS_JSON or GOOGLE_APPLICATION_CREDENTIALS environment variable")

        client = gspread.authorize(credentials)
        sheet = client.open_by_url("https://docs.google.com/spreadsheets/d/1V-IdB0JxLGdnWbdKlWcJRR7j_CUJR3y5CcEG-HOYH4A/edit").sheet1
    return sheet

@app.route('/join', methods=['POST', 'OPTIONS'])
def join_waitlist():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        data = request.json
        email = data.get('email')

        if not email:
            return jsonify({"error": "Email is required"}), 400

        # Add email to Google Sheet
        get_sheet().append_row([email])
        return jsonify({"message": "Email added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Welcome to the Waitlist Backend API!"

@app.route('/favicon.ico')
def favicon():
    return '', 204  # Return an empty response with a 204 No Content status

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use the PORT environment variable or default to 5000
    app.run(host='0.0.0.0', port=port)
