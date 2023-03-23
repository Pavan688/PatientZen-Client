import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { deleteAppointment, getAppointments } from "../../managers/ProviderManager"
import "./providers.css"

export const Appointments = (props) => {
    const [ appointments, setAppointments ] = useState([])
    const history = useHistory()

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
        <article className="appointments">
            <h2 className="appointmentForm__title">Appointments</h2>
            {
                appointments.map(appointment => {
                    return <section key={`appointment--${appointment.id}`} className="appointment">
                        <div className="appointment__name">{appointment.patient.full_name}</div>
                        <div className="appointment__date">Date: {appointment.date}</div>
                        <div className="appointment__time">Time: {appointment.time}</div>
                        <div className="appointment__office">Location: {appointment.office.address}</div>
                        <div className="appointment__summary">Summary: {appointment.visit_summary}</div>
                        <button className="btn-startrecord"
                        onClick={() => {
                            history.push(`/recordForm`)
                        }}
                        >Start New Record</button>
                        <button className="btn--deleteappointment"
                        onClick={() => {
                            deleteAppointment(appointment.id)
                            .then(() => {
                                getAppointments(userId).then(data => setAppointments(data))
                            })
                        }}
                        >Delete Appointment</button>
                    </section>
                })
            }
        </article>
    )
}