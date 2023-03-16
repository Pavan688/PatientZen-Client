import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { createAppointment, getOffices } from "../../managers/PatientManager.js"
import { getPatients, getProviders } from "../../managers/ProviderManager.js"

export const AppointmentForm = () => {
    const history = useHistory()
    const [patients, setPatients] = useState([])
    const [providers, setProviders] = useState([])
    const [offices, setOffice] = useState([])
    const [appointment, setAppointment] = useState({
        patient: 0,
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
        <form className="recordForm">
            <h2 className="appointmentForm__title">New Appointment Form</h2>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="patient-dropdown">Select Your Name and Verify Date Of Birth</label>
                    <select
                    onChange={(evt) => {
                        const copy= {...appointment}
                            copy.patient = parseInt(evt.target.value) 
                            setAppointment(copy)}}>
                    <option value={0} type="select" className="form-dropdown" required>Find Your Name</option>
                    {
                        patients.map(
                            (patient1) => {
                                return <option key={`patient--${patient1.id}`} value={patient1.id}>{patient1.full_name} and DOB: {patient1.DOB}</option>
                            }
                        )
                    }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="provider-dropdown">Choose Provider</label>
                    <select
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
                <div className="form-group">
                    <label htmlFor="office-dropdown">Choose Office</label>
                    <select
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
                <div className="form-group">
                    <label htmlFor="time">Appointment Date: </label>
                    <input
                        required
                        type="date"
                        className="form-control"
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
                <div className="form-group">
                    <label htmlFor="date">Appointment Time:</label>
                    <input
                        required
                        type="time"
                        min="08:00"
                        max="19:00"
                        className="form-control"
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
                <div className="form-group">
                    <label htmlFor="">Summary Of Visit: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
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
                className="btn btn-primary">Submit</button>


            </form>
    )
}