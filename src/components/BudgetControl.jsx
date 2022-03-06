import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { formatCurrency } from '../helpers'


const BudgetControl = ( {budget, 
            expenses, 
            setExpenses, 
            setBudget, 
            setIsValidBudget} ) => {

    const [percent, setPercent] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect( () => {
        const totalSpent = expenses.reduce( (total, expense) => expense.ammount + total, 0)
        setSpent(totalSpent)
        const totalAvailable = budget - totalSpent
        setAvailable(totalAvailable)        
        const newPercent = ( ( ( budget - totalAvailable ) / budget ) * 100).toFixed(2)
        
        setTimeout( () => {
            setPercent(newPercent)
        },1000)
        
    }, [expenses])

    const handleResetData = () => {
        const resetConfirm = confirm('Are you sure to delete all stored information?')
        if (resetConfirm){
            setBudget(0)
            setExpenses([])    
            setIsValidBudget(false)
        }
    }

    return (
        <div className="budget-container container shadow two-rows">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percent > 100 ? '#FA7A77' : '#5481F8',
                        trailColor:'#C7D5FA',
                        textColor: percent > 100 ? '#FA7A77' : '#5481F8'
                    })}
                    text={`${percent}% spent`}
                    value={percent}
                />
                
            </div>

            <div className="budget-content">

                <button 
                    className='reset-data'
                    type='button'
                    onClick={handleResetData}
                >
                    Reset Data
                </button>

                <p>
                    <span>Budget: </span>{formatCurrency(budget)}
                </p>

                <p className={`${available < 0 ? 'negative' : ''}`}>
                    <span>Available: </span>{formatCurrency(available)}
                </p>

                <p>
                    <span>Spent: </span>{formatCurrency(spent)}
                </p>

            </div>
        </div>
    )
}

export default BudgetControl