/**
 * Authors: Deekshith Allamaneni, Uday Kumar Swarnapuri
 * Copyright Deekshith Allamaneni 2016
 */
"use strict";

function getFileExtension(path) {
    let fUrl = path;
    fUrl = fUrl.toLowerCase();
    // Returns file extension. Returns "" if no valid extension
    // Ref: http://stackoverflow.com/a/1203361/3439460
    return fUrl.substr((~-fUrl.lastIndexOf(".") >>> 0) + 2);
}


function loadFile(filePath, fileResponseType) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function (resolve, reject) {
        // Standard XHR to load json
        var request = new XMLHttpRequest();
        request.open('GET', filePath, true);
        request.responseType = fileResponseType;
        // When the request loads, check whether it was successful
        request.onload = function () {
            if (request.status === 200) {
                // If successful, resolve the promise by passing back the request response
                if (fileResponseType === "text") {
                    resolve(request.responseText);
                } else {
                    resolve(request.response);
                }
            } else {
                // If it fails, reject the promise with a error message
                reject(Error('Give file didn\'t load successfully; error code:' + request.statusText));
            }
        };
        request.onerror = function () {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(Error('There was a network error.'));
        };
        // Send the request
        request.send();
    });
}


function loadTextFile(url) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function (resolve, reject) {
        // Standard XHR to load json
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'text';
        // When the request loads, check whether it was successful
        request.onload = function () {
            if (request.status === 200) {
                // If successful, resolve the promise by passing back the request response
                resolve(request.responseText);
            } else {
                // If it fails, reject the promise with a error message
                reject(Error('Give file didn\'t load successfully; error code:' + request.statusText));
            }
        };
        request.onerror = function () {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(Error('There was a network error.'));
        };
        // Send the request
        request.send();
    });
}

function getAllUrlParameters(url) {
    if(typeof url !== "string" || url.indexOf("?") === -1) {return null;}
    return url
        .substring( // Extracting GET params of the URL which is a substring ...
            url.indexOf("?")+1, // after character "?" ...
            url.indexOf("#") !== -1
                ? url.indexOf("#") // till the page IDs denoted using "#" ...
                : url.length) // or till the end if page IDs are not present.
        .split("&") // Splitting the URL params separated by "&"
        .map((keyValString) => keyValString.split("="))
        .filter((keyValArr) => keyValArr.length === 2)
        .map((keyValArr) => {
            return {"key":keyValArr[0], "value":keyValArr[1]};
        });
}


function getUrlParameterByName(paramName, url) { // Depends on getAllUrlParameters()
    if(typeof url !== "string"
            || typeof paramName !== "string"
            || url.length === 0
            || paramName.length === 0) {
        return null;
    }
    let allUrlParametersArr = getAllUrlParameters(url);
    let reqPramIndex = allUrlParametersArr.findIndex((eachParam) => eachParam.key === paramName);
    return (reqPramIndex !== -1)
        ? allUrlParametersArr[reqPramIndex].value
        : null;
}


function assignAttrToDocumentElementById(attribute, attributeValue, elementId) {
    if( typeof(attribute) === "string"
        && typeof(attributeValue) === "string"
        && typeof(elementId) === "string") {
        var thisElement = document.getElementById(elementId);
        if(thisElement != null) {
            thisElement.setAttribute(attribute, attributeValue);
        }
    }
}

//======= Functions to Read and Write Cookies ======
/**
 * Creates Cookie to save the user preferences for api to be used for a given file type.
 * @param {String} name 
 * @param {String} value
 * @return {Number} days
 */
function createCookie(name, value, expires, path, domain) {
	//console.log("createCookie Called");
	var cookie = name + "=" + escape(value) + ";";

	if (expires) {
	// If it's a date
	if(expires instanceof Date) {
	  // If it isn't a valid date
	  if (isNaN(expires.getTime()))
	   expires = new Date();
	}
	else
		expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

		cookie += "expires=" + expires.toGMTString() + ";";
	}

	if (path)
		cookie += "path=" + path + ";";
	if (domain)
		cookie += "domain=" + domain + ";";

	document.cookie = cookie;
}

/**
 * Reads Cookie to know the user preferences for api to be used for a given file type.
 * @param {String} name 
 */
function readCookie(name) {
	//console.log("ReadCookie Called");
	var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
	var result = regexp.exec(document.cookie);
	return (result === null) ? null : result[1];
}

/**
 * Deletes the given Cookie.
 * @param {String} name 
 */
function eraseCookie(name) {
	createCookie(name,"",-1);
}
//======= Functions to Read and Write Cookies End ====== 
