var formidable = require('formidable'),
 util = require('util'),
 express = require('express'),
 mongoose = require('mongoose'),
 fs = require('fs'),
 app = express();
 app.use(express.static(__dirname, '/public'));
 app.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(util.inspect({
        //     fields: fields,
        //     files: files
        // }));
 
        fs.readFile(files.RemoteFile.path, function(err, data) {
            // save file from temp dir to new dir
            var newPath = __dirname + "/uploads/" + files.RemoteFile.name;
            fs.writeFile(newPath, data, function(err) {
                if (err) throw err;
                console.log('file saved');  
                res.end();
            });
        });
    });
});
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Blockchain Server Has Started!");
});
