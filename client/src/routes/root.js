import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from '../App';
import ErrorPage from '../ErrorPage';
import LoginPage from '../LoginPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: 'login',
        element: <LoginPage />
    }
])





        // <>
        //     <Route 
        //         path='/' 
        //         element={<App />}
        //         errorElement={<ErrorPage />}
        //         loader= { async () => {
        //             const PLAYLISTS_ENDOPOINT = 'http://localhost:4000/spotify/getPlaylists'
        //             return await SuperAgent
        //                 .post(PLAYLISTS_ENDOPOINT)
        //                 .send({
        //                 id: [
        //                     '6qOFCV5N40knhOFTwVw7C2', // 🥤
        //                     '5odKqjjuFtyv92914WvX0p', // coffee-music-spotify
        //                     '32vUazbtFYfFHucpjhSTUk', // vans
        //                     '4tOHIgXJpcpK6I7dh6jI6h'  // neosoul
        //                 ] 
        //                 })
        //                 .type('application/json')
        //                 .then( response => {
        //                     const playlistsData = response.body
        //                     return playlistsData
        //                     // setPlaylists(playlistsData)
        //                 })
        //                 .catch( err => console.log(err))
        //         }}
        //     />
        //     <Route path='login' element={<LoginPage />} />
        // </>
    // )


export default function Root() {

    return(<>
        <RouterProvider router={router} />
    </>)
}