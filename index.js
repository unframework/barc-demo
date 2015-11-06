var Slack = require('slack-client');

var API_TOKEN = 'xoxb-13350508710-PztlziztMDo14titlgwl9fKU';
var CHANNEL_NAME = 'estimation';

var slack = new Slack(API_TOKEN, false, true);

slack.on('open', function() {
    console.log("Connected to " + slack.team.name + " as @" + slack.self.name);

    // var channelList = Object.keys(slack.channels).map(function (k) { return slack.channels[k]; });

    // channelList.filter(function (c) { return c.is_member; }).forEach(function (c) {
    //     console.log('part of', c.name);
    // });
});

slack.on('message', function(message) {
    if (message.user === slack.self.id) {
        console.log('ignoring message from self');
        return;
    }

    var messageMatch = message.text && /estimobot/.exec(message);

    if (!messageMatch) {
        console.log('ignoring non-trigger message');
        return;
    }

    console.log(message);
});

slack.on('error', function(err) {
    console.error("Error", err);
});

slack.login();
