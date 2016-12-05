
/*************************************************************************
 *
 * Cookie Management.
 * Created by Martin J. Wolf
 * Requires: jQuery
 * License: MIT
 *
 * With this script you can easily store, access and remove multiple values
 * in a single cookie.
 *
 *************************************************************************/


var Cookie = {};


/**
 * Setting some defaults.
 * @param cName     Name of the cookie
 * @param xDays     Days until cookie expires (optional)
 * @param path      Path (optional)
 */
Cookie = function (cName, xDays, path)
{
    this.cName = cName;
    this.xDays = xDays ? xDays : 0;
    this.path = path ? path : "/";
};


/**
 * Add a parameter or overwrite its value. If the cookie doesn´t exist, it will be created.
 * @param cParam    Name of the parameter
 * @param pValue    Value of the parameter
 */
Cookie.prototype.set = function (cParam, pValue)
{
    if (typeof pValue != "undefined" && pValue !== null) {
        var valObj = {};
        valObj[cParam] = pValue;
        var curVal = this.get() ? JSON.parse(this.get()) : null;
        var newVal = curVal ? $.extend(curVal, valObj) : valObj;
        var newCookieVal = JSON.stringify(newVal);

        var expires = "";
        if(this.xDays) {
            var date = new Date();
            date.setTime(date.getTime() + (this.xDays * 24 * 60 * 60 * 1000));
            expires = ";expires=" + date.toUTCString();
        }

        var path = "";
        if(this.path) {
            path = ";path=" + this.path;
        }

        document.cookie = this.cName + "=" + newCookieVal + expires + path;
    }
};


/**
 * Get a cookie value
 * @param cParam
 * @returns {*}
 */
Cookie.prototype.get = function (cParam)
{
    var name = this.cName + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            if (cParam) {
                var cValue = JSON.parse(c.substring(name.length, c.length));
                return cValue[cParam];
            } else {
                return c.substring(name.length, c.length);
            }
        }
    }
    return "";
};


/**
 * Delete a single parameter of the cookie
 * @param cParam
 */
Cookie.prototype.clear = function (cParam)
{
    if (this.get()) {
        var curVal = JSON.parse(this.get());
        delete curVal[cParam];
        if ($.isEmptyObject(curVal)) {
            this.remove();
        } else {
            var newCookieVal = JSON.stringify(curVal);

            var expires = "";
            if(this.xDays) {
                var date = new Date();
                date.setTime(date.getTime() + (this.xDays * 24 * 60 * 60 * 1000));
                expires = ";expires=" + date.toUTCString();
            }

            var path = "";
            if(this.path) {
                path = ";path=" + this.path;
            }

            document.cookie = this.cName + "=" + newCookieVal + expires + path; 
        }
    }
};


/**
 * Remove the cookie
 */
Cookie.prototype.remove = function ()
{
    document.cookie = this.cName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};
