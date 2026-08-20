import { useEffect, useState } from 'react'

import styles from '../../styles/responses/responses.module.css'

const Responses = ({
    currentStatus,
    onResponseChange,
    disabled
}) => {
    const [comment, setComment] = useState('')

    const handleStatusClick = (status) => {
        console.log('1. CLICK', status)
        console.log('2. onResponseChange =', onResponseChange)
        console.log('3. disabled =', disabled)

        if (disabled || !onResponseChange) return

        onResponseChange(status, comment)
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
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M7.5 8a4.5 4.5 0 1 1 9 0c0 3-4.5 4.5-4.5 5.5" />
                            <circle cx="12" cy="18" r="0.5" fill="currentColor" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Responses