from flask import Flask, request, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os

app = Flask(__name__)

# Google Sheets setup
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if not credentials_path:
    raise EnvironmentError("The GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.")

credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_path, scope)
client = gspread.authorize(credentials)
sheet = client.open_by_url("https://docs.google.com/spreadsheets/d/1V-IdB0JxLGdnWbdKlWcJRR7j_CUJR3y5CcEG-HOYH4A/edit").sheet1  # Replace "Waitlist" with your Google Sheet name

@app.route('/join', methods=['POST'])
def join_waitlist():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Add email to Google Sheet
    sheet.append_row([email])
    return jsonify({"message": "Email added successfully"}), 200

@app.route('/')
def home():
    return "Welcome to the Waitlist Backend API!"

@app.route('/favicon.ico')
def favicon():
    return '', 204  # Return an empty response with a 204 No Content status

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use the PORT environment variable or default to 5000
    app.run(host='0.0.0.0', port=port)
