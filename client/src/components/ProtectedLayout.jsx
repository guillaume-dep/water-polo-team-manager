import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const ProtectedLayout = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>

            <Navbar />
        </>
    )
}

export default ProtectedLayout