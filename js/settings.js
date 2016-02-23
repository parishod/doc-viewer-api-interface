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
            <div class="form-group">
                <label for="${formId}">${fileType.toUpperCase()}</label>
                <select class="form-control" id="${formId}" ${formStatus}>
					${formOptions}
                </select>
            </div>
        </div>`;
}

