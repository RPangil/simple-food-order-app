import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const dbURL = 'https://simple-food-app-35758-default-rtdb.firebaseio.com/orders.json';

const Cart = props =>
{
	const [isOrdered, setIsOrdered] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setdidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);
	let totalAmount = cartCtx.totalAmount.toFixed(2);
	let hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) =>
	{
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) =>
	{
		cartCtx.addItem({...item, amount: 1});
	};

	const orderHandler = () =>
	{
		setIsOrdered(true);
	}

	const submitOrderHandler = async (userData) =>
	{
		setIsSubmitting(true);

		await fetch(dbURL,
		{
			method: 'POST',
			body: JSON.stringify(
			{
				user: userData,
				orderedItems: cartCtx.items
			})
		});

		setIsSubmitting(false);
		setdidSubmit(true);
		cartCtx.clearCart();
	};

	let cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem 
					key={item.id} 
					name={item.name} 
					amount={item.amount} 
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null,item.id)}
					onAdd={cartItemAddHandler.bind(null, item)} />
			))}
		</ul>
	);

	const modalButtons = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>Close</button>
			{hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total amount</span>
				<span>${totalAmount}</span>
			</div>
			{isOrdered && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
			{!isOrdered && modalButtons}
		</React.Fragment>
	);

	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
			<button className={classes.button} onClick={props.onClose}>Close</button>
			</div>
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
}

export default Cart;