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
            return b.text('Loading...').at(0, 48, b.screenWidth, b.screenHeight - 48);
        }

        // otherwise, a real false
        return b.box(
            b.text('Slack token not set up yet').at(0, 96, b.screenWidth, 64),
            b.button('Set Up Slack Token', function () {
                window.location = '#/token';
            }).at(0, 160, b.screenWidth, 64)
        ).at(0, 48, b.screenWidth, b.screenHeight - 48);
    }

    function renderTokenScreen() {
        return b.box(
            b.text('Enter Slack token to connect').at(0, 96, b.screenWidth, 64),
            b.form(
                b.field('Paste token here').at(96, 96, b.screenWidth - 96 * 2, 64),
                b.submit('Connect to Slack').at(96, 160, b.screenWidth - 96 * 2, 64),
                function (token) {
                    console.log('token', token);
                }
            )
        ).at(0, 48, b.screenWidth, b.screenHeight - 48);
    }

    return function () {
        return [
            b.image(32, 32, hamburgerIcon).at(0, 0, 48, 48),
            b.image(48, 48, topBarLogo).at(48, 0, b.screenWidth - 48, 48),

            tokenRoute.getIsActive()
                ? renderTokenScreen()
                : (isSetup
                    ? [
                        (mainRoute.getIsActive()
                            ? b.box().at(48, 96, b.screenWidth - 96, b.screenHeight - 96)
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

