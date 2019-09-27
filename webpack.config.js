var webpack= require('webpack');
var path= require('path');
var HTMLWebpackPlugin =require('html-webpack-plugin');

console.log(path.resolve(__dirname, './src'))
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin(
    {
        template:'./client/src/index.html',
        filename:'index.html',
        title:'Penboxio',
        minify:true,
        
        inject:'body'
        
    }
)

var config ={
    mode:'development',
    entry: './client/src/index.js',

    output:{
    path: path.resolve(__dirname,'./client/src/resources/'),
    filename: 'index_bundle.js',
    publicPath: '/'
   
    },
  
    devServer:{
        contentBase:  path.join(__dirname, 'client'),
        historyApiFallback:true,
     
       proxy:{
           '/api':'http://localhost:5000'
       }
    
    },
    module:{
        /* instead of loaders*/
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
            loader:"babel-loader",
            query:{
                presets:['react', 'es2015'],
                plugins:["transform-class-properties"]
            }
               
            },
{
test:/\.(png| jp(e*)g |svg)$/,
use:[{
    loader:'url-loader',
    options:{
        limit:8000
    }
}   
]
},
{
    test:/\.scss$/,
    use:[
        {loader:'style-loader'},
        {loader:'css-loader'},
        {loader:'sass-loader'},
       
    ]
    },


    {
        test:/\.css$/,
        use:[
            {loader:'style-loader'},
            {loader:'css-loader'},
            {loader:'sass-loader'},
           
        ]
        },
{
    test:/\.jpg$/,
use:[{
    loader:'file-loader',
    options:{
        limit:8000
    }
}   
]
         },
            {
                test:/\.css$/,
                use:[
                  
                {loader:"css-loader"},
                {loader:"style-loader"},
                ]
            },
           /* {
                test: /\.jsx$/,
                exclude:/node_modules/,
               use:["babel-loader"]
               
            },*/


            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
              }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
              }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/octet-stream"
              }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader"
              }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=image/svg+xml"
              }
        ],
    
    },
 
    
 plugins: [
    
    HTMLWebpackPluginConfig
  ]

}
module.exports = config;