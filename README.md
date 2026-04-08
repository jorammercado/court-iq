# 🏀 Court-IQ

Court-IQ is a basketball analytics and sports betting companion platform that combines real-time NBA data, interactive visualizations, and sportsbook odds into a single interface.

<a href="https://court-iq.netlify.app">
    <img src="./capstone-frontend/src/assets/home-page.png" alt="Home Page" width="50%">
</a>

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live App & GitHub Repos](#live-app--github-repos)
- [APIs and Services](#apis-and-services)
- [Getting Started](#getting-started)
- [Betting Overview](#betting-overview)
- [How to Use Court-IQ to Evaluate Prop Bets](#how-to-use-court-iq-to-evaluate-prop-bets)
- [Head-to-Head Team Odds](#head-to-head-team-odds)
- [License](#license)
- [Contact](#contact)

## 📊 Project Overview

Court-IQ provides a centralized platform to explore NBA team rosters, player statistics, real-time betting odds, and performance visualizations. Users can analyze player performance trends across games using interactive D3.js charts, with selectable stat categories such as points, assists, rebounds, and more.

The platform includes player prop bets tied to real matchups across multiple sportsbooks, team dashboards with historical and current data (up to 5 seasons), and NBA conference standings with head-to-head betting odds.

Additional features include a headlines page for real-time NBA news, a glossary of basketball terms, a player comparison tool, and WNBA standings with associated betting data.

## 🚀 Features

- **Team Rosters**: View NBA rosters across multiple seasons with player cards linking to detailed player pages
- **Player Stat Visualizations**: D3.js-powered multi-stat graphs with zoom and select functionality
- **Team Dashboards**: Display team stats, recent games, and associated betting data
- **Player Prop Bets**: Aggregated odds from multiple sportsbooks (DraftKings, FanDuel, BetMGM, etc.)
- **Standings Page**: NBA (conference-based) and WNBA standings with head-to-head betting odds
- **Headlines Page**: Real-time NBA news with links to original sources
- **Glossary Modal**: Definitions for basketball stat acronyms (e.g., PPG, RPG, MPG)
- **Player Comparison Tool**: Side-by-side stat comparison between players
- **Responsive Design**: Mobile-friendly UI with dynamic layouts and filtering options

## 🧰 Tech Stack

- **Frontend**: React, JavaScript, SCSS, HTML, BaseWeb, D3.js, framer-motion, styled-components
- **Backend**: Node.js, Express, Python, Flask
- **Database**: PostgreSQL
- **Authentication**: Firebase Authentication
- **Deployment**: Netlify (frontend), Render (backend)

## 🔗 Live App & GitHub Repos

- **Live App**: [court-iq.netlify.app](https://court-iq.netlify.app)
- **Live API Server**: [courtiq.onrender.com](https://courtiq.onrender.com)
- **Frontend Repo**: [github.com/jorammercado/court-iq](https://github.com/jorammercado/court-iq)
- **Backend Repo**: [github.com/jorammercado/court-iq-server](https://github.com/jorammercado/court-iq-server)

## 📡 APIs and Services

- **[The Odds API](https://the-odds-api.com/)** – Real-time sportsbook odds
- **[API-Basketball](https://rapidapi.com/api-sports/api/api-basketball)** – NBA game and player stats
- **[API-NBA](https://rapidapi.com/api-sports/api/api-nba)** – Supplemental NBA data
- **[Tank01 Fantasy Stats](https://rapidapi.com/tank01/api/tank01-fantasy-stats)** – Player news and fantasy data
- **[WNBA API](https://rapidapi.com/belchiorarkad-FqvHs2EDOtP/api/wnba-api)** – WNBA-specific data
- **[Firebase Authentication](https://firebase.google.com/docs/auth)** – User authentication
- **[Render](https://render.com)** – Backend hosting

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation (Frontend)

1. Fork the repository
2. Clone the repository:

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

Follow instructions in the backend repository [README](https://github.com/jorammercado/court-iq-server).

## 💸 Betting Overview

Court-IQ integrates real-time betting data from multiple sportsbooks, including **Player Prop Bets** and **Head-to-Head Team Odds**.

### What is a Player Prop Bet?

A "prop bet" (proposition bet) is a wager on a specific player’s performance rather than the overall outcome of a game.

**Example:**

```
Bookmaker: FanDuel
Player: X Player
Type: Over
Value: 9.5
Odds: 102
Category: Points
```

- **Bookmaker**: Platform offering the bet
- **Type**: Over or Under the stat threshold
- **Value**: Stat threshold (e.g., 9.5 points)
- **Odds**: Payout odds
- **Category**: Stat type (points, assists, etc.)

## How to Use Court-IQ to Evaluate Prop Bets

From the **Team Rosters** page, users can:

- Select a team and season (2020–present)
- View roster data and recent game history
- Browse available player prop bets, including stat category, thresholds, and odds
- Click on a sportsbook name in the prop bets table to open the corresponding bookmaker site

Clicking a player card navigates to the **Player Page**, where users can:

- Analyze performance trends using a multi-stat interactive graph
- Toggle individual stats (e.g., points, rebounds, assists)
- Zoom into specific game ranges
- Review detailed stat tables and histogram-based distributions

This workflow enables direct comparison between sportsbook prop thresholds and a player’s recent performance data.

## Head-to-Head Team Odds

The standings page includes NBA and WNBA team standings along with head-to-head odds for upcoming matchups. Users can review standings context and open sportsbook links directly from the displayed betting cards.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

## 👤 Contact

**Joram Mercado**
[GitHub](https://github.com/jorammercado) | [LinkedIn](https://www.linkedin.com/in/jorammercado)
