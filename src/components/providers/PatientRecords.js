import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const PatientRecords = () => {

    const {patientId} = useParams
    const {records, setRecords} = useState([])


}