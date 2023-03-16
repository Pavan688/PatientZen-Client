import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getPatientRecords, getSingleProviders } from "../../managers/ProviderManager"

export const PatientRecords = (props) => {

    const {patientId} = useParams()
    const auth = localStorage.getItem("patientzen")
    const userId = JSON.parse(auth).user
    const [records, setRecords] = useState([])
    const [providers, setProviders] = useState([])
    const history = useHistory()

    useEffect(() => {
        getPatientRecords(patientId)
        .then((data) => {
            const patientRecords = data
            setRecords(patientRecords)
        })
    },
    []
    )

    useEffect(() => {
        getSingleProviders(userId).then(data => setProviders(data))
    }, [])

    return (
        <article className="records">
            
            <h2 className="record__title">Patient Records</h2>
            
            {
                records.map(record => {
                    return <section key={`record--${record.id}`} className="record">
                        <div className="record__datetime" > {record.visit_datetime}</div>
                        <div className="record__name-dob" > {record.patient.full_name} DOB: {record.patient.DOB}</div>
                        <div className="record__summary">Summary: {record.visit_summary}</div>
                        <div className="record__treatment">Treatment: {record.treatment}</div>
                        <div className="record__diagnosis">Diagnosis: {record.diagnosis}</div>
                        <div className="record__medication">Medication: {record.medication}</div>
                        <div>
                            {
                                record.provider.id === providers.id ?
                                <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                    history.push(`/editRecords/${record.id}`)
                                }}
                            >Edit Record</button>
                            :
                            <div></div>
                            }
                        </div>
                    </section>
                })
            }
        </article>
    )

}