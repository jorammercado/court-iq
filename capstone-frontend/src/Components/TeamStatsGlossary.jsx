import React from 'react';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Heading, HeadingLevel } from 'baseui/heading';

const TeamStatsGlossary = () => {
    const glossaryItems = [
        { acronym: 'Games', description: 'Games Played' },
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
    ];

    return (
        <div>
            <HeadingLevel>
                <Heading styleLevel={4} color="black" display="flex" justifyContent="center">
                    Team Stats Glossary
                </Heading>
            </HeadingLevel>
            <TableBuilder data={glossaryItems}>
                <TableBuilderColumn header="Acronym">
                    {row => <div>{row.acronym}</div>}
                </TableBuilderColumn>
                <TableBuilderColumn header="Description">
                    {row => <div>{row.description}</div>}
                </TableBuilderColumn>
            </TableBuilder>
        </div>
    );
};

export default TeamStatsGlossary;
