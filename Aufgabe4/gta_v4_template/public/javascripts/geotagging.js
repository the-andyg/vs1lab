// File origin: VS1LAB A2

/* eslint-disable no-unused-vars /

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console.
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...

 */

async function searchTag(event) {
    event.preventDefault();
    let searchVal = document.getElementById("searchBar").value;

    await fetch("/api/geotags?q=" + searchVal, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
        .then(res => res.json())
        //.then(res => console.log(res['tagList']))
        .then(res => createList(res['taglist']))
}

async function addTag(event) {
    event.preventDefault();
    const inLatitude = document.getElementById("inLatitudeHid");
    if (inLatitude.dataset.id !== "") {
        edit2();
        return;
    }
    const latitude = inLatitude.value;
    const inLongitude = document.getElementById("inLongitudeHid");
    const longitude = inLongitude.value;
    const inName = document.getElementById("tagName");
    const name = inName.value;
    const inHashtag = document.getElementById("tagHashtag");
    const hashtag = inHashtag.value;
    await fetch("/api/geotags", {
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
        .then(res => res.json())
        .then(res => createList(res['tagList'], res["size"], res["currPage"]));
    inName.value = "";
    inHashtag.value = "";
}

function createList(data, size, page) {
    const pageInf = document.getElementById("pageInformation");
    if (!size) {
        size = pageInf.dataset.size;
    }
    const size2 = Math.ceil(size / 4);
    if (!page) {
        page = pageInf.dataset.page;
    }
    const mapView = document.getElementById("mapView");
    mapView.dataset.tags = JSON.stringify(data);
    let list = "";
    data.forEach(function ({latitude, longitude, name, hashtag, id}) {
        list += "<li class='geotag-item'>"
        list += `<div class='geotag-content' > ${name} ( ${latitude},${longitude} ) ${hashtag}</div><br>`
        list += "<div class='geotag-editables'>"
        list += `<button data-id=${id} class="geotag-editable" onclick="remove(this.dataset.id)">DELETE</button>`
        list += `<button data-id=${id} data-latitude=${latitude} data-longitude=${longitude} class="geotag-editable" onclick="edit(this.dataset.id, this.dataset.latitude, this.dataset.longitude)">EDIT</button>`
        list += "</div>"
        list += "</li>"
    })
    if (list === "") {
        list += "Keine Tags vorhanden!";
    } else {
        list += '<div class="outerPagination">';
        list += '<div class="pagination">';
        list += '<button id="buttonPreviousPage" data-PreviousPage="0" class="linkPage" onClick="pageBack()"> < </button>'
        list += `<p id="pageInformation" data-size=${size} data-page=${page}>${page}/${size2} (${size}) </p>`
        list += `<button id="buttonNextPage" data-NextPage="0" class="linkPage"onClick="nextPage()"> > </button>`
        list += '</div>'
        list += '</div>'
    }
    const table = document.getElementById("discoveryResults");
    table.innerHTML = list;
    updatePage(size, page);
    createMap();
}

function updatePage(size, page) {
    const button1 = document.getElementById("buttonPreviousPage");
    const button2 = document.getElementById("buttonNextPage");
    const intSize = parseInt(size);
    const intPage = parseInt(page);
    if (intPage - 1 === 0) {
        button1.disabled = true;
    }
    if ((intPage) === Math.ceil(intSize / 4)) {
        button2.disabled = true;
    }
    button1.dataset.PreviousPage = (intPage - 1).toString();
    button2.dataset.NextPage = (intPage + 1).toString();
}

function pageBack() {
    const pageInf = document.getElementById("pageInformation");
    const page = pageInf.dataset.page;
    const intPage = parseInt(page);
    getPageTags(intPage - 1);
}

function nextPage() {
    const pageInf = document.getElementById("pageInformation");
    const page = pageInf.dataset.page;
    const intPage = parseInt(page);
    getPageTags(intPage + 1);
}

async function getPageTags(page) {
    await fetch("/api/page" + page, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
        .then(res => res.json())
        //.then(res => console.log(res['tagList']))
        .then(res => createList(res['geotags'], res["size"], res["currPage"]))
}

function remove(id) {
    fetch("/api/geotags/" + id, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "DELETE"
    })
        .then(res => res.json())
        .then(res => createList(res['tagList']));
    let size = parseInt(document.getElementById("pageInformation").dataset.size);
    document.getElementById("pageInformation").dataset.size = (size - 1).toString();
}

function edit(id, latitude, longitude) {
    document.getElementById("inLatitude").value = latitude;
    let latitudeHid = document.getElementById("inLatitudeHid");
    latitudeHid.value = latitude;
    latitudeHid.dataset.id = id;
    document.getElementById("inLongitude").value = longitude;
    document.getElementById("inLongitudeHid").value = longit
    const legend = document.getElementById("legendTagging");
    const button = document.getElementById("buttonTagging");
    const headline = document.getElementById("headline");

    legend.innerText = "Edit";
    button.innerText = "Bestätigen";
    headline.innerText = "Tag Bearbeiten";
}

function edit2() {
    const inLatitude = document.getElementById("inLatitudeHid");
    const id = inLatitude.dataset.id;
    const newName = document.getElementById("tagName").value;
    const newHashtag = document.getElementById("tagHashtag").value;
    fetch("/api/geotags/" + id, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            newName,
            newHashtag
        })
    })
        .then(res => res.json())
        .then(res => createList(res['tagList']));

    const legend = document.getElementById("legendTagging");
    const button = document.getElementById("buttonTagging");
    const headline = document.getElementById("headline");

    legend.innerText = "Add new GeoTag";
    button.innerText = "Add Tag";
    headline.innerText = "Tagging";
    inLatitude.dataset.id = "";
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
