import axios from 'axios';

export const getPatients = () => {
  return async () => axios.get(`http://localhost:3000/patients`)
}