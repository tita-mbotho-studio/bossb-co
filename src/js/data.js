// src/js/data.js

export const SHOP = {
    name: "BOSSB CO",
    whatsappNumber: "27682158780", // SA format: country code + number, no + or spaces
    currency: "ZAR",
    city: "Johannesburg",

    // Updated delivery areas from client
    areas: [
        // Johannesburg & Surrounds
        "Sandton",
        "Midrand",
        "Randburg",
        "Soweto",
        "Roodepoort",
        "JHB CBD",

        // East Rand
        "Kempton Park",
        "Benoni",
        "Boksburg",
        "Germiston",
        "Alberton",
        "Tembisa",

        // Pretoria / Centurion
        "Pretoria",
        "Centurion",
        "Mamelodi",
        "Soshanguve",

        // West Rand
        "Krugersdorp",
        "Randfontein",
        "Carletonville",

        // Vaal Triangle
        "Vereeniging",
        "Vanderbijlpark",
        "Meyerton",

        // Limpopo - Capricorn / Polokwane
        "Polokwane",
        "Seshego",
        "Mankweng",
        "Lebowakgomo",
        "Zebediela",

        // Limpopo - Sekhukhune District
        "Burgersfort",
        "Groblersdal",
        "Marble Hall",
        "Jane Furse",
        "Steelpoort",
    ],

    deliveryNotes: [
        "Same-day delivery may be available depending on stock and your area.",
        "Other areas: 24-hour notice recommended.",
        "Delivery fee depends on distance (confirmed on WhatsApp).",
        "If your area is not listed, message us on WhatsApp and we will advise based on availability.",
    ],
};

/**
 * Turn a display color into a filename-safe slug.
 * "Blush Pink" -> "blush-pink"
 * "Valentine's Red" -> "valentines-red"
 */
