import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const ProviderRegister = (props) => {
    const [provider, setProvider] = useState({ "account_type": "provider" })
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
            body: JSON.stringify(provider)
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

    const updateProvider = (evt) => {
        const copy = { ...provider }
        copy[evt.target.id] = evt.target.value
        setProvider(copy)
    }


    return (
        <main className="container--register">
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{ serverFeedback }</div>
                <button className="button--close"
                    onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--register" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Welcome to the Team</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name: </label>
                    <input onChange={updateProvider}
                        type="text" id="first_name" className="registerform-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name: </label>
                    <input onChange={updateProvider}
                        type="text" id="last_name" className="registerform-control"
                        placeholder="Enter your last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="specialty"> Specialty </label>
                    <input onChange={updateProvider}
                        type="text"
                        id="specialty"
                        className="registerform-control"
                        placeholder="Provider Specialty" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phone_number"> Phone Number </label>
                    <input onChange={updateProvider}
                        type="text"
                        id="phone_number"
                        className="registerform-control"
                        placeholder="Contact Number" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateProvider}
                        type="email"
                        id="email"
                        className="registerform-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateProvider}
                        type="password"
                        id="password"
                        className="registerform-control" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

