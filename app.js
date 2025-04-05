let express = require('express');
let bodyparser = require('body-parser');
const fs = require('fs');
let app = express();
app.use(bodyparser.urlencoded({extended: false}));
app.set('views', './view');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.listen(3000, function(){
    console.log('http://localhost:3000');
})
app.get('/topic/new', function(req, res){
    res.render('newtopic');
})
app.post('/topic', function(req, res){
    let title = req.body.title;
    let description = req.body.description;
    fs.writeFile('data/' + title, description, function(err){
        if(err){
            res.status(500).send('There is an error\n status:500');
        }
        res.send('successed!');
    })
})
app.get('/topic/:id', function(req, res){    
    let id = req.params.id;
    fs.readdir('data', function(err, files){
        if(err){
            res.status(500).send('There is an error\n status:500');
        }
        fs.readFile('data/' + id, 'utf8', function(err, data){
            if(err){
                res.status(500).send('There is an error\n status:500');
            }
            res.render('view', {topics: files, title: data});
        })
    })  
})
app.get('/', function(req, res){
    res.send('Hello world!');
})