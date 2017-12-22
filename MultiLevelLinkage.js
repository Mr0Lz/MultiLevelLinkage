var MultiLevelLinkage;
!(function(){
if (!Array.prototype.indexOf){ Array.prototype.indexOf = function(elt /*, from*/){ var len = this.length >>> 0; var from = Number(arguments[1]) || 0; from = (from < 0) ? Math.ceil(from) : Math.floor(from); if (from < 0) from += len; for (; from < len; from++) { if (from in this && this[from] === elt) return from; } return -1; }; }
	function Linkage(){
		if(isIE(6)||isIE(7)){
			alert("等死吧,没救了,告辞");
		}
		this.defaultText="请选择";
	}

	function _init(opt){
		if(!opt.options||opt.options.length===0){throw "请设置options"}
		this.data=opt.options;
		this.ele=getDoc(opt.selectDoc);
		if(!this.ele){throw "没有获取到select,1.请输出正确的选着器"}
		if(!this.ele.getAttribute("init")){this.ele.setAttribute("init",true)}
		else{throw "重复绑定"}
		clear(this.ele);
		this.selectArr=getSelectDoc(this,opt);
		createdefaultText(this,opt);
		fillOption(this,this.data);
		return this;
	}
	//清空option
	function clear(ele){
		ele.innerHTML="";
	}
	//浏览器版本检测
	function  isIE (ver){
	    var b = document.createElement('b')
	    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
	    return b.getElementsByTagName('i').length === 1;
	}
	//获取是select
	function getDoc(ele){
		if(typeof ele==="string"){
			var e=document.querySelector(ele)
			if (e.nodeName.toLocaleLowerCase()==="select") {
				return e;
			}
		}else if (ele.nodeName.toLocaleLowerCase()==="select") {
			return ele;
		}
	}
	//创建defaultText
	function  createdefaultText(context,data){
		var defaultText=data.defaultText||context.defaultText;
		context.ele.add(createOption('option',defaultText));
	}
	//创建option
	function createOption(type,text,val){
		var option=document.createElement(type);
		val&&option.setAttribute("value",val);
		option.text=text;
		return option;
	}
	//填充options
	function fillOption(that,arr){
		if(arr.length===0){return ;}
		for (var i = 0; i < arr.length; i++) {
			l(arr[i]);
		}
	}
	//数组转为对象
	function arrToObj(data){
		var o={}
		for (var i = 0; i < data.length; i++) {
			   o[i]=data[i];
		}
		return o;
	}
	//获取select arr
	function getSelectDoc(that,data){
		var arr=[]; 
		arr.push(getDoc(data.selectDoc));//第一级select
		function get(data){
			var options=data.options;
			if(options){
				for (var i = 0; i < options.length; i++) {
					var rel=options[i].rel
					if(rel){
						for (var j = 0; j < rel.length; j++) {
							arr.push(getDoc(rel[j].selectDoc));
							get(rel[j]);
						}
					}else{return;}
				}
			}else{
				return;
			}
		}
		get(data);
		return arr
	}
	Linkage.prototype.init=_init;

function  l(s){console.log(s)}

	MultiLevelLinkage=new Linkage();

})
(window,document)