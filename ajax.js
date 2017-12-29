var http=require('http');
var url=require('url');
var path=require('path');
var fs=require('fs');
const stream = require('stream');
//var mysql=require('mysql');
var exec=require('child_process').exec;
// var os=require('os');
var ajaxTest={
"css":"text/css",
"gif":"image/gif",
"html":"text/html",
"icon":"image/x-icon",
"jpeg":"image/jpeg",
"jpg":"image/jpeg",
"js":"text/javascript",
"json":"application/json",
"pdf":"application/pdf",
"png":"image/png",
"svg":"image/svg",
"swf":"application",
"tiff":"image/tiff",
"txt":"text/plain",
"wav":"audio/x-wav",
"swf":"application/x-shockwave-flash",
"wma":"audio/x-ms-wma",
"wmv":"video/x-ms-wmv",
"xml":"text/xml",
"woff": "application/x-woff",
"woff2": "application/x-woff2",
"tff": "application/x-font-truetype",
"otf": "application/x-font-opentype",
"eot": "application/vnd.ms-fontobject",
"htc" : "text/x-component"
};


var s=http.createServer(function (req,res) {
		var oUrl=url.parse(req.url);
		var pathName=oUrl.pathname.slice(1);
		var params="";
		if(pathName=="linkage"){
			let data1 = {
				1: {text: '蔬菜', value:100,cell: { 10: {text: '菠菜', value: 4 }, 11: {text: '茄子', value: 5} }
				},
				2: {text: '蔬菜2', value:100 },
				3: {text: '水果', 
					cell: { 
						30: {text: '苹果', cell: {301: {text: '红富士', value: 20}  } } ,
						31: {text: '桃', cell: { 310: {text: '猕猴桃', value: 30}, 311: {text: '油桃', value: 31}, 312: {text: '蟠桃', value: 32} }
						}
					}
				},
				4: {text: '粮食',  value:300,
					cell: { 
						40: {text: '水稻', 	cell: {	401: {text: '大米', cell: {4001: {text: '五常香米', value: 50}} } } 	} 
					}
				}
			};
			res.writeHead(200,"ok",{"Content-type":"application/json"});
			res.write(JSON.stringify(data1));
			res.end();
		}else{
		//res.setHeader("Set-Cookie", ["type=user",req.headers.cookie]);
		l(req.headers.cookie);//原生获取客户端发过来的cookie
		fs.stat(pathName,function (err,stats){
			if(err){
				res.writeHead(404,"Not Found",{"Content-type":"text/plai"});
				res.write("This request URL " + pathName + " was not found on this server.");
				res.end();
				}else{
					if(pathName==="ajax.js"){
						var _postData="";
						req.on('data',function (chunk) {
							_postData+=chunk;
						}).on('end',function function_name() {
							var s="";
							params=require('querystring').parse(_postData);
							res.writeHead(200,"ok",{"Content-type":"text/html"});
							var pool=mysql.createPool({
										  host     : 'localhost',       
										  user     : 'root',  
										  port: '3306',                   
										  database: 't' });
							var sql="select * from userinfo where id="+params.id;
							pool.getConnection(function (e,connection) {
								if(e){console.log(e);}else{
									connection.query(sql,function (e,raw) {
										if(e){console.log(e);}else{
										res.write(JSON.stringify(raw[0]));
										res.end();
										connection.release();
										pool.end();
										}
									});
								}
							});


						});						
					}else if(pathName==="ajax.xml"){
						fs.readFile(pathName,"UTF-8",function (e,data) {
							if (e) {throw e;}
							// res.writeHead(200,"ok",{'Set-Cookie': ["aaa=bbb","ccc=ddd","eee=fff"],"Content-type":ajaxTest.xml});		
							//res.writeHead(200,"ok",{"Content-type":ajaxTest.xml});		
							res.setHeader("Content-type", ajaxTest.xml);
							res.writeHead(200,"ok");
							res.write(data);
							res.end();
						});
						l(res.getHeader("Cookie")+"----");//原生获取客户端发过来的cookie
					}else{
					var ext=path.extname(pathName).slice(1);
					responseFile (pathName, res, ext, null);
					}
					
				}
		});
	}

}).listen(3000);

s.on("listening",function () {
	var port=s.address().port;
	openUrl("http://localhost:"+port);
});


function openUrl(path) {
	switch(process.platform){
				case "win32" :exec('start '+path);break;
				case "darwin" :exec('open '+path);break;
				default :exec("xdg-open",[path]);
			}
}

function l(x) {
	console.log(x);
}

function responseFile (pathName, res, ext, params) {

			 /* 读取文件流并输出 */
			//路由处理 判断文件是否存在  不存在返回404  
			//存在 则判断是否是文件夹 isDirectory  是文件夹,就返回文件夹下的默认home页面
			//如果是文件,则获取扩展名和请求数据的参数  
			//根据扩展名获取文件MIME类型
			//响应流中添加允许跨域请求 Access-Control-Allow-Origin=*;
			//如果文件是json格式,则判断是否有delay延迟参数  有 则延迟
			
			var self=this;
			var raw=fs.createReadStream(pathName);
			var  data="";
			res.setHeader("Access-Control-Allow-Credentials","true");//跨域脚本提交指定Cooike信息,没有这个头响应就会忽略
			res.setHeader("Access-Control-Allow-Origin","*");//setHeader 允许跨域调用
			res.setHeader("Content-type",ajaxTest[ext]);			
			//判断是否有json,是否需要delay延迟
			if (ext==="json") {
				if (params.delay) {
							setTimeout(function () {
								res.writeHead(200,"OK");
								raw.pipe(res);
							},params.delay);
				}else {

					raw.on("data",function (chunk) {
						data+=chunk;

					});

						raw.on("end",function () {
								data=JSON.parse(data);
								//raw.pipe(res);
									setTimeout(function () {
										res.writeHead(200,"OK");
										/*res.write(JSON.stringify(data));
										res.end();*/
										raw.pipe(res);
									},data.delay);
							

						});
				}



			}else{
				res.writeHead(200,"OK");
				raw.pipe(res);
			}

			
		}
