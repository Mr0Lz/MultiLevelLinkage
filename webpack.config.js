const UglifyJSPlugin=require("uglifyjs-webpack-plugin");

module.exports={
    entry:{
        MultiLevelLinkage:"./MultiLevelLinkage.js"
    },
    plugins:[
        new UglifyJSPlugin()
    ],
    output:{
        filename:"[name].min.js",
        path:__dirname
    }
}