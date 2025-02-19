// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class representing example geoTags at HKA
 *
 * TODO: populate your InMemoryGeoTagStore with these tags
 *
 */
class GeoTagExamples {
    /**
     * Provides some geoTag data
     */
    static get tagList() {
        return [
            ['Castle', 49.013790, 8.404435, '#sight'],
            ['IWI', 49.013790, 8.390071, '#edu'],
            ['BuildingE', 49.014993, 8.390049, '#campus'],
            ['BuildingF', 49.015608, 8.390112, '#campus'],
            ['BuildingM', 49.016171, 8.390155, '#campus'],
            ['BuildingLI', 49.015636, 8.389318, '#campus'],
            ['AuditoriumHe', 49.014915, 8.389264, '#campus'],
            ['BuildingR', 49.014992, 8.392365, '#campus'],
            ['BuildingA', 49.015738, 8.391619, '#campus'],
            ['BuildingB', 49.016843, 8.391372, '#campus'],
            ['BuildingK', 49.013190, 8.392090, '#campus'],
        ];
    }

    put() {
        let store = [];
        const GeoTag = require("../models/geotag");
        GeoTagExamples.tagList.forEach(function (item) {
            const tag = new GeoTag(item[0], item[1], item[2], item[3]);
            store.push(tag);
        });
        return store;
    }
}

module.exports = GeoTagExamples;
