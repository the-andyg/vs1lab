// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...

console.log("The geoTagging script is going to start...");

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...
    function updateLocation() {
        const lat = document.getElementById("latitude");
        const long = document.getElementById("longitude");
        if(lat.innerHTML === "" && long.innerHTML === "") {
            LocationHelper.findLocation(assignValue);
        }
    }

    function assignValue(helper) {
        var lat = document.getElementById("latitude");
        var long = document.getElementById("longitude");

        lat.value = helper.latitude;
        long.value = helper.longitude;

        lat = helper.latitude;
        long = helper.longitude;

        var mapMan = new MapManager("6Z7IpMfAP4gbNkGohj0DmP2eTwI1sotC");
        var url = mapMan.getMapUrl(helper.latitude, helper.longitude);

        var mapImg = document.getElementById("mapView");
        mapImg.src = url;
    }

// Wait for the page to fully load its DOM content, then call updateLocation
 document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
 });