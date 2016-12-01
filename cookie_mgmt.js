
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
 */
Cookie = function ()
{
    this.xDays = 0;
    this.defPath = "/";
};


/**
 * Add a parameter and its value. If the cookie doesn´t exist, it will be created.
 * @param cName     Name of the cookie
 * @param cParam    Name of the parameter
 * @param pValue    Value of the parameter
 * @param xDays     Days until cookie expires
 * @param path      Path
 */
Cookie.prototype.set = function (cName, cParam, pValue, xDays, path)
{
    var valObj = {};
    valObj[cParam] = pValue;
    var curVal = this.get(cName) ? JSON.parse(this.get(cName)) : null;
    var newVal = curVal ? $.extend(curVal, valObj) : valObj;
    var newCookieVal = JSON.stringify(newVal);

    var e = xDays ? xDays : this.xDays;
    var p = path ? path : this.defPath;
    var date = new Date();
    var expires = "";
    if(e) {
        date.setTime(date.getTime() + (e * 24 * 60 * 60 * 1000));
        expires = "expires=" + date.toUTCString();
    }
    document.cookie = cName + "=" + newCookieVal + ";" + expires + ";path=" + p;
};


/**
 * Get a cookie value
 * @param cName
 * @param cParam
 * @returns {*}
 */
Cookie.prototype.get = function (cName, cParam)
{
    var name = cName + "=";
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
 * @param cName
 * @param cParam
 * @param xDays
 * @param path
 */
Cookie.prototype.deleteParam = function (cName, cParam, xDays, path)
{
    if (this.get(cName)) {
        var curVal = JSON.parse(this.get(cName));
        delete curVal[cParam];
        var newCookieVal = JSON.stringify(curVal);

        var e = xDays ? xDays : this.xDays;
        var p = path ? path : this.defPath;
        var date = new Date();
        var expires = "";
        if(e) {
            date.setTime(date.getTime() + (e * 24 * 60 * 60 * 1000));
            expires = "expires=" + date.toUTCString();
        }
        document.cookie = cName + "=" + newCookieVal + ";" + expires + ";path=" + p;
    }
};


/**
 * Remove the cookie
 * @param cName
 */
Cookie.prototype.delete = function (cName)
{
    document.cookie = cName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};
