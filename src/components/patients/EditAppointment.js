import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getAppointment, getOffices, updateAppointment } from "../../managers/PatientManager.js"
import { getPatients, getProviders } from "../../managers/ProviderManager.js"

export const EditAppointment = () => {
    const history = useHistory()
    const {appointmentId} = useParams()
    const [patients, setPatients] = useState([])
    const [providers, setProviders] = useState([])
    const [offices, setOffice] = useState([])
    const [appointment, setUpdateAppointment] = useState({
        patient: 0,
        provider: 0,
        date: "",
        time: "",
        office: 0,
        visit_summary: ""
    })

    useEffect(() => {
        getAppointment(appointmentId)
        .then((data) => {
            const singleRecord = data
            setUpdateAppointment(singleRecord)
        })
        }, 
        [appointmentId]
    )

    useEffect(() => {
        getOffices().then(data => setOffice(data))
    }, [])

    useEffect(() => {
        getPatients().then(data => setPatients(data))
    }, [])

    useEffect(() => {
        getProviders().then(data => setProviders(data))
    }, [])


    return (
        <form className="appointmentForm">
            <h2 className="appointmentForm__title">Edit Appointment</h2>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="patient-dropdown">Select Your Name and Verify Date Of Birth</label>
                    <select
                    value={appointment.patient.id}
                    onChange={(evt) => {
                        const copy= {...appointment}
                            copy.patient.id = parseInt(evt.target.value) 
                            setUpdateAppointment(copy)}}>
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
                    value={appointment.provider.id}
                    onChange={(evt) => {
                        const copy= {...appointment}
                            copy.provider.id = parseInt(evt.target.value) 
                            setUpdateAppointment(copy)}}>
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
                    value={appointment.office.id}
                    onChange={(evt) => {
                        const copy= {...appointment}
                            copy.office.id = parseInt(evt.target.value) 
                            setUpdateAppointment(copy)}}>
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
                        value={appointment.date}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.date = evt.target.value
                                setUpdateAppointment(copy)
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
                        value={appointment.time}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.date = evt.target.value
                                setUpdateAppointment(copy)
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
                        value={appointment.visit_summary}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.visit_summary = evt.target.value
                                setUpdateAppointment(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const appointment1 = {
                        patient: parseInt(appointment.patient.id),
                        provider: parseInt(appointment.provider.id),
                        office: parseInt(appointment.office.id),
                        date: appointment.date,
                        time: appointment.time,
                        visit_summary: appointment.visit_summary
                    }

                    // Send POST request to your API
                    updateAppointment(appointment1, appointmentId)
                        .then(() => history.push("/appointments"))
                }}
                className="btn btn-primary">Submit</button>


            </form>
    )
}