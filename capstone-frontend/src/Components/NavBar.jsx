import { Link } from "react-router-dom"
import "./NavBar.css"

export default function NavBar() {
    return (
        <div className="navbar" >
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <div >
                        <Link to="/loggedInPage">User </Link>

                        <Link to="/maps"> Maps </Link>


                    </div>
                    <span className="navbar-text">
                        Capstone
                    </span>
                </div>
            </nav>
        </div>
    )
}

