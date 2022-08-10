import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import absenceManagerService from '../services/absence-manager.service'
import moment from 'moment'
import CustomLoader from './CustomLoader'
import { DisplayColumnns, Columns } from '../models/absences.model'
import ErrorComponent from './ErrorComponent'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

const numberofRowsPerPage: number[] = [10]

const AbsenceManager = () => {
  const [absencesList, setabsencesList] = useState<DisplayColumnns[]>([])
  const [loading, setLoading] = useState(false)
  const [filterDropdownValue, setFilterDropdownValue] = useState('')
  const [filteredAbsenceList, setFilteredAbsenceList] = useState<DisplayColumnns[]>([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange

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
            let period = endDate.diff(startDate, 'days') + 1
            dispayData.push({
              AbsenceType: item.type,
              MemberName: item.memInfo[0].name,
              Period: period,
              Status: status,
              AdmitterNote: item.admitterNote,
              MemberNote: item.memberNote,
              EndDate: item.endDate,
              StartDate: item.startDate,
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
        EndDate: item.EndDate,
        StartDate: item.StartDate,
      })
    })
    setFilteredAbsenceList(filteredList)
  }
  const dateFilterValueChanged = (event: any) => {
    if (event[0] && event[1]) {
      var list = absencesList.filter(
        (abs) =>
          new Date(abs.StartDate) >= new Date(event[0]) &&
          new Date(abs.EndDate) <= new Date(event[1])
      )
      var filteredList: DisplayColumnns[] = []
      list.forEach((item: any, index) => {
        filteredList.push({
          AbsenceType: item.AbsenceType,
          MemberName: item.MemberName,
          Period: item.Period,
          Status: item.Status,
          AdmitterNote: item.AdmitterNote,
          MemberNote: item.MemberNote,
          EndDate: item.EndDate,
          StartDate: item.StartDate,
        })
      })
      setFilteredAbsenceList(filteredList)
    }
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
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col md="auto">Absence Manager</Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col md="auto">Total Number of Absences ({absencesList.length})</Col>
                </Row>
                <Row>
                  <Col md="auto">&nbsp;</Col>
                </Row>
                <Row className="">
                  <Col md={1}>Filters</Col>
                  <Col md={3}>
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
                  </Col>
                  <Col md={1}>
                    <label>Date Range</label>
                  </Col>
                  <Col md={3}>
                    <DatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(update) => {
                        setDateRange(update)
                        dateFilterValueChanged(update)
                      }}
                      isClearable={true}
                      name="startDate"
                      dateFormat="yyyy/MM/dd"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="auto">&nbsp;</Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <DataTable
                      columns={Columns}
                      data={
                        filterDropdownValue || (endDate && startDate)
                          ? filteredAbsenceList
                          : absencesList
                      }
                      defaultSortFieldId={1}
                      paginationRowsPerPageOptions={numberofRowsPerPage}
                      pagination
                      conditionalRowStyles={conditionalRowStyles}
                      persistTableHead
                    />
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AbsenceManager
