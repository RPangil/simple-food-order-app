import classes from './MealsSummary.module.css';

const MealsSummary = () =>
{
    return (
        <section className={classes.summary}>
            <h2>Filipino Food, Delivered To You</h2>
            <p>
                Choose your favorite Filipino meal from our selection and enojoy a delicious lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients, and all use very well known Filipino recipes.
            </p>
        </section>
    );
};

export default MealsSummary;