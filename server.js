var express = require('express');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 4100);
app.use(express.static(path.join(__dirname, 'src')));

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});