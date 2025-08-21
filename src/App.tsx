// src/App.tsx
import { useEffect, Dispatch, SetStateAction } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { cellRegistry } from './services/cellRegistry';
import { LoginPasswordCell } from './cells/auth/LoginPasswordCell';
import { CreatePostCell } from './cells/posts/CreatePostCell';
import MainLayout from './components/layout/MainLayout';
import AuthGuard from './components/AuthGuard';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterComponent from './cells/auth/RegisterCell';

// Register cells on app initialization
const initializeCells = () => {
  cellRegistry.register(LoginPasswordCell);
  cellRegistry.register(CreatePostCell);
  console.log('🔧 Cells registered:', cellRegistry.listCells().length);
};



interface AppProps {
  chainId: ChainId;
  setChainId: Dispatch<SetStateAction<ChainId>>;
}

function App({ chainId, setChainId }: AppProps) {
  useEffect(() => {
    initializeCells();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
          <Route path="/login" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <LoginPasswordCell onSuccess={() => { /* handle success */ }} onError={() => { /* handle error */ }} />
            </div>
          } />
          <Route path="/register" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <RegisterComponent onSuccess={() => { /* handle success */ }} onError={() => { /* handle error */ }} />
            </div>
          } />
          <Route path="/" element={
            <AuthGuard>
              <MainLayout chainId={chainId} setChainId={setChainId} />
            </AuthGuard>
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;





