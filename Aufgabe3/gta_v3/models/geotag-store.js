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
        GeoTagExamples.tagList.forEach(function (tag) {
            this.#geotags.push(new GeoTag(tag[0], tag[1], tag[2], tag[3])); //not available inside scope?!
        })
    }

    addGeoTag(g) {
        this.#geotags.push(g);
    }

    removeGeoTag(name) {
        this.#geotags.forEach(function(tag, index) {
            if(tag.name === name) {
                this.#geotags.slice(index, 1);
            }
        })
    }

    searchNearbyGeoTags(keyword, radius) {
        //search for the given geotag first
        this.#geotags.forEach(function (tag) {
            if(tag.name.includes(keyword) || tag.hashtag.includes(keyword)) {
                return getNearbyGeoTags(tag.latitude, tag.longitude, radius);
            }
        })
    }

    getNearbyGeoTags(lat, long, radius) {
        var ret = [];
        this.#geotags.forEach(function(tag) {
            if((Math.abs(tag.latitude - lat) <= radius) && (Math.abs(tag.longitude - long) <= radius)) {
                ret.push(tag)
            }
        });
        return ret;
    }
}

module.exports = InMemoryGeoTagStore
