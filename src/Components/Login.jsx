import React, { useState } from 'react';
import '../../src/App.css';
import axios from 'axios';

 function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // Função para manipular o clique no botão "Entrar!"
    const handleLoginClick = () => {
      const url = `http://localhost:8080/home/login?email=${email}&password=${password}`;
  
      // Faça a solicitação HTTP GET usando Axios
      axios.get(url)
      .then(response => {
        // Verifique a propriedade isPermission na resposta
        if (response.data.isPermission) {
          // Redirecione para a página /home
          window.location.href = '/home';
        } else {
          // Mostre uma mensagem de erro com base na propriedade message
          alert(`Erro: ${response.data.message}`);
        }
      })
    }
  
    return (
      <div className="app">
        <div className='box-input-login'>
        <h1>LOGIN</h1>
        <div className="input">
          {/* Input para o campo de login */}
          <input
            placeholder='Login'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Input para o campo de senha */}
          <input
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Botão "Entrar!" com evento de clique */}
        <button onClick={handleLoginClick}>Entrar</button>
        </div>
      </div>
    );
  }
  export default Login;