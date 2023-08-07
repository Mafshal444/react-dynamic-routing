import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';

import User from './components/User';
import Layout from './components/Layout';
import { useRef, useState } from 'react';
import Profile from './components/Profile';
import Transactions from './components/Transactions';
import Transaction from './components/Transaction';
import ReCAPTCHA from "react-google-recaptcha";
import './App.css';

const App = () => {
  const transactions = [
    { id: '1', details: 'Transaction 1' },
    { id: '2', details: 'Transactions 2' },
  ];
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null)
  const handleSubmit = async (e) =>{
    e.preventDefault();
    // const token = captchaRef.current.getValue();
    const token = await captchaRef.current.executeAsync();
    console.log("token values", token)
    captchaRef.current.reset();

}
  return (
    <div className='container'>
      // <ReCAPTCHA ref={captchaRef} sitekey={process.env.invisiblesiteKey} size="invisible"/>
      <button onClick={handleSubmit} >submit </button>
      <Router>
        <h1>React Router</h1>

        <nav>
          <Link to="/home">Home</Link>
          <Link to="/user">User</Link>
        </nav>

        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="user" element={<User />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="transactions" element={<Transactions transactions={transactions} />}>
                <Route path=':transactionId' element={<Transaction />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
