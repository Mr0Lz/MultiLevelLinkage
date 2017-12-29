var MultiLevelLinkage;
!(function(){
if(isIE(6)||isIE(7)){
	throw "没救了,等死吧,告辞";
}
if (!Array.prototype.indexOf){ Array.prototype.indexOf = function(elt /*, from*/){ var len = this.length >>> 0; var from = Number(arguments[1]) || 0; from = (from < 0) ? Math.ceil(from) : Math.floor(from); if (from < 0) from += len; for (; from < len; from++) { if (from in this && this[from] === elt) return from; } return -1; }; }
	function Linkage(){

	}
	function _init(opt){
		if(!opt.data||!checkObject(opt.data)){throw "请设置data";}
		if(!opt.select||opt.select.length===0){throw "请设置select";}
		this.defaultText=opt.defaultText||"请选择";
		this.eles=getDoc(opt.select);
		if(this.eles.length===0){throw "没有获取到select";}
		checkReapet(this);
		if(opt.data.url){ajax(opt,this);}
		else{
			this.datas=opt.data;
			createSele(this);}
		return this;
	}
	//创建 createSele
	function createSele(that){
		clear(that.eles);
		createdefaultText(that.eles,that.defaultText);
		initSele(that.eles[0],that.datas);
		addEvent(that,that.eles[0],"change",eventcallback);
	}
	//清空option
	function clear(ele,end,filter){
		for (var i = end!==undefined?end:0; i < ele.length; i++) {
			if(filter!==undefined&&(ele.indexOf(filter)!==-1||i===filter)){continue;}
			ele[i].innerHTML="";
		}
	}
	//浏览器版本检测
	function  isIE (ver){
	    var b = document.createElement('b')
	    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
	    return b.getElementsByTagName('i').length === 1;
	}
	//获取是select
	function getDoc(ele){
		var arr=[]
		for (var i = 0; i < ele.length; i++) {
			if(typeof ele[i]==="string"){
			var e=document.querySelector(ele[i])
			if (e.nodeName.toLocaleLowerCase()==="select") {
				if(arr.indexOf(e)===-1){arr.push(e);}
			}
			}else if (ele[i].nodeName.toLocaleLowerCase()==="select") {
			 	if(arr.indexOf(e)===-1){arr.push(ele[i]);}
			}	
		}
		return arr;
	}
	//创建defaultText
	function  createdefaultText(ele,text,end,filter){
		for (var i = end!==undefined?end:0; i < ele.length; i++) {
			if(filter!==undefined&&(ele.indexOf(filter)!==-1||i===filter)){continue;}
			ele[i].add(createOption('option',text));
		}
	}
	//创建option
	function createOption(type,text,val,key){
		var option=document.createElement(type);
		val&&option.setAttribute("value",val);
		option.setAttribute("d-k",key||"");
		option.text=text;
		return option;
	}
	//初始化select
	function initSele(ele,datas){
		for( var k in datas){
			if (!Object.prototype.hasOwnProperty.call(datas,k)){continue;}
			if(datas[k].text===undefined){throw "数据有误"}
			if(datas[k]) {fill(ele,datas[k].text,datas[k].value,k);}
		}
	}
	//填充option
	function fill(ele,text,value,key){
		ele.add(createOption('option',text,value,key));
	}
	//监测select有没重复绑定
	function checkReapet(that){
		for (var i = 0; i < that.eles.length; i++) {
			if(!that.eles[i].getAttribute("init")){that.eles[i].setAttribute("init",true)}
			else{throw "重复绑定";}
		}
	}
	function checkObject(obj){for(var k in obj){if (!Object.prototype.hasOwnProperty.call(obj,k)){continue;}return k.toLocaleLowerCase()==="url"||obj[k].cell;}}
	//绑定事件
	function addEvent(that,ele,type,fn){
		if(ele.addEventListener){
			ele.addEventListener(type,function(e){
				var e=e||window.event;
				var currentSelect=e.srcElement||e.target;
				fn(currentSelect,that,e);
			},false);
		}else if(ele.attachEvent){
			ele.attachEvent("on"+type,function(e){
				var e=e||window.event; 
				var currentSelect=e.srcElement||e.target;
				fn(currentSelect,that,e);
			});
		}
	}
	//删除事件
	function removeEvent(eleArr,start,type,fn){
		for (var i=start; i<eleArr.length;i++) {
			if(eleArr[i].removeEventListener){
				eleArr[i].removeEventListener(type,fn);
			}else if(eleArr[i].detachEvent){
				eleArr[i].detachEvent("on"+type,fn)
			}
		}
	}
	//eventcallback
	function eventcallback(self,that,e){
		changeEvent(self,that,that.datas,e);
	}
	//获取datas数据
	function getData(index,that){
		var data=that.datas;		
		for (var i=1 ; i<=index; i++) {
			var ele=that.eles[i-1];
			var key=ele.options[ele.selectedIndex].getAttribute("d-k");
			if(!key){return false;}
			data=data[key].cell;
			if(!data){return false;}
		}
		return data
	}
	//change事件fn
	function changeEvent(self,that,datas,e){
		var index=that.eles.indexOf(self);
		var nextSele=that.eles[index+1];
		if(nextSele===undefined){return;}//已经是最后一级的selec
		var data=getData(index+1,that);
		if(!data){clear(that.eles,index+1);
				  createdefaultText(that.eles,that.defaultText,index+1);
				  removeEvent(that.eles,index===0?1:index,"change",eventcallback);
				  return;
				}
		clear(that.eles,index+1);
		createdefaultText(that.eles,that.defaultText,index+1);
		initSele(nextSele,data);
		addEvent(that,nextSele,"change",eventcallback);
	}
	//加载ajax 不兼容IE6,IE7
	function ajax(opt,that){
		l(opt.data.parameter[0]!=="?");
		var data=opt.data,url,str="";
		var method=data.method.toLocaleUpperCase()||"GET";
		if(method==="GET"){url=data.url+(data.parameter[0]==="?"?"":"?")+data.parameter;}
		else{url=data;str=data.parameter;}
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				//获取数据成功
				var data=JSON.parse(xhr.responseText);
				that.datas=data;
				createSele(that);
			}

		}
		xhr.open(method,url,data.async||true);
		var Header=data.requestHeader&&data.requestHeader.length<0||[{key:'Content-Type',value:'application/x-www-form-urlencoded'}];
		for (var i= 0; i<Header.length;i++){
			xhr.setRequestHeader(Header[i].key,Header[i].value);
		}
		xhr.send(str);
	}
//获取select的值
function _getValue(str){
	var val=[];
	if(!str){
		for (var i= 0;i< this.eles.length; i++) {
			if(this.eles[i].options.length>1){
				if(this.eles[i].value===this.defaultText){continue;}val.push(this.eles[i].value);}	
		}
	}else if(typeof str=="string"){
		var select=getDoc([str]);
		l(select,"select")
	}
	l(val)
	
	return val;
}
	Linkage.prototype.init=_init;
	Linkage.prototype.getValue=_getValue;
	function  l(s,str){console.log(s,str);}

	MultiLevelLinkage=new Linkage();

})
(window,document)