// Day-by-day itinerary structure
// Used by both Story Mode and Reference Mode

export const days = [
  {
    number: 1,
    date: "2026-01-19",
    dayOfWeek: "Monday",
    title: "Departure",
    location: "Newark",
    hotel: null,
    summary: "Evening flight to Switzerland",
    schedule: [
      { time: "19:35", activity: "Depart Newark (EWR)", type: "flight", details: "Icelandair via Reykjavik" }
    ],
    tips: [
      "Passports ready",
      "Power adapters packed (Type J)",
      "Download offline Swiss maps",
      "Try to sleep on the plane"
    ]
  },
  {
    number: 2,
    date: "2026-01-20",
    dayOfWeek: "Tuesday",
    title: "Arrival",
    location: "Lucerne",
    hotel: "lucerne",
    summary: "Land in Zürich, train to Lucerne, LILU Light Festival",
    highlight: "LILU Light Festival (Night 1)",
    schedule: [
      { time: "12:05", activity: "Arrive Zürich Airport", type: "flight", details: "Clear customs, find train station" },
      { time: "~13:30", activity: "Train to Lucerne", type: "transport", details: "~1 hour journey, frequent departures" },
      { time: "~14:30", activity: "Arrive Lucerne, walk to hotel", type: "arrival", details: "5 min walk from station" },
      { time: "15:00", activity: "Check into Hotel Schweizerhof", type: "hotel" },
      { time: "15:30", activity: "Rest or light Old Town walk", type: "flexible", details: "Jet-lagged - keep it easy" },
      { time: "18:00-22:00", activity: "LILU Light Festival", type: "event", details: "Walk illuminated Old Town - free" }
    ],
    meals: {
      lunch: "Train station or quick Old Town bite",
      dinner: "Old Town - fondue or traditional Swiss"
    },
    weather: "LILU runs rain or shine - bring umbrella"
  },
  {
    number: 3,
    date: "2026-01-21",
    dayOfWeek: "Wednesday",
    title: "Lucerne",
    location: "Lucerne",
    hotel: "lucerne",
    summary: "Full day to explore, LILU final night",
    highlight: "LILU Light Festival (Final Night)",
    options: [
      {
        name: "Museum of Transport",
        description: "Switzerland's most-visited museum plus Swiss Chocolate Adventure ride",
        duration: "3-4 hours",
        price: "CHF 37/pp (free with Swiss Pass)",
        weather: "Any",
        best_for: "If jet-lagged or weather is poor"
      },
      {
        name: "Mount Pilatus",
        description: "Cable car from Kriens to 2,128m summit with panoramic views",
        duration: "4-5 hours",
        price: "CHF 72/pp (50% off with Swiss Pass)",
        weather: "Clear only",
        best_for: "If skies are blue"
      },
      {
        name: "Old Town + Lake Cruise",
        description: "Musegg Wall towers, Jesuit Church, 1-hour panoramic cruise",
        duration: "4-5 hours",
        price: "CHF 30-50/pp for cruise",
        weather: "Partial",
        best_for: "Relaxed exploration"
      }
    ],
    schedule: [
      { time: "07:00-10:30", activity: "Breakfast at hotel", type: "meal" },
      { time: "10:00", activity: "Choose daytime activity", type: "flexible" },
      { time: "18:00-22:00", activity: "LILU Light Festival - Final Night", type: "event", details: "Last chance for installations" }
    ],
    meals: {
      breakfast: "Included at hotel",
      lunch: "Depends on activity",
      dinner: "Wirtshaus Galliker, Rathaus Brauerei, or Old Swiss House"
    }
  },
  {
    number: 4,
    date: "2026-01-22",
    dayOfWeek: "Thursday",
    title: "Rigi",
    location: "Rigi Kaltbad",
    hotel: "rigi",
    summary: "Travel to mountaintop spa, afternoon in thermal baths",
    highlight: "Mineralbad & Spa",
    alert: {
      type: "warning",
      title: "Weggis cable car CLOSED",
      message: "Take boat to Vitznau instead, then cogwheel train up. More scenic anyway."
    },
    schedule: [
      { time: "07:00-10:30", activity: "Breakfast, last Lucerne stroll", type: "meal" },
      { time: "~11:00", activity: "Check out, head to boat pier", type: "departure" },
      { time: "~11:30", activity: "Boat to Vitznau", type: "transport", details: "60 min scenic lake cruise" },
      { time: "~12:30", activity: "Cogwheel train to Rigi Kaltbad", type: "transport", details: "20-30 min climb" },
      { time: "~13:00", activity: "Arrive Rigi Kaltbad, drop bags at hotel", type: "arrival" },
      { time: "From 10:00", activity: "Mineralbad & Spa access", type: "activity", details: "Mario Botta thermal baths, indoor/outdoor pools" },
      { time: "15:00", activity: "Official check-in", type: "hotel" },
      { time: "Evening", activity: "Dinner at hotel restaurant", type: "meal", details: "Limited options on mountain - hotel is excellent" }
    ],
    tips: [
      "Spa towels provided, bring slippers or buy at reception (CHF 6.50)",
      "Hotel guest card = 50% off Rigi trains",
      "Fog often sits below - you may be above the clouds"
    ]
  },
  {
    number: 5,
    date: "2026-01-23",
    dayOfWeek: "Friday",
    title: "Grindelwald",
    location: "Grindelwald",
    hotel: "grindelwald",
    summary: "Journey to the Alps, World Snow Festival",
    highlight: "World Snow Festival",
    schedule: [
      { time: "Morning", activity: "Breakfast with mountain views, optional spa", type: "flexible" },
      { time: "11:00", activity: "Check out (can use spa all day)", type: "departure" },
      { time: "~11:30", activity: "Cogwheel down to Vitznau", type: "transport" },
      { time: "Via Lucerne", activity: "Train to Interlaken, then Grindelwald", type: "transport", details: "~3 hours total" },
      { time: "~15:00", activity: "Arrive Grindelwald, check into Bergwelt", type: "hotel" },
      { time: "Late afternoon", activity: "World Snow Festival at Bärplatz", type: "event", details: "2 min from station, free" },
      { time: "Evening", activity: "Snow sculptures illuminated", type: "event" }
    ],
    nightSledding: {
      available: true,
      note: "Friday night sledding available - call by 2pm if interested",
      phone: "+41 33 854 16 16"
    }
  },
  {
    number: 6,
    date: "2026-01-24",
    dayOfWeek: "Saturday",
    title: "Adventure",
    location: "Grindelwald",
    hotel: "grindelwald",
    summary: "First Gondola or Jungfraujoch, night sledding",
    highlight: "Night Sledding + Fondue",
    critical: {
      title: "Book night sledding by 2pm",
      phone: "+41 33 854 16 16",
      details: "Meet 18:30 at bus parking. CHF 70/pp includes bus, fondue, sled."
    },
    options: [
      {
        name: "First Adventure",
        description: "Gondola up to 2,168m, Cliff Walk (free), optional First Flyer zipline",
        duration: "Morning",
        price: "CHF 72/pp gondola + CHF 31 zipline",
        weather: "Clear preferred",
        best_for: "Adventure without full-day commitment"
      },
      {
        name: "Jungfraujoch",
        description: "Top of Europe at 3,454m - highest railway station in Europe",
        duration: "Full day",
        price: "CHF 201/pp (25% off with Swiss Pass)",
        weather: "CLEAR ONLY",
        best_for: "Once-in-a-lifetime, if weather perfect",
        warning: "Check webcams at jungfrau.ch before going"
      },
      {
        name: "Relaxed Day",
        description: "Village exploration, Snow Festival (last day), save energy for sledding",
        duration: "Flexible",
        price: "Free",
        weather: "Any",
        best_for: "If tired or weather poor"
      }
    ],
    schedule: [
      { time: "Morning", activity: "Breakfast, then choose activity", type: "flexible" },
      { time: "BY 14:00", activity: "BOOK NIGHT SLEDDING", type: "critical", details: "Call +41 33 854 16 16" },
      { time: "Afternoon", activity: "World Snow Festival - Final Day", type: "event" },
      { time: "18:30", activity: "Meet for night sledding at bus parking", type: "activity" },
      { time: "18:50", activity: "Bus to Bussalp", type: "transport" },
      { time: "~19:30", activity: "Fondue dinner at Bussalp restaurant", type: "meal" },
      { time: "~21:00", activity: "Sled 4.5km down in the dark", type: "activity", details: "Headlamps provided, stars above" }
    ]
  },
  {
    number: 7,
    date: "2026-01-25",
    dayOfWeek: "Sunday",
    title: "The Evening",
    location: "Grindelwald",
    hotel: "grindelwald",
    summary: "Relaxed day, Fondue Gondola at 4pm",
    highlight: "Fondue Gondola (Booked)",
    isSpecial: true,
    booked: {
      name: "Fondue Gondola",
      time: "16:00",
      location: "Hotel Belvedere, Dorfstrasse 53",
      confirmation: "5093",
      description: "Private fondue dinner in vintage Männlichen gondola cabin",
      duration: "~1 hour 45 minutes",
      note: "Arrive 15 min early"
    },
    schedule: [
      { time: "Morning", activity: "Sleep in after sledding", type: "flexible" },
      { time: "Midday", activity: "Light walk, village coffee", type: "flexible" },
      { time: "15:45", activity: "Walk to Hotel Belvedere", type: "departure" },
      { time: "16:00", activity: "Fondue Gondola", type: "booked", details: "Confirmation #5093" },
      { time: "~17:45", activity: "Finish, walk back", type: "flexible" },
      { time: "Evening", activity: "Light drinks or just a walk", type: "flexible", details: "You will be full" }
    ],
    tips: [
      "Light lunch - save appetite for fondue",
      "Pack tonight - tomorrow you head to Zürich"
    ]
  },
  {
    number: 8,
    date: "2026-01-26",
    dayOfWeek: "Monday",
    title: "Zürich",
    location: "Zürich",
    hotel: "zurich",
    summary: "Final day in Switzerland, Old Town exploration",
    highlight: "Zürich Old Town",
    schedule: [
      { time: "Morning", activity: "Breakfast, pack, checkout", type: "departure" },
      { time: "~10:00", activity: "Train to Zürich", type: "transport", details: "~2.5 hours via Interlaken" },
      { time: "~12:30", activity: "Arrive Zürich HB, check into hotel", type: "hotel", details: "Hotel is next to station" },
      { time: "14:00", activity: "Official check-in", type: "hotel" },
      { time: "Afternoon", activity: "Old Town walk", type: "activity", details: "Bahnhofstrasse → Lindenhof → churches → Niederdorf" },
      { time: "Evening", activity: "Final dinner in Switzerland", type: "meal" }
    ],
    walkingRoute: [
      "Bahnhofstrasse (shopping street)",
      "Lindenhof (viewpoint)",
      "St. Peter's Church (largest clock face in Europe)",
      "Fraumünster (Chagall windows)",
      "Grossmünster (climb towers for view)",
      "Niederdorf (charming pedestrian streets)"
    ]
  },
  {
    number: 9,
    date: "2026-01-27",
    dayOfWeek: "Tuesday",
    title: "Home",
    location: "Zürich → Newark",
    hotel: null,
    summary: "Departure day - tight timeline",
    alert: {
      type: "critical",
      title: "TIGHT TIMELINE",
      message: "Flight at 1:00pm. Leave hotel by 9:30am. Train to airport is 12 min."
    },
    schedule: [
      { time: "07:30-08:30", activity: "Breakfast at hotel", type: "meal" },
      { time: "08:30-09:00", activity: "Optional quick walk or pack", type: "flexible", options: ["Lindenhof viewpoint", "Sprüngli chocolates"] },
      { time: "09:30", activity: "Checkout hotel", type: "departure" },
      { time: "09:45", activity: "Train Zürich HB → Airport", type: "transport", details: "12 min, every 5-10 min" },
      { time: "10:00", activity: "Arrive airport, check in", type: "airport" },
      { time: "13:00", activity: "Flight departs ZRH", type: "flight" },
      { time: "18:25", activity: "Arrive Newark (EWR)", type: "arrival" }
    ],
    tips: [
      "Grab Sprüngli chocolates at airport if you missed them",
      "Train to airport runs constantly - don't stress"
    ]
  }
]

export default days
