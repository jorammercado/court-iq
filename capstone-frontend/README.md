# Court-IQ

Court-IQ is a basketball analytics and sports betting platform that delivers real-time NBA stats, interactive player visualizations, and up-to-date odds from multiple sportsbooks. Built for fans and bettors, it emphasizes deep player insights through D3.js graphs and includes dynamic team dashboards with integrated betting data.

<a href="https://court-iq.netlify.app">
    <img src="./src/assets/home-page.png" alt="Home Page" width="50%">
</a>

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live App & GitHub Repos](#live-app--github-repos)
- [APIs and Services](#apis-and-services)
- [Getting Started](#getting-started)
- [Betting Overview](#betting-overview)
- [License](#license)
- [Contact](#contact)

## Project Overview
Court-IQ provides basketball fans and sports bettors with a central hub to explore NBA team rosters, player stats, real-time odds, and in-depth performance visualizations. Users can track player performance trends game-to-game through interactive D3.js area + line graphs, selecting specific stats such as points, assists, rebounds, minutes, and more, with zoomable ranges for granular analysis. The player page also includes six histogram charts visualizing stat distributions across games.

Features include player prop bets tied to specific matchups across various bookmakers, NBA team dashboards featuring roster stats and game history going back 5 seasons, and NBA conference standings with head-to-head team odds, also from multiple bookmakers. Users can access actual bets by clicking the venture card in the standings page or the bookmaker name on the player props table in the team rosters page.

Additional features include a headlines page with real-time NBA news, a glossary of basketball terms, a player comparison tool, and WNBA standings with associated head-to-head odds.

## Features
- **Team Rosters**: View current and historical NBA rosters (5 seasons) with interactive player cards linking to player-specific stat pages
- **Player Stat Visualizations**: D3.js powered overlaid area graphs show player performance trends across games (PPG, APG, RPG, and more), with interactive zoom and histogram breakdowns
- **Team Dashboards**: Includes team-level stats, upcoming and past games, and real-time player prop bets
- **Player Prop Bets**: Integrated odds from sportsbooks (DraftKings, FanDuel, BetMGM, etc.) linked directly to betting platforms
- **Standings Page**: View NBA (by conference) and WNBA (overall) standings with associated head-to-head team betting odds
- **Headlines Page**: Aggregates real-time NBA news that may influence betting decisions
- **Glossary Modal**: Defines all acronyms used across the site for quick reference (e.g., PPG, MPG, RPG)
- **Player Comparison Tool**: Compare two players head-to-head by stats and visualizations
- **Responsive Design**: Mobile-friendly layout with dropdown filtering, modular components, and clean UI

## Tech Stack
- **Frontend**: React, JavaScript, SCSS, HTML, BaseWeb, D3.js, framer-motion, styled-components
- **Backend**: Node.js, Express, Python, Flask
- **Database**: PostgreSQL
- **Authentication**: Firebase Authentication
- **Deployment**: Netlify (frontend), Render (backend)

## Live App & GitHub Repos
- **Live App**: [court-iq.netlify.app](https://court-iq.netlify.app)
- **Live API Server**: [courtiq.onrender.com](https://courtiq.onrender.com)
- **Frontend Repo**: [github.com/jorammercado/court-iq](https://github.com/jorammercado/court-iq)
- **Backend Repo**: [github.com/jorammercado/court-iq-server](https://github.com/jorammercado/court-iq-server)

## APIs and Services
- **[The Odds API](https://the-odds-api.com/)** – Real-time sportsbook odds
- **[API-Basketball](https://rapidapi.com/api-sports/api/api-basketball)** – NBA game and player stats
- **[API-NBA](https://rapidapi.com/api-sports/api/api-nba)** – Alternate NBA stats and metadata
- **[Tank01 Fantasy Stats](https://rapidapi.com/tank01/api/tank01-fantasy-stats)** – Fantasy data and player news
- **[WNBA API](https://rapidapi.com/belchiorarkad-FqvHs2EDOtP/api/wnba-api)** – WNBA-specific data
- **[Firebase Authentication](https://firebase.google.com/docs/auth)** – Secure user login
- **[Render](https://render.com)** – Cloud hosting for backend services

## Getting Started

### Prerequisites
To run the project locally, ensure you have:
- Node.js (v14 or higher)
- npm or yarn

### Installation (Frontend)
1. Fork the repository from [github.com/jorammercado/court-iq](https://github.com/jorammercado/court-iq)
2. Then clone the repository:
   ```bash
   git clone https://github.com/your-username/court-iq.git
   ```
3. Navigate to the project directory:
   ```bash
   cd court-iq/court-iq-frontend
   ```
4. Create a `.env` file in the root directory with your API keys (e.g., Firebase, Odds API).
5. Install dependencies:
   ```bash
   npm install
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
To run the backend server locally, follow the instructions provided in the [court-iq-server README](https://github.com/jorammercado/court-iq-server).

## Betting Overview
Court-IQ integrates real-time betting data from multiple sportsbooks into various areas of the platform, especially through **Player Prop Bets** and **Head-to-Head Team Odds**.

### What is a Player Prop Bet?
A "prop bet" (short for proposition bet) is a wager on a specific player’s in-game performance rather than the overall outcome of the match. For example, a bettor might wager on whether a player will score over or under a certain number of points in a game.

**Example Row from Court-IQ’s Props Table:**
```
Bookmaker: FanDuel  
Player: X Player  
Type: Over  
Value: 9.5  
Odds: 102  
Category: Points
```
- **Bookmaker**: Online betting platform (clickable link to place bet)
- **Type**: Whether the bet is on the player going **Over** or **Under** a stat threshold
- **Value**: The threshold number (e.g., 9.5 points)
- **Odds**: Payout odds from the sportsbook
- **Category**: Stat being wagered on (e.g., Points, Assists, etc.)

### How to Use Court-IQ to Evaluate Prop Bets
Clicking on a player card takes you to their player page, where you can:
- View a **line graph** tracking the player’s performance in the stat category across recent games
- Zoom into specific stretches (e.g., last 5 games)
- Compare the prop **threshold** (e.g., 9.5 points) to actual game-by-game outputs

This gives bettors **visual clarity** that traditional sites (like NBA.com or ESPN) often lack. Those sites may show averages, but Court-IQ shows **trends**, making it easier to spot hot/cold streaks or recent role changes.

### Why It Matters
Even a player averaging 10 PPG could have a volatile trend: maybe 18 points one night, 2 the next. Averages don’t tell the full story—**trends do**. Court-IQ empowers bettors with the tools to spot patterns visually and make smarter, more confident wagers.

## License
This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

## Contact
**Joram Mercado**  
[GitHub](https://github.com/jorammercado) | [LinkedIn](https://www.linkedin.com/in/jorammercado)