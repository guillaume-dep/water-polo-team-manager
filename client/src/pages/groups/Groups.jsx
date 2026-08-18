const Groups = () => {

    const handleAction = () => {
        if (role === ROLE.COACH) {
            navigate('/groups/create')
        }
        if (role === ROLE.PLAYER) {
            navigate('/groups/join')
        }
    }
    return (
        <div>Mes equipes</div>
    )

}

export default Groups