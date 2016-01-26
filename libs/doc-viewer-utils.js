/**
 * Created by Deekshith Allamaneni on 1/25/16.
 * Copyright parishod.com 2016
 */
"use strict";

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