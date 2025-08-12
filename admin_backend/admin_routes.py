from flask import Blueprint, render_template

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/')
def admin_index():
    return render_template('admin_index.html')  # 需在templates/下有admin_index.html 