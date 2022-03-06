import Expense from "./Expense" 

const ExpensesList = ( {expenses, 
        setExpenseEdit,
        deleteExpense, 
        filter,
        filteredExpenses
      } ) => {
  
  return (
    <div className="expenses-list container">
        {
          filter ? (
            <>
              <h2>{filteredExpenses.length ? 'Expenses' : 'No expenses charged'}</h2>
              {
                filteredExpenses.map( expense => (
                  <Expense 
                    key={expense.id}
                    expense={expense}
                    setExpenseEdit={setExpenseEdit}
                    deleteExpense={deleteExpense}
                  />
                ))
              }
            </>
          ) : (
            <>
              <h2>{expenses.length ? 'Expenses' : 'No expenses charged'}</h2>
              {
                expenses.map( expense => (
                  <Expense 
                    key={expense.id}
                    expense={expense}
                    setExpenseEdit={setExpenseEdit}
                    deleteExpense={deleteExpense}
                  />
                ))
              }
            </>
          )
        }


    </div>
  )
}

export default ExpensesList