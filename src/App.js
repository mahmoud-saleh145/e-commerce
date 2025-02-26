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
      path: '',
      element: <LayOut />,
      children: [
        {
          index: true,
          element: <ProtectedRoute> <Home /></ProtectedRoute>,
        },
        { path: 'register', element: <Register /> },
        { path: 'Signin', element: <Signin /> },
        { path: 'Forgetpassword', element: <ForgetPassword /> },
        { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'WishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'Product', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'Catagories', element: <ProtectedRoute><Catagories /></ProtectedRoute> },
        { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'Checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'Details/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
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
