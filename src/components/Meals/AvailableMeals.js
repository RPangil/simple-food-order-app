import MealItem from './MealItem';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';

const dbURL = 'https://simple-food-app-35758-default-rtdb.firebaseio.com/meals.json';

const AvailableMeals = () =>
{
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMeals = useCallback(async () => 
    {
        setIsLoading(true);
        setError(null);

        try
        {
            let response = await fetch(dbURL);

            if(!response.ok)
            {
                throw new Error('Something went wrong');
            }

            let data = await response.json();
            let mealsList = [];

            for(let key in data)
            {
                mealsList.push(
                {
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            }

            setMeals(mealsList);
        }
        catch(err)
        {
            setError(err.message);
        }

        setIsLoading(false);
    }, []);

    useEffect(() =>
    {
        fetchMeals();
    }, [fetchMeals]);

    let content = <p>No meals found</p>;

    if(meals.length > 0)
    {
        content = meals.map((meal) =>
            <MealItem 
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    }

    if(error)
    {
        content = <p>{error}</p>
    }

    if(isLoading)
    {
        content = <p>Loading...</p>
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {content}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;