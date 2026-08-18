import { useEffect, useState } from 'react'
import { getMyGroups } from '../api/groups.js'

export const useGroups = () => {
    const [groups, setGroups] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groups = await getMyGroups()
                setGroups(groups)
            } catch (err) {
                console.error(
                    'Error occured while retrieving groups',
                    err
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchGroups()
    }, [])

    return {
        groups,
        isLoading
    }
}
