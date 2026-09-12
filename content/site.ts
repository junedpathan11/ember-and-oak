/**
 * Single source of truth for every piece of business content on the site.
 * Components must never hardcode text, prices, hours or links — import from here.
 *
 * NOTE: "Ember & Oak" is a FICTIONAL restaurant. This site is a portfolio
 * concept demo and is labelled as such on every page.
 */

export interface Dish {
  name: string;
  desc: string;
  price: number;
  veg?: boolean;
}

export interface SignatureDish extends Dish {
  image: string;
  alt: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  dishes: Dish[];
}

export interface Testimonial {
  quote: string;
  author: string;
  source: string;
}

export interface PrivateRoom {
  name: string;
  capacity: string;
  minSpend: string;
}

export interface SetMenu {
  name: string;
  price: string;
  note: string;
}

export interface HoursEntry {
  days: string;
  time: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface Business {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  email: string;
  hours: HoursEntry[];
  mapsEmbed: string;
  mapsLink: string;
  socials: { instagram: string; facebook: string };
  established: string;
  demoLabel: string;
}

export interface PrivateDining {
  intro: string;
  rooms: PrivateRoom[];
  setMenuNote: string;
  setMenus: SetMenu[];
  hero: { image: string; alt: string; headline: string; eyebrow: string };
}

export interface Reservation {
  eyebrow: string;
  heading: string;
  sub: string;
  timeSlots: string[];
  partySizes: SelectOption[];
  occasions: SelectOption[];
  largePartyValue: string;
  largePartyNotice: string;
  talkPanel: { heading: string; body: string; whatsappCta: string };
}

export interface SiteConfig {
  business: Business;
  nav: NavLink[];
  menu: MenuCategory[];
  signatureDishes: SignatureDish[];
  testimonials: Testimonial[];
  privateDining: PrivateDining;
  reservation: Reservation;
  home: {
    hero: { eyebrow: string; image: string; alt: string; cta: string; ctaHref: string };
    marquee: string[];
    signature: { eyebrow: string; heading: string };
    about: {
      eyebrow: string;
      heading: string;
      paragraphs: string[];
      pullQuote: string;
      linkLabel: string;
      linkHref: string;
      image: string;
      alt: string;
    };
    testimonials: { eyebrow: string; heading: string };
    hoursLocation: {
      eyebrow: string;
      heading: string;
      callCta: string;
      directionsCta: string;
      mapTitle: string;
    };
    ctaBanner: { heading: string; cta: string; ctaHref: string };
  };
  menuPage: {
    eyebrow: string;
    heading: string;
    vegTag: string;
    cta: { heading: string; primary: string; primaryHref: string; secondary: string };
  };
  notFound: { heading: string; body: string; cta: string; ctaHref: string };
  footer: { navHeading: string; hoursHeading: string; findUsHeading: string; copyright: string };
}

/* Photography note ------------------------------------------------------
 * The brief referenced Unsplash source imagery, e.g. the hero:
 *   https://images.unsplash.com/photo-1555939594-58d7cb561ad1
 * Images are served locally from /public/images instead so the demo has no
 * third-party runtime dependency, no remotePatterns config and no hotlinking.
 * Swap the `image` fields below for remote URLs if you prefer (add the host to
 * `images.remotePatterns` in next.config.ts first).
 * --------------------------------------------------------------------- */

export const site: SiteConfig = {
  business: {
    name: "Ember & Oak",
    tagline: "Slow fire. Honest food.",
    description:
      "Wood-fired Indian grill. Charcoal, patience, and recipes that travelled three generations.",
    address: "21, Ghod Dod Road, Athwa, Surat, Gujarat 395007",
    phone: "+91 90000 00000",
    phoneHref: "tel:+919000000000",
    whatsapp:
      "https://wa.me/919000000000?text=Hi%20Ember%20%26%20Oak%2C%20I%27d%20like%20to%20reserve%20a%20table.",
    email: "hello@emberandoak.in",
    hours: [
      { days: "Tuesday – Sunday", time: "Lunch 12:00 – 15:30 · Dinner 19:00 – 23:00" },
      { days: "Monday", time: "Closed" },
    ],
    mapsEmbed: "https://www.google.com/maps?q=Ghod+Dod+Road+Athwa+Surat&output=embed",
    mapsLink: "https://www.google.com/maps?q=Ghod+Dod+Road+Athwa+Surat",
    socials: { instagram: "#", facebook: "#" },
    established: "2019",
    demoLabel: "Concept demo website",
  },

  nav: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/private-dining", label: "Private Dining" },
    { href: "/reserve", label: "Reserve" },
  ],

