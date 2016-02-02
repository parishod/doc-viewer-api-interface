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
    el.innerHTML = ""; // Empty any previous contents of that element
    el.parentNode.insertBefore(ifrm, el);

    // assign url
    ifrm.setAttribute('src', 'https://docs.google.com/viewer?url='+fileUrl+'&embedded=true&chrome=true&dov=1');

    document.getElementsByName('ifrm')[0].onload = function(){
        document.title = window.frames.ifrm.document.title;
    };
}

let givenFileUrl = (typeof(getVar("url")) !== "undefined")? getVar("url"): "";

// Loading the URL passed via API in Iframe
loadUrlInIframe(givenFileUrl, 'document-viewing-frame');

// Assigning Href to Download button in floating menu
assignAttrToDocumentElementById("href", givenFileUrl, "floating-menu-main-download-id");

loadFile("https://dl.dropboxusercontent.com/u/39352517/services.json", "json").then(function(response) {
        // your code here
		console.log("Response : " , response);
}, function(Error) {
    console.log(Error);
});

