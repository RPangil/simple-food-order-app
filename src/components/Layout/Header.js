import { Fragment } from "react";
import HeaderCartBtn from "./HeaderCartBtn";
import classes from './Header.module.css';
import mealHeaderImg from '../../assets/meals-header.jpg';

const Header = props =>
{
    return (
    <Fragment>
        <header className={classes.header}>
            <h1>Turo-Turo Haven</h1>
            <HeaderCartBtn onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealHeaderImg} alt='A table full of food' />
        </div>
    </Fragment>
    );
};

export default Header;