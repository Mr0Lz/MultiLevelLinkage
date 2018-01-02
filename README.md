# MultiLevelLinkage
## 多级联动select插件,不依赖JQuery,可在IE8以及主流的浏览器中使用
  使用:
  1.引入js文件
  
    <script type="text/javascript" src="MultiLevelLinkage.js"></script>
    
  2.在html中写select标签,插件可以用id,css等可以选中select的选择器
  
  
  	<select id="s" class="c"></select>
   
   
  3.配置插件
   设置opt对象配置插件
   
   
`opts.data`只能定义一个,本地数据对象和AJAX数据对象只能存在一个,data长度大于select的长度,多余的data会被抛弃
   
   
`opts.select`是一组select数组,按照定义顺序嵌套层,select数组只能是select的对象,数组不可以重复,第一个是最上层的select,自动忽略非select对象和重复的,至少是数组只有一个值,data的长度小于select的长度,多余的select会被不启用

`opts.defaultText` 自定义提示文字,默认为"请选择"

例子:
  
     var opts = {
     data: data			
     select: ["#s",".c",".c2",".c3",".c4",".c5"],
     defaultText:"defaultText"
     };
  
  
  
  
  
  opts.data数据的结构:
 
    //相同键值后定义会覆盖前定义的,多余的cell会被丢弃
    //text对应option的text,value对应option的value,
    //value和cell可以不定义,text会代替value
    //除了value,text,cell以外可以自定义自己需要的属性,
    //getValue会返回选中的value,和其他绑定的属性
    var data = {
    1: {text: '蔬菜', value:100,
        cell: { 10: {text: '菠菜', value: 4 }, 11: {text: '茄子', value: 5} }
       },
    2: {text: '肉', value:100 },
    3: {text: '水果', 
      cell: { 
       30: {text: '苹果', cell: {301: {text: '红富士', value: 20}  } } ,
       31: {text: '桃', 
           cell: { 310: {text: '猕猴桃', value: 30}, 311: {text: '油桃', value: 31}, 312: {text: '蟠桃', value: 32} }
        }
      }
    },
    4: {text: '粮食',  value:300,
      cell: { 
         40: {text: '水稻', 	cell: {	401: {text: '大米', cell: {4001: {text: '五常香米', value: 50}} } } 	} 
        }
     }
    };
    
AJAX的数据:



    //没有method默认get,
    //parameter默认为"",
    //requestHeader默认为[{key:'Content-Type',value:'application/x-www-form-urlencoded'}],
    //async表示请求是否异步处理。默认是 true。
    var dataAjax={url:"http://localhost:3000/linkage",
       method:"get",
       async:"true",
       parameter:'key1=value1&key2=value2',
       //requestHeader:[{key:'Content-Type',value:'application/x-www-form-urlencoded'}],
       requestHeader:[]
      }    
     
   
