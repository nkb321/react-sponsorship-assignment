import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home';
import ApplicationForm from './components/ApplicationForm';
import ApplicationDetail from './components/ApplicationDetail';
import PageNotFound from './components/PageNotFound';

const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/apps', element: <ApplicationForm />},
  {path: '/apps/:applictaionId', element: <ApplicationDetail />},
  {path: '*', element: <PageNotFound />},
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
