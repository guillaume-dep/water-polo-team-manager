import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import logo from '../../images/RDM_logo.jpg'

import styles from '../styles/protectedLayout.module.css'

const ProtectedLayout = () => {
    return (
        <div className={styles.appContainer}>
            {/* Bannière globale */}
            <header className={styles.banner}>
                <img src={logo} alt="RDM logo" className={styles.logo} />
                <h1 className={styles.bannerTitle}>RDM WATER POLO</h1>
            </header>


            {/* Zone de contenu arrondie avec défilement */}
            <main className={styles.mainContent}>
                <Outlet />
            </main>

            {/* Barre de navigation inférieure */}
            <Navbar />
        </div>
    )
}

export default ProtectedLayout