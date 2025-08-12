import csv
import os
from datetime import datetime
from admin_backend.app import db, AdminUser

EXPORT_DIR = './exports'
if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

def export_merchants_to_csv():
    filename = f"merchants_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    filepath = os.path.join(EXPORT_DIR, filename)
    merchants = AdminUser.query.all()
    with open(filepath, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow(['ID', '商户名称', '联系人', '电话', '邮箱', '角色', '注册时间'])
        for m in merchants:
            writer.writerow([
                m.id, m.username, m.real_name or '', m.phone or '', m.email or '', m.role, m.created_at.strftime('%Y-%m-%d %H:%M:%S')
            ])
    print(f'商家数据已导出到: {filepath}')

if __name__ == '__main__':
    export_merchants_to_csv() 