import React from 'react'
import { Field } from 'formik';

const Category = ({ category, checkedState, children }) => {
	return (
		<React.Fragment>
			<div className=" pl-2 py-1 container w-full bg-gray-300 rounded">
				<Field
					checked={ checkedState === "all" ? true : null }
					className="mr-2"
					type="checkbox"
					name="checkedCategories"
					value={category} />
				<label htmlFor={category}> {category === "None" ? " " : category} </label>
			</div>
			{ children }
		</React.Fragment>
	)
}

export default Category;
