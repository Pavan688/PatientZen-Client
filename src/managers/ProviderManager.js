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

export const getRecord = (recordId) => {
    return fetch(`http://localhost:8000/records/${recordId}`, {
        headers:{
            "Authorization": `Token ${token}`
        }
    })
        .then(response => response.json())
} 

export const updateRecord = (record, recordId) => {
    return fetch(`http://localhost:8000/records/${recordId}`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(record)
    })
}