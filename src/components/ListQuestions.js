import { useState, useEffect } from 'react';
import { Button, ProgressBar, Modal } from 'react-bootstrap';

function ListQuestions ({handle, questions}) {
  const [index, setIndex] = useState(0);
  const [answerList, setAnswerList] = useState(questions.map(() => '#'));
  const [answerCount, setAnswerCount] = useState(questions.length);
  const [showModal, setShowModal] = useState(false);

  function chooseAnswer (index, answer) {
    const alCopy = [...answerList];
    alCopy[index] = answer;
    setAnswerList(alCopy);
    setAnswerCount(answerCount - 1);
  }

  function incIndex () {
    if (questions.length > 0 && index < questions.length - 1) setIndex(index + 1);
    if (answerCount === 0 && index === questions.length - 1) setShowModal(true);
  }

  function decIndex () {
    if (questions.length > 0 && index > 0) setIndex(index - 1);
    if (answerCount === 0 && index === 0) setShowModal(true);
  }

  function handleKeyDown (event) {
    console.log("teste");
    switch (event.key) {
      case 'a': case 'A': case 'ArrowLeft': decIndex(); break;
      case 'd': case 'D': case 'ArrowRight': incIndex(); break;
      case 'Enter': if (answerCount === 0) handle(answerList); break;
      default: break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });
  
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title>
            Fim do Quiz
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">Você resolveu todas as questões, deseja finalizar?</Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="secondary" onClick={() => setShowModal(false)}>Não</Button>
          <Button variant="primary" onClick={() => {
            setShowModal(false);
            handle(answerList);
          }}>Sim</Button>
        </Modal.Footer>
      </Modal>
      <div className="list-container">
        <ProgressBar variant="success" now={Math.round((index + 1)/questions.length*100)} label={`${index + 1}/${questions.length}`}/>
        <div className="question-space dark-container">
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
              <label className={(answerList[index] !== "#" && questions[index].correct === i)?"correct-choice":""} key={`label-${index}-${i}`}><input className="question-radio" key={`input-${index}-${i}`} type="radio" name={"q" + index} onClick={() => chooseAnswer(index, i)} disabled={answerList[index] !== "#"} defaultChecked={(answerList[index] === "#")?false:(answerList[index] === i)?true:false}/> {v}</label>
            )}
          </div>
        </div>  
        <div className={"question-feedback" + ((answerList[index] !== "#")?" dark-container":"")}>{(answerList[index] !== "#")?(questions[index].feedback):("")}</div>  
      </div>
    </>
  );
}

export default ListQuestions;