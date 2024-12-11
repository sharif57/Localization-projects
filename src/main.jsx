import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Layouts/Root';
import Home from './components/Home';
import Location from './components/Location';
import { Provider } from 'react-redux';
import { CounterView } from './app/features/counter/CounterView';
import store from './app/Store';
import { RtkQuery } from './components/RtkQuery';
import Rtk from './components/Rtk';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/location',
        element: <Location></Location>
      },
      {
        path: '/counter',
        element: <CounterView></CounterView>
      },
      {
        path: '/rtk',
        element: <RtkQuery></RtkQuery>
      },
      {
        path: '/rtkQuery',
        element: <Rtk></Rtk>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
