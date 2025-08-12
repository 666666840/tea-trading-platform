from PIL import Image, ImageDraw, ImageFont
import os

def get_font(size):
    font_paths = [
        "C:/Windows/Fonts/msyh.ttc",   # 微软雅黑
        "C:/Windows/Fonts/simhei.ttf", # 黑体
        "C:/Windows/Fonts/simsun.ttc", # 宋体
    ]
    for path in font_paths:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def get_text_size(draw, text, font):
    # Pillow 10.x 及以上用 textbbox
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    return w, h

# 生成28x28水印图
img = Image.new('RGBA', (28, 28), (0, 180, 0, 255))
draw = ImageDraw.Draw(img)
font = get_font(18)
w, h = get_text_size(draw, "茶", font)
draw.text(((28-w)//2, (28-h)//2), "茶", fill=(255,255,255,255), font=font)
img.save('logo_28.png')

# 生成108x108高清图
img2 = Image.new('RGBA', (108, 108), (0, 180, 0, 255))
draw2 = ImageDraw.Draw(img2)
font2 = get_font(72)
w2, h2 = get_text_size(draw2, "茶", font2)
draw2.text(((108-w2)//2, (108-h2)//2), "茶", fill=(255,255,255,255), font=font2)
img2.save('logo_108.png')

print("已生成 logo_28.png 和 logo_108.png（大号字体，居中显示）")