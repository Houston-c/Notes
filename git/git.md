# RPC failed; HTTP 403 curl 22 The requested URL returned error: 403 Forbidden

![image-20200330201524115](..\image\image-20200330201524115.png)

修改**C:\Windows\System32\drivers\etc**的hosts文件

​		hosts文件的作用就是将一些常用的网址[域名](https://baike.baidu.com/item/域名/86062)与其对应的[IP地址](https://baike.baidu.com/item/IP地址)建立一个关联“数据库”，当用户在浏览器中输入一个需要登录的网址时，系统会首先自动从[Hosts文件](https://baike.baidu.com/item/Hosts文件)中寻找对应的[IP地址](https://baike.baidu.com/item/IP地址)，一旦找到，系统会立即打开对应网页，如果没有找到，则系统会再将网址提交DNS[域名解析](https://baike.baidu.com/item/域名解析)服务器进行IP地址的解析。

需要注意的是，Hosts文件配置的[映射](https://baike.baidu.com/item/映射/20402620)是静态的，如果网络上的计算机更改了请及时更新IP地址，否则将不能访问。