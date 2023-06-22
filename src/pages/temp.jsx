/* import React, { useState, useEffect, useRef } from 'react';

function Timer() {
  const INITIAL_TIME = 30;
  const COUNTDOWN_INTERVAL = 1000;

  const [time, setTime] = useState(INITIAL_TIME);
  const [isDisabled, setIsDisabled] = useState(false);
  const isMounted = useRef(null);

  const disableButtons = () => setIsDisabled(true);

  useEffect(() => {
    isMounted.current = true;

    // Função de intervalo
    const timerInterval = setInterval(() => {
      if (isMounted.current) {
        setTime((prevTime) => {
          if (prevTime - 1 <= 0) {
            clearInterval(timerInterval);
            disableButtons();
            return 0;
          }
          return prevTime - 1;
        });
      }
    }, COUNTDOWN_INTERVAL);

    return () => {
      isMounted.current = false;
      clearInterval(timerInterval);
    };
  }, []);

  const handleClick = () => {
    // Lógica para verificar se a resposta está correta
  };

  return (
    <div>
      <h1>
        Tempo restante:
        {' '}
        {time}
      </h1>
      <button disabled={ isDisabled } onClick={ handleClick }>Opção 1</button>
      <button disabled={ isDisabled } onClick={ handleClick }>Opção 2</button>
      <button disabled={ isDisabled } onClick={ handleClick }>Opção 3</button>
      <button disabled={ isDisabled } onClick={ handleClick }>Opção 4</button>
    </div>
  );
}

export default Timer; */
