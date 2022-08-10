import axios from 'axios'
import ErrorComponent from '../components/ErrorComponent'
const ABSENCE_MANAGER_URL = `http://localhost:3001/api/v1/`

export interface IResponse {
  Status: any
  data?: any
  error?: string
}
const getAbsenceManagerList = async () => {
  try {
    const response: any = await axios.get(`${ABSENCE_MANAGER_URL}absences`)
    console.log(response)
    let response1: IResponse = {
      data: response.data,
      Status: 200,
    }
    return response1
  } catch (error: any) {
    let response1: IResponse = {
      Status: error.code,
      error: error.message,
    }
    return response1
  }
}

const absenceManagerService = {
  getAbsenceManagerList,
}
export default absenceManagerService
