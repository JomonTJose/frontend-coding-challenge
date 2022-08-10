import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import absenceManagerService from '../services/absence-manager.service'
import moment from 'moment'
import CustomLoader from './CustomLoader'
import { DisplayColumnns, Columns } from '../models/absences.model'
import ErrorComponent from './ErrorComponent'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const numberofRowsPerPage: number[] = [10]

const customFilterWrapper = {
  display: `flex`,
  alignItems: `center`,
  marginLeft: `50px`,
}

const displayFlex = {
  display: `flex`,
}

const AbsenceManager = () => {
  const [absencesList, setabsencesList] = useState<DisplayColumnns[]>([])
  const [loading, setLoading] = useState(false)
  const [filterDropdownValue, setFilterDropdownValue] = useState('')
  const [filteredAbsenceList, setFilteredAbsenceList] = useState<DisplayColumnns[]>([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const fetchAbsencesList = () => {
    setLoading(true)
    try {
      absenceManagerService.getAbsenceManagerList().then((response) => {
        var dispayData: DisplayColumnns[] = []
        let status: string
        if (response.data) {
          response.data.forEach((item: any) => {
            if (item.confirmedAt != null) {
              status = `Confirmed`
            } else if (!item.rejectedAt) {
              status = `Rejected`
            } else {
              status = `Pending`
            }
            let startDate = moment(item.startDate)
            let endDate = moment(item.endDate)
            let period = endDate.diff(startDate, 'days')
            dispayData.push({
              AbsenceType: item.type,
              MemberName: item.memInfo[0].name,
              Period: period,
              Status: status,
              AdmitterNote: item.admitterNote,
              MemberNote: item.memberNote,
              EndDate: moment(item.endDate).format('DD-MM-YYYY'),
              StartDate: moment(item.startDate).format('DD-MM-YYYY'),
            })
          })
          setabsencesList(dispayData)
          setLoading(false)
        } else if (response.error) {
          console.log(response.error)
          setError(true)
          setErrorMessage(response.error)
          setLoading(false)
        }
      })
    } catch (error: any) {
      console.log(error)
      setError(true)
      setErrorMessage(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAbsencesList()
  }, [])

  const conditionalRowStyles = [
    {
      when: (row: any) => row.Status === `Confirmed`,
      style: {
        backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row: any) => row.Status === `Pending`,
      style: {
        backgroundColor: 'rgba(248, 148, 6, 0.9)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row: any) => row.Status === `Rejected`,
      style: {
        backgroundColor: 'rgba(242, 38, 19, 0.9)',
        color: 'white',
        '&:hover': {
          cursor: 'not-allowed',
        },
      },
    },
  ]

  const dropDownValueChanged = (event: any) => {
    setFilterDropdownValue(event.target.value)
    var list = absencesList.filter((abs) => abs.AbsenceType === event.target.value)
    var filteredList: DisplayColumnns[] = []
    list.forEach((item: any, index) => {
      filteredList.push({
        AbsenceType: item.AbsenceType,
        MemberName: item.MemberName,
        Period: item.Period,
        Status: item.Status,
        AdmitterNote: item.AdmitterNote,
        MemberNote: item.MemberNote,
        EndDate: moment(item.endDate).format('DD-MM-YYYY'),
        StartDate: moment(item.startDate).format('DD-MM-YYYY'),
      })
    })
    setFilteredAbsenceList(filteredList)
  }

  return (
    <div data-testid="AbsenceManager" className="AbsenceManager">
      {loading ? (
        <CustomLoader />
      ) : (
        <div data-testid="Datatable">
          {error ? (
            <ErrorComponent errorMessage={errorMessage} />
          ) : (
            <>
              <header>Absence Manager</header>
              <p>Total Number of Absences ({absencesList.length})</p>
              <form>
                <h5 style={displayFlex}>Filters</h5>
                <div className="form-group" style={customFilterWrapper}>
                  <label>
                    Type
                    <select
                      data-testid="selectLeaveType"
                      value={filterDropdownValue}
                      onChange={dropDownValueChanged}
                      style={{ marginLeft: '0.5em' }}
                    >
                      <option value="">All</option>
                      <option value="vacation">Vacation</option>
                      <option value="sickness">Sickness</option>
                    </select>
                  </label>
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                      name="startDate"
                      dateFormat="MM/dd/yyyy"
                    />
                    <button className="btn btn-primary">Show Date</button>
                  </div>
                </div>
              </form>
              <DataTable
                columns={Columns}
                data={filteredAbsenceList.length > 0 ? filteredAbsenceList : absencesList}
                defaultSortFieldId={1}
                paginationRowsPerPageOptions={numberofRowsPerPage}
                pagination
                conditionalRowStyles={conditionalRowStyles}
                persistTableHead
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AbsenceManager
