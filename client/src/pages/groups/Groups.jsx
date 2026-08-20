import { useGroups } from "../../hooks/useGroups.js"
import GroupCard from "../../components/groups/GroupCard.jsx"
import { NavLink } from "react-router-dom"
import ROLE from "../../../../shared/utils/role.js"
import { useAuth } from "../../context/hooks/useAuth.js"
import styles from '../../styles/groups/groups.module.css'
import { useState } from "react"
import { deleteGroup } from "../../api/groups.js"

const Groups = () => {
    const { user } = useAuth()
    const { groups, isLoading } = useGroups()
    const isCoach = user.role === ROLE.COACH

    const handleOnDelete = (groups) => {

    }

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Mes groupes</h1>
                {isCoach && (
                    <NavLink
                        to="/groups/create"
                        className={styles.addButton}
                        aria-label="Créer un groupe"
                        title="Créer un groupe"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </NavLink>
                )}
                {!isCoach && (
                    <NavLink
                        to="/groups/join"
                        className={styles.addButton}
                        aria-label="Rejoindre un groupe"
                        title="Rejoindre un groupe"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                    </NavLink>
                )}
            </header>

            <section className={styles.content}>
                <GroupCard groups={groups} isLoading={isLoading} />
            </section>
        </main>
    )
}

export default Groups