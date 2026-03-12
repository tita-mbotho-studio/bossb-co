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

    if (selected && bouquet.colorImages && bouquet.colorImages[selected]) {
        return bouquet.colorImages[selected];
    }

    if (selected && bouquet.imageBase) {
        const slug = slugifyColor(selected);
        if (slug) return `${bouquet.imageBase}/${slug}.jpg`;
    }

    return bouquet.defaultImage || bouquet.image || "";
}

/**
 * Return the best image for a bouquet based on selected SIZE.
 */
export function getBouquetImageBySize(bouquet, size) {
    if (!bouquet) return "";

    const selected = (size || "").trim();

    if (selected && bouquet.sizeImages && bouquet.sizeImages[selected]) {
        return bouquet.sizeImages[selected];
    }

    return bouquet.defaultImage || bouquet.image || "";
}

/**
 * Selection-aware image resolver:
 * - If bouquet has sizeImages and a size is selected -> use size image
 * - Else -> use existing color-based resolver
 */
export function getBouquetImageForSelection(bouquet, { color = null, size = null } = {}) {
    if (!bouquet) return "";

    const chosenSize = (size || "").trim();
    const chosenColor = (color || "").trim();

    if (chosenSize && bouquet.sizeImages) {
        return getBouquetImageBySize(bouquet, chosenSize) || "";
    }

    return getBouquetImage(bouquet, chosenColor) || "";
}

/**
 * Replace placeholders with YOUR hosted images (ImageKit / Cloudinary / etc).
 * URLs must be public and stable.
 */
const IMAGES = {
    // --- Serenity Wreath Collection (Funeral Wreaths) ---
    eternalHonourWreath:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/serenity_wealth_collection/serenity_wreath_collection_a.jpeg",

    gentleGoodbyeWreath:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/serenity_wealth_collection/serenity_wreath_collection_b.jpeg",

    // --- Rośe Dreams Collection (Rose Boxes) ---
    roseDreamsSmall:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/rose_dream_collection/ro%C5%9Be_dreams_collection_a.jpeg?updatedAt=1771671991144",

    roseDreamsMedium:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/rose_dream_collection/ro%C5%9Be_dreams_collection_b.jpeg?updatedAt=1771671991965",

    roseDreamsLarge:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/rose_dream_collection/ro%C5%9Be_dreams_collection_c.jpeg?updatedAt=1771671992519",

    // --- Scarlet Moments Collection ---
    scarletMoments:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/scarlet_moments_collection/scarlet_moments_collection_a.jpeg",

    // --- Beauty Basket Collection ---
    beautyBasket:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/beauty_basket_collection/beauty_basket_collection_a.jpeg",

    // --- Baby Bush Collection ---
    babyBush:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/baby_bush_collection/baby_bush_collection_a.jpeg",

    // --- Bridesmaid Bouquets Collection ---
    bridesmaidBouquets:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/bridesmaid_bouquets_collection/bridesmaid_bouquets_collection_a.jpeg",

    // --- Heart of Gold Collection ---
    heartOfGold:
        "https://ik.imagekit.io/kw8awoqvwi/bossb-co/heart_of_gold_collection/heart_of_gold_collection_a.jpeg",
};

