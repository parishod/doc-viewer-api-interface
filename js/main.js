/**
 * Copyright parishod.com 2016
 */
"use strict";

function loadUrlInIframe(fileUrl, elementIdToAppend, preferedService, extension, defaultConfigData) {
    if (fileUrl === "" || typeof fileUrl == "undefined" || fileUrl === null) {
        return;
    }
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('id', 'ifrm'); // assign an id
    ifrm.setAttribute('style', "border: 0; position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%;");
    ifrm.setAttribute('name', "ifrm");

    // to place before another page element
    var el = document.getElementById(elementIdToAppend);
    el.innerHTML = ""; // Empty any previous contents of that element
    el.parentNode.insertBefore(ifrm, el);

    // assign url
    if (extension == null) { // Extension null implies url is of the type &filetype
        ifrm.setAttribute('src', '' + fileUrl);
    }
    else if (preferedService == null) {
        ifrm.setAttribute('src', 'https://view.officeapps.live.com/op/view.aspx?src=' + fileUrl);
    }
    else {
        let indexPreferredService = defaultConfigData.supported_services
            .findIndex((thisFileTypeObj) => thisFileTypeObj.id === preferedService);
        let reqAPI = defaultConfigData.supported_services[indexPreferredService].file_open_API;
        let reqUrl = reqAPI.replace('{$file_url}', '' + fileUrl)
        // console.log("Required url : ", reqUrl) // DEBUG
        ifrm.setAttribute('src', reqUrl);
    }
}


// Loading json file data
loadFile("../config/config.json", "json").then(function (defaultConfigData) {
    let givenFileUrl = getUrlParameterByName("url", document.location);

    // Assigning Href to Download button in floating menu
    assignAttrToDocumentElementById("href", givenFileUrl, "floating-menu-main-download-id");

    let fileExtensionOfUrl = (getUrlParameterByName("filetype", document.location) !== null)
        ? getUrlParameterByName("filetype", document.location)
        : getFileExtension(givenFileUrl);

    //console.log("localStorage.getItem:", localStorage.getItem('viewer-user-pref')); // DEBUG
    if (localStorage.getItem('viewer-user-pref') === null) {
        localStorage.setItem('viewer-user-pref', JSON.stringify(defaultConfigData));
    }

    //Read the preference for the given extension
    let prefService;
    try {
        let jsonFormatData = JSON.parse(decodeURIComponent(localStorage.getItem('viewer-user-pref')));
        console.log("jsonFormatData:", jsonFormatData);
        let indexPreferredService = jsonFormatData.user_preferences.file_types
            .findIndex((thisFileTypeObj) => thisFileTypeObj.extension === fileExtensionOfUrl);
        prefService = (indexPreferredService !== -1)
            ? jsonFormatData.user_preferences.file_types[indexPreferredService].preferred_service
            : null;
    } catch (err) {
        console.error("Error Parsing User Preferences data to JSON: ", err.message);
    }
    // console.log("Preferred Service: ", prefService); // DEBUG

    // Loading the URL passed via API in Iframe
    loadUrlInIframe(givenFileUrl, 'document-viewing-frame', prefService, fileExtensionOfUrl, defaultConfigData);
}, function (Error) {
    console.error(Error);
});
