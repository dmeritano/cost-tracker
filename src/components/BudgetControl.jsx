import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { formatCurrency } from '../helpers'


const BudgetControl = ( {budget, expenses} ) => {

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


    return (
        <div className="budget-container container shadow two-rows">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor:'#33FF5C',
                        trailColor:'#C4FDD0'
                    })}
                    text={`${percent}% spent`}
                    value={percent}
                />
                
            </div>

            <div className="budget-content">
                <p>
                    <span>Budget: </span>{formatCurrency(budget)}
                </p>

                <p>
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