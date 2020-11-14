let express = require('express');
let mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
let app = express();

let bodyParser = require('body-parser');
let cors = require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('legoLearning'));


let port = 8080;

app.listen(port, function() {
    console.log('listening on port: ', port);
});


app.get('/articles', async function(req, res) {//I can attach the object id in the url using :id
    let articles = await loadArticles();
    let content = await articles.find({_id: ObjectId("5fad54823fa11e829ae88af0")}).toArray();
    console.log(content[0].content);
    res.send(content[0]);
});

app.post('/articles', async function(req, res) {
    let articles = await loadArticles();
    console.log('This is the request body: ', req.body);
    await articles.updateOne({ _id : ObjectId("5fad54823fa11e829ae88af0")},{$set: {'content' : req.body.content}});
    res.status(201).send();
});


async function loadArticles(){
    let articles = await mongodb.MongoClient.connect('mongodb+srv://abc123:qwerty12345@cluster0.nzow2.mongodb.net/<experiment>?retryWrites=true&w=majority', {
        useNewUrlParser : true
    });
    return articles.db('<experiment>').collection('mynewcollection');
};