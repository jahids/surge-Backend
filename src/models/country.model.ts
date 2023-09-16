import mongoose from "mongoose";
const countrySchema = new mongoose.Schema({
    id: {
        type: "Number",
    },
    name: {
        type: "String",
    },
    iso3: {
        type: "String",
    },
    iso2: {
        type: "String",
    },
    numeric_code: {
        type: "Date",
    },
    phone_code: {
        type: "Date",
    },
    capital: {
        type: "String",
    },
    currency: {
        type: "String",
    },
    currency_name: {
        type: "String",
    },
    currency_symbol: {
        type: "String",
    },
    tld: {
        type: "String",
    },
    native: {
        type: "String",
    },
    region: {
        type: "String",
    },
    subregion: {
        type: "String",
    },
    nationality: {
        type: "String",
    },
    timezones: {
        type: ["Mixed"],
    },
    translations: {
        kr: {
            type: "String",
        },
        "pt-BR": {
            type: "String",
        },
        pt: {
            type: "String",
        },
        nl: {
            type: "String",
        },
        hr: {
            type: "String",
        },
        fa: {
            type: "String",
        },
        de: {
            type: "String",
        },
        es: {
            type: "String",
        },
        fr: {
            type: "String",
        },
        ja: {
            type: "String",
        },
        it: {
            type: "String",
        },
        cn: {
            type: "String",
        },
        tr: {
            type: "String",
        },
    },
    latitude: {
        type: "String",
    },
    longitude: {
        type: "String",
    },
    emoji: {
        type: "String",
    },
    emojiU: {
        type: "String",
    },
});

export const countryModel = mongoose.model("countrie", countrySchema);
