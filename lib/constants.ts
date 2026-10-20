export const rooms = [
  {
    name: "Deluxe Room",
    price: "₹ 3,000",
    guests: "2 Guests",
    bed: "King Bed",
    image: "bedroom1",
    amenities: ["AC", "Wi-Fi", "TV", "Attached Bath"],
  },
  {
    name: "Executive Room",
    price: "₹ 3,800",
    guests: "2–3 Guests",
    bed: "King Bed",
    image: "bedroom2",
    amenities: ["AC", "Wi-Fi", "Work Desk", "City View"],
  },
  {
    name: "Family Room",
    price: "₹ 4,800",
    guests: "4 Guests",
    bed: "2 King Beds",
    image: "bedroom3",
    amenities: ["AC", "Wi-Fi", "Extra Space", "Family Friendly"],
  },
  {
    name: "Suite Room",
    price: "₹ 6,500",
    guests: "2–4 Guests",
    bed: "King Bed",
    image: "bedroom4",
    amenities: ["AC", "Wi-Fi", "Living Area", "Premium"],
  },
] as const;

export const attractions = [
  ["Mahabodhi Temple", "~ 1 km", "Main attraction in Bodh Gaya"],
  ["80 Feet Buddha", "~ 1 km", "Peaceful landmark"],
  ["Thai Temple", "~ 1.5 km", "Beautiful Thai monastery"],
  ["The Royal Bhutanese Monastery Bodh Gaya", "~ 1.5 km", "Traditional The Royal Bhutanese Monastery Bodh Gaya"],
  ["Dungeshwari Cave", "~ 12 km", "Historic meditation caves"],
  ["Sujata Stupa", "~ 3.5 km", "Sacred Buddhist site"],
  ["Metta Buddharam Temple", "~ 400 m", "Peaceful Buddhist Temple"],
  ["Vishnupad Temple", "~ 15 km", "Historic temple in Gaya"],
] as const;
