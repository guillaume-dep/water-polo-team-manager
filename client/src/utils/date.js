export const formatEventDate = (dateString) => {
    const date = new Date(dateString)
    return {
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase(),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase().replace('.', ''),
        time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')
    }
}