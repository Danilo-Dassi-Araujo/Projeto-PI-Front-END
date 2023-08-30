import React from 'react';

function CreateModal({ setCreateFormData, createFormData, onClose, onFormSubmit }) {

  return (
    <form onSubmit={(e) => {e.preventDefault() 
    onFormSubmit()}}>

    
    <div className="modal">
      <div className="modal-content">
        <h2>Cadastrar Usuário</h2>
        <div className="form-field">
          <label>Email:</label>
          <input
            type="text"
            onChange={(e)=>{setCreateFormData((prev) => ({...prev, email: e.target.value}))} }
          />
        </div>
        <div className="form-field">
  <label>Nome:</label>
  <input
    type="text"
    onChange={(e)=>{setCreateFormData((prev) => ({...prev, name: e.target.value}))} }
  />
</div>
        <div className="form-field">
          <label>Senha:</label>
          <input
            type="password"
            onChange={(e)=>{setCreateFormData((prev) => ({...prev, password: e.target.value}))} }
          />
        </div>
        <div className="form-field">
          <label>Confirmar Senha:</label>
          <input
            type="password"
            onChange={(e)=>{setCreateFormData((prev) => ({...prev, passwordConfirmation: e.target.value}))} }
          />
        </div>
        <div className="form-field">
          <label>CPF:</label>
          <input
            type="text"
            onChange={(e)=>{setCreateFormData((prev) => ({...prev, cpf: e.target.value}))} }
          />
        </div>
        <div className="form-field">
          <label>Grupo:</label>
          <select
            onChange={(e)=>{setCreateFormData((prev) => ({...prev, group: e.target.value}))}}
          >
            <option value="ESTOQUISTA">ESTOQUISTA</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="buttons-form">
        <button type='submit'>Cadastrar</button>
        <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
    </form>
  );
}

export default CreateModal;