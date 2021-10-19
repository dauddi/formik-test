import React, { useState, useEffect } from 'react'
import { Field } from 'formik';

const ItemCheckbox = ({ itemObject: item, checkedCategories, name, checkedState, Applicable_items }) => {
	const [checked, setChecked] = useState(null);

	useEffect(()=>{
		if (checkedCategories.includes(item.category) || checkedState === "all") {
			setChecked(true)
			if (!Applicable_items.includes(item.id)){
				Applicable_items.push(item.id)
			}
		}
		else {
			setChecked(null)
			if (Applicable_items.includes(item.id)){
				let index = Applicable_items.indexOf(item.id)
				index > -1 ? Applicable_items.splice(index, 1) : null
			}
		}
	},[checkedCategories, checkedState, Applicable_items, checked])

	return (
		<div className="container w-full ml-5">
			<Field
				checked={ checked }
				className="mr-2"
				type="checkbox"
				name= { name }
				value = { item.id }
					/>
			<label htmlFor={ name }> { item.name } </label>
		</div>
	)
}

export default ItemCheckbox;