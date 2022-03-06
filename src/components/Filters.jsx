import { useState, useEffect } from 'react'

const Filters = ( {filter, setFilter} ) => {
  return (
    <div className='filters shadow container'>
        <form>
            <div className='field'>
                <label>Filter by expense type</label>
                <select
                    value={filter}
                    onChange={ evt => setFilter(evt.target.value)}
                >
                    <option value="">All Categories</option>
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
            </div>
        </form>
    </div>
  )
}

export default Filters