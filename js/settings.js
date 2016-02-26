/**
 * Authors: Deekshith Allamaneni, Uday Kumar Swarnapuri
 * Copyright Deekshith Allamaneni 2016
 */
"use strict";

function getFileTypesSettigsContent(fileType, supportedServicesArr){
    fileType=fileType.trim();
    let formOptions = supportedServicesArr
        .reduce((prev, curr) => {
            return prev+`<option>${curr}</option>`;
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

//Reference: http://www.javascriptkit.com/jsref/select.shtml , Events
document.getElementById("settings-services-tab-row").onchange=function(){ //run some code when "onchange" event fires
    let selectmenu=document.getElementById("service-option-doc");
    let chosenoption=selectmenu.options[selectmenu.selectedIndex].value 
    console.log("Selected item : ", chosenoption);
}
