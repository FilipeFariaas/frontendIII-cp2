import styles from "./Form.module.css";
import {useEffect, useState} from "react";
import {response} from "msw";
import {redirect, useNavigate} from "react-router-dom";
import {useTheme} from "../hooks/useTheme";
// import {useLocalStorage} from "../hooks/useLocalStorage";

const LoginForm = () => {
  const {theme} = useTheme()
  const navigate = useNavigate()
  // const [token, setToken] = useLocalStorage('', 'token')

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
      // return redirect("/home");
    } catch (err) {
      alert('error')
      console.error(err)
    }

    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
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