  menu: [
    {
      id: "starters",
      label: "Starters",
      dishes: [
        {
          name: "Charred Paneer Tikka",
          desc: "Smoked hung curd, mint chutney, pickled onion",
          price: 345,
          veg: true,
        },
        {
          name: "Ember Chicken 65",
          desc: "Curry-leaf temper, burnt garlic, lime ash",
          price: 395,
          veg: false,
        },
        {
          name: "Tandoori Mushrooms",
          desc: "Kashmiri chilli, kasundi mayo, charred scallion",
          price: 365,
          veg: true,
        },
        {
          name: "Dahi Kebab",
          desc: "Crisp hung-curd patties, beetroot reduction",
          price: 325,
          veg: true,
        },
      ],
    },
    {
      id: "mains",
      label: "Mains",
      dishes: [
        {
          name: "Ember Butter Chicken",
          desc: "12-hour tomato makhani, wood-fire finish",
          price: 495,
          veg: false,
        },
        {
          name: "Dum Biryani",
          desc: "Aged basmati, saffron, sealed handi, mirchi ka salan",
          price: 445,
          veg: false,
        },
        {
          name: "Smoked Dal Makhani",
          desc: "48-hour black urad, white butter, ember tempering",
          price: 395,
          veg: true,
        },
        {
          name: "Lamb Seekh Kebab",
          desc: "Hand-minced, green chilli, onion confit",
          price: 545,
          veg: false,
        },
      ],
    },
    {
      id: "desserts",
      label: "Desserts",
      dishes: [
        {
          name: "Burnt Basque Cheesecake",
          desc: "Mishti doi cream, jaggery caramel",
          price: 295,
          veg: true,
        },
        {
          name: "Gulab Jamun Brûlée",
          desc: "Torched rabri, pistachio dust",
          price: 265,
          veg: true,
        },
        {
          name: "Filter Coffee Tres Leches",
          desc: "Baba Budan estate, chicory cream",
          price: 285,
          veg: true,
        },
        {
          name: "Chocolate Chai Tart",
          desc: "Dark ganache, masala chai crumb",
          price: 275,
          veg: true,
        },
      ],
    },
    {
      id: "drinks",
      label: "Drinks",
      dishes: [
        {
          name: "Sol Kadhi",
          desc: "Kokum, coconut milk, toasted cumin",
          price: 145,
          veg: true,
        },
        {
          name: "Aam Panna Spritz",
          desc: "Raw mango, mint, soda",
          price: 165,
          veg: true,
        },
        {
          name: "Masala Chai",
          desc: "Assam leaves, whole spice, jaggery",
          price: 125,
          veg: true,
        },
        {
          name: "Fresh Lime Soda",
          desc: "Sweet, salted, or ember-smoked",
          price: 135,
          veg: true,
        },
      ],
    },
  ],

  signatureDishes: [
    {
      name: "Ember Butter Chicken",
      desc: "12-hour tomato makhani, wood-fire finish",
      price: 495,
      veg: false,
      image: "/images/dish-butter-chicken.jpg",
      alt: "Ember butter chicken served in a copper bowl with a swirl of cream",
    },
    {
      name: "Dum Biryani",
      desc: "Aged basmati, saffron, sealed handi, mirchi ka salan",
      price: 445,
      veg: false,
      image: "/images/dish-biryani.jpg",
      alt: "Saffron dum biryani steaming in a clay handi with the seal broken open",
    },
    {
      name: "Smoked Dal Makhani",
      desc: "48-hour black urad, white butter, ember tempering",
      price: 395,
      veg: true,
      image: "/images/dish-dal-makhani.jpg",
      alt: "Smoked dal makhani in an iron karahi topped with melting white butter",
    },
    {
      name: "Charred Paneer Tikka",
      desc: "The dish that built our name",
      price: 345,
      veg: true,
      image: "/images/dish-paneer-tikka.jpg",
      alt: "Charred paneer tikka skewers with mint chutney and pickled onion",
    },
  ],

  testimonials: [
    {
      quote:
        "The butter chicken genuinely tastes of smoke. Rare, this level of control over fire.",
      author: "Priya R.",
      source: "Google Review",
    },
    {
      quote:
        "Booked the private room for my parents' anniversary. Flawless from the first call to the last course.",
      author: "Arjun M.",
      source: "Google Review",
    },
    {
      quote:
        "Best dining room in the city right now. The menu reads like someone actually cares.",
      author: "The Surat Table",
      source: "Press",
    },
  ],

