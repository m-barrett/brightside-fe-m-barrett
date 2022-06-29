import axios from 'axios';

export const getPatients = (status) => {
  return async () => axios.get(`http://localhost:3000/patients?status=${status}`)
}

export const getPatient = (id) => {
  return async () => axios.get(`http://localhost:3000/patients/${id}`)
}

export const getPatientIntake = (id) => {
  return async () => axios.get(`http://localhost:3000/patients/${id}/intake`)
}