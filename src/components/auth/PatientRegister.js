import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const PatientRegister = () => {
    const [patient, setPatient] = useState({ "account_type": "patient" })
    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patient)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                return res.json().then((json) => {
                    throw new Error(JSON.stringify(json))
                });
            })
            .then(createdUser => {
                localStorage.setItem("patientzen", JSON.stringify(createdUser))
                history.push("/")
            })
            .catch(error => {
                setFeedback(JSON.parse(error.message).message)
            })
    }

    useEffect(() => {
        if (serverFeedback !== "") {
            conflictDialog.current.showModal()
        }
    }, [serverFeedback])

    const updatePatient = (evt) => {
        const copy = { ...patient }
        copy[evt.target.id] = evt.target.value
        setPatient(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{ serverFeedback }</div>
                <button className="button--close"
                    onClick={e => {
                        conflictDialog.current.close()
                        setFeedback("")
                    }}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register New Account</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updatePatient}
                        type="text" id="first_name"
                        className="form-control" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updatePatient}
                        type="text" id="last_name"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="DOB"> Date Of Birth </label>
                    <input onChange={updatePatient}
                        type="text" id="DOB" placeholder="MM-DD-YYYY"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phone_number"> Phone Number </label>
                    <input onChange={updatePatient}
                        type="text" id="phone_number"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updatePatient}
                        type="email"
                        id="email"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updatePatient}
                        type="password"
                        id="password"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="street_name"> Street </label>
                    <input onChange={updatePatient}
                        type="text"
                        id="street_name"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="city"> City </label>
                    <input onChange={updatePatient}
                        type="text"
                        id="city"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="state"> State </label>
                    <input onChange={updatePatient}
                        type="text"
                        id="state"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="zip_code"> Zip Code </label>
                    <input onChange={updatePatient}
                        type="text"
                        id="zip_code"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

