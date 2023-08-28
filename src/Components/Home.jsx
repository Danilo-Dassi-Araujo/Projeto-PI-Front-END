import React, { useState, useEffect } from 'react';
import '../../src/App.css';
import axios from 'axios';

function Home() {
    // Supondo que userData seja uma matriz de objetos
    const [groupIndicator, setGroupIndicator] = useState('ADMIN');
    const [name, setName] = useState('');
    const [userData, setUserData] = useState(null);
    const [userChanges, setUserChanges] = useState(0);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar se o formulário de edição está aberto
    const [editFormData, setEditFormData] = useState({}); // Estado para armazenar os valores dos campos de edição

  const handleListUsersClick = () => {
    const url = `http://localhost:8080/home/listingUser?groupIndicator=${groupIndicator}&name=${name}`;

    axios.get(url)
      .then(response => {
        // Salve os dados na variável de estado userData
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  const handleEditUserClick = (email) => {
    const editUrl = 'http://localhost:8080/edit';

    axios.put(editUrl, { email })
        .then(response => {
            // Lidar com a resposta da edição, se necessário
            console.log('Usuário editado com sucesso:', response.data);
            setUserChanges(userChanges + 1);
        })
        .catch(error => {
            console.error('Erro ao editar usuário:', error);
        });
};

const openEditForm = (user) => {
  setEditFormData(user);
  setIsEditing(true);
};

// Função para lidar com a submissão do formulário de edição
const handleEditFormSubmit = () => {
  const editUserUrl = `http://localhost:8080/edit/user?login=danariano83@gmail.com`;

  axios.put(editUserUrl, editFormData)
      .then(response => {
          console.log('Usuário editado com sucesso:', response.data);
          setIsEditing(false); // Feche o formulário de edição após a submissão
          setUserChanges(userChanges + 1);
      })
      .catch(error => {
          console.error('Erro ao editar usuário:', error);
      });
};

useEffect(() => {
  // Quando userChanges mudar, chame handleListUsersClick
  handleListUsersClick();
}, [userChanges]);
    return (
    
        <div className="app">
            <button onClick={handleListUsersClick} className='buttonListing'>Listar Usuários</button>
            {userData && (
            <table className="table">
                <tr className="user-card">
                <th>Nome do usuário</th>
                <th>Email do usuário</th>
                <th>CPF do usuário</th>
                <th>Grupo do usuário</th>
                <th>Status do usuário</th>
                <th>Habilitar/Desabilitar</th>
                <th>Editar usuário</th>
                </tr>
                
            {userData.map((user, index) => (
                <tr key={index} className="user-card">
                    <td> {user.name}</td>
                    <td> {user.email}</td>
                    <td> {user.cpf}</td>
                    <td> {user.groupIndicator}</td>
                    <td> {user.isActive ? 'ATIVO' : 'INATIVO'}</td>
                    <td><button onClick={() => handleEditUserClick(user.email)}>{user.isActive ? "Desabilitar" : "Habilitar"}</button></td>
                    <button onClick={() => openEditForm(user)}>Editar</button>
                </tr>
            ))}
            </table>
            )}
            {isEditing && (
                <div className="edit-form">
                    <h2>Editar Usuário</h2>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            value={editFormData.email}
                            onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={editFormData.password}
                            onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Confirmar Senha:</label>
                        <input
                            type="password"
                            value={editFormData.passwordConfirmation}
                            onChange={(e) => setEditFormData({ ...editFormData, passwordConfirmation: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>CPF:</label>
                        <input
                            type="text"
                            value={editFormData.cpf}
                            onChange={(e) => setEditFormData({ ...editFormData, cpf: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Grupo:</label>
                        <input
                            type="text"
                            value={editFormData.group}
                            onChange={(e) => setEditFormData({ ...editFormData, group: e.target.value })}
                        />
                    </div>
                    <button onClick={handleEditFormSubmit}>Confirmar Edição</button>
                </div>
            )}
        </div>
    );
}

export default Home;
