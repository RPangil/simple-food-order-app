import classes from './Card.module.css';

const Card = props =>
{
    let pClasses = props.className;

    if(pClasses === undefined)
    {
        pClasses = '';
    }

    return (
        <div className={`${classes.card} ${pClasses}`}>
            {props.children}
        </div>
    );
};

export default Card;