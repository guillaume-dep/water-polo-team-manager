import PersonCard from "../../components/PersonCard.jsx"
import { useAuth } from "../../context/hooks/useAuth"
import { logout } from "../../api/auth.js"
import ROLE from "../../../../shared/utils/role.js"

import styles from "../../styles/profile/profile.module.css"

const Profile = () => {
    const { user, setUser } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
            setUser(null)
        } catch (err) {
            console.log("Unable to logout", err)
        }
    }

    if (!user) {
        return (
            <main className={styles.loadingContainer}>
                <p>Chargement du profil...</p>
            </main>
        )
    }

    const roleLabel = user.role === ROLE.COACH ? "Coach" : "Joueur"

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Mon compte</h1>

            {/* Bloc 1 : Informations */}
            <section className={styles.infoCard}>
                <div className={styles.cardWrapper}>
                    <PersonCard person={user} />
                </div>

                <div className={styles.roleSection}>
                    <span className={styles.roleLabel}>Rôle</span>
                    <span className={styles.roleBadge}>{roleLabel}</span>
                </div>
            </section>

            {/* Bloc 2 : Déconnexion */}
            <section className={styles.logoutCard}>
                <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.logoutIcon}
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Se déconnecter</span>
                </button>
            </section>
        </main>
    )
}

export default Profile