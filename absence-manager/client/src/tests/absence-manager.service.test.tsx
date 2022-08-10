import axios from 'axios'
import absenceManagerService from '../services/absence-manager.service'
jest.mock('axios')

describe('fetchData', () => {
    it('gets absence list from API', async () => {
        const response = {
            data: [{}],
            Status: 200
        }
        axios.get = jest.fn().mockResolvedValue(response);
        await expect(absenceManagerService.getAbsenceManagerList()).resolves.toEqual(response);
    })
})