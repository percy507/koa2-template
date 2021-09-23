--- 创建数据库
CREATE DATABASE koa2;

--- 创建用户并授予权限
CREATE USER 'myName'@'localhost' IDENTIFIED BY 'myPassword';
GRANT ALL PRIVILEGES ON koa2.* TO 'myName'@'localhost';

--- 处理 MySQL 8.0 版本的认证协议问题??
ALTER USER 'myName'@'localhost' IDENTIFIED WITH mysql_native_password BY 'myPassword';
flush privileges;
