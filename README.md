# Pokédex React App

A simulated Pokédex built using React that fetches real Pokémon data from the PokéAPI. Styled to match the classic Pokédex look and feel, complete with sound effects, sprite toggling, and responsive button controls.

---

## Features

- View any Pokémon from #001 to #1025
- Real-time data fetch from [https://pokeapi.co](https://pokeapi.co)
- Flip between front and back sprite every 2 seconds
- Arrow buttons to change Pokémon ID (±1 and ±10)
- OK button to fetch selected Pokémon
- Sound effects for buttons (`arrow.mp3`, `ok.mp3`)
- Display shows 3-digit formatted ID
- Auto-reverts temp number after 7 seconds if not confirmed
- Fully styled and aligned over a classic Pokédex image
- Pixelated sprite rendering
- Button press animation effect

---

## Setup

1. **Clone the repo**  
   ```bash
   git clone <repo-url>
   cd pokedex-app
   npm install
npm run dev

npm run build


Folder Notes
/public/img.webp: Background Pokedex image

/public/arrow.mp3 & /public/ok.mp3: Button sounds

/src/App.jsx: Main app logic and UI

/src/index.css: Global styling

/src/App.css: Additional styles and button effects


Credits
Pokémon data from PokéAPI



License
This project is for educational and personal use. Pokémon is © Nintendo/Game Freak.