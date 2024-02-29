import "./Home.scss"
import { Button, KIND } from "baseui/button";
import { useNavigate, useParams } from "react-router-dom"
import {
    signInAnon,
} from "../Services/FireBase";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">

            <div className="sub-title">
               Elevate Your Game with CoutIQ: Where Analytics Meet Action


            </div>
        </div>
    )
}

export default Home;