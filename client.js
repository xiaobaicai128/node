/*
* @Author: qiaoyong
* @Date:   2018-12-11 19:56:07
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2018-12-11 21:56:07
*/
var net = require('net');
var client = new net.Socket(); // 创建tcp客户端
client.setEncoding('utf8'); // 设置流数据编码格式
client.setTimeout(10000); // 设置 客户端超时时间
client.connect(8000, 'localhost', function(){ // 链接到服务端
	console.log('已连接到服务器');
	client.write('hello'); // 向服务端传送流数据
	client.on('timeout', function(){ // 监听超时后
		client.end('对话结束，再见！') // 结束客户端
	})
});
client.on('data', function(data){ // 监听来自服务端的数据
	console.log('已收到服务器发送的数据：' + data);
})
client.on('error', function(err){ // 发生错误时
	console.log('发现错误，代码为%s', err.code);
	client.destroy(); // 注销socket
})