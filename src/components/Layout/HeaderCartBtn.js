import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartBtn.module.css';

const HeaderCartBtn = props =>
{
    const cartCtx = useContext(CartContext);
    const [btnAnimated, setBtnAnimated] = useState(false);
    let btnClasses = `${classes.button} ${btnAnimated ? classes.bump : ''}`;
    let {items} = cartCtx;

    let numberOfCartItems = cartCtx.items.reduce((currNum, item) => 
    {
        return currNum + item.amount;
    }, 0);

    useEffect(() => 
    {
        if(items.length === 0)
        {
            return;
        }

        setBtnAnimated(true);

        let timer = setTimeout(() =>
        {
            setBtnAnimated(false);
        }, 300);

        return () =>
        {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartBtn;