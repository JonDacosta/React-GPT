import { useState } from 'react'
import { GptMessage, TextMessageBox } from '../../components';
import { MyMessage } from '../../components/chat-bubbles/MyMessage';
import { TypingLoader } from '../../components/loaders/TypingLoader';
import { prosConsUseCase } from '../../../core/use-cases';



interface Message {
  text: string;
  isGpt: boolean;
}


export const ProsConsPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async ( text: string ) => {
    
    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false }] );

    //TODO: useCase
    const { ok, content } = await prosConsUseCase( text );
    setIsLoading(false);

    if ( !ok ) return;
     
    setMessages( (prev) => [...prev, { text: content, isGpt: true } ] )

    //TODO: Añadir el mensaje de isGpt en true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 grid-y-2">
          {/* Bienvenida */}
          <GptMessage text="Escribe lo que quieras que compare..." />
          {
            messages.map((message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text={ message.text } />
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
    </div>
  )
}
