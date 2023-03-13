export const isStaff = () => {
    const auth = localStorage.getItem("patientzen")
    const userType = JSON.parse(auth)
    return userType?.staff
}