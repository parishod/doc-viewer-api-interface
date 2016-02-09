/**
 * Copyright parishod.com 2016
 */
"use strict";

function loadUrlInIframe(fileUrl, elementIdToAppend, extension) {
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
    ifrm.setAttribute('src', 'https://view.officeapps.live.com/op/view.aspx?src='+fileUrl);
}

let givenFileUrl = (typeof(getVar("url")) !== "undefined")? getVar("url"): "";

var jsonData;
//Loading json file data
loadFile("../config/user-preferences-default.json", "json").then(function(response) {
        // your code here
		console.log("Response : " , response);
		jsonData = response;
		/*console.log("JsonData : ", jsonData.data.services[0].name);
		console.log("JsonData : ", jsonData.data.services[0].file_extensions[0]);
		console.log("JsonData : ", jsonData.data.services[0].file_open_API);*/
		
		
		//Read cookie, if exists open the dowcument with given preference else chose default and write to cookie.
		//Read the extension from url
		//var startIndex = givenFileUrl.lastIndexOf(".");
		//var endIndex = givenFileUrl.length;
		var cookiePref;
		if(givenFileUrl.lastIndexOf("&filetype") == -1){ // If the given url doesn't contain filetype extract extension
			//var ext = givenFileUrl.substr(startIndex+1, endIndex);
			var extFromUrl = getFileExtension(givenFileUrl);
			var prefService;
			var i;
			cookiePref = readCookie("userPref");
			console.log("Url Extension = " , extFromUrl);
			if( cookiePref != null){
				console.log("cooke Read: ", cookiePref);
				//Replace %20 character with space.
				//cookiePref = cookiePref.replace("%20", " ")	
				//Read the preference for the given extension
				var jsonFormatData = JSON.parse(cookiePref);
				for(i=0; i<jsonFormatData.user_preferences.file_types.length; i++){
					var tempExt = jsonFormatData.user_preferences.file_types[i].extension;
					if(tempExt.localeCompare(extFromUrl) == 0){
						prefService = jsonFormatData.user_preferences.file_types[i].preferred_service;
						break;
					}
				}
			}
			else{
				//createCookie(ext,"Google Docs",10, "/");	
				//Just to verify if cookie is created successfully or not
				//console.log(readCookie(ext));
				createCookie("userPref", JSON.stringify(jsonData), 10, "/");	
				console.log("Created cookie : ",JSON.parse(readCookie("userPref")));
				
				//Read the default service
				for(i=0; i<jsonData.user_preferences.file_types.length; i++){
					var tempExt = jsonData.user_preferences.file_types[i].extension;
					if(tempExt.localeCompare(extFromUrl) == 0){
						prefService = jsonData.user_preferences.file_types[i].preferred_service;
						break;
					}
				}
			}
			// Loading the URL passed via API in Iframe
			loadUrlInIframe(givenFileUrl, 'document-viewing-frame', extFromUrl);
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
