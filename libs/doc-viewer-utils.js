/**
 * Created by Deekshith Allamaneni on 1/25/16.
 * Copyright parishod.com 2016
 */
"use strict";

function getFileExtension(path) {
    let fUrl = path;
    fUrl = fUrl.toLowerCase();
    // Returns file extension. Returns "" if no valid extension
    // Ref: http://stackoverflow.com/a/1203361/3439460
    return fUrl.substr((~-fUrl.lastIndexOf(".") >>> 0) + 2);
}

function loadTextFile(url) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function(resolve, reject) {
        // Standard XHR to load json
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'text';
        // When the request loads, check whether it was successful
        request.onload = function() {
            if (request.status === 200) {
                // If successful, resolve the promise by passing back the request response
                resolve(request.responseText);
            } else {
                // If it fails, reject the promise with a error message
                reject(Error('Give file didn\'t load successfully; error code:' + request.statusText));
            }
        };
        request.onerror = function() {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(Error('There was a network error.'));
        };
        // Send the request
        request.send();
    });
}

function getVar(name)
{
    var get_string = document.location.search;
    var return_value = '';
    do
    { //This loop is made to catch all instances of any get variable.
        var name_index = get_string.indexOf(name + '=');
        if(name_index != -1)
        {
            get_string = get_string.substr(name_index + name.length + 1, get_string.length - name_index);
            var end_of_value = get_string.indexOf('&');
            if(end_of_value != -1)
                var value = get_string.substr(0, end_of_value);
            else
                value = get_string;

            if(return_value == '' || value == '')
                return_value += value;
            else
                return_value += ', ' + value;
        }
    } while(name_index != -1);

    //Restores all the blank spaces.
    var space = return_value.indexOf('+');
    while(space != -1)
    {
        return_value = return_value.substr(0, space) + ' ' +
            return_value.substr(space + 1, return_value.length);
        space = return_value.indexOf('+');
    }

    return(return_value);
}