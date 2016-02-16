/**
 * Authors: Deekshith Allamaneni, Uday Kumar Swarnapuri
 * Copyright Deekshith Allamaneni 2016
 */
"use strict";

function loadUrlInIframeById(iframeUrl, elementId) {
    if (iframeUrl === "" || typeof iframeUrl == "undefined" || iframeUrl === null) {return;}
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('style', "border: 0; position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%;");
    ifrm.setAttribute('name', "document-viewing-iframe");
    ifrm.setAttribute('src', iframeUrl);

    // to place before another page element
    let elementToAttachIFrame = document.getElementById(elementId);
    if(typeof elementToAttachIFrame === "undefined") {return;}
    elementToAttachIFrame.innerHTML = ""; // Empty any previous contents of that element
    elementToAttachIFrame.parentNode.insertBefore(ifrm, elementToAttachIFrame);
}


// Loading json file data
loadFile("../config/config.json", "json").then(function (defaultConfigData) {
    let givenFileUrl = decodeURIComponent(getUrlParameterByName("url", document.location));

    // Assigning Href to Download button in floating menu
    assignAttrToDocumentElementById("href", givenFileUrl, "floating-menu-main-download-id");

    let fileExtensionOfUrl = (getUrlParameterByName("filetype", document.location) !== null)
        ? getUrlParameterByName("filetype", document.location)
        : getFileExtension(givenFileUrl);

    //console.log("localStorage.getItem:", localStorage.getItem('viewer-user-pref')); // DEBUG
    if (localStorage.getItem('viewer-user-pref') === null) {
        localStorage.setItem('viewer-user-pref', JSON.stringify(defaultConfigData));
    }

    try {
        let jsonFormatData = JSON.parse(decodeURIComponent(localStorage.getItem('viewer-user-pref')));
        // console.log("jsonFormatData:", jsonFormatData); //DEBUG
        let indexPreferredService = jsonFormatData.user_preferences.file_types
            .findIndex((thisFileTypeObj) => thisFileTypeObj.extension === fileExtensionOfUrl);
        let prefService;
        if(indexPreferredService !== -1) {
            prefService = jsonFormatData.user_preferences.file_types[indexPreferredService].preferred_service
        }else {
            // This can happen when bad URL is used. Like http://domain.com/viewer?url=
            throw `Could not find preferred service id for URL ${fileExtensionOfUrl}`;
        }

        let indexSuportedService = jsonFormatData.supported_services
            .findIndex((thisService) => thisService.id === prefService);
        let iframeUrl;
        if(indexSuportedService !== -1) {
            let fileOpenUrlTemplate = jsonFormatData.supported_services[indexSuportedService].file_open_API;
            if(fileOpenUrlTemplate.indexOf("{$file_url}") !== -1) {
                iframeUrl = fileOpenUrlTemplate.replace('{$file_url}', encodeURIComponent(givenFileUrl));
            }else {
                // Can happen if config data is corrupted or API string is not correctly formed.
                // Basically, assuming that we have to replace \"{$file_url}\" with the file url
                // If that pattern is not found, throw an error. (unless if it is changed in future)
                throw `Unknown formatting of File Open API template`;
            }
        } else {
            // This could happen if the service is not available in the config data.
            throw `Could not find URL template for service ${prefService}`;
        }

        // Loading the URL passed via API in Iframe
        if (iframeUrl !== null) {
            loadUrlInIframeById(iframeUrl, 'document-viewing-frame');
        }else {
            throw `iframe URL is ${iframeUrl}`;
        }
    } catch (err) {
        console.error("Error in promise generating iframe URL: ", err);
    }
}, function (Error) {
    console.error(Error);
});
