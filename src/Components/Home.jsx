import React, { useState, useEffect } from "react";
import "../../src/App.css";
import axios from "axios";
import EditModal from "../Components/EditModal";
import CreateModal from "../Components/CreateModal";
import ErrorModal from "../Components/ErrorModal";

function Home() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [groupIndicator, setGroupIndicator] = useState("ADMIN");
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);
  const [userChanges, setUserChanges] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [createFormData, setCreateFormData] = useState({}); 

  const handleListUsersClick = () => {
    const url = `http://localhost:8080/home/listingUser?groupIndicator=${groupIndicator}&name=${name}`;

    axios
      .get(url)
      .then((response) => {
        // Salve os dados na variável de estado userData
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  const handleEditUserClick = (email) => {
    const editUrl = "http://localhost:8080/edit";

    axios
      .put(editUrl, { email })
      .then((response) => {
        // Lidar com a resposta da edição, se necessário
        console.log("Usuário editado com sucesso:", response.data);
        setUserChanges(userChanges + 1);
      })
      .catch((error) => {
        console.error("Erro ao editar usuário:", error);
      });
  };

  const openEditForm = (user) => {
    setEditFormData(user);
    setIsModalOpen(true);
  };

  const openCreateForm = () => {
    setCreateFormData();
    setIsModalCreateOpen(true);
  };

  // Função para lidar com a submissão do formulário de edição
  const handleEditFormSubmit = () => {
    const editUserUrl = `http://localhost:8080/edit/user?login=danariano83@gmail.com`;

    // Crie um objeto com os dados do formulário
    const formData = {
      email: editFormData.email,
      name: editFormData.name,
      password: editFormData.password,
      passwordConfirmation: editFormData.passwordConfirmation,
      cpf: editFormData.cpf,
      group: editFormData.group || "ESTOQUISTA",
    };

    console.log(formData);

    axios
      .put(editUserUrl, { ...formData }) // Use axios.post para enviar os dados no corpo
      .then((response) => {
        console.log("Usuário editado com sucesso:", response.data);
        setIsModalOpen(false); // Feche o modal após a submissão
        setUserChanges(userChanges + 1);
      })
      .catch((error) => {
        console.error("Erro ao editar o usuário:", error);
        setErrorMessage(error.response.data.message);
        setIsErrorModalOpen(true);
      });
  };

  const handleCreateFormSubmit = () => {
    const createUserUrl = `http://localhost:8080/home/register`;

    // Crie um objeto com os dados do formulário
    const formData = {
      email: createFormData.email,
      name: createFormData.name,
      password: createFormData.password,
      passwordConfirmation: createFormData.passwordConfirmation,
      cpf: createFormData.cpf,
      group: createFormData.group || "ESTOQUISTA",
    };

    console.log(formData);

    axios
      .post(createUserUrl, { ...formData }) // Use axios.post para enviar os dados no corpo
      .then((response) => {
        console.log("Usuário cadastrado com sucesso:", response.data);
        setIsModalCreateOpen(false); // Feche o modal após a submissão
        setUserChanges(userChanges + 1);
      })
      .catch((error) => {
        console.error(
          "Erro ao cadastrar o usuário:",
          errorMessage
        );
        setErrorMessage(error.response.data.message);
        setIsErrorModalOpen(true);
      });
  };

  useEffect(() => {
    handleListUsersClick();
  }, [userChanges]);
  return (
    <div className="app">
      <div className="filterDiv">
        <div>
          <input
            type="text"
            placeholder="Filtrar por nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleListUsersClick} className="buttonListing">
            Filtrar
          </button>
        </div>
        {groupIndicator === "ADMIN" &&(
          <button className="btnEdit" onClick={() => openCreateForm()}>
          Cadastrar
        </button>
        )}
      </div>
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
              <td> {user.isActive ? "ATIVO" : "INATIVO"}</td>
              <td>
                <button
                  className={!user.isActive ? "button-green" : "button-red"}
                  onClick={() => handleEditUserClick(user.email)}
                >
                  {user.isActive ? "Desabilitar" : "Habilitar"}
                </button>
              </td>
              <td className="tdBtn">
                <button className="btnEdit" onClick={() => openEditForm(user)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}
      {isModalOpen && (
        <EditModal
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          onClose={() => setIsModalOpen(false)}
          onFormSubmit={handleEditFormSubmit} // Passando a função de envio
        />
      )}
      {isModalCreateOpen && (
        <CreateModal
          createFormData={createFormData}
          setCreateFormData={setCreateFormData}
          onClose={() => setIsModalCreateOpen(false)}
          onFormSubmit={handleCreateFormSubmit} // Passando a função de envio
        />
      )}

      <div>
        <ErrorModal
          isOpen={isErrorModalOpen}
          errorMessage={errorMessage}
          onRequestClose={() => setIsErrorModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default Home;
