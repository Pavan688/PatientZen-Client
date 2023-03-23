import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPatients } from "../../managers/ProviderManager"
import "./providers.css"


export const PatientList = (props) => {
    const [ patients, setPatients ] = useState([])

    useEffect(() => {
        getPatients().then(data => setPatients(data))
    }, [])

    return (
        <article className="patients">
            <h2 className="patient__title">Patient List</h2>
            {
                patients.map(patient => {
                    return <section key={`patient--${patient.id}`} className="patient">
                        <div>
                            <Link className="patient__name" to={`/records/${patient.id}`}>{patient.full_name}</Link>
                        </div>
                        <div className="patient__DOB">Date Of Bith: {patient.DOB}</div>
                        <div className="patient__phone_number">Phone Number {patient.phone_number}</div>
                        <div className="patient__address">Address: {patient.street_name} {patient.city} {patient.state} {patient.zip_code}</div>
                    </section>
                })
            }
        </article>
    )
}