import { useState, useEffect } from 'react'
import Message from './Message'
import IconCloseModal from '../img/icon-close.svg'

const ModalWindow = ( {setModal, 
                       animateModal, 
                       setAnimateModal, 
                       saveExpense, 
                       budget, 
                       expenses,
                       expenseEdit,
                       setExpenseEdit } ) => {

    const [message, setMessage] = useState('')
    //Form
    const [name, setName] = useState('')
    const [ammount, setAmmount] = useState(0)
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')

    useEffect( () => {
        if ( Object.keys(expenseEdit).length > 0){
            setName(expenseEdit.name)
            setAmmount(expenseEdit.ammount)
            setCategory(expenseEdit.category)
            setId(expenseEdit.id)
            setDate(expenseEdit.date)
        }
    },[])


    const hideModal = () =>{
        
        setAnimateModal(false)
        setExpenseEdit({})
        setTimeout( () => {
            setModal(false)
        },500)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        //Al fields required
        if ([name,ammount,category].includes('')){
            setMessage("All fields are required!")

            setTimeout(() => {
                setMessage('')
            },4000)
            return;
        }

        //Enough money control
        const totalSpent = expenses.reduce( (total, expense) => expense.ammount + total, 0)
        const available = budget - totalSpent
        if (available - ammount < 0){
            setMessage("Not enough money. Available: $" + available)
            setTimeout(() => {
                setMessage('')
            },4000)
            return;            
        }

        //All was good
        saveExpense({
            name,
            ammount,
            category,
            id:id,
            date:date
        })
    }

    return (
        <div className="modal">
            <div className="close-modal">
                <img
                    src={IconCloseModal}
                    alt="Close Icon"
                    onClick={hideModal}
                />
            </div>

            
            <form onSubmit={handleSubmit} className={`form ${animateModal ? "animate" : "close"}`}>

                <legend>{expenseEdit.name ? 'Editing' : 'New Expense'}</legend>
                
                <div className="field">
                    <label htmlFor="name">Expense</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Add new expense name"
                        value={name}                    
                        onChange={ (evt) => setName(evt.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="Money spent" 
                        value={ammount}
                        onChange={ (evt) => setAmmount(Number(evt.target.value))}
                    />
                </div>

                <div className="field">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={ (evt) => setCategory(evt.target.value)}
                    >
                        <option value="">--- Select ---</option>
                        <option value="home">Home</option>                                                
                        <option value="food">Food & Beberage</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="transportation">Trasnportation</option>
                        <option value="leisure">Leisure</option>
                        <option value="suscriptions">Suscriptions</option>
                        <option value="saving">Savings</option>
                        <option value="miscellaneous">Miscellaneous</option>
                    </select>

                    <input
                        type="submit"
                        value={expenseEdit.name ? 'Update' : 'Add'}
                    />                                       
                </div>
                {message && <Message type="error">{message}</Message>} 
            </form>
        </div>
  )
}

export default ModalWindow