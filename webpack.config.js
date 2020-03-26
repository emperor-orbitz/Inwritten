var webpack= require('webpack');
var path= require('path');
var HTMLWebpackPlugin =require('html-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
//var UglifyJsPlugin = require("uglifyjs-webpack-plugin")
//console.log(path.resolve(__dirname,'./client/src/resources/'))

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin(
    {
        template:'./Client/assets/index.html',
        filename:'index.html',
        title:'Penboxio',
        minify:true,   
        inject: false
        
    }
)

var config ={
    mode:'development',
    entry: './Client/src/index.js',

    output:{
    path: path.resolve(__dirname,'./Client/assets'),
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
    
    HTMLWebpackPluginConfig,

    new webpack.DefinePlugin({ 
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),

     // new webpack.optimize.DedupePlugin(),
    
      //new webpack.optimize.UglifyJsPlugin(),
     // new webpack.optimize.AggressiveMergingPlugin(),
      new CompressionPlugin({  
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
      })
  ],

 // optimization: {
   // minimizer: [new UglifyJsPlugin(    )],
  //}

}
module.exports = config;