import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const PatientNavBar = () => {
    return (
        <ul className="navbar">

            <li className="navbar__item">
                <div className="navbar__linktitle">PatientZen: Patient Portal</div>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/records">Records</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/insurances">Insurance</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/appointments">Appointment</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("patientzen")
                        }
                    }>
                    Logout
                </Link>
            </li>
        </ul>
    )
}
