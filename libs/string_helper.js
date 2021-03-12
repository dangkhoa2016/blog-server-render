
module.exports = {
    trimLeft: function (str, charlist) {
        if (charlist === undefined)
            charlist = "\s";

        return str.replace(new RegExp("^[" + charlist + "]+"), "");
    },
    trim: function (str, charlist) {
        return str.trimLeft(charlist).trimRight(charlist);
    },
    trimRight: function (str, charlist) {
        if (charlist === undefined)
            charlist = "\s";

        return str.replace(new RegExp("[" + charlist + "]+$"), "");
    }
};
