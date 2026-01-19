// Comprehensive activity database for Switzerland trip
// All prices in CHF, verified January 2026

export const activities = {
  lucerne: [
    {
      id: 'lilu-festival',
      name: 'LILU Light Festival',
      description: 'Light art installations throughout Old Town and lake basin. Walk the illuminated streets after dark.',
      price: { regular: 0, withPass: 0 },
      duration: '2-3 hours',
      weather: 'any',
      dates: { start: '2026-01-15', end: '2026-01-25' },
      hours: '18:00 - 22:00',
      yourDates: ['2026-01-20', '2026-01-21'],
      category: 'event',
      links: {
        website: 'https://lichtfestivalluzern.ch',
        tickets: 'https://lichtfestivalluzern.ch/en/tickets'
      },
      tips: ['Runs rain or shine', 'Magical in rain with reflections', 'Free outdoor viewing'],
      bookingRequired: false
    },
    {
      id: 'museum-transport',
      name: 'Museum of Transport',
      description: 'Switzerland\'s most-visited museum. Interactive exhibits on trains, planes, cars, and space.',
      price: { regular: 37, withPass: 0 },
      duration: '3-4 hours',
      weather: 'any',
      hours: '10:00 - 17:00',
      category: 'museum',
      links: {
        website: 'https://www.verkehrshaus.ch/en',
        tickets: 'https://www.verkehrshaus.ch/en/tickets'
      },
      addOns: [
        { name: 'Swiss Chocolate Adventure', price: 18, duration: '45 min', firstRide: '11:00', lastRide: '16:20' }
      ],
      tips: ['Great for jet-lag day', 'Planetarium shows included', 'Film theatre included'],
      bookingRequired: false
    },
    {
      id: 'pilatus',
      name: 'Mount Pilatus',
      description: 'Cable car from Kriens to 2,128m summit. Panoramic views of Alps and lakes.',
      price: { regular: 72, withPass: 36 },
      duration: '4-5 hours',
      weather: 'clear',
      category: 'mountain',
      links: {
        website: 'https://www.pilatus.ch/en',
        webcams: 'https://www.pilatus.ch/en/discover/webcams',
        tickets: 'https://www.pilatus.ch/en/tickets-prices'
      },
      winterNote: 'Only cable car from Kriens operates in winter. Golden Round Trip not available.',
      tips: ['Check webcams before going', '50% off with Swiss Pass', 'Restaurant at summit'],
      bookingRequired: false
    },
    {
      id: 'titlis',
      name: 'Mount Titlis',
      description: 'Glacier excursion from Engelberg. Rotating cable car, ice cave, cliff walk.',
      price: { regular: 96, withPass: 48 },
      duration: '5-6 hours',
      weather: 'clear',
      category: 'mountain',
      travelTime: '45 min train from Lucerne to Engelberg',
      links: {
        website: 'https://www.titlis.ch/en',
        webcams: 'https://www.titlis.ch/en/titlis/live-info',
        tickets: 'https://www.titlis.ch/en/tickets-prices'
      },
      includes: ['Rotair rotating gondola', 'Glacier cave', 'Cliff walk', 'Ice Flyer chair lift'],
      tips: ['Dress very warm', 'Altitude: 3,238m', 'Can feel altitude effects'],
      bookingRequired: false
    },
    {
      id: 'lake-cruise',
      name: 'Lake Lucerne Cruise',
      description: 'Panoramic boat cruise on Lake Lucerne with mountain views.',
      price: { regular: 40, withPass: 0 },
      duration: '1-2 hours',
      weather: 'any',
      category: 'cruise',
      links: {
        website: 'https://www.lakelucerne.ch/en',
        timetable: 'https://www.lakelucerne.ch/en/cruises/timetable'
      },
      options: [
        { name: '1-hour panoramic cruise', price: 30 },
        { name: '2-hour lunch cruise', price: 70 }
      ],
      tips: ['Free with Swiss Pass', 'Runs in all weather', 'Indoor and outdoor seating'],
      bookingRequired: false
    },
    {
      id: 'glacier-garden',
      name: 'Glacier Garden',
      description: 'Ice age geology, glacier potholes, mirror maze. Unique natural monument.',
      price: { regular: 22, withPass: 0 },
      duration: '1-2 hours',
      weather: 'any',
      category: 'museum',
      links: {
        website: 'https://www.gletschergarten.ch/en',
        tickets: 'https://www.gletschergarten.ch/en/tickets'
      },
      tips: ['Near Lion Monument', 'Mirror maze is fun', 'Free with Swiss Pass'],
      bookingRequired: false
    },
    {
      id: 'rosengart',
      name: 'Rosengart Collection',
      description: 'World-class Picasso and Paul Klee collection in intimate setting.',
      price: { regular: 20, withPass: 0 },
      duration: '1-2 hours',
      weather: 'any',
      category: 'museum',
      links: {
        website: 'https://www.rosengart.ch/en'
      },
      tips: ['Free with Swiss Pass', 'Small but exceptional', 'Good for art lovers'],
      bookingRequired: false
    },
    {
      id: 'fondue-carriage',
      name: 'Fondue Carriage Ride',
      description: 'Horse-drawn carriage through illuminated Lucerne with fondue dinner.',
      price: { regular: 98, withPass: 98 },
      duration: '2 hours',
      weather: 'any',
      category: 'dining',
      provider: 'Zunfthaus Pfistern',
      schedule: { mulledWine: '18:30', carriageDeparts: '19:00' },
      links: {
        website: 'https://www.zunfthauspfistern.ch',
        phone: '+41 41 410 36 50'
      },
      includes: ['Mulled wine', 'Carriage ride', 'Fondue', 'Dessert', 'Drinks'],
      tips: ['Book in advance', 'Romantic option', 'Alternative to saving fondue for Grindelwald'],
      bookingRequired: true
    },
    {
      id: 'chapel-bridge',
      name: 'Chapel Bridge & Old Town',
      description: 'Iconic covered bridge, Water Tower, medieval alleys, Jesuit Church.',
      price: { regular: 0, withPass: 0 },
      duration: '2-3 hours',
      weather: 'any',
      category: 'walking',
      links: {
        map: 'https://maps.app.goo.gl/chapel-bridge-lucerne'
      },
      highlights: ['Chapel Bridge (Kapellbrücke)', 'Water Tower', 'Jesuit Church', 'Lion Monument', 'Musegg Wall towers'],
      tips: ['Free to explore', 'Best at golden hour', 'Climb Musegg Wall towers for views'],
      bookingRequired: false
    }
  ],
  
  rigi: [
    {
      id: 'mineralbad-spa',
      name: 'Mineralbad & Spa',
      description: 'Mario Botta-designed thermal baths with indoor/outdoor pools and Alpine views.',
      price: { regular: 0, withPass: 0, note: 'Included with hotel stay' },
      duration: 'Unlimited',
      weather: 'any',
      category: 'spa',
      hours: 'From 10:00 on arrival day',
      links: {
        website: 'https://www.mineralbad-rigikaltbad.ch/en'
      },
      features: ['35°C mineral water', 'Indoor pool', 'Outdoor infinity pool', 'Sauna', 'Steam bath'],
      tips: ['Bring slippers or buy at reception (CHF 6.50)', 'Bathrobes provided', 'Access continues on checkout day'],
      bookingRequired: false
    },
    {
      id: 'rigi-kulm',
      name: 'Rigi Kulm Summit',
      description: 'Highest point on Rigi at 1,798m. Panoramic views of Alps and lakes.',
      price: { regular: 20, withPass: 0, withHotelCard: 10 },
      duration: '2-3 hours',
      weather: 'clear',
      category: 'mountain',
      transport: 'Cogwheel train from Rigi Kaltbad (10 min)',
      links: {
        website: 'https://www.rigi.ch/en',
        timetable: 'https://www.rigi.ch/en/plan/timetables'
      },
      tips: ['Hotel guest card gives 50% off', 'Famous for sunrise', 'Restaurant at summit'],
      bookingRequired: false
    },
    {
      id: 'rigi-hiking',
      name: 'Winter Hiking on Rigi',
      description: 'Prepared winter walking trails with mountain views.',
      price: { regular: 0, withPass: 0 },
      duration: '1-3 hours',
      weather: 'any',
      category: 'hiking',
      links: {
        trails: 'https://www.rigi.ch/en/explore/winter-hiking'
      },
      trails: [
        { name: 'Rigi Kaltbad circular', duration: '1 hour', difficulty: 'Easy' },
        { name: 'Kaltbad to Kulm', duration: '1.5 hours', difficulty: 'Moderate' }
      ],
      tips: ['Wear sturdy shoes', 'Trails are cleared', 'Views of fog below on clear days'],
      bookingRequired: false
    }
  ],
  
  grindelwald: [
    {
      id: 'first-gondola',
      name: 'First Gondola + Cliff Walk',
      description: 'Gondola to 2,168m with spectacular cliff walk over the void.',
      price: { regular: 72, withPass: 36 },
      duration: '3-4 hours',
      weather: 'clear',
      category: 'mountain',
      links: {
        website: 'https://www.grindelwaldfirst.ch/en',
        webcams: 'https://www.jungfrau.ch/en-gb/live/webcams/',
        tickets: 'https://www.jungfrau.ch/en-gb/grindelwaldfirst/'
      },
      includes: ['Cliff Walk (free with gondola)'],
      tips: ['50% off with Swiss Pass', 'Cliff Walk is thrilling but safe', 'Restaurant at First'],
      bookingRequired: false
    },
    {
      id: 'first-flyer',
      name: 'First Flyer',
      description: '84 km/h zipline from First summit. 800m long, eagle-eye view.',
      price: { regular: 31, withPass: 31 },
      duration: '5 minutes',
      weather: 'clear',
      category: 'adventure',
      links: {
        website: 'https://www.grindelwaldfirst.ch/en/first-flyer',
        tickets: 'https://www.jungfrau.ch/en-gb/grindelwaldfirst/'
      },
      tips: ['No Swiss Pass discount', 'Book at First station', 'Weight limit: 35-125kg'],
      bookingRequired: false
    },
    {
      id: 'first-glider',
      name: 'First Glider',
      description: 'Hang-glider style panoramic flight experience.',
      price: { regular: 31, withPass: 31 },
      duration: '5 minutes',
      weather: 'clear',
      category: 'adventure',
      links: {
        website: 'https://www.grindelwaldfirst.ch/en/first-glider'
      },
      tips: ['No Swiss Pass discount', '4 people fly together', 'Incredible views'],
      bookingRequired: false
    },
    {
      id: 'jungfraujoch',
      name: 'Jungfraujoch - Top of Europe',
      description: 'Highest railway station in Europe at 3,454m. Glacier views, ice palace, Sphinx observatory.',
      price: { regular: 201, withPass: 149 },
      duration: '5-6 hours',
      weather: 'clear-only',
      category: 'mountain',
      links: {
        website: 'https://www.jungfrau.ch/en-gb/jungfraujoch-top-of-europe/',
        webcams: 'https://www.jungfrau.ch/en-gb/live/webcams/',
        tickets: 'https://www.jungfrau.ch/en-gb/jungfraujoch-top-of-europe/prices/',
        timetable: 'https://www.jungfrau.ch/en-gb/jungfraujoch-top-of-europe/travel-information/'
      },
      route: 'Eiger Express gondola from Grindelwald (45 min to top)',
      includes: ['Sphinx Observatory', 'Ice Palace', 'Alpine Sensation', 'Lindt Swiss Chocolate Heaven'],
      tips: ['ONLY GO IF CLEAR - check webcams', '25% off with Swiss Pass', 'Altitude can affect some people', 'Dress very warm'],
      bookingRequired: false,
      critical: true
    },
    {
      id: 'schilthorn',
      name: 'Schilthorn - Piz Gloria',
      description: 'James Bond mountain with revolving restaurant. Alternative to Jungfraujoch.',
      price: { regular: 105, withPass: 53 },
      duration: '4-5 hours',
      weather: 'clear',
      category: 'mountain',
      links: {
        website: 'https://schilthorn.ch/en',
        webcams: 'https://schilthorn.ch/en/Info/Webcams',
        tickets: 'https://schilthorn.ch/en/Tickets/Tickets_prices'
      },
      route: 'Train to Lauterbrunnen, then cable cars via Mürren',
      includes: ['Bond World 007 exhibit', 'Piz Gloria revolving restaurant', '360° views'],
      tips: ['50% off with Swiss Pass', 'Featured in On Her Majesty\'s Secret Service', 'Less crowded than Jungfraujoch'],
      bookingRequired: false
    },
    {
      id: 'night-sledding',
      name: 'Night Sledding + Fondue at Bussalp',
      description: 'Fondue dinner then 4.5km sled descent in the dark with headlamps.',
      price: { regular: 70, withPass: 70 },
      duration: '4 hours',
      weather: 'any',
      category: 'adventure',
      availableDays: ['Friday', 'Saturday'],
      yourDates: ['2026-01-23', '2026-01-24'],
      schedule: {
        meetingTime: '18:30',
        meetingPoint: 'Grindelwald bus parking',
        busDeparts: '18:50'
      },
      links: {
        phone: '+41 33 854 16 16'
      },
      includes: ['Bus to Bussalp', 'Fondue dinner', 'Salad', 'Dessert', 'Sled rental', 'Headlamp'],
      tips: ['BOOK BY 2PM SAME DAY', 'Dress warm for descent', 'One of the trip highlights'],
      bookingRequired: true,
      bookingDeadline: '14:00 same day',
      critical: true
    },
    {
      id: 'day-sledding',
      name: 'Day Sledding at Bussalp',
      description: 'Daytime sledding on the same 4.5km run.',
      price: { regular: 25, withPass: 25 },
      duration: '2-3 hours',
      weather: 'any',
      category: 'adventure',
      links: {
        website: 'https://www.grindelwald.swiss/en/winter/sledging'
      },
      includes: ['Bus up', 'Sled rental'],
      tips: ['Good alternative if missing night sledding', 'Multiple runs possible'],
      bookingRequired: false
    },
    {
      id: 'sportzentrum',
      name: 'Sportzentrum Grindelwald',
      description: 'Indoor sports center with pool, ice rink, climbing, fitness.',
      price: { regular: 20, withPass: 20 },
      duration: '2-3 hours',
      weather: 'any',
      category: 'indoor',
      links: {
        website: 'https://www.grindelwaldsports.ch/en'
      },
      facilities: ['Swimming pool', 'Ice skating rink', 'Climbing wall', 'Sauna', 'Fitness'],
      tips: ['Perfect rain backup', 'Near village center', 'Bring swimsuit'],
      bookingRequired: false
    },
    {
      id: 'snow-festival',
      name: 'World Snow Festival',
      description: 'Ice and snow sculptures at Bärplatz, illuminated at night.',
      price: { regular: 0, withPass: 0 },
      duration: '1-2 hours',
      weather: 'any',
      dates: { start: '2026-01-19', end: '2026-01-24' },
      yourDates: ['2026-01-23', '2026-01-24'],
      location: 'Bärplatz (2 min walk from train station)',
      category: 'event',
      links: {
        website: 'https://www.grindelwald.swiss/en/winter/world-snow-festival'
      },
      tips: ['Last 2 days of festival', 'Best after dark when illuminated', 'Theme: Myths and Legends'],
      bookingRequired: false
    },
    {
      id: 'fondue-gondola',
      name: 'Fondue Gondola',
      description: 'Private fondue dinner in a vintage Männlichen gondola cabin.',
      price: { regular: 0, withPass: 0, note: 'Already booked' },
      duration: '1 hour 45 min',
      weather: 'any',
      category: 'dining',
      booked: {
        date: '2026-01-25',
        time: '16:00',
        confirmation: '5093'
      },
      location: 'Hotel Belvedere, Dorfstrasse 53, 3818 Grindelwald',
      links: {
        phone: '+41 33 888 99 99'
      },
      tips: ['Arrive 15 min early', 'Table released if late', 'Light lunch - save appetite'],
      bookingRequired: true,
      isBooked: true,
      critical: true
    },
    {
      id: 'bergwelt-spa',
      name: 'Fire & Ice Spa at Bergwelt',
      description: '90-minute spa experience at your hotel.',
      price: { regular: 35, withPass: 35 },
      duration: '90 minutes',
      weather: 'any',
      category: 'spa',
      links: {
        phone: '+41 33 854 85 85'
      },
      tips: ['Book at spa reception on arrival', 'Not included in room rate'],
      bookingRequired: true
    },
    {
      id: 'kleine-scheidegg',
      name: 'Kleine Scheidegg',
      description: 'Scenic mountain pass with Eiger north face views. Train junction.',
      price: { regular: 40, withPass: 0 },
      duration: '2-3 hours',
      weather: 'clear',
      category: 'mountain',
      links: {
        website: 'https://www.jungfrau.ch/en-gb/kleine-scheidegg/'
      },
      tips: ['Free with Swiss Pass', 'Great lunch stop', 'Incredible Eiger views', 'On way to/from Jungfraujoch'],
      bookingRequired: false
    }
  ],
  
  zurich: [
    {
      id: 'old-town-walk',
      name: 'Zürich Old Town Walk',
      description: 'Historic center with churches, river views, and charming streets.',
      price: { regular: 0, withPass: 0 },
      duration: '2-3 hours',
      weather: 'any',
      category: 'walking',
      route: [
        { stop: 'Bahnhofstrasse', note: 'Famous shopping street' },
        { stop: 'Lindenhof', note: 'Hilltop park with city views' },
        { stop: 'St. Peter\'s Church', note: 'Largest clock face in Europe' },
        { stop: 'Fraumünster', note: 'Chagall stained glass windows (CHF 5)' },
        { stop: 'Grossmünster', note: 'Climb towers for views (CHF 5, 187 steps)' },
        { stop: 'Niederdorf', note: 'Charming pedestrian streets' }
      ],
      links: {
        map: 'https://maps.app.goo.gl/zurich-old-town'
      },
      tips: ['Best route for limited time', 'End in Niederdorf for dinner'],
      bookingRequired: false
    },
    {
      id: 'grossmunster',
      name: 'Grossmünster Tower Climb',
      description: 'Climb 187 steps for panoramic city and lake views.',
      price: { regular: 5, withPass: 5 },
      duration: '30 minutes',
      weather: 'any',
      category: 'landmark',
      links: {
        website: 'https://www.grossmuenster.ch/en'
      },
      tips: ['Worth the climb', 'Best views of Old Town'],
      bookingRequired: false
    },
    {
      id: 'fraumunster',
      name: 'Fraumünster',
      description: 'Church famous for Marc Chagall\'s stunning stained glass windows.',
      price: { regular: 5, withPass: 5 },
      duration: '30 minutes',
      weather: 'any',
      category: 'landmark',
      links: {
        website: 'https://www.fraumuenster.ch/en'
      },
      tips: ['Chagall windows are spectacular', 'Quick but worthwhile visit'],
      bookingRequired: false
    },
    {
      id: 'kunsthaus',
      name: 'Kunsthaus Zürich',
      description: 'Major art museum with Impressionists, Giacometti, and contemporary art.',
      price: { regular: 23, withPass: 0 },
      duration: '2-3 hours',
      weather: 'any',
      category: 'museum',
      links: {
        website: 'https://www.kunsthaus.ch/en',
        tickets: 'https://www.kunsthaus.ch/en/visit/tickets'
      },
      tips: ['Free with Swiss Pass', 'New extension opened 2021', 'Good if you love art'],
      bookingRequired: false
    },
    {
      id: 'swiss-national-museum',
      name: 'Swiss National Museum',
      description: 'Swiss history and culture from prehistory to present.',
      price: { regular: 10, withPass: 0 },
      duration: '2 hours',
      weather: 'any',
      category: 'museum',
      location: 'Next to Zürich HB station',
      links: {
        website: 'https://www.landesmuseum.ch/en'
      },
      tips: ['Free with Swiss Pass', 'Beautiful castle-like building', 'Convenient location'],
      bookingRequired: false
    },
    {
      id: 'sprungli',
      name: 'Sprüngli at Paradeplatz',
      description: 'Legendary chocolatier and café. Famous for Luxemburgerli.',
      price: { regular: 20, withPass: 20, note: 'Depends on order' },
      duration: '30-60 minutes',
      weather: 'any',
      category: 'cafe',
      links: {
        website: 'https://www.spruengli.ch/en',
        location: 'https://maps.app.goo.gl/sprungli-paradeplatz'
      },
      tips: ['Try the Luxemburgerli', 'Great hot chocolate', 'Buy chocolates for home'],
      bookingRequired: false
    }
  ]
}

