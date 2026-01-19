// Verified trip data - January 2026
// Sources: Confirmed bookings, official websites, previous research

export const tripInfo = {
  travelers: ["Ray", "Katie"],
  dates: {
    start: "2026-01-19",
    end: "2026-01-27"
  },
  nights: 7
}

// CONFIRMED BOOKINGS (Ground Truth)
export const flights = {
  confirmation: "40-850876768",
  pin: "4428",
  outbound: {
    date: "2026-01-19",
    departure: { time: "19:35", airport: "Newark (EWR)" },
    arrival: { date: "2026-01-20", time: "12:05", airport: "Zürich (ZRH)" },
    airline: "Icelandair",
    flights: "FI622 / FI568",
    duration: "10h 30m",
    via: "Reykjavik"
  },
  return: {
    date: "2026-01-27",
    departure: { time: "13:00", airport: "Zürich (ZRH)" },
    arrival: { time: "18:25", airport: "Newark (EWR)" },
    airline: "Icelandair",
    flights: "FI569 / FI623",
    duration: "11h 25m",
    via: "Reykjavik",
    warning: "Leave hotel by 9:30am"
  },
  totalCost: "$1,228.32"
}

export const hotels = [
  {
    id: "lucerne",
    name: "Hotel Schweizerhof Luzern",
    confirmation: "18387J104610",
    phone: "+41 41 410 04 10",
    address: "Schweizerhofquai 3, 6002 Luzern",
    dates: { checkIn: "2026-01-20", checkOut: "2026-01-22" },
    times: { checkIn: "15:00", checkOut: "12:00" },
    nights: 2,
    room: "Lifestyle Junior Suite",
    includes: ["Breakfast (7am-10:30am)", "Spa access", "WiFi"],
    location: "Lakefront, 5-min walk from train station"
  },
  {
    id: "rigi",
    name: "Hotel Rigi Kaltbad",
    confirmation: "24077UID9835",
    phone: "+41 41 399 81 81",
    address: "Zentrum 4, 6356 Rigi Kaltbad",
    dates: { checkIn: "2026-01-22", checkOut: "2026-01-23" },
    times: { checkIn: "15:00", checkOut: "11:00" },
    nights: 1,
    room: "Superior Double with Balcony",
    includes: ["Breakfast", "Mineralbad & Spa access", "50% off Rigi trains", "WiFi"],
    notes: {
      spaAccess: "From 10:00am on arrival day, all day after checkout",
      slippers: "Buy at reception CHF 6.50 or bring your own",
      carFree: true
    }
  },
  {
    id: "grindelwald",
    name: "Bergwelt Grindelwald",
    confirmation: "2025123145141944",
    phone: "+41 33 854 85 85",
    address: "Bergwelt 4, CH-3818 Grindelwald",
    dates: { checkIn: "2026-01-23", checkOut: "2026-01-26" },
    times: { checkIn: "15:00", checkOut: "11:00" },
    nights: 3,
    room: "Luxury Room with Eiger View",
    includes: ["Breakfast buffet"],
    optional: {
      spa: { name: "Fire & Ice Spa", price: "CHF 35/person", duration: "90 min" }
    }
  },
  {
    id: "zurich",
    name: "Hotel Schweizerhof Zürich",
    confirmation: "2025123145141911",
    phone: "+41 44 218 88 88",
    address: "Bahnhofsplatz 7, 8001 Zürich",
    dates: { checkIn: "2026-01-26", checkOut: "2026-01-27" },
    times: { checkIn: "14:00", checkOut: "12:00" },
    nights: 1,
    room: "Standard Double",
    includes: ["Breakfast"],
    location: "Adjacent to Zürich HB main station"
  }
]

// CONFIRMED ACTIVITIES
export const bookedActivities = [
  {
    name: "Fondue Gondola",
    date: "2026-01-25",
    time: "16:00",
    confirmation: "5093",
    location: "Hotel Belvedere, Dorfstrasse 53, 3818 Grindelwald",
    phone: "+41 33 888 99 99",
    duration: "~1 hour 45 minutes",
    description: "Private fondue dinner in vintage Männlichen gondola cabin",
    note: "Arrive 15 min early or table released"
  },
  {
    name: "Mineralbad & Spa Rigi Kaltbad",
    date: "2026-01-22",
    time: "From 10:00",
    location: "Rigi Kaltbad",
    price: "Included with hotel",
    description: "Mario Botta-designed thermal baths with Alpine views",
    features: ["35°C mineral water", "Indoor/outdoor infinity pool", "Sauna", "Steam bath"]
  }
]

// ACTIVITIES TO BOOK ON-SITE
export const toBookActivities = [
  {
    name: "Night Sledding + Fondue at Bussalp",
    recommendedDate: "2026-01-24",
    alternateDate: "2026-01-25",
    bookingDeadline: "14:00 same day",
    bookingPhone: "+41 33 854 16 16",
    meetingPoint: "Grindelwald bus parking",
    meetingTime: "18:30",
    price: "CHF 70/person",
    includes: ["Bus to Bussalp", "Fondue dinner", "Sled rental", "Headlamp", "4.5km descent"],
    availableDays: ["Friday", "Saturday"],
    critical: true
  }
]

