

import { Link } from "react-router-dom"
import React from "react"


export default function TeamStandingCompV2({ team }) {
    return (
        <tr>
            <td>{team.position}</td>
            <td></td>
            <td>
                <img
                    src={team.team.logo}
                    alt={`logo of ${team.team.name}`}
                    style={{ height: "50px" }}
                />
            </td>
            <td>
                {team.team.name}
            </td>
            <td>
                {team.games.lose.total}
            </td>
            <td>
                {team.games.lose.percentage}
            </td>
            <td>
                {team.games.win.total}
            </td>
            <td>
                {team.games.win.percentage}
            </td>
            <td>
                {team.group.name}
            </td>
            <td>
                {team.points.against}
            </td>
            <td>
                {team.points.for}
            </td>
        </tr>
    )
}


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