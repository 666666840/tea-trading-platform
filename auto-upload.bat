@echo off
echo 茶叶一点通API快速部署
echo 服务器: 82.157.231.110
echo 开始上传...

echo 上传 server.py...
echo 58WZRpXt6sPJmsyR | plink -ssh -l root -pw 58WZRpXt6sPJmsyR 82.157.231.110 exit
pscp -pw 58WZRpXt6sPJmsyR server.py root@82.157.231.110:/www/wwwroot/tea-api/

echo 上传 app.py...  
pscp -pw 58WZRpXt6sPJmsyR app.py root@82.157.231.110:/www/wwwroot/tea-api/

echo 上传 requirements.txt...
pscp -pw 58WZRpXt6sPJmsyR requirements.txt root@82.157.231.110:/www/wwwroot/tea-api/

echo 上传 deploy-simple.sh...
pscp -pw 58WZRpXt6sPJmsyR deploy-simple.sh root@82.157.231.110:/www/wwwroot/tea-api/

echo 上传 server-manager.sh...
pscp -pw 58WZRpXt6sPJmsyR server-manager.sh root@82.157.231.110:/www/wwwroot/tea-api/

echo 执行部署...
plink -ssh -l root -pw 58WZRpXt6sPJmsyR 82.157.231.110 "cd /www/wwwroot/tea-api && chmod +x *.sh && ./deploy-simple.sh"

echo 部署完成！
echo API地址: http://82.157.231.110:3000
pause 