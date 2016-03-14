/**
 * Authors: Deekshith Allamaneni, Uday Kumar Swarnapuri
 * Copyright Deekshith Allamaneni 2016
 */
"use strict";

function socialShareCopyToClipboard() {
    copyToClipboardByTextId('social-share-url');
    let shareUrlElement = document.getElementById('social-share-copytoclipboard-span');
    // console.log(shareUrlElement.getAttribute("data-hint"));
    shareUrlElement.setAttribute("data-hint", "Copied");

    // Reference: https://developer.mozilla.org/en-US/docs/Web/Events/mouseover
    document.getElementById('social-share-copytoclipboard-span').addEventListener("mouseenter", function( event ) {
        // change the copyTextToClipboard attributr on mouseover
        document.getElementById('social-share-copytoclipboard-span')
            .setAttribute("data-hint", "Copy To Clipboard");
    }, false);
}
