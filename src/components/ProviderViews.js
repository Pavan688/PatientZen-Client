import React from "react"
import { Route } from "react-router-dom"
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

            <Route exact path="/patients/:patientId(\d+)">
                <PatientRecords />
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
