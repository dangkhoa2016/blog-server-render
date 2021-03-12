'use strict';
const moment = require("moment");
const regNumber = /^\d+$/;
const _ = require('./string_helper');

var formatDate = function (value, format) {
    if (!value) return '';
    value = new Date(regNumber.test(value) ? parseFloat(value) : value);
    return moment(value).format(format)
};

var ext_BgImage = function (image) {
    if (!image)
        return '';

    return "background-image: url('" + image + "')";
};

var ext_RandomCount = function () {
    return Math.floor(Math.random() * (100 + 1));
};

module.exports = {
    ext_BgImage,
    ext_RandomCount,
    formatShortDate: function (value) {
        return formatDate(value, 'MMM DD YYYY');
    },
    formatDate,
    ifCond: function (v1, v2, options) {
        if (v1.toString() === v2.toString()) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    match_url_and_menu: function (v1, v2, options) {
        v1 = _.trimLeft(v1.toLowerCase(), '/');
        v2 = _.trimLeft(v2.toLowerCase(), '/');
        v1 = v1.split('?')[0];
        v2 = v2.split('?')[0];

        if (v1 === v2 || v1.indexOf(v2) !== -1 || v2.indexOf(v1) !== -1) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    json: function (context) {
        return JSON.stringify(context);
    },
    calculate: function (operand1, operator, operand2) {
        let result;
        switch (operator) {
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '*':
                result = operand1 * operand2;
                break;
            case '/':
                result = operand1 / operand2;
                break;
        }

        return Number(result);
    }
}