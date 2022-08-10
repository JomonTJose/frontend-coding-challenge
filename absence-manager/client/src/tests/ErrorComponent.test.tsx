import { render, screen, waitFor } from "@testing-library/react"
import ErrorComponent from "../components/ErrorComponent";

describe("Error Component Tests", () => {
    test("Render Basic Component", () => {
        render(
            <ErrorComponent errorMessage={"New Error"}/>
        )
        const linkElement = screen.getByTestId("errorSection");
        //const div = waitForElement(() => screen.getByTestId('divContainer'));
        expect(linkElement).toBeInTheDocument();
    })
})