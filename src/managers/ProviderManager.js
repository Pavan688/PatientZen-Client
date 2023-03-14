const auth = localStorage.getItem("patientzen")
const token = JSON.parse(auth).token

export const getPatients = () => {
    return fetch("http://localhost:8000/patients", {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}

export const getProviders = () => {
    return fetch("http://localhost:8000/providers", {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}

export const getPatientRecords = (patientId) => {
    return fetch(`http://localhost:8000/records?patient=${patientId}`, {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}

export const getAppointments = (userId) => {
    return fetch(`http://localhost:8000/appointments?user=${userId}`, {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
}