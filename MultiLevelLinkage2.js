var MultiLevelLinkage;
!(function(){
if (!Array.prototype.indexOf){ Array.prototype.indexOf = function(elt /*, from*/){ var len = this.length >>> 0; var from = Number(arguments[1]) || 0; from = (from < 0) ? Math.ceil(from) : Math.floor(from); if (from < 0) from += len; for (; from < len; from++) { if (from in this && this[from] === elt) return from; } return -1; }; }
	function Linkage(){
		if(isIE(6)||isIE(7)){
			throw "等死吧,没救了,告辞";
		}
	}
	function _init(opt){
		if(!opt.options||opt.options.length===0){throw "请设置options"}
		this.defaultText="请选择";
		this.data=opt.options;
		this.rootEle=getDoc(opt.selectDoc);
		if(!this.rootEle){throw "没有获取到select,1.请输出正确的选着器"}
		if(!this.rootEle.getAttribute("init")){this.rootEle.setAttribute("init",true)}
		else{throw "重复绑定"}
		this.selectArr=getSelectDoc(this,opt);
		//createdefaultText(this.selectArr,this,opt);
		fillOption(this);
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
	function  createdefaultText(ele,context,data){
		var defaultText=data.defaultText||context.defaultText;
		for (var i = 0; i < ele.length; i++) {
			clear(ele[i]);
			ele[i].add(createOption('option',defaultText));
		}
	}
	//创建option
	function createOption(type,text,val){
		var option=document.createElement(type);
		val&&option.setAttribute("value",val);
		option.text=text;
		return option;
	}
	//填充options
	function fillOption(that){
		l(that);
		if(that.selectArr.length===0){return;}
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
		arr.push({select:getDoc(data.selectDoc),options:null});//第一级select
		function get(data){
			var options=data.options;
			if(arr[0].options===null&&options){arr[0].options=options;}
			if(options){
				for (var i = 0; i < options.length; i++) {
					var rel=options[i].rel
					if(rel){
						for (var j = 0; j < rel.length; j++) {
							arr.push({select:getDoc(rel[j].selectDoc),options:rel[j].options});
							get(rel[j]);
						}
					}else{return;}
				}
			}else{
				return;
			}
		}
		get(data);
		l(arr)
		return arr
	}
	Linkage.prototype.init=_init;

function  l(s){console.log(s)}

	MultiLevelLinkage=new Linkage();

})
(window,document)