// EVENTS (from previous research - verify on arrival)
export const events = {
  lilu: {
    name: "LILU Light Festival",
    location: "Lucerne Old Town",
    dates: "January 15-25, 2026",
    hours: "18:00-22:00",
    price: "Free (outdoor)",
    yourDates: ["2026-01-20", "2026-01-21"],
    description: "Light installations throughout Old Town",
    verified: false,
    verifyAt: "lichtfestivalluzern.ch"
  },
  snowFestival: {
    name: "World Snow Festival",
    location: "Grindelwald, Bärplatz",
    dates: "January 19-24, 2026",
    price: "Free",
    yourDates: ["2026-01-23", "2026-01-24"],
    description: "Ice and snow sculptures, illuminated at night",
    verified: false,
    verifyAt: "grindelwald.swiss"
  }
}

// TRANSPORT ALERTS
export const transportAlerts = [
  {
    type: "closure",
    location: "Weggis",
    dates: "January 5 - February 11, 2026",
    description: "Weggis-Rigi Kaltbad cable car CLOSED for renovation",
    workaround: "Use boat to Vitznau, then cogwheel train to Rigi Kaltbad",
    verified: false,
    verifyAt: "rigi.ch"
  }
]

// ACTIVITY OPTIONS BY DAY
export const activityOptions = {
  lucerne: [
    {
      name: "Museum of Transport",
      description: "Switzerland's most-visited museum + Swiss Chocolate Adventure",
      duration: "3-4 hours",
      price: { regular: "CHF 37/pp", withPass: "Free", chocolate: "+CHF 18" },
      hours: "10:00-17:00",
      weatherDependent: false,
      link: "verkehrshaus.ch"
    },
    {
      name: "Mount Pilatus",
      description: "Cable car from Kriens to summit (2,128m)",
      duration: "4-5 hours",
      price: { regular: "CHF 72/pp", withPass: "50% off" },
      weatherDependent: true,
      note: "Only cable car operates in winter",
      link: "pilatus.ch"
    },
    {
      name: "Lake Cruise",
      description: "Panoramic boat cruise on Lake Lucerne",
      duration: "1-2 hours",
      price: { regular: "CHF 30-50/pp", withPass: "Free" },
      weatherDependent: "partial",
      link: "lakelucerne.ch"
    },
    {
      name: "Old Town Walking",
      description: "Chapel Bridge, Musegg Wall towers, Jesuit Church",
      duration: "2-3 hours",
      price: "Free",
      weatherDependent: "partial"
    }
  ],
  grindelwald: [
    {
      name: "First Gondola + Cliff Walk",
      description: "Gondola to 2,168m, spectacular cliff walk is free with ticket",
      duration: "3-4 hours",
      price: { regular: "CHF 72/pp", withPass: "50% off" },
      extras: [
        { name: "First Flyer", price: "CHF 31/pp", description: "84 km/h zipline" },
        { name: "First Glider", price: "CHF 31/pp", description: "Hang-glider simulation" }
      ],
      weatherDependent: true,
      link: "grindelwaldfirst.ch"
    },
    {
      name: "Jungfraujoch",
      description: "Top of Europe at 3,454m",
      duration: "Full day",
      price: { regular: "CHF 201/pp", withPass: "25% off" },
      weatherDependent: true,
      critical: "ONLY GO IF CLEAR - check webcams at jungfrau.ch",
      link: "jungfrau.ch"
    },
    {
      name: "Village Exploration",
      description: "Grindelwald village, chocolate shops, views",
      duration: "2-3 hours",
      price: "Free",
      weatherDependent: false
    }
  ]
}

// RESTAURANTS
export const restaurants = {
  lucerne: [
    { name: "Wirtshaus Galliker", specialty: "Veal liver with rösti", price: "CHF 40-60/pp", note: "Cozy, local" },
    { name: "Rathaus Brauerei", specialty: "Rösti, house beer", price: "CHF 35-50/pp", note: "On Reuss River" },
    { name: "Old Swiss House", specialty: "Tableside schnitzel", price: "CHF 50-80/pp", note: "Historic, famous" },
    { name: "Zunfthaus Pfistern", specialty: "Fondue, raclette", price: "CHF 50-70/pp", note: "Historic guild house" }
  ],
  grindelwald: [
    { name: "Hotel Belvedere Restaurant", specialty: "Swiss cuisine", price: "CHF 40-60/pp", note: "Eiger views" },
    { name: "Restaurant Barry's", specialty: "Local dishes", price: "CHF 30-50/pp", note: "Casual village" },
    { name: "Bergrestaurant First", specialty: "Mountain food", price: "CHF 25-40/pp", note: "At First summit" }
  ],
  zurich: [
    { name: "Zeughauskeller", specialty: "Traditional Swiss", price: "CHF 30-50/pp", note: "Historic arsenal" },
    { name: "Swiss Chuchi", specialty: "Fondue, raclette", price: "CHF 40-60/pp", note: "Tourist-friendly" },
    { name: "Sprüngli Paradeplatz", specialty: "Chocolate, cafe", price: "CHF 15-30/pp", note: "Legendary chocolatier" }
  ]
}

// EMERGENCY NUMBERS
export const emergency = {
  general: "112",
  police: "117",
  ambulance: "144",
  fire: "118"
}

// QUICK FACTS
export const quickFacts = {
  currency: "CHF (Swiss Franc)",
  exchange: "~1.10 USD per CHF",
  plugs: "Type J (3 round pins)",
  tipping: "Not expected (included in prices)",
  water: "Tap water excellent everywhere",
  greeting: "Grüezi",
  thanks: "Merci / Danke"
}

export default {
  tripInfo,
  flights,
  hotels,
  bookedActivities,
  toBookActivities,
  events,
  transportAlerts,
  activityOptions,
  restaurants,
  emergency,
  quickFacts
}
