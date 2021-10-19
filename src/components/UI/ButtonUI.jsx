import React from 'react'
import Button from '@mui/material/Button';

const ButtonUI = (props) => {
	return (
		<Button onClick={props.onClick} style={{textTransform: 'none'}} type="submit" color="warning" centerRipple variant="contained" className="normal-case">
			{props.text}
		</Button>
)
}

export default ButtonUI
