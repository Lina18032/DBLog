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
