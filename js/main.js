/**
 * Copyright parishod.com 2016
 */
"use strict";
var userPrefJsonData;

function loadUrlInIframe(fileUrl, elementIdToAppend, preferedService, extension) {
    if(fileUrl === "" || typeof fileUrl == "undefined" || fileUrl === null) {return;}
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('id', 'ifrm'); // assign an id
    ifrm.setAttribute('style', "border: 0; position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%;");
    ifrm.setAttribute('name', "ifrm");

    // to place before another page element
    var el = document.getElementById(elementIdToAppend);
    el.innerHTML = ""; // Empty any previous contents of that element
    el.parentNode.insertBefore(ifrm, el);
    
    // assign url
    if(extension == null){ // Extension null implies url is of the type &filetype
        ifrm.setAttribute('src', ''+fileUrl);    
    }
    else if(preferedService == null){
        ifrm.setAttribute('src', 'https://view.officeapps.live.com/op/view.aspx?src='+fileUrl);
    }
    else{
        let indexPreferredService = userPrefJsonData.supported_services
					.findIndex( (thisFileTypeObj) => thisFileTypeObj.id === preferedService );
		let reqAPI = userPrefJsonData.supported_services[indexPreferredService].file_open_API;
		let reqUrl = reqAPI.replace('{$file_url}', '' + fileUrl) 
        console.log("Required url : ", reqUrl)
        ifrm.setAttribute('src', reqUrl);
    }
}

let givenFileUrl = (typeof(getVar("url")) !== "undefined")? getVar("url"): "";

//Loading json file data
loadFile("../config/config.json", "json").then(function(response) {
		userPrefJsonData = response;
		if(givenFileUrl.lastIndexOf("&filetype") == -1){ // If the given url doesn't contain filetype extract extension
			var extFromUrl = getFileExtension(givenFileUrl);
			var prefService;

            // Put the object into storage
            let viewerUserPrefData = localStorage.getItem('viewer-user-pref');
			if( viewerUserPrefData != null){

				//Read the preference for the given extension
				try {
					var jsonFormatData = JSON.parse(decodeURIComponent(viewerUserPrefData));
				} catch (err){
					console.error("Error Parsing User Preferences data to JSON: ", err.message);
				}
				let indexPreferredService = jsonFormatData.user_preferences.file_types
					.findIndex( (thisFileTypeObj) => thisFileTypeObj.extension === extFromUrl );
				prefService = jsonFormatData.user_preferences.file_types[indexPreferredService].preferred_service;
				console.log("Preferred Service: ", prefService);
			}
			else{
				//Just to verify if cookie is created successfully or not
                localStorage.setItem('viewer-user-pref', JSON.stringify(userPrefJsonData));
				
				//Read the default service
				let indexPreferredService = userPrefJsonData.user_preferences.file_types
					.findIndex( (thisFileTypeObj) => thisFileTypeObj.extension === extFromUrl );
				prefService = userPrefJsonData.user_preferences.file_types[indexPreferredService].preferred_service;
                console.log("Preferred Service 1 : ", prefService);
			}
			// Loading the URL passed via API in Iframe
			loadUrlInIframe(givenFileUrl, 'document-viewing-frame', prefService, extFromUrl);
		}else{
			console.log("File type found ");
			// Loading the URL passed via API in Iframe
			loadUrlInIframe(givenFileUrl, 'document-viewing-frame');
		}
}, function(Error) {
    console.log(Error);
});


// Assigning Href to Download button in floating menu
assignAttrToDocumentElementById("href", givenFileUrl, "floating-menu-main-download-id");
