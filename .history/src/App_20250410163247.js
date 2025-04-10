import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <div className="App bg-red-500">
        Hello world
      </div>
    </Provider>
  );
}

export default App;
