import PersonCard from "../../components/PersonCard.jsx"
import { useAuth } from "../../context/hooks/useAuth"

const Profile = () => {
    const { user } = useAuth()

    return (
        <main>
            <h1>Votre profil</h1>
            <PersonCard person={user} />
        </main>
    )
}

export default Profile