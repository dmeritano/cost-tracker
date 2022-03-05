import Expense from "./Expense" 

const ExpensesList = ( {expenses, setExpenseEdit,deleteExpense } ) => {
  return (
    <div className="expenses-list container">
        <h2>{expenses.length ? 'Expenses' : 'No expenses charged'}</h2>

        {expenses.map( expense => (
          <Expense 
            key={expense.id}
            expense={expense}
            setExpenseEdit={setExpenseEdit}
            deleteExpense={deleteExpense}
          />
        ))}
    </div>
  )
}

export default ExpensesList