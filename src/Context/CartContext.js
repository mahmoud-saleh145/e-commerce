import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {


    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState('')
    function getHeaders() {
        return { token: localStorage.getItem('userToken') };
    }

    async function addProductToCart(id) {
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    productId: id
                },
                {
                    headers: getHeaders()
                }
            );
            return response;
        } catch (err) {
            return err;
        }
    }

    async function removeCartProduct(id) {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    headers: getHeaders()
                });
            return response;
        } catch (err) {
            return err;
        }
    }

    async function updateProductQuantity(id, count) {
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count,
            }, {
                headers: getHeaders()
            });
            return response;
        } catch (err) {
            return err;
        }
    }

    async function clearCart() {
        try {
            const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers: getHeaders() });
            return response;
        } catch (err) {
            return err;
        }
    }

    async function payment(shippingAddress) {
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
                shippingAddress: shippingAddress
            },
                {
                    headers: getHeaders()
                });
            return response;
        } catch (err) {
            return err;
        }
    }


    async function getLoggedCart() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: getHeaders()
            });

            return response;
        } catch (err) {
            return err;
        }
    }
    async function displayInitialValue() {
        const headers = getHeaders()
        if (headers.token !== null) {
            const { data } = await getLoggedCart()
            // console.log(data)
            if (data?.status === "success") {
                setNumOfCartItems(data?.numOfCartItems)
                setCartId(data?.data._id)
            }

        }
    }

    useEffect(() => {
        displayInitialValue()

    }, [])


    return (
        <CartContext.Provider value={{ addProductToCart, getLoggedCart, removeCartProduct, updateProductQuantity, setNumOfCartItems, numOfCartItems, payment, clearCart }}>{props.children}</CartContext.Provider>
    )
}



