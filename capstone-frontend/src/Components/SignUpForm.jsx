
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import {
    LoginBackground3,
    LoginHeaderV2,
    LoginHeaderV3,
    LoginLabel,
    LoginButton2
} from '../styles/loginElements';
import "./SignUpForm.css"
const API = import.meta.env.VITE_BASE_URL

export default function SignUpForm({ setCurrentUser }) {
    const [user, setUser] = useState({
        user_id: 0,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        registration_date: ""
    })
    const navigate = useNavigate()

    const addUser = () => {
        fetch(`${API}/users`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error)
                }
                else if (data.err) {
                    throw new Error(data.err)
                }
                else {
                    alert(`User ${data.username} succesfully created`)
                    setUser(data)
                    setCurrentUser(data)
                    navigate(`/users/${data.user_id}/profile`)
                }
            })
            .catch((error) => {
                alert(error)
                console.error(error)
            })
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value,
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        addUser()
    }


    return (
        <div className="form-new-user">
            <LoginBackground3 >

                <LoginHeaderV3>Sign Up</LoginHeaderV3>


                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="username">
                            <Form.Control
                                className="useLoginStyle"
                                required
                                name="username"
                                type="text"
                                placeholder="username"
                                value={user.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="email">
                            <Form.Control
                                className="useLoginStyle"
                                name="email"
                                type="text"
                                placeholder="email"
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="firstname">
                            <Form.Control
                                className="useLoginStyle"
                                name="firstname"
                                type="text"
                                placeholder="first name"
                                value={user.firstname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="lastname">
                            <Form.Control
                                className="useLoginStyle"
                                name="lastname"
                                type="text"
                                placeholder="last name"
                                value={user.lastname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="password">
                            <Form.Control
                                className="useLoginStyle"
                                name="password"
                                type="text"
                                placeholder="password"
                                value={user.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>
                    <br></br>
                    <br></br>
                    <LoginButton2 className="btn btn-secondary btn-sm" type="submit">
                        Create User
                    </LoginButton2>

                </Form>
            </LoginBackground3>
        </div>
    )
}