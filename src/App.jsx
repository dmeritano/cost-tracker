import { useState, useEffect } from 'react'
import Header from './components/Header'
import ExpensesList from './components/ExpensesList'
import ModalWindow from './components/ModalWindow'
import { generateUniqueId } from './helpers'
import IconAddNewExpense from './img/icon-add.svg'

function App() {

  const [budget, setBudget] = useState(1000)
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [expenses, setExpenses] = useState([{
    id:'234234234',
    date:Date.now,
    name:'Carne picada',
    ammount:50,
    category:'food'
  },
  {
    id:'111112131',
    date:Date.now,
    name:'Pago Netflix',
    ammount:50,
    category:'suscriptions'
  }])
  const [expenseEdit, setExpenseEdit] = useState({})

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
      />

      {isValidBudget && (
        <>
          <main>
            <ExpensesList 
              expenses={expenses}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
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
