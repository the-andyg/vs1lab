// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {

    // TODO: ... your code here ...
    #latitude;
    #longitude;
    name;
    hashtag;

    constructor(name, lat, long, hashtag) {
        this.#latitude = lat;
        this.#longitude = long;
        this.name = name;
        this.hashtags = hashtag;
    }

    get latitude() {
        return this.#latitude;
    }

    get longitude() {
        return this.#longitude;
    }

    set latitude(lat) {
        this.#latitude = lat;
    }

    set longitude(long) {
        this.#longitude = long;
    }
}

module.exports = GeoTag;
