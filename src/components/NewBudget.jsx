import {useState} from 'react'
import Message from './Message'

const NewBudget = ({
    budget, 
    setBudget, 
    setIsValidBudget} ) => {


  const [message, setMessage] = useState('')

  const handleBudget = (evt) => {
    
    evt.preventDefault();

    if ( !budget || budget < 0 ){
      setMessage("Entered budget is not valid!")
      setBudget(0)
      return
    }

    //Valid budget - Remove messsage from statte
    setMessage('')
    setIsValidBudget(true)


  }

  return (
    <div className="budget-container container shadow">

        <form onSubmit={handleBudget} className="form">
            <div className="field">

              <label>Set Budget</label>

              <input
                className="new-budget"
                type="number"
                placeholder="Enter budget amount"
                value={budget}
                onChange={ evt => setBudget(Number(evt.target.value))}              
              />

              <input type="submit" value="Confirm" />

              <div>
                {message && <Message type="error">{message}</Message>}
              </div>
              

            </div>
        </form>

    </div>
  )
}

export default NewBudget