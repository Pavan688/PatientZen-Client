import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <div className="navbar__linktitle">PatientZen: Provider Portal</div>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/patients">Patients</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/providers">Providers</Link>
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
