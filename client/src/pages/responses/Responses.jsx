import { useEffect, useState } from 'react'
import styles from '../../styles/responses/responses.module.css'

const Responses = ({
    currentStatus,
    currentComment,
    onResponseChange,
    disabled
}) => {
    const [comment, setComment] = useState('')

    useEffect(() => {
        setComment(currentComment ?? '')
    }, [currentComment])

    const handleStatusClick = (status) => {
        console.log('1. CLICK', status)
        console.log('2. onResponseChange =', onResponseChange)
        console.log('3. disabled =', disabled)

        if (disabled || !onResponseChange) return

        onResponseChange(status, comment)
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()

        if (disabled || !onResponseChange || !currentStatus) return

        onResponseChange(currentStatus, comment)
    }

    const getButtonClass = (status, colorClass) => {
        const isSelected = currentStatus === status
        const hasSelection = currentStatus !== null

        return `${styles.responseButton} ${styles[colorClass]} ${isSelected
            ? styles.active
            : hasSelection
                ? styles.unselected
                : ''
            }`
    }

    return (
        <div className={styles.responsesContainer}>

            <div className={styles.responseHeader}>

                <span className={styles.responseLabel}>
                    MA RÉPONSE
                </span>

                <div className={styles.responses}>

                    {/* Présent */}
                    <button
                        type="button"
                        disabled={disabled}
                        aria-label="Présent"
                        className={getButtonClass('present', 'present')}
                        onClick={() => handleStatusClick('present')}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M5 12l4 4L19 6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Absent */}
                    <button
                        type="button"
                        disabled={disabled}
                        aria-label="Absent"
                        className={getButtonClass('absent', 'absent')}
                        onClick={() => handleStatusClick('absent')}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    {/* Incertain */}
                    <button
                        type="button"
                        disabled={disabled}
                        aria-label="Incertain"
                        className={getButtonClass(
                            'uncertain',
                            'uncertain'
                        )}
                        onClick={() => handleStatusClick('uncertain')}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M9.5 9a2.5 2.5 0 1 1 4.3 1.8c-.8.8-1.8 1.2-1.8 2.7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            <circle
                                cx="12"
                                cy="17"
                                r="1"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                </div>
            </div>

            <form
                onSubmit={handleCommentSubmit}
                className={styles.commentSection}
            >
                <div className={styles.commentInputGroup}>

                    <input
                        type="text"
                        placeholder="Ajouter un commentaire..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={disabled}
                        className={styles.commentInput}
                    />

                    <button
                        type="submit"
                        disabled={disabled || !comment.trim()}
                        className={styles.submitCommentButton}
                        aria-label="Envoyer le commentaire"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M22 2L11 13"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <path
                                d="M22 2L15 22L11 13L2 9L22 2Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                </div>
            </form>

        </div>
    )
}

export default Responses