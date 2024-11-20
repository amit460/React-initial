import {
  createBrowserRouter,
  // createRoutesFromElements,
  RouterProvider,
  // Route,
} from 'react-router-dom';

import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import ProductDetailPage from './pages/ProductDetail';
import RootLayout from './pages/Root';
import PieChart from './pages/PieChart';
import BarChart from './pages/BarChart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
    //   { path: 'products', element: <ProductsPage /> }, node - v20.15.0  , npm - 10.7.0
    //  { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'pie-chart', element: <PieChart /> },
      { path: 'bar-chart', element: <BarChart /> }
    ],
  }
]);

// const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;