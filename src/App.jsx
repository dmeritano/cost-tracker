import { useState, useEffect } from 'react'
import Header from './components/Header'
import ExpensesList from './components/ExpensesList'
import ModalWindow from './components/ModalWindow'
import Filters from './components/Filters'
import { generateUniqueId } from './helpers'
import IconAddNewExpense from './img/icon-add.svg'

function App() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('cost-app-budget')) ?? 0
  )
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [expenses, setExpenses] = useState(
    localStorage.getItem('cost-app-expenses') ? 
    JSON.parse(localStorage.getItem('cost-app-expenses')) : []
  )

  const [expenseEdit, setExpenseEdit] = useState({})

  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([''])


  useEffect( () => {
    if ( Object.keys(expenseEdit).length > 0){
      setModal(true)
      setTimeout( () => {
        setAnimateModal(true)
      }, 400)     
    }
  },[expenseEdit])

  const handleNewExpense = () => {
    setModal(true)
    setExpenseEdit({})
    setTimeout( () => {
      setAnimateModal(true)
    }, 400)
  }

  useEffect( () => {
    localStorage.setItem('cost-app-budget', budget ?? 0)
  },[budget])

  useEffect( () => {
    localStorage.setItem('cost-app-expenses', JSON.stringify(expenses) ?? [])
  })

  useEffect( () => {
    if(filter){
      const filtered = expenses.filter( expense => expense.category === filter)
      setFilteredExpenses(filtered)


    }else{
      //All
    }

  },[filter])

  useEffect( () => {
    const budgetLocalStorage = Number(localStorage.getItem('cost-app-budget')) ?? 0
    if (budgetLocalStorage > 0){
      setIsValidBudget(true)
    }
  },[])

  const saveExpense = expense => {
 
    if (expense.id){
      //Editing
      const  updatedExpenses = expenses.map ( expenseState => 
                expenseState.id === expense.id ? expense : expenseState )
      setExpenses(updatedExpenses)
      setExpenseEdit({})
    }else{
      //New
      expense.id = generateUniqueId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])  
    }    
    setAnimateModal(false)
    setTimeout( () => {
        setModal(false)
    },500)    

  }

  const deleteExpense = id => {
    const  updatedExpenses = expenses.filter ( expenseState => expenseState.id !== id)
    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? 'fix' : ''}>
      <Header 
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters 
              filter={filter}
              setFilter={setFilter}
            />
            <ExpensesList 
              expenses={expenses}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>        
          <div className="new-expense">
            <img
              src={IconAddNewExpense}
              alt="New Expense Icon"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal && 
        <ModalWindow 
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          budget={budget}
          expenses={expenses}
          expenseEdit={expenseEdit}
          setExpenseEdit={setExpenseEdit}
        />
      }

    </div>
  )
}

export default App
