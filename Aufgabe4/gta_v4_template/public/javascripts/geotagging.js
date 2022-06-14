async function deliverLocation(lat, long) {

    let arr = {
        lat: lat,
        long: long
    }

    await fetch("/navigationData", {
        headers : {
            "Content-Type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify(arr)
    }).then(res => {
        alert("coords have been sent")
        if(res.err) {
            console.log(err);
        }
    });
}


function createMap() {
    const map = new MapManager("6Z7IpMfAP4gbNkGohj0DmP2eTwI1sotC");
    const mapPicture = document.getElementById("mapView");
    const inLatitude = document.getElementById("inLatitude");
    const inLatitudeHid = document.getElementById("inLatitudeHid");
    const latitude = inLatitude.value;
    const inLongitude = document.getElementById("inLongitude");
    const inLongitudeHid = document.getElementById("inLongitudeHid");
    const longitude = inLongitude.value;
    const mapView = document.getElementById("mapView");
    if (inLatitude.value === "") {
        LocationHelper.findLocation(function (helper) {
            inLatitude.value = helper.latitude;
            inLongitude.value = helper.longitude;
            inLatitudeHid.value = helper.latitude;
            inLongitudeHid.value = helper.longitude;
            deliverLocation(helper.latitude, helper.longitude)
            mapPicture.src = map.getMapUrl(helper.latitude, helper.longitude, JSON.parse(mapView.dataset.tags));
        });
    } else {
        mapPicture.src = map.getMapUrl(latitude, longitude, JSON.parse(mapView.dataset.tags));
    }
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    createMap();
});
