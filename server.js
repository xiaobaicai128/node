/*
* @Author: qiaoyong
* @Date:   2018-12-11 19:52:32
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2018-12-11 22:29:27
*/
var net = require('net');
var server = net.createServer() // 建立服务器
var fs = require('fs');

server.on('connection', function(socket){
	console.log('客户端与服务器连接已建立')
	socket.setEncoding('utf8'); // 设置流数据编码格式
	let readStream = fs.createReadStream('./server.js');// 创建将文件内容转为可读的流数据
	readStream.on('data', function(data){
		let msg = socket.write(data);
		// console.log('write方法的返回值:'+data);
		console.log('缓存队列中当前缓存了 %d 字符', socket.bufferSize);
	})
	socket.on('data', function(data){ // 监听客户端发送来的数据
		console.log('已接收数据：' + data);
		// socket.write('返回数据：' + data); //迅速的向客户端发送流数据
	})
	socket.on('drain', function(){
		console.log('tcp 缓存区的数据已全部发送')
	})
	socket.on('end', function(){ //监听 当客户端终止后的事件
		console.log('对话结束');
		server.unref(); // 当客户端券终止关闭后，主动结束服务端
	})
	socket.on('error', function(err){ // 发生错误时
		console.log('与客户端通信过程发生一个错误，错误编码为%s', err.code);
		socket.destroy(); // 注销socket
	})
	socket.on('close', function(had_error){
		if(had_error){
			console.log('由于错误导致socket端口关闭');
			server.unref();
		} else{
			console.log('端口正常关闭');
		}
	})
	server.getConnections(function(err, count){
		console.log(count)
		if(count >= 2){
			server.close()
		}
	})
})
server.listen(8000, 'localhost'); // 监听端口
server.on('close', function(){
	console.log('tcp服务器关闭')
})