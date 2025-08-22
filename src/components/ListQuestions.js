import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function ListQuestions ({handle, questions}) {
  const [index, setIndex] = useState(0);
  const [answerList, setAnswerList] = useState(questions.map(() => '#'));
  const [answerCount, setAnswerCount] = useState(questions.length);

  function chooseAnswer (index, answer) {
    const alCopy = [...answerList];
    alCopy[index] = answer;
    setAnswerList(alCopy);
    setAnswerCount(answerCount - 1);
  }

  function incIndex () {
    if (questions.length > 0 && index < questions.length - 1) setIndex(index + 1);
  }

  function decIndex () {
    if (questions.length > 0 && index > 0) setIndex(index - 1);
  }

  function handleKeyDown (event) {
    console.log("teste");
    switch (event.key) {
      case 'a': case 'A': case 'ArrowLeft': decIndex(); break;
      case 'd': case 'D': case 'ArrowRight': incIndex(); break;
      case 'Enter':
        if (answerCount === 0) handle(answerList);
      break;
      default: break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });
  
  return (
    <div className="list-container">
      <div className="question-space">
        <div className="list-nav">
          <div>
            <Button onClick={decIndex}>&lt;</Button>
            <Button onClick={incIndex}>&gt;</Button>
          </div>
          <Button variant="success" onClick={() => handle(answerList)} disabled={answerCount !== 0}>Finalizar</Button>
        </div>
        <div className="question-header">{questions[index].body}</div>
        <div className="question-choices">
          {questions[index].choices.map((v, i) =>
            <label key={`label-${index}-${i}`}><input key={`input-${index}-${i}`} type="radio" name={"q" + index} onClick={() => chooseAnswer(index, i)} disabled={answerList[index] !== "#"} defaultChecked={(answerList[index] === "#")?false:(answerList[index] === i)?true:false}/> {v}</label>
          )}
        </div>
      </div>  
      <div className="question-feedback">{(answerList[index] !== "#")?(questions[index].feedback):("")}</div>  
    </div>
  );
}

export default ListQuestions;