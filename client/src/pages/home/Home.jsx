import { useAuth } from "../../context/hooks/useAuth"

const Home = () => {
    const { user, loading } = useAuth()

    if (loading) return <p>Chargement...</p>
    if (!user) return <p>Non connecté</p>

    return (
        <div>
            <p>Connecté en tant que {user.name} ({user.role})</p>
        </div>
    )
}

export default Home