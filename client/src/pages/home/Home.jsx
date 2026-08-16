import { useAuth } from "../../context/hooks/useAuth.js"
import { useNavigate } from "react-router-dom"

import ROLE from "../../../../shared/utils/role.js"
import styles from "../../styles/home/home.module.css"

const Home = () => {
    const { user } = useAuth()
    const name = user.name
    const role = user.role

    const navigate = useNavigate()

    const handleButton = () => {
        if (user.role === ROLE.COACH) {
            return (
                <button onClick={() => navigate('/groups/create')}>
                    Créer un groupe
                </button>
            )
        }
        else if (user.role === ROLE.PLAYER) {
            return (
                <button onClick={() => navigate('/groups/join')}>
                    Rejoindre un groupe
                </button>
            )
        }

    }

    return (
        <div className={styles}>

            <div>{handleButton()}</div>
            <div>
                <p>Connecté en tant que {name} ({role})</p>
            </div>

        </div>
    )
}

export default Home