export function slugifyColor(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[']/g, "") // remove apostrophes
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

/**
 * Return the best image for a bouquet based on selected color.
 * - If bouquet.colorImages has a match, use it
 * - Else fall back to bouquet.defaultImage
 * - Else fall back to legacy bouquet.image
 */
export function getBouquetImage(bouquet, color) {
    if (!bouquet) return "";

    const selected = (color || "").trim();

    // 1) explicit mapping (best)
    if (selected && bouquet.colorImages && bouquet.colorImages[selected]) {
        return bouquet.colorImages[selected];
    }

    // 2) try slug-based guess (legacy: used when imageBase points to folder)
    // NOTE: If you ever want a consistent naming strategy, you can set imageBase.
    if (selected && bouquet.imageBase) {
        const slug = slugifyColor(selected);
        if (slug) return `${bouquet.imageBase}/${slug}.jpg`;
    }

    // 3) default
    return bouquet.defaultImage || bouquet.image || "";
}

/**
 * Replace placeholders with YOUR hosted images (ImageKit / Cloudinary / etc).
 * URLs must be public and stable.
 *
 * EXAMPLE FORMAT (ImageKit):
 * https://ik.imagekit.io/<imagekit_id>/bossb-co/bouquets/blush-roses-mini/blush-pink.jpg
 */
const IMAGES = {
    // --- Bouquet 1: Blush Roses (Mini) ---
    blushPink:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/blush-roses-mini/blush-pink.jpg",
    softWhite:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/blush-roses-mini/white.jpg",

    // --- Bouquet 2: Classic Red Roses ---
    redRoses:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/red-roses-classic/red.jpg",

    // --- Bouquet 3: Pastel Mix Wrap ---
    pastelWrap:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/pastel-mix-wrap/pastel.jpg",
    mixedPastel:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/pastel-mix-wrap/mixed.jpg",

    // --- Bouquet 4: Sunshine Gerberas ---
    sunshineYellow:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/sunshine-gerberas/yellow.jpg",
    warmOrange:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/sunshine-gerberas/orange.jpg",
    brightMixed:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/sunshine-gerberas/mixed.jpg",

    // --- Bouquet 5: White Lilies Elegance ---
    whiteLilies:
        "https://ik.imagekit.io/YOUR_IMAGEKIT_ID/bossb-co/bouquets/white-lilies-elegance/white.jpg",

    // --- Serenity Wreath Collection (Funeral Wreaths) ---
    // Replace these with your actual product photos
    // --- Serenity Wreath Collection ---
    eternalHonourWreath:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/serenity_wealth_collection/serenity_wreath_collection_a.jpeg",

    gentleGoodbyeWreath:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/serenity_wealth_collection/serenity_wreath_collection_b.jpeg",

};

export const BOUQUETS = [
    // ==========================
    // SERENITY WREATH COLLECTION
    // NOTE: A MUST be lowest price -> A = R350-R900, B = R400-R1800
    // ==========================

    {
        id: "serenity-wreath-a-gentle-goodbye",
        name: "Gentle Goodbye Wreath",
        category: "Wreaths",
        collection: "Serenity Wreath Collection",
        shortDescription:
            "A peaceful funeral wreath designed to honour life with grace. Custom colours, flowers, and ribbon message available on request.",
        priceMin: 350, // A = lowest
        priceMax: 900,
        sizes: ["Small", "Standard", "Large"],
        colors: ["White", "Pink", "Yellow", "Red"],
        occasions: ["Sympathy", "Funeral", "Memorial"],
        addons: ["Ribbon Message", "Family Name", "Faith or Symbolic Elements"],
        leadTimeHours: 24,

        image: IMAGES.gentleGoodbyeWreath,
        imageBase: "",
        defaultImage: IMAGES.gentleGoodbyeWreath,
        colorImages: {
            White: IMAGES.gentleGoodbyeWreath,
            Pink: IMAGES.gentleGoodbyeWreath,
            Yellow: IMAGES.gentleGoodbyeWreath,
            Red: IMAGES.gentleGoodbyeWreath,
        },

        featured: false,
    },

    {
        id: "serenity-wreath-b-eternal-honour",
        name: "Eternal Honour Wreath",
        category: "Wreaths",
        collection: "Serenity Wreath Collection",
        shortDescription:
            "A premium handcrafted wreath with fuller blooms and a luxury finish. Custom palette, flower selection, and ribbon message available on request.",
        priceMin: 400,
        priceMax: 1800,
        sizes: ["Small", "Standard", "Large"],
        colors: ["White", "Pink", "Yellow", "Red"],
        occasions: ["Sympathy", "Funeral", "Memorial"],
        addons: ["Ribbon Message", "Family Name", "Faith or Symbolic Elements"],
        leadTimeHours: 24,

        image: IMAGES.eternalHonourWreath,
        imageBase: "",
        defaultImage: IMAGES.eternalHonourWreath,
        colorImages: {
            White: IMAGES.eternalHonourWreath,
            Pink: IMAGES.eternalHonourWreath,
            Yellow: IMAGES.eternalHonourWreath,
            Red: IMAGES.eternalHonourWreath,
        },

        featured: false,
    },

    // ==========================
    // EXISTING BOUQUETS
    // ==========================

    {
        id: "blush-roses-mini",
        name: "Blush Roses (Mini)",
        category: "Roses",
        shortDescription: "Soft pink roses with baby's breath and wrap.",
        priceMin: 299,
        priceMax: 399,
        sizes: ["Mini", "Standard"],
        colors: ["Blush Pink", "White"],
        occasions: ["Birthday", "Anniversary", "Just Because"],
        addons: ["Chocolates", "Card Note", "Fairy Lights"],
        leadTimeHours: 6,

        // Legacy (keep for compatibility)
        image: IMAGES.blushPink,

        // New image system (URLs)
        imageBase: "",
        defaultImage: IMAGES.blushPink,
        colorImages: {
            "Blush Pink": IMAGES.blushPink,
            White: IMAGES.softWhite,
        },

        featured: true,
    },

    {
        id: "red-roses-classic",
        name: "Classic Red Roses",
        category: "Roses",
        shortDescription: "Romantic red roses with premium wrap.",
        priceMin: 499,
        priceMax: 899,
        sizes: ["6 Roses", "12 Roses", "18 Roses"],
        colors: ["Red"],
        occasions: ["Anniversary", "Valentine's", "Date Night"],
        addons: ["Chocolates", "Card Note", "Balloon"],
        leadTimeHours: 12,

        image: IMAGES.redRoses,

        imageBase: "",
        defaultImage: IMAGES.redRoses,
        colorImages: {
            Red: IMAGES.redRoses,
        },

        featured: true,
    },

    {
        id: "pastel-mix-wrap",
        name: "Pastel Mix Wrap",
        category: "Mixed",
        shortDescription: "Seasonal pastel flowers, styled wrap (varies by stock).",
        priceMin: 350,
        priceMax: 650,
        sizes: ["Standard", "Large"],
        colors: ["Pastel", "Mixed"],
        occasions: ["Birthday", "Congrats", "Mother's Day"],
        addons: ["Card Note", "Chocolates", "Balloon"],
        leadTimeHours: 12,

        image: IMAGES.pastelWrap,

        imageBase: "",
        defaultImage: IMAGES.pastelWrap,
        colorImages: {
            Pastel: IMAGES.pastelWrap,
            Mixed: IMAGES.mixedPastel,
        },

        featured: true,
    },

    {
        id: "sunshine-gerberas",
        name: "Sunshine Gerberas",
        category: "Mixed",
        shortDescription: "Bright gerberas, greenery, and wrap.",
        priceMin: 279,
        priceMax: 449,
        sizes: ["Mini", "Standard"],
        colors: ["Yellow", "Orange", "Mixed"],
        occasions: ["Get Well", "Congrats", "Just Because"],
        addons: ["Card Note", "Vase"],
        leadTimeHours: 8,

        image: IMAGES.sunshineYellow,

        imageBase: "",
        defaultImage: IMAGES.sunshineYellow,
        colorImages: {
            Yellow: IMAGES.sunshineYellow,
            Orange: IMAGES.warmOrange,
            Mixed: IMAGES.brightMixed,
        },

        featured: false,
    },

    {
        id: "white-lilies-elegance",
        name: "White Lilies Elegance",
        category: "Lilies",
        shortDescription: "Elegant lilies with soft greenery (buds may open over time).",
        priceMin: 450,
        priceMax: 750,
        sizes: ["Standard", "Large"],
        colors: ["White"],
        occasions: ["Thank You", "Housewarming", "Sympathy"],
        addons: ["Card Note", "Vase", "Fairy Lights"],
        leadTimeHours: 24,

        image: IMAGES.whiteLilies,

        imageBase: "",
        defaultImage: IMAGES.whiteLilies,
        colorImages: {
            White: IMAGES.whiteLilies,
        },

        featured: false,
    },
];
