import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getPatients, getProviders } from "../../managers/ProviderManager.js"
import { createRecord } from '../../managers/ProviderManager.js'

export const RecordForm = () => {
    const history = useHistory()
    const auth = localStorage.getItem("patientzen")
    const userId = JSON.parse(auth).user
    const [patients, setPatients] = useState([])
    const [providers, setProviders] = useState([])
    const [record, setRecord] = useState({
        patient: 0,
        provider: userId,
        visit_datetime: "",
        visit_summary: "",
        diagnosis: "",
        treatment: "",
        medication: ""
    })

    useEffect(() => {
        getPatients().then(data => setPatients(data))
    }, [])

    useEffect(() => {
        getProviders().then(data => setProviders(data))
    }, [])


    return (
        <form className="recordForm">
            <h2 className="recordForm__title">New Record Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="patient-dropdown">Verify Patient Name and Date Of Birth</label>
                    <select
                    onChange={(evt) => {
                        const copy= {...record}
                            copy.patient = parseInt(evt.target.value) 
                            setRecord(copy)}}>
                    <option value={0} type="select" className="form-dropdown" required>Select a Patient</option>
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
                    <label htmlFor="visit_datetime">Appointment Date and Time: </label>
                    <input
                        required
                        type="datetime-local"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.visit_datetime = evt.target.value
                                setRecord(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="">Summary: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.visit_summary = evt.target.value
                                setRecord(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="treatment">Treatment: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.treatment = evt.target.value
                                setRecord(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="diagnosis">Diagnosis: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.diagnosis = evt.target.value
                                setRecord(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="meication">Medication: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.medication = evt.target.value
                                setRecord(copy)
                            }
                        } />
                </div>
            </fieldset>
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const record1 = {
                        patient: parseInt(record.patient),
                        provider: userId,
                        visit_datetime: record.visit_datetime,
                        visit_summary: record.visit_summary,
                        treatment: record.treatment,
                        diagnosis: record.diagnosis,
                        medication: record.medication
                    }

                    // Send POST request to your API
                    createRecord(record1)
                        .then(() => history.push("/patients"))
                }}
                className="btn btn-primary">Submit</button>


            </form>
    )
}