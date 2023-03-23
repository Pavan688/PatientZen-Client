import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PatientViews } from "./PatientViews";
import { PatientNavBar } from "./nav/PatientNavBar";
import { Login } from "./auth/Login";
import { ProviderViews } from "./ProviderViews";
import { EmployeeNavBar } from "./nav/ProviderNavBar";
import { isStaff } from "../utils/isStaff";
import { ProviderRegister } from "./auth/ProviderRegister";
import { PatientRegister } from "./auth/PatientRegister";

export const PatientZen = () => {

  return (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("patientzen")) {
            if (isStaff()) {
              return <>
                  <EmployeeNavBar />
                  <ProviderViews />
                </>
            }
            else {
              return <>
                  <PatientNavBar />
                  <PatientViews />
                </>
            }
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/registerpatient">
        <PatientRegister />
      </Route>
      <Route path="/registerprovider">
        <ProviderRegister />
      </Route>
    </>
  )
}