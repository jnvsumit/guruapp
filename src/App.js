import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Login from './Components/Login';
import { useEffect, useState } from 'react';

function App() {
  const allPages = [
    {
      name: 'Home',
      path: '/',
      getComponent: (props) => <Homepage {...props} />,
      id: 'home'
    },
    {
      name: 'About',
      path: '/about',
      getComponent: (props) => <Homepage {...props} />,
      id: 'about'
    },
    {
      name: 'Login',
      path: '/login',
      getComponent: (props) => <Login {...props} />,
      id: 'login'
    }
  ];
  const [pages, setPages] = useState(allPages);
  const [onPage, setOnPage] = useState(pages[0]);
  const [toggled, setToggled] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  const handleNavbarToggle = () =>{
    setToggled((prevState)=>{
      return prevState === 0 ? 1 : 0;
    });
  }

  const handleNavbarClick = (page) =>{
    setOnPage(page);
  }

  const handleLogin = () =>{
    setPages(prevState => {
      return prevState.filter(page => page.id !== 'login');
    });
    setIsAuthenticated(true);

    const token = localStorage.getItem('g-token');
    setToken(token);
  }

  const handleLogout = () =>{
    localStorage.clear();
    setPages(allPages);
    setIsAuthenticated(false);
    setToken("");
  }

  useEffect(() => {
    const token = localStorage.getItem('g-token');
    if(token){
      setPages(prevState => {
        return prevState.filter(page => page.id !== 'login');
      });
      setIsAuthenticated(true);
      setToken(token);
    }else{
      setPages(allPages);
      setIsAuthenticated(false);
      setToken("");
    }
  }
  , []);

  return (
    <div className="App">
      <Navbar pages={pages} on={onPage.id} isAuthenticated={isAuthenticated} handleLogout={handleLogout} handleNavbarToggle={handleNavbarToggle} toggled={toggled} handleNavbarClick={handleNavbarClick}/>
      {onPage.getComponent({isAuthenticated, handleLogin, handleLogout, token})}
      <Footer/>
    </div>
  );
}

export default App;
