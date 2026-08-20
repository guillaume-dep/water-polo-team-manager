import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/hooks/useAuth.js'
import { login } from '../../api/auth.js'

import styles from '../../styles/auth/login.module.css'

const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

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
            const data = await login(formData.email, formData.password)
            setUser(data)
            navigate('/')
        } catch (error) {
            setError('Email ou mot de passe incorrect.')
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
                        Connexion
                    </span>

                    <span className={styles.subtitle}>
                        Connecte-toi à ton compte.
                    </span>

                    <div className={styles.formContainer}>
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

                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className={styles.input}
                                placeholder="Mot de passe"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={toggleShowPassword}
                                className={styles.togglePasswordBtn}
                                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                            >
                                {showPassword ? (

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
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
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div className={styles.formSection}>
                    <p>
                        Tu n'as pas encore de compte ?{' '}
                        <Link to="/register">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login