const express = require ('express');
const path = require('path');
const app = express();
const controller = require('./users/usersController');
const bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '..','client','build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());//lern


app.use('/', controller);



const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
