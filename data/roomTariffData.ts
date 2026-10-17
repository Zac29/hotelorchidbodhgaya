import { images } from "@/lib/images";

export interface RoomTariffItem {
  id: string;

  name: string;

  noMeals: number;

  breakfast: number;

  extraPax: number;

  guests: string;

  bed: string;

  amenities: string[];

  image: keyof typeof images | "hero";

  tag: string;

  description: string;
}

export const roomTariffData: RoomTariffItem[] = [
  {
    id: "deluxe-double",

    name: "Deluxe Double (A/C)",

    noMeals: 1800,

    breakfast: 2000,

    extraPax: 500,

    guests: "2 Guests",

    bed: "1 King / Double Bed",

    amenities: [
      "Air Conditioning",

      "Free High-Speed Wi-Fi",

      "LED TV",

      "Room Service",

      "En-suite Bathroom",
    ],

    image: "deluxe" in images ? "deluxe" : "hero",

    tag: "Popular Choice",

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

    amenities: [
      "Air Conditioning",

      "Free High-Speed Wi-Fi",

      "Spacious Layout",

      "Room Service",

      "En-suite Bathroom",
    ],

    image: "suite" in images ? "suite" : "hero",

    tag: "Ideal for Families",

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

    amenities: [
      "Ceiling Fan Cooling",

      "Free High-Speed Wi-Fi",

      "LED TV",

      "Daily Housekeeping",

      "En-suite Bathroom",
    ],

    image: "standard" in images ? "standard" : "hero",

    tag: "Great Value",

    description:
      "A peaceful and economical choice with essential comforts, comfortable bedding, and convenient access to the Mahabodhi Temple complex.",
  },
];
