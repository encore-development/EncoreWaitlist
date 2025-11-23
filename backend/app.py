from flask import Flask, request, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os

app = Flask(__name__)

# Google Sheets setup
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
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

# Expose the app object for Vercel
app = app

if __name__ == '__main__':
    app.run(debug=True)
