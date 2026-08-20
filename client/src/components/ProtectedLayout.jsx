import { Outlet } from 'react-router-dom'

import logo from '../../images/RDM_logo.jpg'
import Navbar from './Navbar.jsx'

import styles from '../styles/protectedLayout.module.css'

const ProtectedLayout = () => {
    return (
        <div className={styles.appContainer}>

            <header className={styles.banner}>
                <img src={logo} alt="RDM logo" className={styles.logo} />
                <h1 className={styles.bannerTitle}>RDM WATER POLO</h1>
            </header>

            <main className={styles.mainContent}>
                <Outlet />
            </main>

            <Navbar />
        </div>
    )
}

export default ProtectedLayout