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
            <div className="home-title">
                Court IQ
            </div>
            <div className="sub-title">
                Uncover the Game's Secrets: Dive into Dynamic Basketball Data Visualization with Court IQ.
                <br></br>
                Explore Engaging Visual Graphs to Analyze Players, Teams, and Seasons like Never Before.

            </div>
            <div className="button">
                <Button className="animate__animated animate__fadeInUp"
                    onClick={() => navigate("/login")}
                    kind={KIND.secondary}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}

export default Home;