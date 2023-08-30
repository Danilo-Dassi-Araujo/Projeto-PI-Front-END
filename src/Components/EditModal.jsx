import React from 'react';

function EditModal({ setEditFormData, editFormData, onClose, onFormSubmit }) {

  return (
    <form em onSubmit={(e) => {e.preventDefault() 
    onFormSubmit()}}>

    
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Usuário</h2>
        <div className="form-field">
          <label>Email:</label>
          <input
            type="text"
            value={editFormData.email}
            disabled // Torna o campo somente leitura
          />
        </div>
        <div className="form-field">
  <label>Nome:</label>
  <input
    type="text"
    value={editFormData.name}
    onChange={(e)=>{setEditFormData((prev) => ({...prev, name: e.target.value}))} }
  />
</div>
        <div className="form-field">
          <label>Senha:</label>
          <input
            type="password"
            value={editFormData.password}
            onChange={(e)=>{setEditFormData((prev) => ({...prev, password: e.target.value}))} }
          />
        </div>
        <div className="form-field">
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={editFormData.passwordConfirmation}
            onChange={(e)=>{setEditFormData((prev) => ({...prev, passwordConfirmation: e.target.value}))} }
          />
        </div>
        <div className="form-field">
          <label>CPF:</label>
          <input
            type="text"
            value={editFormData.cpf}
            disabled // Torna o campo somente leitura
          />
        </div>
        <div className="form-field">
          <label>Grupo:</label>
          <select
            value={editFormData.group}
            onChange={(e)=>{setEditFormData((prev) => ({...prev, group: e.target.value}))}}
          >
            <option value="ESTOQUISTA">ESTOQUISTA</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="buttons-form">
        <button type='submit'>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
    </form>
  );
}

export default EditModal;