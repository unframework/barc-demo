#!/usr/bin/env node

var RemoteControl = require('remote-control');

new RemoteControl(require('./index.js'), __dirname + '/client.js');

console.info('Estimobot running');
