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
    let formId = `service-option-${fileType.toLowerCase()}`;
    //Reference : http://stackoverflow.com/questions/881085/count-the-number-of-occurences-of-a-character-in-a-string-in-javascript
    //console.log(formOptions.split("option").length - 1);
    let numAvailableServices = (formOptions.split("option").length - 1)/2; //Searching option string 2 occurences implies one service
    
    return (numAvailableServices === 1)
        ?`
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <div class="form-group">
                <label for="${formId}">${fileType.toUpperCase()}</label>
                <select class="form-control" id="${formId}" disabled>
					${formOptions}
                </select>
            </div>
        </div>`
        :`
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <div class="form-group">
                <label for="${formId}">${fileType.toUpperCase()}</label>
                <select class="form-control" id="${formId}">
					${formOptions}
                </select>
            </div>
        </div>`
    /*
    return `
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <div class="form-group">
                <label for="${formId}">${fileType.toUpperCase()}</label>
                <select class="form-control" id="${formId}">
					${formOptions}
                </select>
            </div>
        </div>`;
    */
}

