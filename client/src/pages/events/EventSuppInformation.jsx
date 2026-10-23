import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getEvent, addEventInformation } from '../../api/events.js'
import { useAuth } from '../../context/hooks/useAuth.js'
import ROLE from '../../../../shared/utils/role.js'
import EVENT_TYPE from '../../../../shared/utils/eventType.js'

import styles from '../../styles/events/eventSuppInformation.module.css'

const EMPTY_FORM = { meetingTime: '', opponent: '', notes: '' }

const FIELDS = [
    { name: 'meetingTime', label: 'Rendez-vous', maxLength: 30 },
    { name: 'opponent', label: 'Adversaire', maxLength: 30, matchOnly: true },
    { name: 'notes', label: 'Notes', maxLength: 500, multiline: true },
]

const EventSuppInformation = () => {
    const { id: groupId, eventId } = useParams()
    const { user } = useAuth()
    const isCoach = user.role === ROLE.COACH

    const [event, setEvent] = useState(null)
    const [form, setForm] = useState(EMPTY_FORM)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEvent(groupId, eventId)
                setEvent(data)
                setForm({
                    meetingTime: data.meetingTime ?? '',
                    opponent: data.opponent ?? '',
                    notes: data.notes ?? '',
                })
            } catch (err) {
                console.error("Error occured while retrieving the event", err)
                setError("Impossible de charger l'événement")
            } finally {
                setIsLoading(false)
            }
        }
        fetchEvent()
    }, [groupId, eventId])

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleBlur = async (e) => {
        const { name } = e.target
        if (form[name] === (event[name] ?? '')) return

        setError(null)
        try {
            const updated = await addEventInformation(groupId, eventId, form)
            /* the PATCH response has `group` as an id, getEvent returns it populated */
            setEvent((prev) => ({ ...prev, ...updated, group: prev.group }))
        } catch (err) {
            setError(err.response?.data?.message ?? "Erreur lors de l'enregistrement")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') e.target.blur()
    }

    const renderEditableFields = () =>
        visibleFields.map(({ name, label, maxLength, multiline }) => {
            /* the field can either be a text area or an input, enable \n*/
            const Field = multiline ? 'textarea' : 'input'
            return (
                <div key={name} className={styles.infoItem}>
                    <label className={styles.infoLabel} htmlFor={name}>
                        {label}
                    </label>
                    <Field
                        id={name}
                        name={name}
                        className={`${styles.input} ${multiline ? styles.textarea : ''}`}
                        value={form[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        maxLength={maxLength}
                    />
                </div>
            )
        })

    const renderReadOnlyFields = () => (
        <>
            {visibleFields.map(({ name, label }) =>
                event[name] ? (
                    <div key={name} className={styles.infoItem}>
                        <span className={styles.infoLabel}>{label}</span>
                        <span className={styles.infoValue}>{event[name]}</span>
                    </div>
                ) : null
            )}
            {!hasInformation && (
                <p className={styles.emptyText}>Aucune information supplémentaire.</p>
            )}
        </>
    )

    if (isLoading) {
        return (
            <main className={styles.statusContainer}>
                <p className={styles.loadingText}>Chargement de l'événement...</p>
            </main>
        )
    }

    if (!event) {
        return (
            <main className={styles.statusContainer}>
                <p className={styles.errorText} role="alert">{error}</p>
            </main>
        )
    }

    const isMatch = event.eventType === EVENT_TYPE.MATCH
    const visibleFields = FIELDS.filter((f) => !f.matchOnly || isMatch)
    const hasInformation = visibleFields.some((f) => event[f.name])

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>{event.name}</h1>

            <Link
                to={`/groups/${groupId}/events/${eventId}/responses`}
                className={styles.responsesCard}
                aria-label="Voir les réponses"
            >
                <div className={styles.responsesContent}>
                    <span className={styles.responsesTitle}>Réponses</span>
                    <span className={styles.responsesSubtitle}>Voir qui participe à l'événement</span>
                </div>

                <div className={styles.responsesDivider} />

                <span className={styles.responsesArrow}>
                    <svg
                        className={styles.arrowIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </span>
            </Link>

            <div className={styles.infoList}>
                {isCoach ? renderEditableFields() : renderReadOnlyFields()}
            </div>

            {error && <p className={styles.errorText} role="alert">{error}</p>}
        </main>
    )
}

export default EventSuppInformation