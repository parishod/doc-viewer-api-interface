/**
 * Authors: Deekshith Allamaneni, Uday Kumar Swarnapuri
 * Copyright Deekshith Allamaneni 2016
 */
"use strict";


function AnyFileViewerUserConfig (configDataJSON) {
    this.configDataJSON_ = configDataJSON;
}

AnyFileViewerUserConfig.prototype.allSupportedFileTypes = function () {
    return this.configDataJSON_.user_preferences.file_types
        .map((fileTypesObj) => fileTypesObj.extension);
};

AnyFileViewerUserConfig.prototype.supportedServiceIdsByFileType = function (fileType) {
    return this.configDataJSON_.supported_services
        .map((serviceObject) => {
            return (serviceObject.file_extensions.some(extension => extension === fileType))
                ? serviceObject.id
                : null;
        })
        .filter(serviceId => serviceId !== null);
};