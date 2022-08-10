export interface IAbsence {
  admitterId?: string
  admitterNote?: string
  confirmedAt?: string
  createdAt?: string
  crewId: number
  endDate: string
  id: number
  memberNote?: string
  rejectedAt: string
  startDate: string
  type: string
  userId: number
}

export interface DisplayColumnns {
  MemberName: string
  AbsenceType: string
  Period: number
  StartDate: string
  EndDate: string
  MemberNote?: string
  Status: string
  AdmitterNote?: string
}

export const Columns = [
  {
    id: 1,
    name: 'Name',
    selector: (row: any) => row.MemberName,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: 'Leave Type',
    selector: (row: any) => row.AbsenceType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    id: 3,
    name: 'Start Date',
    selector: (row: any) => row.StartDate,
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 4,
    name: 'End Date',
    selector: (row: any) => row.EndDate,
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 5,
    name: 'Number of Days',
    selector: (row: any) => row.Period,
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 6,
    name: 'Member Remarks',
    selector: (row: any) => row.MemberNote,
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 7,
    name: 'Admitter Remarks',
    selector: (row: any) => row.AdmitterNote,
    sortable: true,
    right: true,
    reorder: true,
  },
  {
    id: 8,
    name: 'Status',
    selector: (row: any) => row.Status,
    sortable: true,
    right: true,
    reorder: true,
  },
]
