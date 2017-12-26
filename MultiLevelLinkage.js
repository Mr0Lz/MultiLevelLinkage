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
		this.datas=opt.data;
		this.eles=getDoc(opt.select);
		if(this.eles.length===0){throw "没有获取到select";}
		checkReapet(this);
		clear(this);
		createdefaultText(this);
		fillRoot(this);
		addEvent(this,this.eles[0],"click",function(self,that,e){
			l(that.eles.indexOf(self));
		});
		return this;
	}
	//清空option
	function clear(that){
		for (var i = 0; i < that.eles.length; i++) {
			that.eles[i].innerHTML="";
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
	function  createdefaultText(that,data){
		var defaultText=that.defaultText;
		for (var i = 0; i < that.eles.length; i++) {
			that.eles[i].add(createOption('option',defaultText));
		}
	}
	//创建option
	function createOption(type,text,val){
		var option=document.createElement(type);
		val&&option.setAttribute("value",val);
		option.text=text;
		return option;
	}
	//填充最深层select
	function fillRoot(that){
		var datas=that.datas;
		var rootSele=that.eles[0];
		for(k in datas){
			if (datas[k]) {
				fill(rootSele,datas[k].text,datas[k].value);
			}
		}
	}
	//填充option
	function fill(ele,text,value){
		ele.add(createOption('option',text,value));
	}
	//数组转为对象
	function arrToObj(data){
		var o={}
		for (var i = 0; i < data.length; i++) {
			   o[i]=data[i];
		}
		return o;
	}
	//监测select有没重复绑定
	function checkReapet(that){
		for (var i = 0; i < that.eles.length; i++) {
			if(!that.eles[i].getAttribute("init")){that.eles[i].setAttribute("init",true)}
			else{throw "重复绑定";}
		}
	}
	function checkObject(obj){for(k in obj){return !!obj[k];}}
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
	Linkage.prototype.init=_init;

function  l(s){console.log(s)}

	MultiLevelLinkage=new Linkage();

})
(window,document)