export const BOUQUETS = [
    {
        id: "serenity-wreath-a-gentle-goodbye",
        name: "Gentle Goodbye Wreath",
        category: "Wreaths",
        collection: "Serenity Wreath Collection",
        shortDescription:
            "A peaceful funeral wreath designed to honour life with grace. Custom colours, flowers, and ribbon message available on request.",
        priceMin: 350,
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

    {
        id: "rose-dreams-collection",
        name: "Rośe Dreams",
        category: "Rose Boxes",
        collection: "Rośe Dreams Collection",
        shortDescription:
            "A soft, romantic range of pink floral boxes designed to feel feminine, delicate, and luxurious. Choose your size and customise your box.",
        priceMin: 450,
        priceMax: 1500,
        sizes: ["Small", "Medium", "Large"],
        colors: ["Pink", "White", "Red", "Purple", "Orange"],
        occasions: ["Love", "Friendship", "Anniversary", "Just Because", "Birthday"],
        addons: ["Dior Ribbon", "Chanel Ribbon", "Gucci Ribbon", "Personalised Message Cards"],
        leadTimeHours: 24,
        image: IMAGES.roseDreamsSmall,
        imageBase: "",
        defaultImage: IMAGES.roseDreamsSmall,
        colorImages: {
            Pink: IMAGES.roseDreamsSmall,
        },
        sizeImages: {
            Small: IMAGES.roseDreamsSmall,
            Medium: IMAGES.roseDreamsMedium,
            Large: IMAGES.roseDreamsLarge,
        },
        featured: false,
    },

    {
        id: "scarlet-moments-collection",
        name: "Scarlet Moments",
        category: "Scarlet Moments",
        collection: "Scarlet Moments",
        shortDescription:
            "A bold and romantic range of red floral designs created to capture deep emotion and unforgettable gestures. Choose your size and customise your arrangement.",
        priceMin: 1200,
        priceMax: 2800,
        sizes: ["Small", "Medium", "Large"],
        colors: ["Red", "Pink", "Yellow", "Flame", "White"],
        occasions: ["Love", "Anniversary", "Celebration", "Date Night"],
        addons: ["Ribbons", "Personalised Message", "Chocolate", "Balloon"],
        leadTimeHours: 24,
        image: IMAGES.scarletMoments,
        imageBase: "",
        defaultImage: IMAGES.scarletMoments,
        colorImages: {
            Red: IMAGES.scarletMoments,
            Pink: IMAGES.scarletMoments,
            Yellow: IMAGES.scarletMoments,
            Flame: IMAGES.scarletMoments,
            White: IMAGES.scarletMoments,
        },
        featured: false,
    },

    {
        id: "beauty-basket-collection",
        name: "Beauty Basket",
        category: "Gift Baskets",
        collection: "Beauty Basket Collection",
        shortDescription:
            "A luxurious beauty basket curated with premium cosmetic brands, designed as a thoughtful and stylish gift for special occasions.",
        priceMin: 1500,
        priceMax: 7000,
        sizes: ["Small", "Standard", "Large"],
        colors: ["Pink", "Purple", "Red", "Brown", "Yellow"],
        brands: ["Essence", "Nars", "Mac", "Scarlet Hill"],
        requiredSelections: ["size", "color", "brand"],
        occasions: ["Birthday", "Love", "Celebration", "Gift", "Just Because"],
        addons: ["Personalised Message", "Chocolate", "Balloon", "Ribbon"],
        leadTimeHours: 24,
        image: IMAGES.beautyBasket,
        imageBase: "",
        defaultImage: IMAGES.beautyBasket,
        colorImages: {
            Pink: IMAGES.beautyBasket,
            Purple: IMAGES.beautyBasket,
            Red: IMAGES.beautyBasket,
            Brown: IMAGES.beautyBasket,
            Yellow: IMAGES.beautyBasket,
        },
        featured: false,
    },

    {
        id: "baby-bush-collection",
        name: "Baby Bush",
        category: "Baby Bushes",
        collection: "Baby Bush Collection",
        shortDescription:
            "A charming and colourful floral bush arrangement designed for thoughtful gifting and sweet celebratory moments.",
        priceMin: 800,
        priceMax: 1200,
        sizes: ["Small", "Standard", "Large"],
        colors: ["Red", "Yellow", "Brown", "Pink", "Blue"],
        occasions: ["Birthday", "Celebration", "Gift", "Just Because"],
        addons: ["Personalised Message", "Ribbon", "Chocolate", "Balloon"],
        leadTimeHours: 24,
        image: IMAGES.babyBush,
        imageBase: "",
        defaultImage: IMAGES.babyBush,
        colorImages: {
            Red: IMAGES.babyBush,
            Yellow: IMAGES.babyBush,
            Brown: IMAGES.babyBush,
            Pink: IMAGES.babyBush,
            Blue: IMAGES.babyBush,
        },
        featured: false,
    },

    {
        id: "bridesmaid-bouquets-collection",
        name: "Bridesmaid Bouquets",
        category: "Wedding Bouquets",
        collection: "Bridesmaid Bouquets Collection",
        shortDescription:
            "Elegant bridesmaid bouquets finished with beautiful ribbon colour options to complement your wedding palette and bridal party styling.",
        priceMin: 350,
        priceMax: 600,
        sizes: ["Small", "Standard", "Large"],
        ribbonColors: ["Pink", "Nude", "White", "Green"],
        requiredSelections: ["size", "ribbonColor"],
        occasions: ["Wedding", "Bridal Party", "Celebration"],
        addons: ["Personalised Ribbon", "Pearl Pins", "Gift Wrapping", "Message Card"],
        leadTimeHours: 24,
        image: IMAGES.bridesmaidBouquets,
        imageBase: "",
        defaultImage: IMAGES.bridesmaidBouquets,
        featured: false,
    },

    {
        id: "heart-of-gold-collection",
        name: "Heart of Gold",
        category: "Floral Arrangements",
        collection: "Heart of Gold Collection",
        shortDescription:
            "A warm and elegant floral arrangement designed to express love, gratitude, and heartfelt celebration in timeless tones.",
        priceMin: 800,
        priceMax: 1400,
        sizes: ["Small", "Standard", "Large"],
        colors: ["White", "Red", "Nude"],
        occasions: ["Love", "Celebration", "Gift", "Anniversary", "Just Because"],
        addons: ["Personalised Message", "Ribbon", "Chocolate", "Balloon"],
        leadTimeHours: 24,
        image: IMAGES.heartOfGold,
        imageBase: "",
        defaultImage: IMAGES.heartOfGold,
        colorImages: {
            White: IMAGES.heartOfGold,
            Red: IMAGES.heartOfGold,
            Nude: IMAGES.heartOfGold,
        },
        featured: false,
    },
];