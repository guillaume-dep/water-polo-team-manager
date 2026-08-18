import { useGroups } from "../../hooks/useGroups.js"
import GroupCard from "../../components/groups/GroupCard.jsx"
import { NavLink } from "react-router-dom"
import ROLE from "../../../../shared/utils/role.js"
import { useAuth } from "../../context/hooks/useAuth.js"

const Groups = () => {
    const { user } = useAuth()
    const { groups, isLoading } = useGroups()
    const isCoach = user.role === ROLE.COACH

    return (
        <main>
            <h1>Mes groupes</h1>
            {isCoach && (
                <NavLink to="/groups/create">
                    Créer un groupe
                </NavLink>
            )}
            <GroupCard groups={groups} isLoading={isLoading} />
        </main>
    )
}

export default Groups