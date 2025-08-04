from flask_mail import Message  # ✅ Only this at the top

def paginate_dict(data_dict, page, per_page):
    items = list(data_dict.items())
    total = len(items)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_items = items[start:end]

    return {
        "items": dict(paginated_items),
        "pagination": {
            "total": total,
            "page": page,
            "per_page": per_page,
            "total_pages": (total + per_page - 1) // per_page
        }
    }

def send_email_notification(subject, recipients, body):
    from app import mail  # ✅ Delay the import to avoid circular issue

    msg = Message(subject=subject, recipients=recipients, body=body)
    mail.send(msg)
