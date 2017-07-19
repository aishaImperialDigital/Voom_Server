module.exports = {
    // the database url to connect
    url : 'mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb'
}

var login_db = mongoose.model('mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb', db_schema);
       return function (req, res, next) {
               req.app = login_db;
               next();
           }; 
