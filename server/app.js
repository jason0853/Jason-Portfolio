import express from 'express';
const app = express();

app.set('view engine', 'pug');
app.use(express.static('dist'));

if (process.env.NODE_ENV === 'development') {
    app.locals.pretty = true;
}

app.get('/', function (req, res) {
    res.render('index', {title: 'Hello world'});
});

app.get('/second', function (req, res) {
    res.render('second');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server is running on port ' + port);
});
