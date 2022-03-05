import { formatDate } from '../helpers'
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import IconHome from '../img/icon-home.svg'
import IconFood from '../img/icon-food.svg'
import IconHealth from '../img/icon-health.svg'
import IconEducation from '../img/icon-education.svg'
import IconTransportation from '../img/icon-transportation.svg'
import IconLeisure from '../img/icon-leisure.svg'
import IconSuscriptions from '../img/icon-suscriptions.svg'
import IconSavings from '../img/icon-savings.svg'
import IconMiscellaneous from '../img/icon-miscellaneous.svg' 


const Expense = ( {expense, setExpenseEdit, deleteExpense} ) => {

  const iconsDictionary = {
    home:IconHome,
    food:IconFood,
    health:IconHealth,
    education:IconEducation,
    transportation:IconTransportation,
    leisure:IconLeisure,
    suscriptions:IconSuscriptions,
    saving:IconSavings,
    miscellaneous:IconMiscellaneous  
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={ () => setExpenseEdit(expense) }>
        Edit
      </SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={ () => deleteExpense(expense.id) }
        destructive={true} //best effect on delete
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  )


  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="expense shadow">
              <div className="expense-content">
                  <img
                    className=""
                    src={iconsDictionary[expense.category]}
                    alt={expense.category}
                  />
                  <div className="expense-description">
                      <p className="category">{expense.category}</p>
                      <p className="expense-name">{expense.name}</p>                
                      <p className="expense-date">
                          Added on: {''}
                          <span>{formatDate(expense.date)}</span>
                      </p>
                  </div>
              </div>
              <p className='expense-ammount'>${expense.ammount}</p>
          </div>          
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense