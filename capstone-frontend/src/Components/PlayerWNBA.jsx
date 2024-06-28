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
        'Indiana Fever',
        'New York Liberty',
        'Washington Mystics',
        'Dallas Wings',
        'Las Vegas Aces',
        'Los Angeles Sparks',
        'Minnesota Lynx',
        'Phoenix Mercury',
        'Seattle Storm']

    return (
        <div>
            WNBAPlayer: {data.displayName}
        </div>
    );
}

export default PlayerWNBA;