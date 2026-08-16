import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/hooks/useAuth.js'
import { login } from '../../api/auth.js'
import styles from '../../styles/auth/login.module.css'

const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const data = await login(formData.email, formData.password)
            setUser(data)
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message || 'Email ou mot de passe incorrect.')
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

                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />

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
                        Vous n'avez pas encore de compte ?{' '}
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