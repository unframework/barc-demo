var Promise = require('bluebird');
var Slack = require('slack-client');

var slack = null;

module.exports = {
    getIsSetup: function () {
        return slack !== null;
    },

    applyToken: function (token) {
        if (slack) {
            throw new Error('already applied token');
        }

        return new Promise(function (resolve, reject) {
            var conn = new Slack(token, false, true);

            conn.on('open', function () {
                console.log("Connected to " + conn.team.name + " as @" + conn.self.name);

                slack = conn;

                resolve();
            });

            conn.on('error', function (err) {
                console.error("Error", err);

                reject(err);
            });

            conn.login();
        });
    }
};
