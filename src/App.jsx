import PriceList from './components/PriceList';
import logo from './assets/logoTC.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <div className="price-header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center">
            <img src={logo} alt="Logo" className="price-header-logo" />
          </div>
        </div>
      </div>
      <PriceList />
    </div>
  );
}

export default App;
