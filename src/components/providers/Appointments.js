import React, { useEffect, useState } from "react"
// import { Link, useNavigate } from 'react-router-dom'
import { getAppointments } from "../../managers/ProviderManager"


export const Appointments = (props) => {
    const [ appointments, setAppointments ] = useState([])
    // const navigate = useNavigate()

    const auth = localStorage.getItem("patientzen")
const userId = JSON.parse(auth).user

useEffect(() => {
    getAppointments(userId)
    .then((data) => {
        const PtAppointments = data
        setAppointments(PtAppointments)
    })
},
[]
)

    return (
        <article className="provider">
            {
                appointments.map(appointment => {
                    return <section key={`appointment--${appointment.id}`} className="appointment">
                        <div className="appointment__name">{appointment.patient}</div>
                        <div className="appointment__date">Date: {appointment.date}</div>
                        <div className="appointment__time">Time: {appointment.time}</div>
                        <div className="appointment__office">Location: {appointment.office}</div>
                        <div className="appointment__summary">Summary: {appointment.visit_summary}</div>
                    </section>
                })
            }
        </article>
    )
}