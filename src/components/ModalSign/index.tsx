

import Modal from 'react-modal'
import { FaFacebookF, FaGoogle, FaSignInAlt } from "react-icons/fa";

import { useAuth } from '../../hooks/useAuth'

import './styles.scss'

interface ModalSignProps {
  isOpen: boolean;
  onRequestClose: () => void;
}


export function ModalSign({ isOpen, onRequestClose }: ModalSignProps) {
  const { user, signInWithGoogle, sigInWithFacebook } = useAuth()

  async function handleCreateRoomGoogle() {
    if (!user) {
      await signInWithGoogle()
    }
    onRequestClose()
  }


  async function handleCreateRoomFacebook() {
    if (!user) {
      await sigInWithFacebook()
    }
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="container">

        <div className='container-icon'>
          <FaSignInAlt className="sigIn" />
        </div> 

        <h2>Faça login para enviar perguntas</h2>

        <div className="options-SignIn">
          <button onClick={handleCreateRoomFacebook} className= "facebook-login">
            <FaFacebookF className="facebook-icon" />
            Facebook
          </button>

          <button onClick={handleCreateRoomGoogle} className="google-login" >
            <FaGoogle className="google-icon" />
            Google
          </button>
        </div>


        <div className="container-button">
          <button className='closeSigIn' onClick={onRequestClose}>Cancelar</button>
        </div>
      </div>

    </Modal>
  )
}