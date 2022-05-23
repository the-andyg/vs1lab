// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples");

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
class InMemoryGeoTagStore{

    #geotags = [];

    //Include all examples from ./model/geotag-examples.js
    constructor() {
        const examples = GeoTagExamples.tagList;
        for(let i = 0; i < examples.length; i++) {
            this.addGeoTag(examples[i]);
        }
    }

    get geotags() {
        return this.#geotags;
    }

    addGeoTag(g) {
        var tag = new GeoTag(g[0], g[1], g[2], g[3]);
        this.#geotags.push(tag);
    }

    removeGeoTag(name) {
        for(var i = 0; i < this.#geotags.length; i++) {
            if(this.#geotags[i] === name) {
                this.#geotags.slice(i, 1);
            }
        }
    }

    searchNearbyGeoTags(keyword, radius) {
        //search for the given geotag first
        let matchingTags = [];
        let i = 0;
        for(const tag in this.#geotags) {
            if(tag.name.includes(keyword) || tag.hashtag.includes(keyword)) {
                matchingTags[i] = this.getNearbyGeoTags(tag.latitude, tag.longitude, radius);
            }
            i++;
        }
        return matchingTags;
    }

    getNearbyGeoTags(lat, long, radius) {
        var ret = [];
        for(var i = 0; i < this.#geotags.length; i++) {
            if((Math.abs(this.#geotags[i].latitude - lat) <= radius) &&
                (Math.abs(this.#geotags[i].longitude - long) <= radius)) {
                ret.push(this.#geotags[i]);
            }
        }
        return ret;
    }

    /*this.#geotags.forEach(function(tag) {
        if((Math.abs(tag.latitude - lat) <= radius) && (Math.abs(tag.longitude - long) <= radius)) {
            ret.push(tag)
        }
    });*/
}

module.exports = InMemoryGeoTagStore
