import { NavLink } from 'react-router-dom'
import styles from "../styles/navbar.module.css"

const HomeIcon = () => (
    <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
    </svg>
)

const CalendarIcon = () => (
    <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

const TeamIcon = () => (
    <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-1a6 6 0 0 1 12 0v1" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M16 14a5 5 0 0 1 5 5v2" />
    </svg>
)

const ProfileIcon = () => (
    <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
)

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `${styles.button} ${isActive ? styles.active : ''}`
                }
                aria-label="Accueil"
            >
                <HomeIcon />
            </NavLink>

            <NavLink
                to="/events"
                className={({ isActive }) =>
                    `${styles.button} ${isActive ? styles.active : ''}`
                }
                aria-label="Événements"
            >
                <CalendarIcon />
            </NavLink>

            <NavLink
                to="/groups"
                className={({ isActive }) =>
                    `${styles.button} ${isActive ? styles.active : ''}`
                }
                aria-label="Équipes"
            >
                <TeamIcon />
            </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `${styles.button} ${isActive ? styles.active : ''}`
                }
                aria-label="Profil"
            >
                <ProfileIcon />
            </NavLink>
        </nav>
    )
}

export default Navbar