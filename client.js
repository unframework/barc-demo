
var RootRoute = require('atomic-routes');
var vdomLive = require('vdom-live');
var b = require('boxbits');

var topBarLogo = require('./topBarLogo');
var hamburgerIcon = require('./hamburgerIcon');

var server = require('__server')();

var rootRoute = new RootRoute();

document.body.parentNode.style.width = '100%';
document.body.parentNode.style.height = '100%';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.width = '100%';
document.body.style.height = '100%';

vdomLive(function (renderLive) {
    var dom = renderLive(function(h) {
        return h('div');

        return b.mobilePortrait(
            b.area({ left: 0, top: 0, width: 48, height: 48 }, b.pad(5, b.box({
                backgroundColor: '#fff', borderRadius: 3
            }, b.image(32, 32, hamburgerIcon)))),
            b.area({ right: 0, top: 0, width: 48, height: 48 }),
            b.area({ left: 48, top: 0, right: 48, height: 48 }, b.image(48, 48, topBarLogo))
        );
    });

    document.body.appendChild(dom);
});

rootRoute.when('/avatar', function () {
    console.log('avatar!');
})

server.getCurrentVote().then(function (vote) {
    document.body.appendChild(
        document.createTextNode('responded with: ' + vote)
    );
});

