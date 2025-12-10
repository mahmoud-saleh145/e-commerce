import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayOut from './Pages/LayOut/LayOut';
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/register";
import NotFound from "./Pages/NotFound/NotFound";
import Signin from './Pages/Signin/Signin';
import Cart from './Components/Cart/Cart';
import WishList from './Components/WishList/WishList';
import Products from './Components/Products/Products'
import Catagories from './Components/Catagories/Catagories'
import Brands from './Components/Brands/Brands'
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Pages/Checkout/Checkout';
import AllOrders from './Pages/AllOrders/AllOrders';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import WishListContextProvider, { WishListContext } from './Context/WishListContext';

function App() {

  const queryClient = new QueryClient()
  const routers = createBrowserRouter([
    {
      path: '/',
      element: <LayOut />,
      children: [
        {
          index: true,
          element: <ProtectedRoute> <Home /></ProtectedRoute>,
        },
        { path: 'register', element: <Register /> },
        { path: 'signin', element: <Signin /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'product', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'catagories', element: <ProtectedRoute><Catagories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'details/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: '*', element: <NotFound /> }
      ],
    },
  ]);


  return (
    <WishListContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </UserContextProvider>
        </QueryClientProvider>
        <Toaster />
      </CartContextProvider>
    </WishListContextProvider>
  )
}

export default App;
