import { useState } from 'react'
import { GptMessage, TextMessageBox, TypingLoader } from '../../components'
import { MyMessage } from '../../components/chat-bubbles/MyMessage'

interface Message {
  text: string;
  isGpt: boolean;
}


export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async ( text: string ) => {
    
    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false }] );

    //TODO: useCase
    setIsLoading(false);

    //TODO: Añadir el mensaje de isGpt en true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 grid-y-2">
          {/* Bienvenida */}
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudaré con las correcciones" />
          {
            messages.map((message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text="Esto es OpenAI" />
                )
                : (
                  <MyMessage key={index} text={message.text} />
                )
            ))
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

        </div>
      </div>
      <TextMessageBox
        onSendMessage={ handlePost }
        placeholder='Escribe aquí'
        disabledCorrections
      />
      {/* <TextMessageBoxFile
        onSendMessage={ handlePost }
        placeholder='Escribe aquí'
      /> */}
      {/* <TextMessageBoxSelect 
        onSendMessage={ console.logs }
        options ={ [ { id: "1", text: "Hola" }, { id: "2", text: "Mundo" } ] }
      /> */}
    </div>
  )
}