import React, { useEffect, useState } from 'react';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Block } from 'baseui/block';
import { Heading, HeadingLevel } from 'baseui/heading';
import Spin from './SpinLoad';
import "./TeamRecordWNBA.scss"

const TeamRecordWNBA = ({ teamRecord, isHighlightedSeason }) => {
    const [headers, setHeaders] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (teamRecord && teamRecord.length > 0 && teamRecord[0].stats) {
            const stats = teamRecord[0].stats;
            setHeaders(stats.map(stat => stat.name));
            setValues(stats.map(stat => stat.value));
        }
    }, [teamRecord]);

    if (!teamRecord) {
        return <Spin />;
    }

    return (
        <Block className="TeamStatsTable" style={{
            justifyContent: "left", alignItems: "flex-left", display: "flex", width: "91%"
        }}>
            <Block className="heading" width="100%"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 0) 100%),
                    url(https://theforeword.org/wp-content/uploads/2023/10/offseasonpower_getty_ringer.0.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat',
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px"
                }}>
                <Block className="heading" backgroundColor={isHighlightedSeason ? "#EA6607" : "transparent"} width="100%">
                    <HeadingLevel >
                        <Heading className="titleHighlight" styleLevel={4}
                            color="white"
                            backgroundColor={isHighlightedSeason ? "#EA6607" : "none"}
                            marginBottom="0px"
                            marginLeft="5px">
                            Overall Team Record
                        </Heading>
                    </HeadingLevel>
                </Block>
            </Block>
            <Block className="tableContainer" style={{ justifyContent: "left" }}>
                <TableBuilder data={[values]}>
                    {headers.map((header, index) => (
                        <TableBuilderColumn key={index} header={header}>
                            {row => row[index]}
                        </TableBuilderColumn>
                    ))}
                </TableBuilder>
            </Block>
        </Block>
    );
};

export default TeamRecordWNBA;
