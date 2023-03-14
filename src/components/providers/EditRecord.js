import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getPatients, getProviders } from "../../managers/ProviderManager.js"
import { updateRecord, getRecord } from '../../managers/ProviderManager.js'

export const EditRecord = () => {
    const history = useHistory()
    const {recordId} = useParams()
    const [patients, setPatients] = useState([])
    const [providers, setProviders] = useState([])
    const [record, setUpdateRecord] = useState({
        patient: 0,
        provider: 0,
        visit_datetime: "",
        visit_summary: "",
        diagnosis: "",
        treatment: "",
        medication: ""
    })

    useEffect(() => {
        getRecord(recordId)
        .then((data) => {
            const singleRecord = data
            setUpdateRecord(singleRecord)
        })
        }, 
        [recordId]
    )

    useEffect(() => {
        getPatients().then(data => setPatients(data))
    }, [])

    useEffect(() => {
        getProviders().then(data => setProviders(data))
    }, [])


    return (
        <form className="recordForm">
            <h2 className="recordForm__title">Edit Patient Record</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="patient-dropdown">Varify Patient Name and Date Of Birth</label>
                    <select
                    value={record.patient.id}
                    onChange={(evt) => {
                        const copy= {...record}
                            copy.patient.id = parseInt(evt.target.value) 
                            setUpdateRecord(copy)}}>
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
                    <label htmlFor="provider-dropdown">Find Correct Provider</label>
                    <select
                    value={record.provider.id}
                    onChange={(evt) => {
                        const copy= {...record}
                            copy.provider.id = parseInt(evt.target.value) 
                            setUpdateRecord(copy)}}>
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
                    <label htmlFor="visit_datetime">Appointment Date and Time: </label>
                    <input
                        required
                        type="datetime-local"
                        className="form-control"
                        value={record.visit_datetime}
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.visit_datetime = evt.target.value
                                setUpdateRecord(copy)
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
                        value={record.visit_summary}
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.visit_summary = evt.target.value
                                setUpdateRecord(copy)
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
                        value={record.treatment}
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.treatment = evt.target.value
                                setUpdateRecord(copy)
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
                        value={record.diagnosis}
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.diagnosis = evt.target.value
                                setUpdateRecord(copy)
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
                        value={record.medication}
                        onChange={
                            (evt) => {
                                const copy = {...record}
                                copy.medication = evt.target.value
                                setUpdateRecord(copy)
                            }
                        } />
                </div>
            </fieldset>
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const record1 = {
                        patient: parseInt(record.patient.id),
                        provider: parseInt(record.provider.id),
                        visit_datetime: record.visit_datetime,
                        visit_summary: record.visit_summary,
                        treatment: record.treatment,
                        diagnosis: record.diagnosis,
                        medication: record.medication
                    }

                    // Send POST request to your API
                    updateRecord(record1, recordId)
                        .then(() => history.push("/patients"))
                }}
                className="btn btn-primary">Submit</button>


            </form>
    )
}