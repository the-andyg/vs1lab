// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console.
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...


function addTag() {
    console.log("test")
    const inLatitude = document.getElementById("inLatitude");
    //const latitude = inLatitude.value;
    inLatitude.value = "";
    const inLongitude = document.getElementById("inLongitude");
    //const longitude = inLongitude.value;
    inLongitude.value = "";
    const inName = document.getElementById("tagName");
    const name = inName.value;
    inName.value = "";
    const inHashtag = document.getElementById("tagHashtag");
    const hashtag = inHashtag.value;
    inHashtag.value = "";
    if (inLatitude.value === "") {
        LocationHelper.findLocation(function (helper) {
            inLatitude.value = helper.latitude;
            inLongitude.value = helper.longitude;
        });
    } else {

    }
}

function createMap() {
    const mapView = document.getElementById("mapView");
    console.log(mapView.dataset.tags);
    mapView.getAttribute("data-tags");
    let atr = mapView.dataset.tags;
    let atri = JSON.parse(atr);
    console.log(atri);
    LocationHelper.findLocation(function (helper) {
        const map = new MapManager("6Z7IpMfAP4gbNkGohj0DmP2eTwI1sotC");
        const mapPicture = document.getElementById("mapView");
        mapPicture.src = map.getMapUrl(helper.latitude, helper.longitude, atri);
    });
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    createMap();
});
