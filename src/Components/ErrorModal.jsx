import React from 'react';
import Modal from 'react-modal';
import '../ErrorModal.css'; // Importe o arquivo CSS

const ErrorModal = ({ isOpen, errorMessage, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Erro Modal"
    className="modalError" // Adicione a classe CSS ao modal
    overlayClassName="modal-overlay" // Adicione a classe CSS ao overlay
  >
    <div className="modal-content-error">
      <h2 className="modal-title">Erro</h2>
      <p className="modal-message">{errorMessage}</p>
      <button className="modal-close-button" onClick={onRequestClose}>
        Fechar
      </button>
    </div>
  </Modal>
);

export default ErrorModal;




