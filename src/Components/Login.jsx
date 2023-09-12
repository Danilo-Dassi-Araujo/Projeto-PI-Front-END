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
        <div class="left-login">
          <h1>Faça login <br/> E começe sua jornada pirata! </h1>
          <img src="../pirateboat.svg" alt="pirateanimation"/>
        </div>
        
        <div class="right-login">
        <div className='box-input-login'>
          <h1>LOGIN</h1>
          {/* Input para o campo de login */}
          <div className='input'>
          <label for="usuario">Usuário</label>
          <input
            placeholder='Usuário'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          {/* Input para o campo de senha */}
          <div className='input'>
          <label for="senha">Senha</label>
          <input
            placeholder='Senha'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          
        {/* Botão "Entrar!" com evento de clique */}
        <button onClick={handleLoginClick}>Entrar!</button>
        </div>
        </div>
        
      </div>
    );
  }
  export default Login;