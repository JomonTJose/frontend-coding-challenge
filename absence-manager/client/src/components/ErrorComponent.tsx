import { useLocation, useNavigate } from 'react-router-dom'
import '../index.css'

const ErrorComponent = ({ errorMessage }: any) => {
  return (
    <div data-testid="errorSection">
      {errorMessage ? (
        errorMessage
      ) : (
        <div>
          <p>Something happened. Reload the page or check with the site owner</p>
        </div>
      )}
    </div>
  )
}

export default ErrorComponent
