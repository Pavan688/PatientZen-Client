import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { createAppointment, getOffices } from "../../managers/PatientManager.js"
import { getPatients, getProviders } from "../../managers/ProviderManager.js"

export const AppointmentForm = () => {
    const history = useHistory()
    const auth = localStorage.getItem("patientzen")
    const userId = JSON.parse(auth).user
    const [patients, setPatients] = useState([])
    const [providers, setProviders] = useState([])
    const [offices, setOffice] = useState([])
    const [appointment, setAppointment] = useState({
        patient: userId,
        provider: 0,
        date: "",
        time: "",
        office: 0,
        visit_summary: ""
    })

    useEffect(() => {
        getPatients().then(data => setPatients(data))
    }, [])

    useEffect(() => {
        getProviders().then(data => setProviders(data))
    }, [])

    useEffect(() => {
        getOffices().then(data => setOffice(data))
    }, [])


    return (
        <form className="appointmentForm">
            <h2 className="appointmentForm__title">New Appointment Form</h2>

            <fieldset>
                <div className="appointmentform-group">
                    <label className="appointment-label" htmlFor="provider-dropdown">Choose Provider</label>
                    <select className="appointment-select"
                    onChange={(evt) => {
                        const copy= {...appointment}
                            copy.provider = parseInt(evt.target.value) 
                            setAppointment(copy)}}>
                    <option value={0} type="select" className="form-dropdown" required>Select Provider</option>
                    {
                        providers.map(
                            (provider1) => {
                                return <option key={`provider--${provider1.id}`} value={provider1.id}>{provider1.full_name}</option>
                            }
                        )
                    }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="appointmentform-group">
                    <label className="appointment-label" htmlFor="office-dropdown">Choose Office</label>
                    <select className="appointment-select"
                    onChange={(evt) => {
                        const copy= {...appointment}
                            copy.office = parseInt(evt.target.value) 
                            setAppointment(copy)}}>
                    <option value={0} type="select" className="form-dropdown" required>Select Office</option>
                    {
                        offices.map(
                            (office1) => {
                                return <option key={`provider--${office1.id}`} value={office1.id}>{office1.address}</option>
                            }
                        )
                    }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="appointmentform-group">
                    <label className="appointment-label" htmlFor="date">Appointment Date: </label>
                    <input
                        required
                        type="date"
                        className="appointmentform-control"
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.date = evt.target.value
                                setAppointment(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="appointmentform-group">
                    <label className="appointment-label" htmlFor="time">Appointment Time:</label>
                    <input
                        required
                        type="time"
                        min="08:00"
                        max="19:00"
                        className="appointmentform-control"
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.time = evt.target.value
                                setAppointment(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="appointmentform-group">
                    <label className="appointment-label" htmlFor="">Summary Of Visit: </label>
                    <input
                        required
                        type="text"
                        className="appointmentform-control"
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.visit_summary = evt.target.value
                                setAppointment(copy)
                            }
                        } />
                </div>
            </fieldset>
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const appointment2 = {
                        patient: parseInt(appointment.patient),
                        provider: parseInt(appointment.provider),
                        office: parseInt(appointment.office),
                        date: appointment.date,
                        time: appointment.time,
                        visit_summary: appointment.visit_summary
                    }

                    // Send POST request to your API
                    createAppointment(appointment2)
                        .then(() => history.push("/appointments"))
                }}
                className="btn-submitappointment">Submit</button>


            </form>
    )
}