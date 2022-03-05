export const generateUniqueId = () => {
    
    const random = Math.random().toString(20).substring(2)
    const dateTime = Date.now().toString(20)

    return random + dateTime

}

export const formatDate = date => {
    const newDate = new Date(date)
    const options = {
        year:'numeric', 
        month:'long', 
        day:'2-digit'
    }
    return newDate.toLocaleDateString("es-ES",options)
}

export const formatCurrency = (ammount) => {
    return ammount.toLocaleString('en-US', {
        style: 'currency',
        currency : 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0            
    })
}