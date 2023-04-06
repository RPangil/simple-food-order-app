import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = 
{
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) =>
{
    let updatedItem;
    let updatedItems;

    if(action.type === 'ADD')
    {
        let existingCarItemIndex = state.items.findIndex((item) => (item.id === action.item.id));
        let existingCartItem = state.items[existingCarItemIndex];
        let updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        if(existingCartItem)
        {
            updatedItem =
            {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            updatedItems[existingCarItemIndex] = updatedItem;
        }
        else
        {
            updatedItem = {...action.item};
            updatedItems = state.items.concat(updatedItem);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'REMOVE')
    {
        let existingCarItemIndex = state.items.findIndex((item) => (item.id === action.id));
        let existingCartItem = state.items[existingCarItemIndex];
        let updatedTotalAmount = state.totalAmount - existingCartItem.price;

        if(existingCartItem.amount === 1)
        {
            updatedItems = state.items.filter((item) => (item.id !== action.id));
        }
        else
        {
            updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCarItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'CLEAR')
    {
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = (props) =>
{
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) =>
    {
        dispatchCartAction(
        {
            type: 'ADD',
            item: item
        });
    };

    const removeItemFromCartHandler = (id) =>
    {
        dispatchCartAction(
        {
            type: 'REMOVE',
            id: id
        });
    };

    const clearCartHandler = () =>
    {
        dispatchCartAction(
        {
            type: 'CLEAR'
        });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;