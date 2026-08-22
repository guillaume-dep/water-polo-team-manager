import { useState } from "react"
import { createGroup } from "../../api/groups"
import { useNavigate } from "react-router-dom"

import State from "../../components/State"

import styles from '../../styles/groups/createGroup.module.css'

const CreateGroup = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isSubmitting) return

        try {
            setIsSubmitting(true)
            setError(null)

            await createGroup(name)

            setSuccess(true)

            setTimeout(() => {
                navigate('/groups')
            }, 1000)

        } catch (err) {
            console.error(
                "An error occured while creating a group",
                err
            )

            setError("Impossible de créer le groupe.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Créer un groupe</h1>

                {success && (
                    <State
                        type="success"
                        message="Groupe créé avec succès."
                    />
                )}

                {error && (
                    <State
                        type="error"
                        message={error}
                    />
                )}

                {!success && (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>
                                Nom du groupe
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Ex : Groupe U16"
                                disabled={isSubmitting}
                                className={styles.input}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !name.trim()}
                            className={styles.submitButton}
                        >
                            {isSubmitting ? (
                                <span className={styles.loaderContainer}>
                                    <span className={styles.spinner}></span>
                                    Création...
                                </span>
                            ) : (
                                'Créer le groupe'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </main>
    )
}

export default CreateGroup