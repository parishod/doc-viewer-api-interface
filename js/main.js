/**
 * Copyright parishod.com 2016
 */
"use strict";

function loadUrlInIframe(fileUrl, elementIdToAppend) {
    if(fileUrl === "" || typeof fileUrl == "undefined" || fileUrl === null) {return;}
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('id', 'ifrm'); // assign an id
    ifrm.setAttribute('style', "border: 0; position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%;");
    ifrm.setAttribute('name', "ifrm");

    //document.body.appendChild(ifrm); // to place at end of document

    // to place before another page element
    var el = document.getElementById(elementIdToAppend);
    el.parentNode.insertBefore(ifrm, el);

    // assign url
    ifrm.setAttribute('src', 'https://docs.google.com/viewer?url='+fileUrl+'&embedded=true&chrome=true&dov=1');

    document.getElementsByName('ifrm')[0].onload = function(){
        document.title = window.frames.ifrm.document.title;
    };
}

loadUrlInIframe(getVar("url"), 'document-viewing-frame');

/*loadFile("../config/services.json", "text").then(function(response) {
        // your code here
		console.log("Response : " , response);
}, function(Error) {
    console.log(Error);
});*/

