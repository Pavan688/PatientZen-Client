import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getUserRecords } from "../../managers/PatientManager"

export const Records = (props) => {


    const [records, setRecords] = useState([])

    const auth = localStorage.getItem("patientzen")
    const userId = JSON.parse(auth).user

    useEffect(() => {
        getUserRecords(userId)
        .then((data) => {
            const patientRecords = data
            setRecords(patientRecords)
        })
    },
    []
    )

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
                    </section>
                })
            }
        </article>
    )

}