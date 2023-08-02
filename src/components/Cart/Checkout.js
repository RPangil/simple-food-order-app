import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isValidZip = (value) => value.trim().length !== 5;

const Checkout = (props) =>
{
	const [formInputIsValid, setFormInputIsValid] = useState(
	{
		name: true,
		street: true,
		city: true,
		zip: true
	});
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const cityInputRef = useRef();
	const zipInputRef = useRef();

	const confirmHandler = (event) =>
	{
		event.preventDefault();

		let enteredName = nameInputRef.current.value;
		let enteredStreet = streetInputRef.current.value;
		let enteredCity = cityInputRef.current.value;
		let enteredZip = zipInputRef.current.value;

		let nameIsValid = !isEmpty(enteredName);
		let streetIsValid = !isEmpty(enteredStreet);
		let cityIsValid = !isEmpty(enteredCity);
		let zipIsValid = !isValidZip(enteredZip);
		
		setFormInputIsValid(
		{
			name: nameIsValid,
			street: streetIsValid,
			city: cityIsValid,
			zip: zipIsValid
		});

		let fromisValid = nameIsValid && streetIsValid && cityIsValid && zipIsValid;

		if(!fromisValid)
		{
			return;
		}

		props.onConfirm(
		{
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			zip: enteredZip
		});
	};

	let nameControlClasses = `${classes.control} ${formInputIsValid.name ? '' : classes.invalid}`;
	let streetControlClasses = `${classes.control} ${formInputIsValid.street ? '' : classes.invalid}`;
	let cityControlClasses = `${classes.control} ${formInputIsValid.city ? '' : classes.invalid}`;
	let zipControlClasses = `${classes.control} ${formInputIsValid.zip ? '' : classes.invalid}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formInputIsValid.name && <p>Please enter your name</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
				{!formInputIsValid.street && <p>Please enter your street address</p>}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef} />
				{!formInputIsValid.city && <p>Please enter your city name</p>}
			</div>
			<div className={zipControlClasses}>
				<label htmlFor='zip'>ZIP Code</label>
				<input type='text' id='zip' ref={zipInputRef} />
				{!formInputIsValid.zip && <p>Please enter your zip code</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>Cancel</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;