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
    return `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <div class="form-group form-inline text-uppercase">
                <label for="${formId}" style="padding-right: 8px">${fileType.toUpperCase()}</label>
                <select class="form-control" id="${formId}">
					${formOptions}
                </select>
            </div>
        </div>`;
}

/**
 * Listener to handle the user preference onchange event
 */
// let settingsServicesElement = document.getElementById("settings-services-tab-row");
//Reference: http://www.javascriptkit.com/jsref/select.shtml , Events
document.getElementById("settings-services-tab-row").onchange=function(){ //run some code when "onchange" event fires
        
    try {
        let jsonFormatData = JSON.parse(decodeURIComponent(localStorage.getItem('viewer-user-pref')));
        let thisUserConfiguration = new AnyFileViewerUserConfig(jsonFormatData);
        let fileTypeServicesSettingsHtml = thisUserConfiguration.allSupportedFileTypes();

        let statusDisplayNode = document.getElementById("services-settings-modal-update-status-message");
        statusDisplayNode.innerHTML=
            `
            <div class="text-warning text-center">
                <i class="fa fa-spinner fa-pulse"></i> Saving Preferences
            </div>
            `;

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

        setTimeout(function() {
            statusDisplayNode.innerHTML=
            `
            <div class="text-success text-center">
                <i class="fa fa-check fa-fw"></i> Preferences saved
            </div>
            `;
        }, 800);
    } catch (err) {
        console.error("getElementById Error: ", err);
    }
};

/**
 * resetUserPreferences: Resets the user preferences with defaults
 */
function resetUserPreferences(){
    //TBD Alert User of restoring all values to defaults
    let statusDisplayNode = document.getElementById("services-settings-modal-advanced-update-status-message");
    statusDisplayNode.innerHTML=
        `
        <div class="text-warning text-center">
            <i class="fa fa-spinner fa-pulse"></i> Resetting Preferences
        </div>
        `;
    loadFile("../config/config.json", "json").then(function (defaultConfigData) {
        try {
            let jsonFormatData = JSON.parse(decodeURIComponent(localStorage.getItem('viewer-user-pref')));
            
            // let fileTypes;
            //console.log("Reset user prefs Extension : ",defaultConfigData.user_preferences.file_types.length)//DEBUG
            for(let i = 0; i < defaultConfigData.user_preferences.file_types.length; i++){
            // for(fileTypes in defaultConfigData.user_preferences.file_types.length){
                let fileType = defaultConfigData.user_preferences.file_types[i].extension
                // console.log("Reset user prefs Extension : ", fileType);//DEBUG
                // defaultConfigData.user_preferences.file_types[fileTypes].preferred_service;
                let indexPreferredService = jsonFormatData.user_preferences.file_types
                    .findIndex((thisFileTypeObj) => thisFileTypeObj.extension === fileType);
                
                console.log("resetUserPreferences indexPreferredService :", indexPreferredService); //DEBUG
                if(indexPreferredService !== -1) {
                    jsonFormatData.user_preferences.file_types[indexPreferredService].preferred_service = defaultConfigData.user_preferences.file_types[i].preferred_service
                    // localStorage.setItem('viewer-user-pref', JSON.stringify(jsonFormatData));
                }
            }
            localStorage.setItem('viewer-user-pref', JSON.stringify(jsonFormatData));
            setTimeout(function() {
                statusDisplayNode.innerHTML=
                `
                <div class="text-success text-center">
                    <i class="fa fa-check fa-fw"></i> Settings restored to defaults
                </div>
                `;
            }, 800);
        } catch (err) {
            console.error("Error in Reset UserPreferences : ", err);
        }
    }, function (Error) {
        console.error(Error);
    });
}

//Reference: http://www.tutorialspoint.com/javascript/javascript_dialog_boxes.htm
//Unused function
function getResetUserPreferencesConfirmation(){
    var retVal = confirm("Do you want to continue ?");
    if( retVal == true ){
      console.log("User wants to continue!");
      resetUserPreferences()
      // return true;
    }
    else{
      console.log("User does not want to continue!");
      // return false;
    }
}


// On Settings Modal Closed (Hidden)
$('#settings-modal').on('hidden.bs.modal', function () {
    // Ref: http://stackoverflow.com/a/8364113/3439460
    document.getElementById("services-settings-modal-update-status-message")
        .innerHTML = "<br/>";
});
