import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { database, ref, get, child } from "../services/firebase";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../hooks/useAuth";

import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import { FaFacebookF, FaGoogle } from "react-icons/fa";

import { Button } from '../components/Button'

import '../styles/home.scss'



export function Home() {
  const navigate = useNavigate()
  const { user, signInWithGoogle, sigInWithFacebook } = useAuth()
  const [roomCode, setRoomCode] = useState('')



  async function handleCreateRoomGoogle() {
    if (!user) {
      await signInWithGoogle()
    }
    toast.success("Logado com sucesso!", {
      style: {
        background: "#68D391",
        color: "#FFF"
      },
      iconTheme: {
        primary: "#FFF",
        secondary: "#68D391"
      }
    });
    navigate('/rooms/new')
  }


  async function handleCreateRoomFacebook() {
    if (!user) {
      await sigInWithFacebook()
    }
    toast.success("Logado com sucesso!", {
      style: {
        background: "#68D391",
        color: "#FFF"
      },
      iconTheme: {
        primary: "#FFF",
        secondary: "#68D391"
      }
    });
    navigate('/rooms/new')
  }


  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      toast.error("Campo deve ser preenchido!", {
        style: {
          background: "#F56565",
          color: "#FFF"
        },
        iconTheme: {
          primary: "#FFF",
          secondary: "#F56565"
        }
      });

      return
    }

    const dbRef = ref(database);
    const roomRef = get(child(dbRef, `rooms/${roomCode}`))

    if (!(await roomRef).exists()) {
      toast.error("Sala não encontrada", {
        style: {
          background: "#F56565",
          color: "#FFF"
        },
        iconTheme: {
          primary: "#FFF",
          secondary: "#F56565"
        }
      });
      return;
    }


    if ((await roomRef).val().endedAt) {
      toast.error("Sala já foi encerrada", {
        style: {
          background: "#F56565",
          color: "#FFF"
        },
        iconTheme: {
          primary: "#FFF",
          secondary: "#F56565"
        }
      });
      return;
    }
    navigate(`/rooms/${roomCode}`)
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

          {!user &&
            <>
              <button onClick={handleCreateRoomFacebook} className="create-room facebook-login">
                <FaFacebookF className="facebook-icon" />
                Crie sua sala com o Facebook
              </button>


              <button onClick={handleCreateRoomGoogle} className="create-room google-login" >
                <FaGoogle className="google-icon" />
                Crie sua sala com o Google
              </button>
            </>
          }

          {user && <div className="user-info">
            <img src={user?.avatar} alt={user?.name} />
            <span>{user?.name}</span>
          </div>}

          {user && <Button onClick={() => navigate('/rooms/new')}>
            Criar uma Sala
          </Button>}

          <div className="separator"> ou entre em uma sala</div>


          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
          <Toaster />
        </div>
      </main>
    </div>
  )
}