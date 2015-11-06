
var server = require('__server')();

server.getCurrentVote().then(function (vote) {
    document.body.appendChild(
        document.createTextNode('responded with: ' + vote)
    );
});

