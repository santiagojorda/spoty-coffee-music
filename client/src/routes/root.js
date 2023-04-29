import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements, Routes} from 'react-router-dom';

import App from '../App';
import ErrorPage from '../ErrorPage';
import LoginPage from '../LoginPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<App />} errorElement={<ErrorPage />} />
            <Route path='login' element={<LoginPage />} />
        </>
    )
)

export default function Root() {

    return(<>
        <RouterProvider router={router} />
    </>)
}