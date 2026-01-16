# Gift Finder - Development TODO

## Completed
- [x] Project setup (Next.js 14, TypeScript, Tailwind CSS)
- [x] Install dependencies (lucide-react)
- [x] TypeScript types (`types/index.ts`)
- [x] Constants file with all form options (`lib/constants.ts`)
- [x] StepIndicator component (progress bar)
- [x] Step 1: Basic Information form
  - [x] Relationship selector (14 options with emojis)
  - [x] Location input with autocomplete
  - [x] Budget selector (6 options)
  - [x] Gift type selector (3 options)
  - [x] Occasion selector (10 presets + custom)
- [x] Step 2: Personalization form
  - [x] Age range dropdown
  - [x] Interests multi-select (12 options)
  - [x] Personality traits multi-select (9 options)
- [x] Form validation for Steps 1 & 2
- [x] Navigation between steps (back/next buttons)
- [x] GitHub repository setup
- [x] Vercel deployment
- [x] Fix location input to save on typing (not just dropdown selection)

## TODO
### Step 3: Recommendations Display
- [ ] Loading state with animation while generating
- [ ] GiftCard component for individual gift display
- [ ] Display 6 AI-generated gift cards in 2-column grid
- [ ] Each card: emoji, gift name, price, description, shop name, "View & Purchase" button
- [ ] Error handling with fallback to mock data

### API Integration
- [ ] Create API route (`/app/api/generate-gifts/route.ts`)
- [ ] Anthropic API integration (claude-sonnet-4-20250514)
- [ ] Construct prompt with all user inputs
- [ ] Parse JSON response (handle markdown code blocks)
- [ ] Error handling

### Additional Features
- [ ] "Start Over" functionality to reset form
- [ ] Mock gift data for API fallback
- [ ] Google Places API integration for location autocomplete

### Deployment
- [ ] Set up environment variable (ANTHROPIC_API_KEY) in Vercel
- [ ] Test production deployment

## Project Structure
```
gift-finder-app/
├── gift-finder/           # Next.js project
│   ├── app/
│   │   ├── api/generate-gifts/route.ts  (TODO)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── GiftCard.tsx      (TODO)
│   │   ├── GiftFinder.tsx    (main form)
│   │   └── StepIndicator.tsx
│   ├── lib/
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts
│   └── .env.example
├── handoff-doc.txt
└── TODO.md
```

## Design Specs
- Gradient background: purple-50 via pink-50 to blue-50
- Purple accent: #9333ea
- Mobile-first responsive design
- Large clickable buttons (minimize typing)
