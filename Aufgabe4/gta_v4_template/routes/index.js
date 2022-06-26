// File origin: VS1LAB A3, A4

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore.
 * It represents geotags.
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore.
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
const store = new GeoTagStore();
let tagList = store.tagList;
let currPage = 1;
let coords = [];
// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */
router.get('/', (req, res) => {
    tagList = store.getGeoTagsFromSite(1);
    const size = store.size2;
    res.render('index', {taglist: tagList, size: size});
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags
 * by radius around a given location.
 */
router.get("/api/page:page", (req, res) => {
    currPage = req.params.page;
    const geotags = store.getGeoTagsFromSite(req.params.page);
    const size = store.size2;
    res.send({geotags, size, currPage});
});

/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain
 * the term as a part of their names or hashtags.
 * To this end, "GeoTagStore" provides methods to search geotags
 * by radius and keyword.
 */
// router.post("/discovery", (req, res) => {
//   console.log("coords: " + coords["lat"] + "  ,  " + coords["long"])
//   let taglist = null;
//   if(coords["lat"] && coords["long"]) {
//     taglist = store.searchNearbyGeoTags(coords["lat"],coords["long"],req.body.searchVal, .5)
//   } else if(req.body.searchVal) {
//     console.log(req.body.searchVal);
//     taglist = store.searchGeotagsByKeyword(req.body.searchVal)
//   }
//   res.send({taglist});
// });


/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */
router.get("/api/geotags", (req, res) => {
    //let taglist = null;
    const searchParams = new URLSearchParams(req.url);
    if (coords["lat"] && coords["long"]) {
        tagList = store.getNearbyGeoTags(coords["lat"], coords["long"], 0.05)
    }
    if (req.body.searchterm !== null) {
        store.searchNearbyGeoTags(coords["lat"], coords["long"], searchParams.get("/api/geotags?q"), 50)
        tagList = store.getGeoTagsFromSite(currPage)
    }
    const size = store.size2;
    res.send({tagList, size, currPage});
});

/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */
router.post("/api/geotags", (req, res) => {
    const id = store.addGeoTag(req.body.name, req.body.hashtag, req.body.latitude, req.body.longitude);
    res.setHeader("GeoURL", "/api/geotags/" + id);
    tagList = store.getGeoTagsFromSite(currPage);
    const size = store.tagList.length;
    res.status(201).send({tagList, size, currPage});
});

/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */
router.get("/api/geotags/:id", (req, res) => {
    const tag = store.getGeoTagById(req.params.id);
    res.send({tag});
});

/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response.
 */
router.put("/api/geotags/:id", (req, res) => {
    store.overwriteTag(req.params.id, req.body.newName, req.body.newHashtag);
    tagList = store.getGeoTagsFromSite(currPage);
    const size = store.tagList.length;
    res.send({tagList, size, currPage});
});

/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */
router.delete("/api/geotags/:id", (req, res) => {
    store.removeGeoTagById(req.params.id);
    tagList = store.getGeoTagsFromSite(currPage);
    const size = store.tagList.length;
    res.send({tagList, size, currPage});
});

/**
 * Route for location data
 */
router.post("/navigationData", (req, res) => {
    coords["lat"] = req.body.lat;
    coords["long"] = req.body.long;
    res.sendStatus(200);
});

module.exports = router;
