

import { Link } from "react-router-dom"
import React from "react"


export default function TeamStandingComp({ team }) {
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
