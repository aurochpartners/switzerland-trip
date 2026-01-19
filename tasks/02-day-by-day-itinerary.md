# Task 02: Day-by-Day Interactive HTML Itinerary

## Objective
Create a beautiful, functional HTML file that serves as Ray and Katie's primary on-the-ground reference during the trip. Must work offline on mobile.

## Input Files
- `@data/itinerary-skeleton.json` — Complete day-by-day structure
- `@data/bookings.json` — All reservations and confirmation numbers
- `@data/pricing.json` — Activity costs
- `@data/research.json` — Events, hours, restaurant info

## Output
- **Filename:** `outputs/Switzerland_Itinerary.html`
- **Format:** Single self-contained HTML file (no external dependencies)

## Design Requirements

### Visual Style
- Clean, modern design (not generic Bootstrap)
- Color scheme: Swiss-inspired (white, red accents, alpine blue)
- Mobile-first responsive layout
- Readable fonts (system fonts for reliability)
- Clear visual hierarchy

### Functionality
- **Collapsible day sections** — Tap to expand/collapse each day
- **Weather toggle** — Show ☀️ sunny plan vs 🌧️ rainy plan options
- **Clickable phone numbers** — `tel:` links for one-tap calling
- **Works 100% offline** — All CSS/JS inline, no CDN dependencies

## Structure Per Day

```
[Day Header - Collapsible]
├── Date, Day of Week, Location
├── Hotel info (name, address, confirmation #)
├── Highlights/Events badges
│
├── [Morning Section]
│   ├── Time
│   ├── Activity
│   └── Options (if applicable)
│
├── [Afternoon Section]
│   └── ...
│
├── [Evening Section]
│   └── ...
│
├── [Meals]
│   ├── Breakfast
│   ├── Lunch
│   └── Dinner (with restaurant suggestions)
│
├── [Weather Contingency] (if applicable)
│
└── [Critical Reminders] (if applicable)
```

## Day-Specific Content

Pull all content from `itinerary-skeleton.json`. Enhance with:

### Day 2 (Jan 20) - Arrival
- Flight arrival time
- Train instructions to Lucerne
- Jet-lag note
- LILU Festival highlight

### Day 4 (Jan 22) - Rigi
- ⚠️ Alert: Weggis closure, show alternative route
- Spa access times
- Slippers note

### Day 6 (Jan 24) - Adventure Day
- **CRITICAL:** Night sledding booking reminder
- Deadline: 2pm
- Phone number clickable

### Day 7 (Jan 25) - Fondue Gondola
- ⭐ Highlight the 4pm booking
- Note it's Ray's surprise

### Day 9 (Jan 27) - Departure
- ⚠️ TIGHT TIMELINE warning
- Clear schedule with exact times
- Train to airport instructions

## Special Elements

### Alerts Box (Red/Orange)
```html
<div class="alert">
  ⚠️ Weggis boat station CLOSED - use Vitznau route
</div>
```

### Highlight Box (Gold/Yellow)
```html
<div class="highlight">
  ⭐ FONDUE GONDOLA - 4:00pm (BOOKED)
</div>
```

### Phone Link
```html
<a href="tel:+41338541616">+41 33 854 16 16</a>
```

### Collapsible Section (JavaScript)
```javascript
// Simple toggle function - no libraries
function toggleDay(id) {
  const content = document.getElementById(id);
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
}
```

## Quick Reference Section (Top or Bottom)

Include a fixed/sticky quick reference:
- Emergency: 112
- All hotel phones (clickable)
- Night sledding booking: +41 33 854 16 16

## Content Tone
- Direct, practical
- Include insider tips naturally (e.g., "best views from right side of train")
- Swiss phrases where appropriate (Grüezi, Merci)
- No cheesy travel writing

## Testing Checklist
Before finishing:
- [ ] Opens correctly in browser
- [ ] All days collapse/expand properly
- [ ] Phone numbers are clickable
- [ ] Readable on mobile viewport
- [ ] No external dependencies (works offline)
- [ ] All confirmation numbers correct
- [ ] All times and dates accurate
