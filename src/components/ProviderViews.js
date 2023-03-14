import React from "react"
import { Route } from "react-router-dom"
import { Appointments } from "./providers/Appointments";
import { EditRecord } from "./providers/EditRecord";
import { PatientList } from "./providers/PatientList";
import { PatientRecords } from "./providers/PatientRecords";
import { ProviderList } from "./providers/ProviderList";


export const EmployeeViews = () => {

    return (
        <>
                <Route exact path="/patients">
                    <PatientList />
            </Route>

            <Route exact path="/">
            <PatientList />
            </Route> 
            
            <Route exact path="/providers">
            <ProviderList />
            </Route> 

            <Route exact path="/records/:patientId">
                <PatientRecords />
            </Route>

            <Route exact path="/appointments">
                <Appointments />
            </Route>

            <Route exact path="/editRecords/:recordId">
                <EditRecord />
            </Route>

            {/* <Route exact path="/customers">
                <CustomerList />
            </Route>

            {/* <Route exact path="/tickets">
                <TicketList />
            </Route>


            <Route path="/tickets/create">
                <TicketForm />
            </Route>

            <Route exact path="/employees">
                <EmployeeList />
            </Route>

            <Route exact path="/employees/:employeeId(\d+)">
                <Employee />
            </Route>

            <Route path="/employees/create">
                <EmployeeForm />
            </Route> */}

        </>
    )
}
