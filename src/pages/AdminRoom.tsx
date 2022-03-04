import { database, ref, remove, update } from '../services/firebase'
import { useDisclosure } from "react-use-disclosure";
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'
import { CloseRoomModal } from "../components/CloseRoomModal";


import '../styles/room.scss'

type RoomParams = {
  id: string;
}


export function AdminRoom() {
  const params = useParams<RoomParams>()
  const roomId = params.id;
  const navigate = useNavigate()
  
  const {open, isOpen, close, } = useDisclosure();

  const [didMount, setDidMount] = useState(false);
  
  const { questions, title } = useRoom(`${roomId}`)

  async function handleEndRoom() {
    const db = await ref(database, `rooms/${roomId}`);
    update(db, {
      endedAt: new Date(),
    })
    navigate('/')
  }

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
 }, [])
 
 if(!didMount) {
   return null;
 }


  async function handleDeleteQuestion(questionId: string) {

    if (window.confirm('Tem certeza que voce deseja excluir esta pergunta?')) {
      const db = await ref(database, `rooms/${roomId}/questions/${questionId}`);
      remove(db)
    }
  }

  async function handleCheckQuestionAsAnswer(questionId: string) {
    const db = await ref(database, `rooms/${roomId}/questions/${questionId}`);
    update(db, { isAnswered: true })
  }

  async function handleHighlightQuestion(questionId: string) {
    const db = await ref(database, `rooms/${roomId}/questions/${questionId}`);
    update(db, { isHighlighted: true })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={`${roomId}`} />
            <Button isOutlined onClick={() => open()}>
              Encerrar sala
            </Button>
  
            <CloseRoomModal
              isOpen={isOpen}
              onRequestClose={close}
              id={`${roomId}`} 
              handleEndRoom={handleEndRoom}           
          />

          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswer(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          })}
        </div>
      </main>
    </div>
  )
}