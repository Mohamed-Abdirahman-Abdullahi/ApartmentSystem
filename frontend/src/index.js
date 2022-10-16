// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>

      <hr style={{ height: '5px', backgroundColor: 'rgb(0, 0, 0, 0.3)' }} />
      <br />
      <p style={{ textAlign: 'center', color: 'rgb(0, 0, 0, 0.4)', marginBottom: '80px' }}> &copy; 2022 - <a href='#' style={{ textDecoration: 'none' }}>Apartment Arena.</a> Alrights reserved.</p>
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
