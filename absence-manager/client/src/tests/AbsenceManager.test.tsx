import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AbsenceManager from "../components/AbsenceManager"
import absenceManagerService, { IResponse } from '../services/absence-manager.service'

describe("Absence Manager Component", ()=>{
    let originFetch: any;
    beforeEach(() => {
        originFetch = (global as any).fetch;
    });
    afterEach(() => {
        (global as any).fetch = originFetch;
    });
    
    test("Render Basic Component", () => {
        render(
            <AbsenceManager />
        )
        const linkElement = screen.getByTestId("AbsenceManager");
        expect(linkElement).toBeInTheDocument();
    })
    
    test("Render datatable in the component", async () => {
        const mockData = [
            {
                "_id": "62efb6d05d9f8e6dfa1d7ded",
                "admitterId": null,
                "admitterNote": "Sorry",
                "confirmedAt": null,
                "createdAt": "2021-01-03T17:36:52.000+01:00",
                "crewId": 352,
                "endDate": "2021-01-05",
                "id": 2521,
                "memberNote": "ganzer tag",
                "rejectedAt": "2021-01-03T17:39:50.000+01:00",
                "startDate": "2021-01-05",
                "type": "vacation",
                "userId": 2664,
                "memInfo": [
                    {
                        "_id": "62efb6dd9b92b1dc37b16a41",
                        "crewId": 352,
                        "id": 2650,
                        "image": "https://loremflickr.com/300/400",
                        "name": "Mike",
                        "userId": 2664
                    }
                ]
            },
            {
                "_id": "62efb6d05d9f8e6dfa1d7dff",
                "admitterId": null,
                "admitterNote": "Works nicely!",
                "confirmedAt": "2021-03-10T19:37:38.000+01:00",
                "createdAt": "2021-03-10T19:37:23.000+01:00",
                "crewId": 352,
                "endDate": "2021-03-11",
                "id": 3656,
                "memberNote": "",
                "rejectedAt": null,
                "startDate": "2021-03-11",
                "type": "vacation",
                "userId": 644,
                "memInfo": [
                    {
                        "_id": "62efb6dd9b92b1dc37b16a40",
                        "crewId": 352,
                        "id": 709,
                        "image": "https://loremflickr.com/300/400",
                        "name": "Max",
                        "userId": 644
                    }
                ]
            },
            {
            "_id": "62efb6d05d9f8e6dfa1d7dee",
            "admitterId": null,
            "admitterNote": "",
            "confirmedAt": null,
            "createdAt": "2021-01-25T10:04:51.000+01:00",
            "crewId": 352,
            "endDate": "2021-02-06",
            "id": 2904,
            "memberNote": "",
            "rejectedAt": "2021-01-25T10:14:44.000+01:00",
            "startDate": "2021-02-02",
            "type": "vacation",
            "userId": 5293,
            "memInfo": [
                {
                    "_id": "62efb6dd9b92b1dc37b16a43",
                    "crewId": 352,
                    "id": 5876,
                    "image": "https://loremflickr.com/300/400",
                    "name": "Daniel",
                    "userId": 5293
                }
            ]
        }]
        const fakeResponse: IResponse = {
            Status: 200,
            data:mockData
        }
        const mockAbsencesList = jest.spyOn(absenceManagerService, "getAbsenceManagerList").mockResolvedValue(fakeResponse);
        const mRes = { json: jest.fn().mockResolvedValueOnce(mockAbsencesList) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
        (global as any).fetch = mockedFetch;
        
        render(
            <AbsenceManager />
        )
        await waitFor(() => {
            const linkElement = screen.getByTestId("Datatable");
            const leaveTypeDropDownElement = screen.getByTestId("selectLeaveType")
            expect(linkElement).toBeInTheDocument();
            expect(leaveTypeDropDownElement).toBeInTheDocument();
          });
    })

    test("Render Error Component in the main component when an error is encountered", async () => {
        const fakeResponse: IResponse = {
            Status: 200,
            error: "Network Error"
        }
        const mockAbsencesList = jest.spyOn(absenceManagerService, "getAbsenceManagerList").mockResolvedValue(fakeResponse);
        const mRes = { json: jest.fn().mockResolvedValueOnce(mockAbsencesList) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
        (global as any).fetch = mockedFetch;
        
        render(
            <AbsenceManager />
        )
        await waitFor(() => {
            const linkElement = screen.getByTestId("errorSection");
            //const div = waitForElement(() => screen.getByTestId('divContainer'));
            expect(linkElement).toBeInTheDocument();
          });
    })

    test("Change Leave Type Filter in the component", async () => {
        const mockData = [
            {
                "_id": "62efb6d05d9f8e6dfa1d7ded",
                "admitterId": null,
                "admitterNote": "Sorry",
                "confirmedAt": null,
                "createdAt": "2021-01-03T17:36:52.000+01:00",
                "crewId": 352,
                "endDate": "2021-01-05",
                "id": 2521,
                "memberNote": "ganzer tag",
                "rejectedAt": "2021-01-03T17:39:50.000+01:00",
                "startDate": "2021-01-05",
                "type": "vacation",
                "userId": 2664,
                "memInfo": [
                    {
                        "_id": "62efb6dd9b92b1dc37b16a41",
                        "crewId": 352,
                        "id": 2650,
                        "image": "https://loremflickr.com/300/400",
                        "name": "Mike",
                        "userId": 2664
                    }
                ]
            },
            {
                "_id": "62efb6d05d9f8e6dfa1d7dff",
                "admitterId": null,
                "admitterNote": "Works nicely!",
                "confirmedAt": "2021-03-10T19:37:38.000+01:00",
                "createdAt": "2021-03-10T19:37:23.000+01:00",
                "crewId": 352,
                "endDate": "2021-03-11",
                "id": 3656,
                "memberNote": "",
                "rejectedAt": null,
                "startDate": "2021-03-11",
                "type": "vacation",
                "userId": 644,
                "memInfo": [
                    {
                        "_id": "62efb6dd9b92b1dc37b16a40",
                        "crewId": 352,
                        "id": 709,
                        "image": "https://loremflickr.com/300/400",
                        "name": "Max",
                        "userId": 644
                    }
                ]
            },
            {
            "_id": "62efb6d05d9f8e6dfa1d7dee",
            "admitterId": null,
            "admitterNote": "",
            "confirmedAt": null,
            "createdAt": "2021-01-25T10:04:51.000+01:00",
            "crewId": 352,
            "endDate": "2021-02-06",
            "id": 2904,
            "memberNote": "",
            "rejectedAt": "2021-01-25T10:14:44.000+01:00",
            "startDate": "2021-02-02",
            "type": "vacation",
            "userId": 5293,
            "memInfo": [
                {
                    "_id": "62efb6dd9b92b1dc37b16a43",
                    "crewId": 352,
                    "id": 5876,
                    "image": "https://loremflickr.com/300/400",
                    "name": "Daniel",
                    "userId": 5293
                }
            ]
        }]
        const fakeResponse: IResponse = {
            Status: 200,
            data:mockData
        }
        const mockAbsencesList = jest.spyOn(absenceManagerService, "getAbsenceManagerList").mockResolvedValue(fakeResponse);
        const mRes = { json: jest.fn().mockResolvedValueOnce(mockAbsencesList) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
        (global as any).fetch = mockedFetch;
        
        render(
            <AbsenceManager />
        )
        await waitFor(() => {
            const leaveTypeDropDownElement = screen.getByTestId("selectLeaveType")
            fireEvent.change(leaveTypeDropDownElement, {target:{value: 'vacation'}})
            const linkElement = screen.getByTestId("Datatable");
            expect(linkElement).toBeInTheDocument();
          });
    })
})
