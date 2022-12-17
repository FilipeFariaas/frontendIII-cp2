import styles from "./Form.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTheme} from "../hooks/useTheme";

const LoginForm = () => {
  const {theme} = useTheme()
  const navigate = useNavigate()

  const [username, setUsername] = useState('dentistaAdmin')
  const [password, setPassword] = useState('admin123')

  const handleSubmit = (event) => {
    event.preventDefault()

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    };

    try {
      fetch('https://dhodonto.ctdprojetos.com.br/auth', requestOptions)
        .then(response => response.json())
        .then(token => localStorage.setItem('token', token.token));

      alert('logged in')
      navigate('/home')
    } catch (err) {
      alert('error')
      console.error(err)
    }

  };

  return (
    <>
      <div
        className={`text-center card container ${styles.card}
        ${theme === 'dark' ? styles.cardDark : ''}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={event => handleSubmit(event)}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              className="btn btn-primary"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
