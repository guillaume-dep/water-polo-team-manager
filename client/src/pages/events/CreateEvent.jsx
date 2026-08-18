import { useEffect, useState } from "react"
import { createEvent } from "../../api/events"
import { getMyGroups } from "../../api/groups"
import State from '../../components/State.jsx'
import { useGroups } from "../../hooks/useGroups"
import { useNavigate } from "react-router-dom"

import styles from '../../styles/events/createEvent.module.css'

const CreateEvent = () => {
    const navigate = useNavigate()
    const { groups, isLoading } = useGroups()
    const [groupId, setGroupId] = useState(null)

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [eventType, setEventType] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isSubmitting) return

        try {
            setIsSubmitting(true)

            await createEvent(
                groupId,
                name,
                date,
                location,
                eventType
            )

            setSuccess(true)

            setTimeout(() => {
                navigate('/')
            }, 1500)
        }
        catch (err) {
            console.error("An error occured while creating an event", err)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>
                Créer un événement
            </h1>

            {success && (
                <div className={styles.stateContainer}>
                    <State
                        type="success"
                        message="Événement créé avec succès."
                    />
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>

                {/* Nom */}
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Nom
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.input}
                        placeholder="Ex: Entraînement U16"
                    />
                </div>

                {/* Date */}
                <div className={styles.formGroup}>
                    <label htmlFor="date" className={styles.label}>
                        Date
                    </label>
                    <input
                        id="date"
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                {/* Lieu */}
                <div className={styles.formGroup}>
                    <label htmlFor="location" className={styles.label}>
                        Lieu
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className={styles.input}
                        placeholder="Ex: Piscine Municipale"
                    />
                </div>

                {/* Type d'événement */}
                <div className={styles.formGroup}>
                    <label htmlFor="eventType" className={styles.label}>
                        Type d'événement
                    </label>
                    <select
                        id="eventType"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        required
                        className={styles.select}
                    >
                        <option value="" disabled>Sélectionner un type</option>
                        <option value="training">Entraînement</option>
                        <option value="match">Match</option>
                    </select>
                </div>

                {/* Groupe */}
                <div className={styles.formGroup}>
                    <label htmlFor="group" className={styles.label}>
                        Groupe associé
                    </label>
                    <select
                        id="group"
                        value={groupId ?? ''}
                        onChange={(e) => setGroupId(e.target.value)}
                        disabled={isLoading}
                        required
                        className={styles.select}
                    >
                        <option value="" disabled>
                            {isLoading ? 'Chargement des groupes...' : 'Sélectionner un groupe'}
                        </option>
                        {groups?.map((group) => (
                            <option key={group._id} value={group._id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className={styles.submitButton}
                >
                    {isSubmitting ? (
                        <>
                            <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Création...
                        </>
                    ) : (
                        'Créer l’événement'
                    )}
                </button>
            </form>
        </main>
    )
}

export default CreateEvent