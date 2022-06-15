// File origin: VS1LAB A2

/* eslint-disable no-unused-vars /

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console.
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...


 */

function searchTag(event) {
    event.preventDefault();
    let searchVal = document.getElementById("searchBar").value;

    fetch("/discovery", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            searchVal
        })
    }).then(res => res.json())
        .then(res => data(res['taglist']));
}

function registerEventListeners() {
    let form = document.getElementById("tag-form");
    form.addEventListener("submit", addTag);

    let discovery = document.getElementById("discoveryFilterForm");
    discovery.addEventListener("submit", searchTag);
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    createMap();
    registerEventListeners();
});


function addTag(event) {
    event.preventDefault();
    const inLatitude = document.getElementById("inLatitudeHid");
    const latitude = inLatitude.value;
    const inLongitude = document.getElementById("inLongitudeHid");
    const longitude = inLongitude.value;
    const inName = document.getElementById("tagName");
    const name = inName.value;
    const inHashtag = document.getElementById("tagHashtag");
    const hashtag = inHashtag.value;
    fetch("/tagging", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            latitude,
            longitude,
            name,
            hashtag
        })
    })
        .then(res => {
            console.log(res);
            if (res.err) {
                console.log(res.err);
            }
            document.getElementById("tag-form").reset();
        });
    fetchList();
}

function fetchList() {
    console.log("neu laden")
    fetch("/data")
        .then(res => res.json())
        .then(res => data(res['taglist']));
}

function data(data) {
    console.log("neuladen mit data"+data)
    let list = "";
    data.forEach(function ({latitude, longitude, name, hashtag, id}) {
        list += "<li class='geotag-item'>"
        list += `<div class='geotag-content' > ${name} ( ${latitude},${longitude} ) ${hashtag}</div><br>`
        list+="<div class='geotag-editables'>"
        list += `<button data-id=${id} class="geotag-editable" onclick="remove(this.dataset.id)">DELETE</button>`
        list += `<button data-id=${id} data-latitude=${latitude} data-longitude=${longitude} class="geotag-editable" onclick="edit(this.dataset.id, this.dataset.latitude, this.dataset.longitude)">EDIT</button>`
        list += `<button data-id=${id} class="geotag-editable">REFRESH</button>`
        list+="</div>"
        list += "</li>"
    })
    const table = document.getElementById("discoveryResults");
    table.innerHTML = list;
    createMap();
}

function remove(id) {
    fetch("/api/geotags" + id, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "DELETE"
    }).then(res => {
        //alert("GeoTag deleted")
        if (res.err) {
            console.log(res.err);
        }
    }).then(res => {
        console.log(res);
        if (res.err) {
            console.log(res.err);
        }
        document.getElementById("tag-form").reset();
    });
    fetchList();
}


function edit(id, latitude, longitude) {
    document.getElementById("inLatitude").value = latitude;
    document.getElementById("inLatitudeHid").value = latitude;
    document.getElementById("inLongitude").value = longitude;
    document.getElementById("inLongitudeHid").value = longitude;

    const legend = document.getElementById("legendTagging");
    const button = document.getElementById("buttonTagging");
    const headline = document.getElementById("headline");

    legend.innerText = "Edit";
    button.innerText = "Bestätigen";
    headline.innerText = "Tag Bearbeiten";
    button.onclick = "a";

}


function edit2(id) {
    console.log("edit 2");
    const newName = "";
    const newHashtag = "";
    fetch("/api/geotags" + id, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            newName,
            newHashtag
        })
    }).then(res => {
        if (res.err) {
            console.log(res.err);
        }
    })
}


function deliverLocation(lat, long) {

    let arr = {
        lat: lat,
        long: long
    }

    fetch("/navigationData", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(arr)
    }).then(res => {
        if (res.err) {
            console.log(res.err);
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


