import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { deleteInsurance, getInsurances } from "../../managers/PatientManager"


export const InsuranceList = (props) => {
    const history = useHistory()
    const [ insurances, setInsurances ] = useState([])
    const auth = localStorage.getItem("patientzen")
    const userId = JSON.parse(auth).user

    useEffect(() => {
        getInsurances(userId).then(data => setInsurances(data))
    }, [])

    return (
        <article className="insurances">
            <h2 className="insurance__title">Insurance List</h2>
            <button className="btn-addinsurance"
                        onClick={() => {
                            history.push(`/insuranceForm`)
                        }}
                        >Add Insurance</button>
            {
                insurances.map(insurance => {
                    return <section key={`insurance--${insurance.id}`} className="insurance">
                        <div className="insurance__name"> {insurance.name}</div>
                        <div className="insurance__phone_number">Insurance Phone Number: {insurance.phone_number}</div>
                        <div className="insurance__policy_number">Policy Number: {insurance.policy_number}</div>
                        <div className="insurance__validity"> Covered Dates {insurance.start_date} until {insurance.end_date} {insurance.state}</div>
                        <button className="btn-deleteinsurance"
                        onClick={() => {
                            deleteInsurance(insurance.id)
                            .then(() => {
                                getInsurances(userId).then(data => setInsurances(data))
                            })
                        }}
                        >Delete Insurance</button>
                    </section>
                })
            }
        </article>
    )
}