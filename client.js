var RootState = require('atomic-routes');
var boxbits = require('boxbits');

var topBarLogo = require('./topBarLogo');
var hamburgerIcon = require('./hamburgerIcon');

boxbits.run(function (b) {
    var rootState = new RootState();

    var server = require('__server')();

    var isSetup = null;
    server.getIsSetup().then(function (v) {
        isSetup = !!v;
    });

    var mainRoute = rootState.whenRoot();
    var tokenRoute = rootState.when('/token');

    function renderNonSetupScreen() {
        // not sure yet...
        if (isSetup === null) {
            return b.box(0, 48, b.screenWidth, b.screenHeight - 48,
                b.text('Loading...')
            );
        }

        // otherwise, a real false
        return b.box(0, 48, b.screenWidth, b.screenHeight - 48,
            b.box(0, 96, b.screenWidth, 64, b.text('Slack token not set up yet')),
            b.box(0, 160, b.screenWidth, 64, b.button('Set Up Slack Token', function () {
                window.location = '#/token';
            }))
        );
    }

    function renderTokenScreen() {
        return b.box(0, 48, b.screenWidth, b.screenHeight - 48,
            b.box(0, 96, b.screenWidth, 64, b.text('Enter Slack token to connect'))
        );
    }

    return function () {
        return [
            b.box(0, 0, 48, 48, b.image(32, 32, hamburgerIcon)),

            b.box(48, 0, b.screenWidth - 48, 48, b.image(48, 48, topBarLogo)),

            tokenRoute.getIsActive()
                ? renderTokenScreen()
                : (isSetup
                    ? [
                        (mainRoute.getIsActive()
                            ? b.box(48, 96, b.screenWidth - 96, b.screenHeight - 96)
                            : null
                        )
                    ]
                    : renderNonSetupScreen()
                )
        ];
    };
});

// server.getCurrentVote().then(function (vote) {
//     document.body.appendChild(
//         document.createTextNode('responded with: ' + vote)
//     );
// });

