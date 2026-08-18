const GroupCard = ({ groups, isLoading }) => {
    const renderGroups = () => {
        return (
            isLoading ? (
                <p>Chargement...</p>
            ) : groups.length === 0 ? (
                <p>Vous n'avez aucun groupe.</p>
            ) : (
                groups.map((group) => (
                    <div key={group._id}>
                        <h2>{group.name}</h2>
                        <p>NOM DU COACH</p>
                        <p>Code : {group.code}</p>
                    </div>
                ))
            )
        )

    }

    return (
        <div>
            {renderGroups()}
        </div>
    )
}

export default GroupCard