require('babel-core/register')(require("../../babel-config"));

var app = require("./app");
module.exports = app.default;
