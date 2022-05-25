// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

const GeoTag = require("./geotag");

/**
 * A class for in-memory-storage of geotags
 *
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 *
 * Provide a method 'addGeoTag' to add a geotag to the store.
 *
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 *
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 *
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields.
 */
class InMemoryGeoTagStore {

    constructor() {
        const GeoTagExamples = require("../models/geotag-examples");
        const GeoTag = require("../models/geotag");
        GeoTagExamples.tagList.forEach(function (item) {
            const tag = new GeoTag(item[0], item[1], item[2], item[3]);
            addGeoTag(tag);
            console.log(tag);
        });
    }

    #tagList = [];


    addGeoTag(tag) {
        this.#tagList.push(tag);
    }

    get tagList() {
        return this.#tagList;
    }

    getNearbyGeoTags(name) {
        this.#tagList.forEach(function (item) {
            if (item.name === name) {
                return item;
            }
        });
        return null;
    }

    searchNearbyGeoTags() {

    }

    removeGeoTag(name) {

    }





}

module.exports = InMemoryGeoTagStore;
