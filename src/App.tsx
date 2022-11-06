import React from 'react';
import { QueryClientProvider, QueryClient } from 'common/utility/request';
import Commodities  from 'domain/fish/container/Commodities';
import "./App.scss"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Commodities />
    </QueryClientProvider>
  );
}

export default App;
