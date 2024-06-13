import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PrivateRoute, AdminRoute } from './components';
import {
  HomeScreen,
  ProductScreen,
  CartScreen,
  LoginScreen,
  RegisterScreen,
  ShippingScreen,
  PaymentScreen,
  PlaceOrderScreen,
  OrderScreen,
  OrderListScreen,
  ProfileScreen,
  ProductListScreen,
  ProductEditScreen,
} from './screens';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<App />}>
      <Route index={true} path={'/'} element={<HomeScreen />} />
      <Route path={'/product/:id'} element={<ProductScreen />} />
      <Route path={'/cart/'} element={<CartScreen />} />
      <Route path={'/login'} element={<LoginScreen />} />
      <Route path={'/register'} element={<RegisterScreen />} />
      <Route path={''} element={<PrivateRoute />}>
        <Route path={'/shipping'} element={<ShippingScreen />} />
        <Route path={'/payment'} element={<PaymentScreen />} />
        <Route path={'/place-order'} element={<PlaceOrderScreen />} />
        <Route path={'/order/:id'} element={<OrderScreen />} />
        <Route path={'/profile'} element={<ProfileScreen />} />
      </Route>
      <Route path={''} element={<AdminRoute />}>
        <Route path={'/admin/order-list'} element={<OrderListScreen />} />
        <Route path={'/admin/product-list'} element={<ProductListScreen />} />
        <Route path={'/admin/product/:id/edit'} element={<ProductEditScreen />} />
      </Route>
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
