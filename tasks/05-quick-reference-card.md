# Task 05: Quick Reference Card

## Objective
Create a single-page, printable quick reference card with all essential trip information. This is the "grab and go" document for quick lookups.

## Input Files
- `@data/bookings.json` — All confirmation numbers and contact info

## Output
- **Filename:** `outputs/Quick_Reference_Card.md`
- **Format:** Markdown (optimized for single-page PDF print)

## Design Principles
- ONE PAGE when printed
- High information density
- Scannable layout
- Most critical info prominently displayed
- No prose — just facts

## Content Sections

### Header
```
SWITZERLAND TRIP - QUICK REFERENCE
January 19-27, 2026 | Ray & Katie
```

### FLIGHTS
```
OUTBOUND: Mon Jan 19
  EWR → ZRH | Icelandair FI622/FI568
  Depart: 7:35pm | Arrive: Tue Jan 20, 12:05pm

RETURN: Tue Jan 27
  ZRH → EWR | Icelandair FI569/FI623
  Depart: 1:00pm | Arrive: 6:25pm
  ⚠️ Arrive airport by 10:00am
```

### HOTELS (Table Format)
```
| Dates | Hotel | Confirmation | Phone |
|-------|-------|--------------|-------|
| Jan 20-22 | Schweizerhof Luzern | 18387J104610 | +41 41 410 04 10 |
| Jan 22-23 | Rigi Kaltbad | 24077UID9835 | +41 41 399 81 81 |
| Jan 23-26 | Bergwelt Grindelwald | 2025123145141944 | +41 33 854 85 85 |
| Jan 26-27 | Schweizerhof Zürich | 2025123145141911 | +41 44 218 88 88 |
```

### BOOKED ACTIVITIES
```
Jan 25, 4:00pm — FONDUE GONDOLA (Grindelwald)
Jan 22 — Rigi Spa (included with hotel)
```

### BOOK ON TRIP
```
NIGHT SLEDDING: +41 33 854 16 16
  📞 Book by 2pm day-of | Fri or Sat
  Meet: 6:30pm Grindelwald bus parking
  Cost: CHF 70/pp
```

### EMERGENCY
```
General: 112 | Police: 117 | Ambulance: 144
```

### KEY PHRASES
```
Hello: Grüezi (GROO-et-see)
Thank you: Merci
The bill: D'Rächnig, bitte
```

### CRITICAL REMINDERS
```
⚠️ Weggis boat station CLOSED — use Vitznau route to Rigi
⚠️ Jan 27 flight at 1pm — train to airport by 9:45am
⚠️ Night sledding must book by 2pm same day
```

### USEFUL NUMBERS
```
Night Sledding: +41 33 854 16 16
Rigi info: rigi.ch
Jungfrau webcams: jungfrau.ch
```

## Formatting Guidelines
- Use monospace/fixed-width where helpful
- Tables for structured data
- ⚠️ emoji for warnings
- 📞 for phone numbers
- Keep font readable but compact
- Maximum information, minimum space
- Should fit on one printed page (A4 or Letter)

## Quality Check
- [ ] All confirmation numbers verified against bookings.json
- [ ] All phone numbers in international format
- [ ] All dates correct
- [ ] Fits on one page
- [ ] Critical warnings prominent
