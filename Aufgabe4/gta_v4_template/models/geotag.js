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

    constructor(name, latitude, longitude, hashtag, id) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.hashtag = hashtag;
        this.id = id;
    }

    latitude;

    get latitude() {
        return this.latitude;
    }

    longitude;

    get longitude() {
        return this.longitude;
    }

    name;

    get name() {
        return this.name;
    }

    hashtag;

    get hashtag() {
        return this.hashtag;
    }

    id;

    get id() {
        return this.id;
    }

}

module.exports = GeoTag;
