import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPatientRecords } from "../../managers/ProviderManager"

export const PatientRecords = (props) => {

    const {patientId} = useParams()
    const [records, setRecords] = useState([])

    useEffect(() => {
        getPatientRecords(patientId)
        .then((data) => {
            const patientRecords = data
            setRecords(patientRecords)
        })
    },
    []
    )

    return (
        <article className="records">
            {
                records.map(record => {
                    return <section key={`record--${record.id}`} className="record">
                        <div className="record__datetime"> {record.visit_datetime}</div>
                        <div className="record__summary">Summary: {record.visit_summary}</div>
                        <div className="record__treatment">Treatment: {record.treatment}</div>
                        <div className="record__diagnosis">Diagnosis: {record.diagnosis}</div>
                        <div className="record__medication">Medication: {record.medication}</div>
                    </section>
                })
            }
        </article>
    )

}