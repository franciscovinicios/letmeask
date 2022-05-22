import Modal from 'react-modal'
import ImgAlert from '../../assets/images/alert.svg'

import './styles.scss'


interface CloseRoomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleEndRoom: () => void;
  id: string;
}

export function CloseRoomModal({ isOpen, onRequestClose, handleEndRoom }: CloseRoomModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="container">

        <div className='icon-alert'>
          <img src={ImgAlert} alt="icone de canceled" />
        </div>

        <div className='co'>
          <h2>Encerrar sala</h2>

          <p>Tem certeza que voce deseja encerrar esta sala ?</p>

          <div className="container-button">
            <button className="confirm" onClick={handleEndRoom}>Sim, encerrar</button>
            <button className='close' onClick={onRequestClose}>Cancelar</button>
          </div>
        </div>
      </div>

    </Modal>
  )
}