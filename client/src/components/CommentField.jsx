import { useEffect, useState } from 'react'
import styles from '../styles/responses/comment.module.css'

const CommentField = ({ mode = 'edit', comment, onSubmit, disabled }) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (mode === 'edit') {
            setValue(comment ?? '')
        }
    }, [comment, mode])

    if (mode === 'read') {
        if (!comment) return null

        return (
            <p className={styles.comment}>
                {comment}
            </p>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (disabled || !onSubmit) return

        onSubmit(value)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.commentSection}>
            <div className={styles.commentInputGroup}>
                <input
                    type="text"
                    placeholder="Ajouter un commentaire..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={disabled}
                    className={styles.commentInput}
                />

                <button
                    type="submit"
                    disabled={disabled || !value.trim()}
                    className={styles.submitCommentButton}
                    aria-label="Envoyer le commentaire"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
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
    )
}

export default CommentField