// Transport routes with links
export const transport = {
  zurichAirportToLucerne: {
    from: 'Zürich Flughafen',
    to: 'Luzern',
    duration: '60 min',
    frequency: 'Every 30 min',
    price: { regular: 31, withPass: 0 },
    links: {
      timetable: 'https://www.sbb.ch/en/timetable.html'
    }
  },
  lucerneToVitznau: {
    from: 'Luzern',
    to: 'Vitznau',
    mode: 'boat',
    duration: '60 min',
    price: { regular: 31, withPass: 0 },
    links: {
      timetable: 'https://www.lakelucerne.ch/en/cruises/timetable'
    }
  },
  vitznauToRigiKaltbad: {
    from: 'Vitznau',
    to: 'Rigi Kaltbad',
    mode: 'cogwheel train',
    duration: '30 min',
    price: { regular: 39, withPass: 0, withHotelCard: 20 },
    links: {
      timetable: 'https://www.rigi.ch/en/plan/timetables'
    }
  },
  rigiToGrindelwald: {
    from: 'Rigi Kaltbad',
    to: 'Grindelwald',
    via: 'Lucerne, Interlaken',
    duration: '3.5 hours',
    price: { regular: 112, withPass: 0 },
    links: {
      timetable: 'https://www.sbb.ch/en/timetable.html'
    }
  },
  grindelwaldToZurich: {
    from: 'Grindelwald',
    to: 'Zürich HB',
    via: 'Interlaken, Bern',
    duration: '2 hours 45 min',
    price: { regular: 75, withPass: 0 },
    links: {
      timetable: 'https://www.sbb.ch/en/timetable.html'
    }
  },
  zurichToAirport: {
    from: 'Zürich HB',
    to: 'Zürich Flughafen',
    duration: '12 min',
    frequency: 'Every 5-10 min',
    price: { regular: 7, withPass: 0 },
    links: {
      timetable: 'https://www.sbb.ch/en/timetable.html'
    }
  }
}

