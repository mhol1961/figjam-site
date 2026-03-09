// src/data/site-content.ts
// ============================================================
// All site content centralized here for easy updates by client
// ============================================================

export const siteConfig = {
  businessName: "Fig Jam Charcuterie LLC",
  tagline: "Sweet & Savory Charcuterie",
  phone: "941-914-0007",
  phoneFormatted: "(941) 914-0007",
  phoneLink: "tel:9419140007",
  email: "", // TODO: Get from Elizabeth
  serviceArea: "Sarasota, Siesta Key & Surrounding Areas",
  city: "Sarasota",
  state: "FL",
  owner: "Elizabeth Kent",
  socialMedia: {
    instagram: "", // TODO: Get from Elizabeth
    facebook: "", // TODO: Get from Elizabeth
  },
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Our Boards", href: "/menu" },
  { label: "Cart Service", href: "/cart-service" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export const boards = [
  {
    id: "cups",
    name: "Charcuterie Cups",
    price: 12,
    priceLabel: "$12 each",
    serves: "Min. 10 cups",
    description: "Perfect for business meeting snacks and party favors. Individual portions that are elegant and easy to enjoy.",
    occasions: ["Business Meetings", "Party Favors", "Corporate Events"],
    image: "/images/boards/cups.jpg",
  },
  {
    id: "small",
    name: "Small Board",
    price: 50,
    priceLabel: "$50",
    serves: "Feeds 2–3",
    description: "Ideal for romantic beach picnics and intimate date nights. A curated selection of our finest ingredients.",
    occasions: ["Date Night", "Beach Picnic", "Romantic Evening"],
    image: "/images/boards/small.jpg",
  },
  {
    id: "medium",
    name: "Medium Board",
    price: 125,
    priceLabel: "$125",
    serves: "Feeds 6–8",
    description: "Great for girl's night, game day, or small gatherings. A generous spread that's sure to impress.",
    occasions: ["Girl's Night", "Game Day", "Small Gatherings"],
    image: "/images/boards/medium.jpg",
  },
  {
    id: "large",
    name: "Large Board",
    price: 175,
    priceLabel: "$175",
    serves: "Feeds 8–10",
    description: "Perfect for parties, showers, and celebrations. A stunning centerpiece for your event.",
    occasions: ["Birthday Parties", "Showers", "Celebrations"],
    image: "/images/boards/large.jpg",
  },
];

export const menuCategories = [
  {
    key: "cheese",
    label: "Cheese",
    items: [
      "Brie", "Bleu Cheese", "Goat Cheese", "Cheddar",
      "Parmigiano Reggiano", "Havarti", "Gouda", "Pepper Jack",
    ],
    note: "Seasonal options when available",
  },
  {
    key: "meat",
    label: "Charcuterie",
    items: [
      "Prosciutto", "Chorizo", "Mortadella",
      "Genoa Salami", "Pepperoni", "Soppressata",
    ],
  },
  {
    key: "fruit",
    label: "Fruits",
    items: [
      "Mission Figs", "Strawberries", "Seedless Grapes",
      "Medjool Dates", "Dried Fruit", "Oranges", "Blackberries",
    ],
    note: "Seasonal fruits when available",
  },
  {
    key: "crackers",
    label: "Crackers & Bread",
    items: [
      "Bagel Crisps", "Bread Sticks", "Butter Crisps",
      "Rye Crackers", "Rosemary Crackers", "Baguettes", "Mini Toast",
    ],
  },
  {
    key: "extras",
    label: "Nuts, Sweets & Salty",
    items: [
      "Chocolate Pretzels", "Macarons", "Candied Pecans",
      "Pistachios", "Sea Salt Chocolates", "Roasted Almonds",
      "Cashews", "Pickles", "Olives",
    ],
  },
  {
    key: "spreads",
    label: "Spreads & Condiments",
    items: [
      "Honey", "Fig Jam", "Strawberry Preserves", "Marmalade",
      "Spicy & Sweet", "Apple Butter", "Hot Mustard",
    ],
  },
  {
    key: "sweets",
    label: "Sweet Additions",
    items: [
      "Belgian Waffles", "Blueberry Muffins", "Corn Muffins",
      "Chocolate Chip Muffins", "Banana Nut Muffins",
      "Pistachio Muffins", "Chocolate Muffins",
    ],
    note: "Butter and honey or seasonal jam included",
  },
];

export const cartService = {
  basePrice: 300,
  baseDuration: "2 hours",
  perGuest: "$15–25",
  minGuests: 15,
  includes: [
    {
      title: "Elegant Cart Setup",
      description: "Beautiful cart display with umbrella and curated arrangement",
      icon: "ShoppingCart",
    },
    {
      title: "Custom Menu",
      description: "Curated or fully customizable food options for your event",
      icon: "UtensilsCrossed",
    },
    {
      title: "Dedicated Server",
      description: "Professional service throughout your entire event",
      icon: "User",
    },
    {
      title: "Custom Signage",
      description: "Personalized branded signage for your occasion (4' x 2.5')",
      icon: "PenTool",
    },
  ],
  dietaryOptions: ["Vegan", "Gluten Free", "Dairy Free"],
  servingStyles: ["Boards", "Cups"],
  additionalTimeAvailable: true,
};

export const testimonials = [
  {
    name: "Kim T.",
    text: "I cannot recommend Fig Jam Charcuterie enough. My sister was in town visiting from NJ and we spent the weekend visiting all of the spots in Sarasota and Siesta Key. Liz delivered the most beautiful, perfect board that felt fancy and was just what we needed. She even threw in a bottle of wine to make it even more special.",
    occasion: "Family Visit",
    rating: 5,
    image: "/images/tasteful-option6.png",
  },
  {
    name: "Hannah",
    text: "It was perfect. He was so impressed, as was I. Delicious and filling. You're amazing — keep up the great work! I'm sure we will be in touch!",
    occasion: "Birthday Party",
    rating: 5,
    image: "/images/hannah-testimonial-block-image.png",
  },
  {
    name: "Jared",
    text: "We stayed in an Airbnb and watched the sunset in Siesta Key with a Fig Jam Beach Picnic. My girlfriend surprised me, it was so good and fresh!",
    occasion: "Beach Picnic",
    rating: 5,
    image: "/images/jared-testimonial-image.png",
  },
];

export const faqItems = [
  {
    question: "How far in advance should I order?",
    answer: "We recommend ordering at least 48 hours in advance for boards and boxes. For cart service and large events, please contact us at least 1-2 weeks ahead to ensure availability.",
  },
  {
    question: "What is your delivery area?",
    answer: "We offer free delivery throughout Sarasota, Siesta Key, and surrounding areas. Contact us for locations outside our standard range.",
  },
  {
    question: "Can you accommodate food allergies?",
    answer: "Absolutely! We offer vegan, gluten-free, and dairy-free options. Please inform us of any allergies when placing your order and we'll customize your board accordingly.",
  },
  {
    question: "What's included with the cart rental?",
    answer: "Our full-service cart rental includes the cart setup with umbrella, a custom menu, dedicated server for your event, and custom signage. Base pricing starts at $300 for 2 hours.",
  },
  {
    question: "Do you provide plates and napkins?",
    answer: "Boards come ready to serve. For cart service events, we provide everything needed for a complete experience. Let us know if you need any extras for board orders.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "Please contact us as soon as possible if you need to cancel or reschedule. We understand plans change and will work with you to find a solution.",
  },
];

export const announcementMessages = [
  "From Corporate Grazing Tables to Beach Picnics and Movie Nights — Always FRESH, Made to Order!",
  "Free Delivery in the Sarasota Area · Call 941-914-0007",
  "Vegan, Gluten Free & Dairy Free Options Available",
];

export const socialProof = [
  { value: "500+", label: "Boards Crafted" },
  { value: "100%", label: "Fresh Ingredients" },
  { value: "Free", label: "Local Delivery" },
  { value: "5.0", label: "Customer Rating" },
];

export const howItWorks = [
  {
    step: 1,
    title: "Choose Your Board",
    description: "Pick from cups, small, medium or large — perfect for any occasion and guest count.",
    icon: "ClipboardList",
  },
  {
    step: 2,
    title: "Customize Your Selection",
    description: "Tell us your preferences, dietary needs, and event details. We'll curate the perfect spread.",
    icon: "Palette",
  },
  {
    step: 3,
    title: "We Deliver Fresh",
    description: "We prepare everything fresh and deliver right to your door — free in the Sarasota area.",
    icon: "Truck",
  },
];

export const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1678572823447-45fc146df43c?w=600&q=80", category: "corporate", alt: "Corporate charcuterie spread", span: true },
  { id: 2, src: "https://images.unsplash.com/photo-1640618491853-95b2c5041eda?w=600&q=80", category: "showers", alt: "Elegant board for bridal shower", span: false },
  { id: 3, src: "https://images.unsplash.com/photo-1616631124348-c63521eb484c?w=600&q=80", category: "datenight", alt: "Intimate date night board", span: false },
  { id: 4, src: "https://images.unsplash.com/photo-1626628577177-7c9a3a907d5a?w=600&q=80", category: "holiday", alt: "Holiday party charcuterie", span: false },
  { id: 5, src: "https://images.unsplash.com/photo-1611764197743-702a4d01463b?w=600&q=80", category: "corporate", alt: "Styled corporate event board", span: true },
  { id: 6, src: "https://images.unsplash.com/photo-1553653760-7e5d1fde3cd9?w=600&q=80", category: "datenight", alt: "Wine and cheese pairing", span: false },
  { id: 7, src: "https://images.unsplash.com/photo-1589882116725-d36fe25dd953?w=600&q=80", category: "beach", alt: "Beach picnic charcuterie", span: false },
  { id: 8, src: "https://images.unsplash.com/photo-1576773482581-4d46379ca262?w=600&q=80", category: "showers", alt: "Baby shower food display", span: false },
  { id: 9, src: "https://images.unsplash.com/photo-1542562504-963dc9feead5?w=600&q=80", category: "holiday", alt: "Festive holiday spread", span: true },
];

export const aboutContent = {
  story: `We started Fig Jam Charcuterie LLC out of a passion for something fresh and exciting! After years in the corporate world, filled with the same catered lunches and snacks at sales meetings, we decided it was time for a twist.`,
  mission: `That's why we created our customizable Charcuterie Cart service, along with boxes, boards, and cups, to delight taste buds with fresh, sweet, and savory treats. We value freshness, quality, and presentation, and we treat every customer the way we'd want to be treated.`,
  serving: `At Fig Jam Charcuterie, we're all about serving up our most delicious creations for any occasion! From sunset beach picnics to birthday parties, bridal and baby showers, and other special celebrations, we make sure your event is something to be proud of.`,
  occasions: [
    "Corporate Grazing Tables",
    "Beach Picnics",
    "Date Nights",
    "Girl's Night",
    "Game Day",
    "Birthday Parties",
    "Bridal Showers",
    "Baby Showers",
    "Weddings",
    "Movie Nights",
    "Holiday Celebrations",
  ],
};
