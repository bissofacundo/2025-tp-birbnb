import './App.css';
import { AppRoutes } from './routes';
import { AlojamientosProvider } from './context/alojamientoProvider';

function App() {
  return (
    <>
      <AlojamientosProvider>
        <AppRoutes/>
      </AlojamientosProvider>
    </>
  );
}

export default App;
