var MultiLevelLinkage;
!(function(){
	function Linkage(){
	}

	function _init(opt){
		if(opt.selectDoc){
			if(checkDoc(opt.selectDoc)){
				this.ele=opt.selectDoc
			}
		}

		return this;
	}

	function checkDoc(ele){
		if(typeof ele==="string"){
			if (document.querySelector(ele).nodeName.toLocaleLowerCase()==="select") {
				return true
			}
		}else if (ele.nodeName.toLocaleLowerCase()==="select") {
			return true
		}else {
			throw  "不是下拉框节点"
		}
	}

	Linkage.prototype.init=_init



	MultiLevelLinkage=new Linkage();
})
(window,document)