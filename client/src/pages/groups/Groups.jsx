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
        <div>Groups</div>
    )

}

export default Groups