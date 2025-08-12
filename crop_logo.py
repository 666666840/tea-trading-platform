from PIL import Image, ImageFilter

# 打开原始图片（请确保文件名与实际图片一致）
img = Image.open('tea_logo.jpg')  # 改成你的图片名

# 直接缩放为108x108并锐化
img_108 = img.resize((108, 108), Image.LANCZOS)
img_108 = img_108.filter(ImageFilter.SHARPEN)
img_108.save('logo_108.png')

# 直接缩放为28x28并锐化
img_28 = img.resize((28, 28), Image.LANCZOS)
img_28 = img_28.filter(ImageFilter.SHARPEN)
img_28.save('logo_28.png')

print("已生成 logo_28.png 和 logo_108.png（整图等比例缩放，无裁剪）")