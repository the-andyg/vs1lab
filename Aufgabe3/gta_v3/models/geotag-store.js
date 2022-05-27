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
        let examples = new GeoTagExamples;
        this.#tagList = examples.put();
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
        let pos = -1;
        for (let i = 0; i < this.#tagList.length; i++) {
            if (this.#tagList[i].name === name) {
                pos = i;
                break;
            }
        }
        this.#tagList.splice(pos, 1);
    }

}

module.exports = InMemoryGeoTagStore;
