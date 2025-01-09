import React, { useEffect, useState } from 'react';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Block } from 'baseui/block';
import { Heading, HeadingLevel } from 'baseui/heading';
import Spin from './SpinLoad';
import "./TeamRecordWNBA.scss"

const TeamRecordWNBA = ({ teamRecord, isHighlightedSeason }) => {
    const [headers, setHeaders] = useState([]);
    const [headersHomeAway, setHeadersHomeAway] = useState([]);
    const [values, setValues] = useState([]);
    const [valuesHome, setValuesHome] = useState([]);
    const [valuesAway, setValuesAway] = useState([]);

    useEffect(() => {
        if (teamRecord && teamRecord.length > 0 && teamRecord[0].stats) {
            const stats = teamRecord[0].stats;
            const statsHome = teamRecord[1].stats;
            const statsAway = teamRecord[2].stats;
            setHeaders(stats.map(stat => stat.name));
            setHeadersHomeAway(statsHome.map(stat => stat.name));
            setValues(stats.map(stat => stat.value));
            setValuesHome(statsHome.map(stat => stat.value));
            setValuesAway(statsAway.map(stat => stat.value));
        }
    }, [teamRecord]);


    return (
        <Block className="TeamStatsTable" style={{
             width: "91%"
        }}>
            <Block className="heading" width="100%"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 0) 100%),
                    url(./src/Pages/images/heropage.jpg)`,
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
            {values.length !== 0 ? <Block className="tableContainer" style={{ justifyContent: "left" }}>
                <TableBuilder data={[values]}>
                    {headers.map((header, index) => (
                        <TableBuilderColumn key={index} header={header}>
                            {row => row[index]}
                        </TableBuilderColumn>
                    ))}
                </TableBuilder>
            </Block> : <Block  ><Spin ></Spin></Block>}
            <Block className="HomeAwayContainer" >
                <Block className="homeRecord" >
                    <Block className="heading" width="100%"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%),
                        url(./src/Pages/images/heropage.jpg)`,
                            backgroundSize: 'auto',
                            backgroundPosition: 'left calc(1% + 0px)',
                            backgroundRepeat: 'no-repeat',
                        }}>
                        <Block className="heading" backgroundColor={isHighlightedSeason ? "#EA6607" : "transparent"} width="100%">
                            <HeadingLevel >
                                <Heading className="titleHighlight" styleLevel={4}
                                    color="white"
                                    backgroundColor={isHighlightedSeason ? "#EA6607" : "none"}
                                    marginBottom="0px"
                                    marginLeft="5px">
                                    Home
                                </Heading>
                            </HeadingLevel>
                        </Block>
                    </Block>
                    {valuesHome.length!==0?<Block className="tableContainer_half" style={{
                        borderBottomLeftRadius: "8px"
                    }}>
                        <TableBuilder data={[valuesHome]}>
                            {headersHomeAway.map((header, index) => (
                                <TableBuilderColumn key={index} header={header}>
                                    {row => Number.isInteger(row[index]) ? row[index] : row[index].toFixed(4)}
                                </TableBuilderColumn>
                            ))}
                        </TableBuilder>
                    </Block>:<Block ><Spin ></Spin></Block>}
                </Block>
                <Block className="awayRecord" style={{ marginLeft: '0px', margin: "0px", padding: "0px", width: "100%" }}>
                    <Block className="heading" width="100%"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%),
                            url(./src/Pages/images/heropage.jpg)`,
                            backgroundSize: 'auto',
                            backgroundPosition: 'right calc(30% + 0px)',
                            backgroundRepeat: 'no-repeat'
                        }}>
                        <Block className="heading" backgroundColor={isHighlightedSeason ? "#EA6607" : "transparent"} width="100%">
                            <HeadingLevel >
                                <Heading className="titleHighlight" styleLevel={4}
                                    color="white"
                                    backgroundColor={isHighlightedSeason ? "#EA6607" : "none"}
                                    marginBottom="0px"
                                    marginLeft="5px">
                                    Away
                                </Heading>
                            </HeadingLevel>
                        </Block>
                    </Block>
                    {valuesAway.length!==0?<Block className="tableContainer_half" style={{
                        borderBottomRightRadius: "8px"
                    }}>
                        <TableBuilder data={[valuesAway]}>
                            {headersHomeAway.map((header, index) => (
                                <TableBuilderColumn key={index} header={header}>
                                    {row => Number.isInteger(row[index]) ? row[index] : row[index].toFixed(4)}
                                </TableBuilderColumn>
                            ))}
                        </TableBuilder>
                    </Block>:<Block ><Spin ></Spin></Block>}
                </Block>
            </Block>
        </Block>
    );
};

export default TeamRecordWNBA;
