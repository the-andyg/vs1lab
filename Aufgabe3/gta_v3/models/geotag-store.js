// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

const GeoTag = require("./geotag");
const GeoTagExamples = require("../models/geotag-examples");

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

    #tagList = [];

    constructor() {
        let list = GeoTagExamples.tagList;
        for (let i = 0; i < list.length; i++) {
            let tag = new GeoTag(list[i][0], list[i][1], list[i][2], list[i][3]);
            this.addGeoTag(tag);
        }
    }


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
