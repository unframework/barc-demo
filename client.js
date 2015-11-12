
var RootRoute = require('atomic-routes');
var boxbits = require('boxbits');

var topBarLogo = require('./topBarLogo');
var hamburgerIcon = require('./hamburgerIcon');

var server = require('__server')();

boxbits.run(function (b) {
    var rootRoute = new RootRoute();

    rootRoute.when('/avatar', function () {
        console.log('avatar!');
    });

    return function (screenW, screenH) {
        return [
            b.box(0, 0, 48, 48, b.image(32, 32, hamburgerIcon)),

            b.box(48, 0, screenW - 48, 48, b.image(48, 48, topBarLogo))
        ];
    };
});

// server.getCurrentVote().then(function (vote) {
//     document.body.appendChild(
//         document.createTextNode('responded with: ' + vote)
//     );
// });