// Restaurant data with links
export const restaurantData = {
  lucerne: [
    {
      id: 'zunfthaus-pfistern',
      name: 'Zunfthaus Pfistern',
      cuisine: 'Traditional Swiss - fondue, raclette',
      setting: 'Historic 1578 guild house on the river',
      price: 'CHF 50-70/person',
      phone: '+41 41 410 36 50',
      links: {
        website: 'https://www.zunfthauspfistern.ch',
        maps: 'https://maps.app.goo.gl/zunfthaus-pfistern-lucerne'
      },
      reservationRecommended: true
    },
    {
      id: 'rathaus-brauerei',
      name: 'Rathaus Brauerei',
      cuisine: 'Swiss - rösti, grilled fish, house beer',
      setting: 'Brewery on Reuss River',
      price: 'CHF 35-50/person',
      links: {
        website: 'https://www.rathausbrauerei.ch',
        maps: 'https://maps.app.goo.gl/rathaus-brauerei-lucerne'
      },
      reservationRecommended: false
    },
    {
      id: 'wirtshaus-galliker',
      name: 'Wirtshaus Galliker',
      cuisine: 'Traditional Lucerne - veal liver with rösti, cheese pie',
      setting: 'Cozy, rustic, local favorite',
      price: 'CHF 40-60/person',
      links: {
        website: 'https://www.galliker.ch',
        maps: 'https://maps.app.goo.gl/wirtshaus-galliker-lucerne'
      },
      reservationRecommended: true
    },
    {
      id: 'old-swiss-house',
      name: 'Old Swiss House',
      cuisine: 'Historic - tableside Wiener Schnitzel',
      setting: 'Famous historic restaurant since 1859',
      price: 'CHF 60-80/person',
      links: {
        website: 'https://www.oldswisshouse.ch',
        maps: 'https://maps.app.goo.gl/old-swiss-house-lucerne'
      },
      reservationRecommended: true
    },
    {
      id: 'schiff-restaurant-tell',
      name: 'Schiffrestaurant Tell',
      cuisine: 'Swiss - fondue on a boat',
      setting: 'Dine on old paddle steamer',
      price: 'CHF 36/person for fondue',
      links: {
        website: 'https://www.lakelucerne.ch',
        maps: 'https://maps.app.goo.gl/schiff-tell-lucerne'
      },
      reservationRecommended: true
    }
  ],
  grindelwald: [
    {
      id: 'hotel-belvedere',
      name: 'Hotel Belvedere Restaurant',
      cuisine: 'Swiss cuisine',
      setting: 'Eiger views',
      price: 'CHF 40-60/person',
      phone: '+41 33 888 99 99',
      links: {
        website: 'https://www.belvedere-grindelwald.ch',
        maps: 'https://maps.app.goo.gl/hotel-belvedere-grindelwald'
      }
    },
    {
      id: 'barrys',
      name: 'Barry\'s',
      cuisine: 'Casual Swiss and international',
      setting: 'Village center',
      price: 'CHF 30-50/person',
      links: {
        maps: 'https://maps.app.goo.gl/barrys-grindelwald'
      }
    },
    {
      id: 'restaurant-first',
      name: 'Bergrestaurant First',
      cuisine: 'Mountain food, rösti, soup',
      setting: 'At First summit (2,168m)',
      price: 'CHF 25-40/person',
      note: 'Requires gondola ticket',
      links: {
        website: 'https://www.grindelwaldfirst.ch'
      }
    },
    {
      id: 'c-und-m',
      name: 'C und M Café',
      cuisine: 'Café, light meals',
      setting: 'Village, casual',
      price: 'CHF 15-30/person',
      links: {
        maps: 'https://maps.app.goo.gl/c-und-m-grindelwald'
      }
    }
  ],
  zurich: [
    {
      id: 'zeughauskeller',
      name: 'Zeughauskeller',
      cuisine: 'Traditional Swiss',
      setting: 'Historic arsenal building from 1487',
      price: 'CHF 30-50/person',
      links: {
        website: 'https://www.zeughauskeller.ch/en',
        maps: 'https://maps.app.goo.gl/zeughauskeller-zurich'
      }
    },
    {
      id: 'swiss-chuchi',
      name: 'Swiss Chuchi',
      cuisine: 'Fondue, raclette',
      setting: 'In Hotel Adler, Old Town',
      price: 'CHF 40-60/person',
      links: {
        website: 'https://www.hotelader.ch/en/swiss-chuchi',
        maps: 'https://maps.app.goo.gl/swiss-chuchi-zurich'
      },
      note: 'Good for final fondue if you want one more'
    },
    {
      id: 'kronenhalle',
      name: 'Kronenhalle',
      cuisine: 'Classic Swiss-French',
      setting: 'Art-filled legendary restaurant',
      price: 'CHF 70-100/person',
      links: {
        website: 'https://www.kronenhalle.ch/en',
        maps: 'https://maps.app.goo.gl/kronenhalle-zurich'
      },
      note: 'Special occasion, original Picassos on walls'
    },
    {
      id: 'sprungli-cafe',
      name: 'Confiserie Sprüngli',
      cuisine: 'Café, chocolate, pastries',
      setting: 'Legendary since 1836',
      price: 'CHF 15-30/person',
      links: {
        website: 'https://www.spruengli.ch/en',
        maps: 'https://maps.app.goo.gl/sprungli-paradeplatz'
      },
      note: 'Must try the Luxemburgerli'
    }
  ]
}

export default { activities, transport, restaurantData }
