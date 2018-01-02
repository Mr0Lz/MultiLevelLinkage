# MultiLevelLinkage
## 多级联动select插件,不依赖JQuery,可在IE8以及主流的浏览器中使用,简单易用体积小
  使用:1.引入js文件
  
    <script type="text/javascript" src="MultiLevelLinkage.js"></script>
    
  2.设置插件
  
  //相同键值后定义会覆盖前定义的,多余的cell会被丢弃
  //text对应option的text,value对应option的value,
  //value和cell可以不定义,text会代替value
  //除了value,text,cell以外可以自定义自己需要的属性,
  //getValue会返回选中的value,和其他绑定的属性
    var data = {
    1: {text: '蔬菜', value:100,cell: { 10: {text: '菠菜', value: 4 }, 11: {text: '茄子', value: 5} }
    },
    2: {text: '肉', value:100 },
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
