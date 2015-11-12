
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

    return function () {
        return [
            b.area({ left: 0, top: 0, width: 48, height: 48 }, b.pad(5, b.box({
                backgroundColor: '#fff', borderRadius: 3
            }, b.image(32, 32, hamburgerIcon)))),
            b.area({ right: 0, top: 0, width: 48, height: 48 }),
            b.area({ left: 48, top: 0, right: 48, height: 48 }, b.image(48, 48, topBarLogo))
        ];
    };
});

// server.getCurrentVote().then(function (vote) {
//     document.body.appendChild(
//         document.createTextNode('responded with: ' + vote)
//     );
// });

