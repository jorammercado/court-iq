import React from 'react'
import { useStyletron } from 'baseui'
import { StatefulDataTable, CategoricalColumn, StringColumn } from 'baseui/data-table'
import { useState, useEffect } from 'react'

const glossaryItems = [
  { acronym: 'MPG', description: 'Minutes Per Game' },
  { acronym: 'PPG', description: 'Points Per Game' },
  { acronym: 'RPG', description: 'Rebounds Per Game' },
  { acronym: 'APG', description: 'Assists Per Game' },
  { acronym: 'SPG', description: 'Steals Per Game' },
  { acronym: 'BPG', description: 'Blocks Per Game' },
  { acronym: 'TPG', description: 'Turnovers Per Game' },
  { acronym: 'FG%', description: 'Field Goal Percentage' },
  { acronym: '3P%', description: 'Three-Point Percentage' },
  { acronym: 'FT%', description: 'Free Throws Percentage' },
  {
    acronym: 'DD',
    description:
      'Double-Double (achieving double digits in two statistical categories in a single game)',
  },
  {
    acronym: 'TD',
    description:
      'Triple-Double (achieving double digits in three statistical categories in a single game)',
  },
  { acronym: 'Opp', description: 'Opposition' },
  { acronym: 'Min', description: 'Minutes' },
  { acronym: 'FGM', description: 'Field Goals Made' },
  { acronym: 'FGA', description: 'Field Goals Attempted' },
  { acronym: '3PM', description: 'Three-Point Made' },
  { acronym: '3PA', description: 'Three-Point Attemps' },
  { acronym: 'FTM', description: 'Free Throws Made' },
  { acronym: 'FTA', description: 'Free Throws Attempted' },
  { acronym: 'OREB', description: 'Offensive Rebounds' },
  { acronym: 'DREB', description: 'Defensive Rebounds' },
  { acronym: 'REB', description: 'Total Rebounds' },
  { acronym: 'AST', description: 'Assists' },
  { acronym: 'STLS', description: 'Steals' },
  { acronym: 'BLK', description: 'Blocks' },
  { acronym: 'TO', description: 'Turnovers' },
  { acronym: 'PF', description: 'Personal Fouls' },
  { acronym: 'PTS', description: 'Points' },
  {
    acronym: '+/-',
    description: 'Plus/Minus (the point differential when a player is on the court)',
  },
  { acronym: 'Points', description: 'Total Points' },
  { acronym: 'Fgm', description: 'Field Goals Made' },
  { acronym: 'Fga', description: 'Field Goals Attempted' },
  { acronym: 'Fgp', description: 'Field Goal Percentage' },
  { acronym: 'Ftm', description: 'Free Throws Made' },
  { acronym: 'Fta', description: 'Free Throws Attempted' },
  { acronym: 'Ftp', description: 'Free Throw Percentage' },
  { acronym: 'Tpm', description: 'Three Point Field Goals Made' },
  { acronym: 'Tpa', description: 'Three Point Field Goals Attempted' },
  { acronym: 'Tpp', description: 'Three Point Field Goals Percentage' },
  { acronym: 'OffReb', description: 'Offensive Rebounds' },
  { acronym: 'DefReb', description: 'Defensive Rebounds' },
  { acronym: 'TotReb', description: 'Total Rebounds' },
  { acronym: 'Assists', description: 'Total Assists' },
  { acronym: 'PFouls', description: 'Personal Fouls' },
  { acronym: 'Steals', description: 'Total Steals' },
  { acronym: 'Turnovers', description: 'Total Turnovers' },
  { acronym: 'Blocks', description: 'Total Blocks' },
]

const columns = [
  CategoricalColumn({
    title: 'Acronym',
    mapDataToValue: (data) => data.acronym,
  }),
  StringColumn({
    title: 'Description',
    mapDataToValue: (data) => data.description,
  }),
]

const rows = glossaryItems.map((item, index) => ({
  id: index,
  data: item,
}))

const Glossary = () => {
  const [css] = useStyletron()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div
      className={css({
        height: '600px',
        ...(screenWidth <= 550
          ? { margin: '-20px', marginTop: '-30px' }
          : screenWidth <= 600
            ? { margin: '-20px', marginTop: '-15px' }
            : screenWidth <= 650
              ? { margin: '-15px', marginTop: '-15px' }
              : screenWidth <= 700
                ? { margin: '-10px', marginTop: '-15px' }
                : screenWidth <= 750
                  ? { margin: '-5px', marginTop: '-15px' }
                  : screenWidth <= 800
                    ? { margin: '0px', marginTop: '-15px' }
                    : screenWidth > 800
                      ? { margin: '0px', marginTop: '-15px' }
                      : {}),
      })}
    >
      <StatefulDataTable
        columns={columns}
        rows={rows}
        resizableColumnWidths
        searchable
        filterable={false}
      />
    </div>
  )
}

export default Glossary
