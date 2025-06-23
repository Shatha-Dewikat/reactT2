import { createBrowserRouter } from "react-router";

import ErrorPage from "./pages/error/ErrorPage";
import MainLayout from "./layout/MainLayout";
import Home from "./home/Home";
import Shop from "./pages/shop/Shop";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";

const routers = createBrowserRouter([
{
    path:'/',
    element:<MainLayout/> ,
    errorElement:<ErrorPage/>,
    children:[
        {
            path:'/',
            element:<Home/>
        },
         {
            path:'/product/:id',
            element:<Product/>

        },
        {
            path:'/shop',
            element:<Shop/>
        },
        {
            path:'/login',
            element:<Login/>

        },
        {
            path:'/register',
            element:<Register/>
        },
        {
             path:'/cart',
             element:<Cart/>
        }


    ],
}
]);
export default routers;

