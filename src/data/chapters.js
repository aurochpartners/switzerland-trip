// Chapter-based content for the Winter Journey
// Transformed from bookings.json and itinerary-skeleton.json

export const tripInfo = {
  title: 'Switzerland',
  subtitle: 'Ray & Katie',
  dates: 'January 19-27, 2026',
  nights: 7
}

export const destinations = [
  { id: 'lucerne', name: 'Lucerne', dates: 'Jan 20-22' },
  { id: 'rigi', name: 'Rigi', dates: 'Jan 22-23' },
  { id: 'grindelwald', name: 'Grindelwald', dates: 'Jan 23-26' },
  { id: 'zurich', name: 'Zürich', dates: 'Jan 26-27' }
]

export const chapters = [
  {
    id: 'beginning',
    number: 1,
    title: 'The Beginning',
    location: 'Newark',
    mood: 'Anticipation',
    date: 'Monday, January 19',
    image: 'https://images.unsplash.com/photo-1436491865332-7c912a4589a7?w=1200&q=80',
    summary: 'The journey starts tonight.',
    content: {
      intro: 'An evening flight from Newark, a connection through Reykjavik, and by tomorrow you'll be in the Alps.',
      flight: {
        departure: '7:35 PM',
        airport: 'Newark Liberty (EWR)',
        arrival: '12:05 PM +1 day',
        destination: 'Zürich (ZRH)',
        numbers: 'FI622 / FI568'
      },
      tips: [
        'Passports ready, adapters packed',
        'Download offline maps of Switzerland',
        'Try to sleep on the plane—you land at noon Swiss time'
      ]
    }
  },
  {
    id: 'city-of-lights',
    number: 2,
    title: 'City of Lights',
    location: 'Lucerne',
    mood: 'Enchanting',
    date: 'January 20-22',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=1200&q=80',
    summary: 'Two nights in Lucerne during the LILU Light Festival.',
    content: {
      intro: 'You arrive jet-lagged but excited. A quick train from Zürich delivers you to one of Switzerland's most beautiful lakeside cities—and it happens to be glowing with light installations.',
      hotel: {
        name: 'Hotel Schweizerhof Luzern',
        confirmation: '18387J104610',
        phone: '+41 41 410 04 10',
        address: 'Schweizerhofquai 3, 6002 Luzern',
        checkIn: '3:00 PM',
        checkOut: '12:00 PM',
        room: 'Lifestyle Junior Suite',
        includes: ['Breakfast', 'Spa access', 'WiFi']
      },
      highlights: [
        {
          title: 'LILU Light Festival',
          time: '6:00 PM - 10:00 PM',
          description: 'The Old Town transforms with light installations. Walk the illuminated streets both nights—it's free and magical.',
          dates: 'January 20-21 (final nights)'
        }
      ],
      activities: [
        {
          name: 'Chapel Bridge & Old Town',
          note: 'The iconic covered bridge, Water Tower, and cobblestone alleys'
        },
        {
          name: 'Museum of Transport',
          note: 'Switzerland's most-visited museum. Interactive, fun, great for a jet-lag day.'
        },
        {
          name: 'Mount Pilatus',
          note: 'Cable car to the summit—only if weather is clear'
        }
      ],
      dining: [
        'Wirtshaus Galliker - Traditional Lucerne cuisine',
        'Old Swiss House - Famous for tableside schnitzel',
        'Rathaus Brauerei - Great rösti and house beer'
      ]
    }
  },
  {
    id: 'above-clouds',
    number: 3,
    title: 'Above the Clouds',
    location: 'Rigi Kaltbad',
    mood: 'Serene',
    date: 'January 22-23',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&q=80',
    summary: 'A mountaintop spa retreat with views that stretch forever.',
    content: {
      intro: 'You leave the lake behind and ascend by boat and cogwheel train to a village perched 1,450 meters up. Below, fog often blankets the valleys while you soak in warm mineral water under clear skies.',
      hotel: {
        name: 'Hotel Rigi Kaltbad',
        confirmation: '24077UID9835',
        phone: '+41 41 399 81 81',
        address: 'Zentrum 4, 6356 Rigi Kaltbad',
        checkIn: '3:00 PM',
        checkOut: '11:00 AM',
        room: 'Superior Double with Balcony',
        includes: ['Breakfast', 'Mineralbad & Spa', '50% off Rigi trains', 'WiFi']
      },
      alert: {
        title: 'Weggis route closed',
        message: 'Take the boat to Vitznau, then cogwheel train up. More scenic anyway.'
      },
      highlights: [
        {
          title: 'Mineralbad & Spa',
          time: 'Access from 10:00 AM',
          description: 'Mario Botta-designed thermal baths. Indoor pool flows to an outdoor infinity pool with mountain views. Bring slippers or buy at reception.'
        }
      ],
      route: {
        from: 'Lucerne',
        to: 'Rigi Kaltbad',
        steps: [
          { mode: 'Boat', from: 'Lucerne', to: 'Vitznau', duration: '60 min' },
          { mode: 'Cogwheel', from: 'Vitznau', to: 'Rigi Kaltbad', duration: '30 min' }
        ],
        note: 'Your hotel guest card gives 50% off the trains'
      }
    }
  },
  {
    id: 'into-alps',
    number: 4,
    title: 'Into the Alps',
    location: 'Grindelwald',
    mood: 'Majestic',
    date: 'January 23',
    image: 'https://images.unsplash.com/photo-1476067897447-d0c5df27b5df?w=1200&q=80',
    summary: 'The Eiger appears. You've arrived in the heart of the Bernese Alps.',
    content: {
      intro: 'A scenic three-hour journey delivers you to a village in the shadow of the Eiger's north face. The World Snow Festival fills the main square with ice sculptures that glow after dark.',
      hotel: {
        name: 'Bergwelt Grindelwald',
        confirmation: '2025123145141944',
        phone: '+41 33 854 85 85',
        address: 'Bergwelt 4, CH-3818 Grindelwald',
        checkIn: '3:00 PM',
        checkOut: '11:00 AM',
        room: 'Luxury Room with Eiger View',
        includes: ['Breakfast buffet'],
        optional: 'Fire & Ice Spa - CHF 35/person, 90 min'
      },
      highlights: [
        {
          title: 'World Snow Festival',
          time: 'Through January 24',
          description: 'Ice and snow sculptures at Bärplatz, two minutes from the station. They light up beautifully after sunset.'
        }
      ],
      route: {
        from: 'Rigi Kaltbad',
        to: 'Grindelwald',
        duration: '~3.5 hours',
        note: 'Via Lucerne and Interlaken. Consider lunch in Interlaken.'
      }
    }
  },
  {
    id: 'adventure',
    number: 5,
    title: 'Adventure',
    location: 'Grindelwald',
    mood: 'Exhilarating',
    date: 'January 24',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80',
    summary: 'Gondolas, cliff walks, and night sledding under the stars.',
    content: {
      intro: 'Today is for adventure. Take the gondola up to First for the cliff walk and zipline, or save your energy for tonight—when you'll sled 4.5 kilometers down a moonlit mountain after fondue.',
      reminder: {
        title: 'Book night sledding before 2 PM',
        phone: '+41 33 854 16 16',
        details: 'Meet at 6:30 PM at the bus parking. CHF 70 per person includes bus up, fondue dinner, sled rental, and headlamp.'
      },
      activities: [
        {
          name: 'First Gondola',
          description: 'Up to 2,168m. The Cliff Walk is free. First Flyer zipline is CHF 31.',
          note: '50% off gondola with Swiss Pass'
        },
        {
          name: 'Jungfraujoch',
          description: 'Top of Europe at 3,454m. Only worth it on clear days—check webcams first.',
          note: 'CHF 201 (25% off with Swiss Pass)'
        }
      ],
      highlights: [
        {
          title: 'Night Sledding at Bussalp',
          time: 'Meet 6:30 PM',
          description: 'Bus winds up the mountain. Fondue dinner in a cozy restaurant. Then you sled down in the dark with headlamps, stars above, snow all around.'
        }
      ]
    }
  },
  {
    id: 'the-evening',
    number: 6,
    title: 'The Evening',
    location: 'Grindelwald',
    mood: 'Romantic',
    date: 'January 25',
    image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=1200&q=80',
    summary: 'A private fondue dinner in a vintage gondola cabin.',
    isSpecial: true,
    content: {
      intro: 'This is the day you've been waiting for. A relaxed morning, a light afternoon, and then—at 4 o'clock—a table for two in a gondola cabin, suspended in the alpine air, with fondue bubbling between you.',
      highlight: {
        title: 'Fondue Gondola',
        time: '4:00 PM',
        location: 'Hotel Belvedere, Grindelwald',
        duration: 'About 1 hour 45 minutes',
        description: 'A vintage Männlichen gondola cabin, just for the two of you. Cheese fondue, wine, and the Eiger as your backdrop. The cabin is stationary but the moment isn't.'
      },
      dayPlan: [
        { time: 'Morning', activity: 'Sleep in. You earned it.' },
        { time: 'Midday', activity: 'Light walk through the village, maybe a coffee.' },
        { time: '4:00 PM', activity: 'Fondue Gondola' },
        { time: 'Evening', activity: 'You'll be full. Just a walk, maybe a drink.' }
      ],
      note: 'Pack tonight—tomorrow you head to Zürich.'
    }
  },
  {
    id: 'until-next-time',
    number: 7,
    title: 'Until Next Time',
    location: 'Zürich',
    mood: 'Bittersweet',
    date: 'January 26-27',
    image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=1200&q=80',
    summary: 'One night in the city, then home.',
    content: {
      intro: 'The mountains recede as the train carries you toward Zürich. One final night in Switzerland—time for the Old Town, a special dinner, and quiet gratitude for everything you've seen.',
      hotel: {
        name: 'Hotel Schweizerhof Zürich',
        confirmation: '2025123145141911',
        phone: '+41 44 218 88 88',
        address: 'Bahnhofsplatz 7, 8001 Zürich',
        checkIn: '2:00 PM',
        checkOut: '12:00 PM',
        room: 'Standard Double',
        includes: ['Breakfast'],
        note: 'Right next to the train station'
      },
      walkingRoute: [
        'Bahnhofstrasse',
        'Lindenhof viewpoint',
        'St. Peter's Church',
        'Fraumünster (Chagall windows)',
        'Grossmünster towers',
        'Niederdorf quarter'
      ],
      departure: {
        date: 'Tuesday, January 27',
        warning: 'Tight timeline',
        flight: '1:00 PM',
        leaveHotel: '9:30 AM',
        trainToAirport: '12 minutes',
        tips: [
          'Breakfast at the hotel (included)',
          'Train to airport leaves every 5-10 minutes',
          'Grab Sprüngli chocolates at the airport'
        ]
      }
    }
  }
]

export const emergencyNumbers = {
  general: '112',
  police: '117',
  ambulance: '144',
  fire: '118'
}

export const quickFacts = {
  currency: 'CHF (≈ $1.10 USD)',
  plugs: 'Type J (3 round pins)',
  tipping: 'Not expected',
  water: 'Tap water is excellent',
  hello: 'Grüezi',
  thanks: 'Merci / Danke'
}
