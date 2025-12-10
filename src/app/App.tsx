import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import {
  // QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { queryClient } from '@shared/axios/queryClient';

function App() {
  // const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
