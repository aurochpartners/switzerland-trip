// Generate Google Maps URL from address
// Works on all devices - opens maps app on mobile, Google Maps in browser on desktop

export function getMapsUrl(address, label = '') {
  const query = encodeURIComponent(label ? `${label}, ${address}` : address)
  return `https://maps.google.com/?q=${query}`
}

// Pre-defined locations for quick access
export const locations = {
  // Hotels
  schweizerhofLuzern: {
    name: 'Hotel Schweizerhof Luzern',
    address: 'Schweizerhofquai 3, 6002 Luzern, Switzerland',
    url: 'https://maps.google.com/?q=Hotel+Schweizerhof+Luzern,+Schweizerhofquai+3,+6002+Luzern'
  },
  rigiKaltbad: {
    name: 'Hotel Rigi Kaltbad',
    address: 'Zentrum 4, 6356 Rigi Kaltbad, Switzerland',
    url: 'https://maps.google.com/?q=Hotel+Rigi+Kaltbad,+Zentrum+4,+6356+Rigi+Kaltbad'
  },
  bergwelt: {
    name: 'Bergwelt Grindelwald',
    address: 'Bergwelt 4, CH-3818 Grindelwald, Switzerland',
    url: 'https://maps.google.com/?q=Bergwelt+Grindelwald,+3818+Grindelwald'
  },
  schweizerhofZurich: {
    name: 'Hotel Schweizerhof Zürich',
    address: 'Bahnhofsplatz 7, 8001 Zürich, Switzerland',
    url: 'https://maps.google.com/?q=Hotel+Schweizerhof+Zürich,+Bahnhofsplatz+7,+8001+Zürich'
  },
  
  // Activities
  fondueGondola: {
    name: 'Fondue Gondola - Hotel Belvedere',
    address: 'Dorfstrasse 53, 3818 Grindelwald, Switzerland',
    url: 'https://maps.google.com/?q=Hotel+Belvedere+Grindelwald,+Dorfstrasse+53,+3818+Grindelwald'
  },
  
  // Transport
  zurichAirport: {
    name: 'Zürich Airport (ZRH)',
    address: 'Zürich Airport, Switzerland',
    url: 'https://maps.google.com/?q=Zürich+Airport+ZRH'
  },
  lucernStation: {
    name: 'Lucerne Train Station',
    address: 'Bahnhofplatz, 6003 Luzern',
    url: 'https://maps.google.com/?q=Luzern+Train+Station'
  },
  vitznau: {
    name: 'Vitznau (Boat & Cogwheel)',
    address: 'Vitznau, Switzerland',
    url: 'https://maps.google.com/?q=Vitznau+Schiffstation'
  },
  grindelwaldStation: {
    name: 'Grindelwald Train Station',
    address: 'Grindelwald, Switzerland',
    url: 'https://maps.google.com/?q=Grindelwald+Bahnhof'
  },
  
  // Landmarks
  chapelBridge: {
    name: 'Chapel Bridge (Kapellbrücke)',
    address: 'Lucerne, Switzerland',
    url: 'https://maps.google.com/?q=Kapellbrücke+Lucerne'
  },
  fraumunster: {
    name: 'Fraumünster Church',
    address: 'Münsterhof 2, 8001 Zürich',
    url: 'https://maps.google.com/?q=Fraumünster+Zürich'
  },
  grossmunster: {
    name: 'Grossmünster',
    address: 'Grossmünsterplatz, 8001 Zürich',
    url: 'https://maps.google.com/?q=Grossmünster+Zürich'
  }
}

export default { getMapsUrl, locations }
