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
    id;

    constructor() {
        let examples = new GeoTagExamples;
        this.#tagList = examples.put();
        this.id = 11;
    }

    addTag(geotag) {
        this.#tagList.push(geotag);
        return this.#tagList.length - 1;
    }

    overwriteTag(id, name, hashtag) {
        const i = this.#getGeoTagById(id);
        this.#tagList[i].name = name;
        this.#tagList[i].hashtag = hashtag;
        console.log(this.#tagList[i]);
    }

    addGeoTag(name, hashtag, latitude, longitude) {
        this.#tagList.push(new GeoTag(name, latitude, longitude, hashtag, this.id));
        this.id++;
        return this.#tagList.length - 1;
    }

    get tagList() {
        return this.#tagList;
    }

    getNearbyGeoTags(lat, long, radius) {
        let tags = [];
        for (let i = 0; i < this.#tagList.length; i++) {
            let diffx = this.#tagList[i].latitude - lat;
            let diffy = this.#tagList[i].longitude - long;
            let diff = Math.sqrt((diffx * diffx) + (diffy * diffy));
            if (diff < radius) {
                tags.push(this.#tagList[i]);
            }
        }
        return tags;
    }

    searchNearbyGeoTags(lat, long, keyword, radius) {
        let tags = [];
        let geotags = this.getNearbyGeoTags(lat,long,radius);
        console.log(geotags);
        for (let i = 0; i < geotags.length; i++) {
            if (geotags[i].name.includes(keyword) || geotags[i].hashtag.includes(keyword)) {
                    tags.push(this.#tagList[i]);
            }
        }
        return tags;
    }

    removeGeoTagById(id) {
        this.#tagList.splice(this.#getGeoTagById(id), 1);
    }

    #getGeoTagById(id) {
        for (let i = 0; i < this.#tagList.length; i++) {
            if (this.#tagList[i].id == id) {
                return i;
            }
        }
    }
}

module.exports = InMemoryGeoTagStore;
