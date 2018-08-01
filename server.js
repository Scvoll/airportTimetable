const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const grab = require('./server/grabData');


app.use(express.static(path.join(__dirname, '')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '', './index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/data', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Promise.all([grab.grabData('arrival'),grab.grabData('departure')])
        .then((result) => {
            let fullResult = result.map((item) => grab.normalize(item));
            res.send(JSON.stringify(fullResult));
        })

});