  privateDining: {
    intro:
      "Two rooms, one courtyard. Weddings, anniversaries, off-sites — full-service, set menus, dedicated staff.",
    rooms: [
      { name: "The Long Table", capacity: "12 guests", minSpend: "₹25,000" },
      { name: "The Courtyard", capacity: "40 guests", minSpend: "₹85,000" },
      { name: "Full Buyout", capacity: "90 guests", minSpend: "On request" },
    ],
    setMenuNote: "Set menus from ₹1,450 per guest. Vegetarian and Jain options.",
    setMenus: [
      { name: "Lunch Set", price: "₹1,450", note: "Four courses, served family style" },
      { name: "Dinner Set", price: "₹1,950", note: "Six courses, grill-led, with dessert" },
      { name: "Vegetarian Jain Set", price: "₹1,450", note: "No root vegetables, no onion or garlic" },
    ],
    hero: {
      image: "/images/private-courtyard.jpg",
      alt: "The Ember & Oak private courtyard at dusk, one long table set under hanging filament lights",
      headline: "Room for every occasion.",
      eyebrow: "Private Dining",
    },
  },

  reservation: {
    eyebrow: "Reservations",
    heading: "Reserve a Table",
    sub: "We hold tables for 15 minutes past your slot.",
    timeSlots: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
    ],
    partySizes: [
      { value: "1", label: "1 guest" },
      { value: "2", label: "2 guests" },
      { value: "3", label: "3 guests" },
      { value: "4", label: "4 guests" },
      { value: "5", label: "5 guests" },
      { value: "6", label: "6 guests" },
      { value: "7", label: "7 guests" },
      { value: "8", label: "8 guests" },
      { value: "9", label: "9 guests" },
      { value: "10", label: "10 guests" },
      { value: "10+", label: "10+ guests" },
    ],
    occasions: [
      { value: "", label: "No occasion" },
      { value: "birthday", label: "Birthday" },
      { value: "anniversary", label: "Anniversary" },
      { value: "business", label: "Business" },
    ],
    largePartyValue: "10+",
    largePartyNotice: "Parties over ten are looked after by our private dining team.",
    talkPanel: {
      heading: "Prefer to talk?",
      body: "Our floor team answers between 11:00 and 23:00, Tuesday to Sunday.",
      whatsappCta: "Message on WhatsApp",
    },
  },

  home: {
    hero: {
      eyebrow: "Wood-fired · Est. 2019",
      image: "/images/hero-grill.jpg",
      alt: "Skewers of chicken and paneer charring over glowing coals on the Ember & Oak grill",
      cta: "Reserve a Table",
      ctaHref: "/reserve",
    },
    marquee: ["Charcoal Grill", "Slow Fermentation", "48-hour Dal"],
    signature: { eyebrow: "From the Fire", heading: "Four dishes we are known for." },
    about: {
      eyebrow: "Our Kitchen",
      heading: "Three generations, one fire.",
      paragraphs: [
        "We built the grill first and the dining room second. Oak and babul, burned down to coal each afternoon, then fed for the rest of the night — no gas, no shortcuts, no rushing a heat that takes four hours to get right.",
        "The recipes are older than the restaurant. They came down through a family kitchen in Surat, written on the back of ration cards, and we have changed almost nothing except the precision.",
        "What is left is simple cooking done slowly: dal that sits for forty-eight hours, curd hung overnight, meat that meets the fire only when the fire is ready for it.",
      ],
      pullQuote: "We don't cook over fire. We cook with it.",
      linkLabel: "More about us",
      linkHref: "/private-dining",
      image: "/images/kitchen-chef.jpg",
      alt: "A chef turning skewers over the wood-fired charcoal grill in the Ember & Oak kitchen",
    },
    testimonials: { eyebrow: "Word of Mouth", heading: "What people say." },
    hoursLocation: {
      eyebrow: "Visit",
      heading: "Hours & Location",
      callCta: "Call to book",
      directionsCta: "Get Directions",
      mapTitle: "Map showing Ember & Oak on Ghod Dod Road, Athwa, Surat",
    },
    ctaBanner: { heading: "Hungry?", cta: "Reserve a Table", ctaHref: "/reserve" },
  },

  menuPage: {
    eyebrow: "The Menu",
    heading: "What the fire gave us today.",
    vegTag: "(v)",
    cta: {
      heading: "Tables go early on weekends.",
      primary: "Reserve a table",
      primaryHref: "/reserve",
      secondary: "Ask on WhatsApp",
    },
  },

  notFound: {
    heading: "This table doesn't exist.",
    body: "The page you were looking for has been cleared away. Let us seat you somewhere else.",
    cta: "Back to home",
    ctaHref: "/",
  },

  footer: {
    navHeading: "Explore",
    hoursHeading: "Hours",
    findUsHeading: "Find Us",
    copyright: "© 2026 Ember & Oak",
  },
};

export default site;
