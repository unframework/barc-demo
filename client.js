
var RootState = require('atomic-routes');
var boxbits = require('boxbits');

var topBarLogo = require('./topBarLogo');
var hamburgerIcon = require('./hamburgerIcon');

var server = require('__server')();

boxbits.run(function (b) {
    var rootState = new RootState();

    var mainRoute = rootState.whenRoot();
    var tokenRoute = rootState.when('/token');

    return function (screenW, screenH) {
        return [
            b.box(0, 0, 48, 48, b.image(32, 32, hamburgerIcon)),

            b.box(48, 0, screenW - 48, 48, b.image(48, 48, topBarLogo)),

            (mainRoute.getIsActive()
                ? b.box(48, 96, screenW - 96, screenH - 96)
                : null
            ),

            (tokenRoute.getIsActive()
                ? b.box(0, 48, screenW, screenH)
                : null
            )
        ];
    };
});

// server.getCurrentVote().then(function (vote) {
//     document.body.appendChild(
//         document.createTextNode('responded with: ' + vote)
//     );
// });

