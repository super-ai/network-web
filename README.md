#### 部署和启动

##### 步骤一：
部署后台服务
cd /mnt/NetWorkIS
nohup java -jar -Dserver.port=8080 -Dspring.datasource.url=jdbc:mysql://192.168.64.5:3306/network_is /mnt/NetworkIS/network-is-1.0.jar &

##### 步骤二：
部署前台服务
修改服务指向，config.js文件中host修改为
const host = 'http://211.98.64.232:8080';
编译前台:
npm run build
部署前台网站：
编译文件拷贝到 /mnt/network-web
cd network-web
serve network-web -p 3000 &
disown
注意：nohup serve network-web & 会随着session结束而关闭 不知道为啥


##### 启动
正式版：
211.98.64.6:3000
测试版：
211.98.64.6:8080
