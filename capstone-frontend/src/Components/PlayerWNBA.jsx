import React, { useEffect, useState } from "react";
import { Table } from "baseui/table-semantic";
import Spin from "./SpinLoad";
import axios from "axios";
import MyGraph from "./MyChart";
import { useNavigate } from "react-router-dom"
import "./PlayerWNBA.scss"
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Avatar } from "baseui/avatar";
import { Select } from 'baseui/select';
import {
    LabelLarge,
    LabelMedium,
    HeadingMedium,
    HeadingSmall
} from "baseui/typography";
import { HistogramWithAxis } from "./HistogramWithAxis";
import { Spinner, SIZE } from "baseui/spinner";

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY;
const VITE_X_RAPIDAPI_HOST_WNBA = import.meta.env.VITE_X_RAPIDAPI_HOST_WNBA;

function PlayerWNBA({ data, playerid }) {
    // console.log(data)
    let navigate = useNavigate()
    const [isScreenLargeEnough, setIsScreenLargeEnough] = useState(window.innerWidth > 768);

    useEffect(() => {
        function handleResize() {
            setIsScreenLargeEnough(window.innerWidth > 768);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [primaryColor, setPrimaryColor] = useState("#EA6607")
    const [secondaryColor, setSecondaryColor] = useState("#000000")
    const primaryColors = ["#C8102E", "#418FDE", "#a6192e", "#0c2340", "#C8102E",
        "#BA0C2F", "#702F8A", "#0C2340", "#6ECEB2", "#201747",
        "#2C5234", "#0c2340"]
    const secondaryColors = ["#418FDE", "#FFCD00", "#041e42", "#c4d600", "#041E42",
        "#000000", "#FFC72C", "#78BE20", "#000000", "#CB6015",
        "#FBE122", "#c8102e"]
    const teams = ['Atlanta Dream',
        'Chicago Sky',
        'Connecticut Sun',
        'Dallas Wings',
        'Indiana Fever',
        'Las Vegas Aces',
        'Los Angeles Sparks',
        'Minnesota Lynx',
        'New York Liberty',
        'Phoenix Mercury',
        'Seattle Storm',
        'Washington Mystics']

    const [playerImage, setPlayerImage] = useState("")
    const [personalData, setPersonalData] = useState({})
    const [referenceData, setReferenceData] = useState({})

    useEffect(() => {
        setPlayerImage(data?.headshot?.href)
        setPersonalData({
            height: data?.displayHeight,
            weight: data?.displayWeight,
            jersey: data?.jersey,
            pos: data?.position?.abbreviation
        })
        setReferenceData({
            ...data?.team
        })
    }, [data]);

    const handleGamesChange = (params) => {
    };

    useEffect(() => {
        setPrimaryColor(selectPrimaryColor(referenceData))
    }, [referenceData]);

    function selectPrimaryColor(referenceData) {
        if (referenceData && referenceData.displayName)
            for (let i = 0; i < teams.length; i++) {
                if (teams[i] === referenceData.displayName)
                    return primaryColors[i]
            }
        return '#EA6607'
    }

    useEffect(() => {
        setSecondaryColor(selectSecondaryColor(referenceData))
    }, [referenceData]);

    function selectSecondaryColor(referenceData) {
        if (referenceData && referenceData.displayName)
            for (let i = 0; i < teams.length; i++) {
                if (teams[i] === referenceData.displayName)
                    return secondaryColors[i]
            }
        return '#000000'
    }
    // console.log("Reference data: ", referenceData)

    return (
        <div>
            <Block className="topplayer" display="flex" flexDirection="column" alignItems="center">
                <Block className="sub__heading" display="flex" justifyContent="center" alignItems="center" width="100%" flexDirection="row" backgroundColor={primaryColor} padding="20px" marginBottom="-10px" >
                    <Block className="wraper" display="flex" justifyContent="center" alignItems="center" flexDirection="row"  >
                        <Block className="head__shot" $style={{ marginBottom: "-6px" }}>
                            <img src={playerImage || 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'} alt="Head Shot" style={{ height: "240px" }} />
                        </Block>
                        <Block className="info" display="flex" flexDirection="column" alignItems="center" $style={{ flexGrow: 3 }}>
                            <HeadingLevel>
                                <Heading styleLevel={2} color={secondaryColor}>{data?.firstName} {data?.lastName} </Heading>
                                <Heading styleLevel={5} color={secondaryColor}>
                                    {personalData && personalData.height ? personalData.height : ""} &nbsp;
                                    {personalData && personalData.weight ? personalData.weight : ""} &nbsp;
                                    {referenceData?.displayName ? referenceData.displayName : ""} &nbsp;
                                    {personalData && personalData.jersey ? "#" + personalData.jersey : ""} &nbsp;
                                    {personalData && personalData.pos ? personalData.pos : ""}
                                </Heading>
                            </HeadingLevel>

                            <Block display="flex" justifyContent="space-around" width="60%">
                                <LabelMedium color={secondaryColor}>PPG</LabelMedium>
                                <LabelMedium color={secondaryColor}>RPG</LabelMedium>
                                <LabelMedium color={secondaryColor}>APG</LabelMedium>
                                <LabelMedium color={secondaryColor}>TS%</LabelMedium>
                            </Block>
                            <Block display="flex" justifyContent="space-around" width="60%">
                                <LabelLarge color={secondaryColor}>{"val"}</LabelLarge>
                                <LabelLarge color={secondaryColor}>{"val"}</LabelLarge>
                                <LabelLarge color={secondaryColor}>{"val"}</LabelLarge>
                                <LabelLarge color={secondaryColor}>{"val"}</LabelLarge>
                            </Block>
                        </Block>
                        <Block className="team__logo" >
                            <Avatar
                                overrides={{
                                    Avatar: {
                                        style: ({ $theme }) => ({
                                            borderRadius: "0",
                                            width: 'auto',
                                            objectFit: 'contain',
                                            height: 'auto',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }),
                                    },
                                    Root: {
                                        style: ({ $theme }) => ({
                                            borderRadius: "0",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'visible',
                                            width: '170px',
                                            height: '170px',
                                        }),
                                    },
                                }}
                                name={referenceData?.displayName ? referenceData.displayName : ""}
                                size="100px"
                                src={referenceData?.logos?.[0]?.href ? referenceData.logos[0].href : ""}
                            />
                        </Block>
                        <Block className="selector" width="auto" display="flex" marginBottom="170px" marginLeft="25px" marginRight="10px"
                            $style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "0px", gap: "10px" }}    >
                            <Select
                                options={[

                                ]}
                                labelKey="label"
                                valueKey="id"
                                onChange={handleGamesChange}
                                value={[{ id: '0', label: 'Data' }]}
                                placeholder={<Block> &nbsp;&nbsp;Data&nbsp;&nbsp; </Block>}
                                clearable={false}
                                overrides={{
                                    ControlContainer: {
                                        style: {
                                            minHeight: '35px', height: '35px', paddingLeft: '15px',
                                            paddingRight: '5px',
                                            borderRadius: "8px",
                                            cursor: 'default'
                                        }
                                    },
                                    ValueContainer: { style: { minHeight: '30px', height: '30px', padding: '0px' } },
                                    Placeholder: { style: { lineHeight: '30px' } },
                                    SingleValue: { style: { lineHeight: '30px' } },
                                    OptionContent: { style: { cursor: 'default' }, },
                                    DropdownContainer: { style: { cursor: 'default' } },
                                    DropdownListItem: { style: { cursor: 'default' } },
                                    InputContainer: { style: { cursor: 'default' } },
                                    Input: { style: { cursor: 'default' } },
                                    Root: { style: { width: '122px' } }
                                }}

                            />
                        </Block>
                    </Block>
                </Block>
            </Block>
        </div>
    );
}

export default PlayerWNBA;