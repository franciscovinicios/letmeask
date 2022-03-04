import { Link } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { database, ref, push, set } from '../services/firebase';
import { useAuth } from '../hooks/useAuth'


import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import { Button } from '../components/Button'

import '../styles/home.scss'


export function NewRoom() {
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('')
  const navigate = useNavigate()


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()


    if (newRoom.trim() === '') {
      return
    }

    const roomRef = ref(database, 'rooms');

    const firebaseRoom = push(roomRef)

    set(firebaseRoom, {
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <h2>Criar nova sala </h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente ? <Link to="/">clique aqui </Link>
          </p>
        </div>
      </main>
    </div>
  )
}