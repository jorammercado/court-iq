
import * as React from "react";
import { useState } from "react";
import { Table } from "baseui/table-semantic";
import { Link } from "react-router-dom"


export default function TeamStandingCompV2({ teams: data }) {

   // console.log(data)
    return (
        <Table
            columns={["Position", "\u2605", "Logo", "Team", "Games Loss", "Games Loss %",
                "Games Won", "Games Won %", "Group", "Points Aganist", "Points For"]}
            data={[
                [], [],[],[],[],[],[],[],[],[]
              ]}
        />
    )
}

// [[data[0].position], "hi", data[0].team.logo, data[0].team.name, data[0].games.lose.total,
//             data[0].games.lose.percentage, data[0].games.win.total, data[0].games.win.percentage,
//             data[0].group.name, data[0].points.against, data[0].points.for],

//             [[data[1].position], "hi", data[1].team.logo, data[1].team.name, data[1].games.lose.total,
//             data[1].games.lose.percentage, data[1].games.win.total, data[1].games.win.percentage,
//             data[1].group.name, data[1].points.against, data[1].points.for],

//             [[data[2].position], "hi", data[2].team.logo, data[2].team.name, data[2].games.lose.total,
//             data[2].games.lose.percentage, data[2].games.win.total, data[2].games.win.percentage,
//             data[2].group.name, data[2].points.against, data[2].points.for],

//             [[data[3].position], "hi", data[3].team.logo, data[3].team.name, data[3].games.lose.total,
//             data[3].games.lose.percentage, data[3].games.win.total, data[3].games.win.percentage,
//             data[3].group.name, data[3].points.against, data[3].points.for],

//             [[data[4].position], "hi", data[4].team.logo, data[4].team.name, data[4].games.lose.total,
//             data[4].games.lose.percentage, data[4].games.win.total, data[4].games.win.percentage,
//             data[4].group.name, data[4].points.against, data[4].points.for],

//             [[data[5].position], "hi", data[5].team.logo, data[5].team.name, data[5].games.lose.total,
//             data[5].games.lose.percentage, data[5].games.win.total, data[5].games.win.percentage,
//             data[5].group.name, data[5].points.against, data[5].points.for],

//             [[data[6].position], "hi", data[6].team.logo, data[6].team.name, data[6].games.lose.total,
//             data[6].games.lose.percentage, data[6].games.win.total, data[6].games.win.percentage,
//             data[6].group.name, data[6].points.against, data[6].points.for],

//             [[data[7].position], "hi", data[7].team.logo, data[7].team.name, data[7].games.lose.total,
//             data[7].games.lose.percentage, data[7].games.win.total, data[7].games.win.percentage,
//             data[7].group.name, data[7].points.against, data[7].points.for],

//             [[data[8].position], "hi", data[8].team.logo, data[8].team.name, data[8].games.lose.total,
//             data[8].games.lose.percentage, data[8].games.win.total, data[8].games.win.percentage,
//             data[8].group.name, data[8].points.against, data[8].points.for],

//             [[data[9].position], "hi", data[9].team.logo, data[9].team.name, data[9].games.lose.total,
//             data[9].games.lose.percentage, data[9].games.win.total, data[9].games.win.percentage,
//             data[9].group.name, data[9].points.against, data[9].points.for]
// return (
//     <Table
//     key={i}
//     columns={["Position", "\u2605", "Logo", "Team", "Games Loss","Games Loss %", 
//     "Games Won", "Games Won %", "Group", "Points Aganist", "Points For"  ]}
//     data={[
//         currentTableData.map(team => team.position),
//         [],
//         currentTableData.map(team => team.team.logo),
//         currentTableData.map(team => team.team.name),
//         currentTableData.map(team => team.games.lose.total),
//         currentTableData.map(team => team.games.lose.percentage),
//         currentTableData.map(team => team.games.win.total),
//         currentTableData.map(team => team.games.win.percentage),
//         currentTableData.map(team => team.group.name),
//         currentTableData.map(team => team.points.against),
//         currentTableData.map(team => team.points.for),
//     ]}
//     />