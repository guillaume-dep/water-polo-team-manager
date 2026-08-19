import { useState } from 'react'
import { joinGroup } from '../../api/groups.js'
import styles from '../../styles/groups/joinGroup.module.css'
import { useNavigate } from 'react-router-dom'

const JoinGroup = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isSubmitting) return

        try {
            setIsSubmitting(true)
            setError(null)

            await joinGroup(code)

            setSuccess(true)
            setCode('')
            setTimeout(() => {
                navigate('/groups')
            }, 1000)
        } catch (err) {
            console.error(
                'Error occured while sending join request',
                err
            )

            setError(
                err.response?.data?.message ||
                'Unable to send the request'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Rejoindre un groupe</h1>

            {(success || error) && (
                <div className={styles.stateContainer}>
                    {success && (
                        <p className={styles.successMessage}>
                            Demande envoyée au coach.
                        </p>
                    )}

                    {error && (
                        <p className={styles.errorMessage}>
                            {error}
                        </p>
                    )}
                </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="code">
                        Code du groupe
                    </label>

                    <input
                        id="code"
                        className={styles.input}
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Ex : A1B2C3"
                        required
                    />
                </div>

                <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className={styles.spinner}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className={styles.spinnerCircle}
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className={styles.spinnerPath}
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            <span>Envoi...</span>
                        </>
                    ) : (
                        'Envoyer la demande'
                    )}
                </button>
            </form>
        </main>
    )
}

export default JoinGroup