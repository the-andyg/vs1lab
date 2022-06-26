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
    #currentTagList = [];
    id;

    constructor() {
        let examples = new GeoTagExamples;
        this.#tagList = examples.put();
        this.#currentTagList = this.#tagList;
        this.id = 11;
    }

    addTag(geotag) {
        this.#tagList.push(geotag);
        this.id++;
        return this.#tagList.length - 1;
    }

    overwriteTag(id, name, hashtag) {
        const tag = this.getGeoTagById(id);
        let index = 0;
        for (let i = 0; i < this.#tagList.length; i++) {
            if (this.#tagList[i].id == tag.id) {
                index = i;
            }
        }
        this.#tagList[index].name = name;
        this.#tagList[index].hashtag = hashtag;
    }

    addGeoTag(name, hashtag, latitude, longitude) {
        this.#tagList.push(new GeoTag(name, latitude, longitude, hashtag, this.id));
        this.id++;
        this.#currentTagList = this.#tagList;
        return this.#tagList.length - 1;
    }

    get tagList() {
        return this.#tagList;
    }

    get size2() {
        return this.#currentTagList.length;
    }

    searchGeotagsByKeyword(name/*, hashtag*/) {
        let tags = [];
        for (let i = 0; i < this.#tagList.length; i++) {
            if (this.#tagList[i].name === name/* || this.#tagList[i].hashtag === hashtag*/) {
                tags.push(this.#tagList[i])
            }
        }
        this.#currentTagList = tags;
        return tags;
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
        this.#currentTagList = tags;
        return tags;
    }

    searchNearbyGeoTags(lat, long, keyword, radius) {
        let tags = [];
        let geotags = this.getNearbyGeoTags(lat, long, radius);
        for (let i = 0; i < geotags.length; i++) {
            if (geotags[i].name.includes(keyword) || geotags[i].hashtag.includes(keyword)) {
                tags.push(this.#tagList[i]);
            }
        }
        this.#currentTagList = tags;
        return tags;
    }

    removeGeoTagById(id) {
        let index = 0;
        for (let i = 0; i < this.#tagList.length; i++) {
            if (this.#tagList[i].id == id) {
                index = i;
            }
        }
        this.#tagList.splice(index, 1);
    }

    getGeoTagById(id) {
        for (let i = 0; i < this.#tagList.length; i++) {
            if (this.#tagList[i].id == id) {
                return this.#tagList[i];
            }
        }
    }

    getGeoTagsFromSite(site) {
        let tags = [];
        for (let i = (site - 1) * 4; i < site * 4; i++) {
            if (this.#currentTagList[i] != null) {
                tags.push(this.#currentTagList[i]);
            } else {
                break;
            }
        }
        return tags;
    }
}

module.exports = InMemoryGeoTagStore;
