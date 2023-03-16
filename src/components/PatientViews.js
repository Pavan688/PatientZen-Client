import React from "react"
import { Route } from "react-router-dom"
import { AppointmentForm } from "./patients/AppointmentForm"
import { EditAppointment } from "./patients/EditAppointment"
import { InsuranceForm } from "./patients/InsuranceForm"
import { InsuranceList } from "./patients/InsuranceList"
import { PatientAppointments } from "./patients/PatientAppointments"
import { Records } from "./patients/Records"


export const PatientViews = () => {

    return (
        <>
            <Route exact path="/">
            <Records />
            </Route>

            <Route exact path="/records">
            <Records />
            </Route>
            
            <Route exact path="/insurances">
            <InsuranceList />
            </Route>

            <Route exact path="/insuranceForm">
            <InsuranceForm />
            </Route>

            <Route exact path="/appointments">
            <PatientAppointments />
            </Route>

            <Route exact path="/appointmentForm">
            <AppointmentForm />
            </Route>

            <Route exact path="/editAppointment/:appointmentId">
                <EditAppointment />
            </Route>
        </>
    )
}
