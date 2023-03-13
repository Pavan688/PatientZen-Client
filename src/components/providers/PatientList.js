import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { Link, useNavigate } from 'react-router-dom'
import { getPatients } from "../../managers/ProviderManager"


export const PatientList = (props) => {
    const [ patients, setPatients ] = useState([])
    // const navigate = useNavigate()

    useEffect(() => {
        getPatients().then(data => setPatients(data))
    }, [])

    return (
        <article className="patients">
            {
                patients.map(patient => {
                    return <section key={`patient--${patient.id}`} className="patient">
                        <div>
                            <Link className="patient__name" to={`/patients/${patient.id}`}>{patient.full_name}</Link>
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