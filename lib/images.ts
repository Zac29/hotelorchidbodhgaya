
export const images = {
  hero: "/hotel-orchid.png",

  hotelExterior:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=88",

  lobby: "/lobby.png",
  lobby2: "/lobby2.png",
  reception: "/reception.png",

  // Room images
  deluxe: "/ac2.png",
  deluxeAlternate: "/ac22.png",
  suite: "/ac3bed.png",
  standard: "/dblbed.png",

  bedroom1: "/ac2.png",
  bedroom2: "/ac22.png",
  bedroom3: "/ac3bed.png",
  bedroom4: "/dblbed.png",

  dining:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=88",

  garden:
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=88",

  // Bodh Gaya attraction images — local public assets
  temple: "/Mahabodhi-Temple.png",
  buddha: "/80-Feet-Buddha.jpg",
  temple2: "/Thai-Temple-bodhgaya.avif",
  temple3: "/The-Royal-Bhutanese-Monastery-Bodh-Gaya.jpg",
  cave: "/Dungeshwari-cave-temple.png",

  sujataStupa: "/Sujata-Stupa.jpg",
  mettaTemple: "/Metta-Buddharam-Temple.webp",
  vishnupadTemple: "/Vishnupad-Temple-Gaya.webp",
} as const;

// Attraction images in the same order as the attractions array
export const attractionImages = [
  images.temple,
  images.buddha,
  images.temple2,
  images.temple3,
  images.cave,
  images.sujataStupa,
  images.mettaTemple,
  images.vishnupadTemple,
];

export const galleryImages = [
  images.hotelExterior,
  images.lobby,
  images.reception,
  images.deluxe,
  images.deluxeAlternate,
  images.suite,
  images.standard,
  images.dining,
  images.garden,
  images.temple,
  images.buddha,
];

// Room pricing matches the Rooms page
export const rooms = [
  {
    id: "deluxe-double",
    name: "Deluxe Double (A/C)",
    noMeals: 1800,
    breakfast: 2000,
    extraPax: 500,
    guests: "2 Guests",
    bed: "1 King / Double Bed",
    image: images.deluxe,
    images: [images.deluxe, images.deluxeAlternate],
    tag: "Popular Choice",
    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "LED TV",
      "Room Service",
      "En-suite Bathroom",
    ],
    description:
      "Designed for couples and solo travellers seeking modern comfort, warm ambient lighting, and a peaceful stay near Bodhgaya's sacred sites.",
  },
  {
    id: "deluxe-triple",
    name: "Deluxe Triple (A/C)",
    noMeals: 2200,
    breakfast: 2500,
    extraPax: 500,
    guests: "3 Guests",
    bed: "1 Double + 1 Single Bed",
    image: images.suite,
    images: [images.suite],
    tag: "Ideal for Families",
    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "Spacious Layout",
      "Room Service",
      "En-suite Bathroom",
    ],
    description:
      "Enjoy extra space for families and small pilgrimage groups, with comfortable bedding, air conditioning, and thoughtful hospitality.",
  },
  {
    id: "standard-non-ac",
    name: "Standard (Non A/C)",
    noMeals: 1500,
    breakfast: 1700,
    extraPax: 500,
    guests: "2 Guests",
    bed: "1 Double Bed",
    image: images.standard,
    images: [images.standard],
    tag: "Great Value",
    amenities: [
      "Ceiling Fan Cooling",
      "Free High-Speed Wi-Fi",
      "LED TV",
      "Daily Housekeeping",
      "En-suite Bathroom",
    ],
    description:
      "A peaceful and economical choice with essential comforts, comfortable bedding, and convenient access to the Mahabodhi Temple complex.",
  },
] as const;

export const attractions = [
  [
    "Mahabodhi Temple",
    "~ 1 km",
    "Main attraction in Bodh Gaya",
  ],
  [
    "80 Feet Buddha",
    "~ 1 km",
    "Peaceful landmark",
  ],
  [
    "Thai Temple",
    "~ 1.5 km",
    "Beautiful Thai monastery",
  ],
  [
    "The Royal Bhutanese Monastery",
    "~ 1.5 km",
    "The Royal Bhutanese Monastery",
  ],
  [
    "Dungeshwari Cave",
    "~ 12 km",
    "Historic meditation caves",
  ],
  [
    "Sujata Stupa",
    "~ 12 km",
    "Sacred Buddhist site",
  ],
  [
    "Metta Buddharam Temple",
    "~ 1 km",
    "Peaceful Temple",
  ],
  [
    "Vishnupad Temple",
    "~ 17 km",
    "Historic temple in Gaya",
  ],
] as const;
