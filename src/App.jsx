import React from 'react'
import './App.css'
import TaxForm from './components/TaxForm'
import CreateTaxDialog from './components/UI/CreateTaxDialog'

const App = () => {

  return (
    <div className="container w-screen flex flex-row align-baseline justify-center mx-auto">
		{/* <CreateTaxDialog title="Add Tax"></CreateTaxDialog> */}
		<TaxForm />
    </div>
  )
}

export default App
