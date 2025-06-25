import './App.css';
import { AppRoutes } from './routes';
import { AlojamientosProvider } from './context/alojamientoProvider';
import { DetailProvider } from './context/detailProvider';

function App() {
  return (
    <>
      <AlojamientosProvider>
        <DetailProvider>
          <AppRoutes/>
        </DetailProvider>
      </AlojamientosProvider>
    </>
  );
}

export default App;
