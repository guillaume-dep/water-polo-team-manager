import { useParams } from 'react-router-dom'
import { getJoinRequests } from '../../api/groups.js'
import { useEffect, useState } from 'react'
import PersonCard from '../../components/PersonCard.jsx'

import styles from '../../styles/groups/pendingRequests.module.css'

const PendingRequests = () => {
    const { id: groupId } = useParams()

    const [personRequests, setPersonRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPersonRequests = async () => {
            try {
                const data = await getJoinRequests(groupId)
                setPersonRequests(data)
            } catch (err) {
                console.error(
                    'Error occured while retrieving persons requests',
                    err
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchPersonRequests()
    }, [groupId])

    if (isLoading) {
        return <p>Chargement des demandes...</p>
    }

    if (personRequests.length === 0) {
        return <p>Aucune demande en attente.</p>
    }

    return (

        <div className={styles.container}>
            {personRequests.map((person) => (
                <PersonCard
                    key={person._id}
                    person={person}
                />
            ))}
        </div>
    )
}

export default PendingRequests