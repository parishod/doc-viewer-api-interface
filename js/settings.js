/**
 * Authors: Deekshith Allamaneni, Uday Kumar Swarnapuri
 * Copyright Deekshith Allamaneni 2016
 */
"use strict";

function getFileTypesSettigsContent(fileType, supportedServicesArr, preferredService){
    fileType=fileType.trim();
    let formOptions = supportedServicesArr
        .reduce((prev, curr) => {
            return prev+`<option ${(curr === preferredService)? "selected=\"selected\"": ""}>${curr}</option>`;
        }, "");
    const formId = `service-option-${fileType.toLowerCase()}`;
    let formStatus = (supportedServicesArr.length === 1)
        ? `disabled`
        : ``;
    return `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <div class="form-group form-inline text-uppercase">
                <label for="${formId}" style="padding-right: 8px">${fileType.toUpperCase()}</label>
                <select class="form-control" id="${formId}" ${formStatus}>
					${formOptions}
                </select>
            </div>
        </div>`;
}

// let settingsServicesElement = document.getElementById("settings-services-tab-row");
//Reference: http://www.javascriptkit.com/jsref/select.shtml , Events
document.getElementById("settings-services-tab-row").onchange=function(){ //run some code when "onchange" event fires
    
    
    try {
        let jsonFormatData = JSON.parse(decodeURIComponent(localStorage.getItem('viewer-user-pref')));
        let thisUserConfiguration = new AnyFileViewerUserConfig(jsonFormatData);
        let fileTypeServicesSettingsHtml = thisUserConfiguration.allSupportedFileTypes()
                
        //console.log("element_name :", fileTypeServicesSettingsHtml); //DEBUG
        let fileTypes;
        for(fileTypes in fileTypeServicesSettingsHtml){
            let serviceOption = "service-option-" + fileTypeServicesSettingsHtml[fileTypes];
            let selectmenu = document.getElementById(serviceOption);
            if(selectmenu != null){
                let chosenoption=selectmenu.options[selectmenu.selectedIndex].value 
                //console.log("Selected item : ", chosenoption);
            
                let fileExtensionOfUrl = fileTypeServicesSettingsHtml[fileTypes];
                let jsonFormatData = JSON.parse(decodeURIComponent(localStorage.getItem('viewer-user-pref')));
                let thisUserConfiguration = new AnyFileViewerUserConfig(jsonFormatData);
                //console.log("localStorage.getItem('viewer-user-pref'):", localStorage.getItem('viewer-user-pref')); //DEBUG
                let indexPreferredService = jsonFormatData.user_preferences.file_types
                    .findIndex((thisFileTypeObj) => thisFileTypeObj.extension === fileExtensionOfUrl);
                
                //console.log("getElementById indexPreferredService :", indexPreferredService); //DEBUG
                if(indexPreferredService !== -1) {
                    jsonFormatData.user_preferences.file_types[indexPreferredService].preferred_service = chosenoption;
                    //prefService = jsonFormatData.user_preferences.file_types[indexPreferredService].preferred_service
                    localStorage.setItem('viewer-user-pref', JSON.stringify(jsonFormatData));
                    //console.log("jsonFormatData ", localStorage.getItem('viewer-user-pref'));//DEBUG
                    //console.log("Extension ", fileTypeServicesSettingsHtml[fileTypes]);
                    //console.log("prefService :", jsonFormatData.user_preferences.file_types[indexPreferredService].preferred_service); //DEBUG
                }else {
                    // This can happen when bad URL is used. Like http://domain.com/viewer?url=
                    throw `getElementById Could not find preferred service id for URL ${fileExtensionOfUrl}`;
                }
            }
        }
        //localStorage.setItem('viewer-user-pref', JSON.stringify(jsonFormatData));
    } catch (err) {
        console.error("getElementById Error: ", err);
    }
}
