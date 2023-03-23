import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { getPatientAppointments } from "../../managers/PatientManager"
import { deleteAppointment, getAppointments } from "../../managers/ProviderManager"
import "./patients.css"

export const PatientAppointments = (props) => {
    const [ appointments, setAppointments ] = useState([])
    const history = useHistory()

    const auth = localStorage.getItem("patientzen")
    const userId = JSON.parse(auth).user

useEffect(() => {
    getPatientAppointments(userId)
    .then((data) => {
        const PtAppointments = data
        setAppointments(PtAppointments)
    })
},
[]
)

    return (
        <article className="patient-Appointments">
            <h2>Appointments</h2>
            <button className="btn-createappointment"
                        onClick={() => {
                            history.push(`/appointmentForm`)
                        }}
                        >Create Appointment</button>
                        
            {
                appointments.map(appointment => {
                    return <section key={`patient-appointment--${appointment.id}`} className="patient-appointment">
                        <div className="patient-appointment__name">{appointment.patient.full_name}</div>
                        <div className="patient-appointment__date">Date: {appointment.date}</div>
                        <div className="patient-appointment__time">Time: {appointment.time}</div>
                        <div className="patient-appointment__office">Location: {appointment.office.address}</div>
                        <div className="patient-appointment__summary">Summary: {appointment.visit_summary}</div>
                        <button className="btn-editappointment"
                        onClick={() => {
                            history.push(`/editAppointment/${appointment.id}`)
                        }}
                        >Edit Appointment</button>
                        <button className="btn-deleteappointment"
                        onClick={() => {
                            deleteAppointment(appointment.id)
                            .then(() => {
                                getPatientAppointments(userId).then(data => setAppointments(data))
                            })
                        }}
                        >Delete Appointment</button>
                    </section>
                })
            }
        </article>
    )
}