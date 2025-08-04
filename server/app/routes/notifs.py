
from flask import Blueprint, request, jsonify 
from app.utils.helpers import send_email_notification
import os
import requests


notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()

    subject = data.get('subject')
    recipients = data.get('recipients') 
    body = data.get('body')

    if not subject or not recipients or not body:
        return jsonify({"error": "Missing fields"}), 400

    try:
        send_email_notification(subject, recipients, body)
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@notification_bp.route('/send-slack', methods=['POST'])
def send_slack_message():
    webhook_url = os.getenv('SLACK_WEBHOOK_URL')
    
    data = request.get_json()
    message = data.get("message") 

    if not webhook_url:
        return jsonify({"error": "Slack webhook URL not set"}), 500

    if not message:
        return jsonify({"error": "Missing 'message' field"}), 400

    payload = {"text": message}
    response = requests.post(webhook_url, json=payload)

    if response.status_code != 200:
        print(f"Slack error: {response.status_code} - {response.text}")
        return jsonify({"error": "Failed to send Slack message"}), 500

    return jsonify({"message": "Slack message sent successfully"}), 200
