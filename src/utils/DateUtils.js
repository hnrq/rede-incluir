export const getShortDate = (dateObject) => {
    if (dateObject.month !== undefined && dateObject.month !== null) {
        const monthNames = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
        ];
        return `${monthNames[dateObject.month]} de ${dateObject.year}`
    } else 
        return dateObject.year;
    }

export const getDateRange = (startDate, endDate, isCurrentWork) => {
    return `${getShortDate(startDate)} - ${isCurrentWork
        ? 'Até o momento'
        : getShortDate(endDate)}`;
}