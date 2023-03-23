import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { createAppointment, createInsurance, getOffices } from "../../managers/PatientManager.js"

export const InsuranceForm = () => {
    const history = useHistory()
    const auth = localStorage.getItem("patientzen")
    const userId = JSON.parse(auth).user
    const [insurance, setInsurance] = useState({
        patient: userId,
        Name: "",
        phone_number: "",
        policy_number: "",
        start_date: "",
        end_date: ""
    })




    return (
        <form className="insuranceForm">
            <h2 className="insuranceForm__title">New Insurance Form</h2>

            <fieldset>
                <div className="insuranceform-group">
                    <label className="insurance-label" htmlFor="time">Insurance Name: </label>
                    <input
                        required
                        type="text"
                        className="insuranceform-control"
                        onChange={
                            (evt) => {
                                const copy = {...insurance}
                                copy.name = evt.target.value
                                setInsurance(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="insuranceform-group">
                    <label className="insurance-label" htmlFor="date">Insurance Phone Number:</label>
                    <input
                        required
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        className="insuranceform-control"
                        placeholder="###-###-####"
                        onChange={
                            (evt) => {
                                const copy = {...insurance}
                                copy.phone_number = evt.target.value
                                setInsurance(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="insuranceform-group">
                    <label className="insurance-label" htmlFor="">Policy Number: </label>
                    <input
                        required
                        type="text"
                        className="insuranceform-control"
                        onChange={
                            (evt) => {
                                const copy = {...insurance}
                                copy.policy_number = evt.target.value
                                setInsurance(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="insuranceform-group">
                    <label className="insurance-label" htmlFor="">Insurance Start Date: </label>
                    <input
                        required
                        type="date"
                        className="insuranceform-control"
                        onChange={
                            (evt) => {
                                const copy = {...insurance}
                                copy.start_date = evt.target.value
                                setInsurance(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="insuranceform-group">
                    <label className="insurance-label" htmlFor="">Insurance End Date: </label>
                    <input
                        required
                        type="date"
                        className="insuranceform-control"
                        onChange={
                            (evt) => {
                                const copy = {...insurance}
                                copy.end_date = evt.target.value
                                setInsurance(copy)
                            }
                        } />
                </div>
            </fieldset>
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const insurance2 = {
                        patient: userId,
                        name: insurance.name,
                        phone_number: insurance.phone_number,
                        policy_number: insurance.policy_number,
                        start_date: insurance.start_date,
                        end_date: insurance.end_date
                    }

                    // Send POST request to your API
                    createInsurance(insurance2)
                        .then(() => history.push("/insurances"))
                }}
                className="btn-insurancesubmit">Submit</button>


            </form>
    )
}