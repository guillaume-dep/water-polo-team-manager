import { useGroups } from "../../hooks/useGroups.js"

const Groups = () => {
    const { groups, isLoading } = useGroups()

    return (
        <main>
            <h1>Mes groupes</h1>

            {isLoading ? (
                <p>Chargement...</p>
            ) : groups.length === 0 ? (
                <p>Vous n'avez aucun groupe.</p>
            ) : (
                groups.map((group) => (
                    <div key={group._id}>
                        <h2>{group.name}</h2>
                        <p>Code : {group.code}</p>
                    </div>
                ))
            )}
        </main>
    )
}

export default Groups