#!/bin/bash
git add .
git commit -m "auto: 自动提交 $(date '+%Y-%m-%d %H:%M:%S')"
git push origin master