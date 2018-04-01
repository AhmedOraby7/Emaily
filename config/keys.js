// keys.js

if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}


// 599610451495-1ncdfncsgvqhmtb3hm18774ts68ctc9d.apps.googleusercontent.com
// v7B0L0YTmAA87nHokPVnv60F    secret