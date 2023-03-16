const auth = localStorage.getItem("patientzen")
const token = JSON.parse(auth).token

export const getUserRecords = (userId) => {
    return fetch(`http://localhost:8000/records?user=${userId}`, {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}

export const getPatientAppointments = (userId) => {
    return fetch(`http://localhost:8000/appointments?patientuser=${userId}`, {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}

export const getOffices = () => {
    return fetch(`http://localhost:8000/offices`, {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}

export const updateAppointment = (appointment, appointmentId) => {
    return fetch(`http://localhost:8000/appointments/${appointmentId}`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(appointment)
    })
}

export const getAppointment = (appointmentId) => {
    return fetch(`http://localhost:8000/appointments/${appointmentId}`, {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}

export const createAppointment = (appointment) => {
    return fetch("http://localhost:8000/appointments", {
    method: "POST",
        headers:{
            "Authorization": `Token ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(appointment)
    })
        .then(response => response.json())
}

export const getInsurances = (userId) => {
    return fetch(`http://localhost:8000/insurances?patientuser=${userId}`, {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}

export const deleteInsurance = (insuranceId) => {
    return fetch(`http://localhost:8000/insurances/${insuranceId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${token}`
        }
    })
}