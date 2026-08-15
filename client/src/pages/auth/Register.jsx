import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { register } from '../../api/auth.js'
import styles from '../../styles/auth/Register.module.css'

const Register = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'player',
    })

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError(null)
        setLoading(true)

        try {
            await register(
                formData.name,
                formData.email,
                formData.password,
                formData.role
            )

            navigate('/login')
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Une erreur est survenue lors de l’inscription.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className={styles.page}>
            <div className={styles.formBox}>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <span className={styles.title}>
                        Créer un compte
                    </span>

                    <span className={styles.subtitle}>
                        Crée ton compte pour rejoindre ton équipe.
                    </span>

                    <div className={styles.formContainer}>

                        <input
                            type="text"
                            name="name"
                            className={styles.input}
                            placeholder="Nom complet"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />

                        <input
                            type="email"
                            name="email"
                            className={styles.input}
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />

                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />

                    </div>

                    <div className={styles.roleContainer}>
                        <label htmlFor="role">
                            Rôle
                        </label>

                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="player">
                                Joueur
                            </option>

                            <option value="coach">
                                Coach
                            </option>
                        </select>
                    </div>

                    {error && (
                        <p className={styles.error}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Inscription...' : 'S’inscrire'}
                    </button>
                </form>

                <div className={styles.formSection}>
                    <p>
                        Vous avez déjà un compte ?{' '}
                        <Link to="/login">
                            Se connecter
                        </Link>
                    </p>
                </div>

            </div>
        </main>
    )
}

export default Register