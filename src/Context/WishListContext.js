import axios from 'axios';
import { createContext } from 'react'

export const WishListContext = createContext();


export default function WishListContextProvider(props) {

    let headers = {
        token: localStorage.getItem('userToken')
    }

    async function addProductToWishList(id) {
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
                {
                    productId: id
                },
                {
                    headers
                }
            );
            return response;
        } catch (err) {
            return err;
        }
    }

    async function getLoggedWishList() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers
            });
            return response;
        } catch (err) {
            return err;
        }
    }

    async function removeWishListProduct(id) {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                {
                    headers
                });
            return response;
        } catch (err) {
            return err;
        }

    }

    return (
        <WishListContext.Provider value={{ addProductToWishList, getLoggedWishList, removeWishListProduct }}>{props.children}</WishListContext.Provider>
    )

}
