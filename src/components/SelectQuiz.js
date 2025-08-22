import { Button } from "react-bootstrap";

function SelectQuiz ({handle, quizChoices}) {
  const selectOptions = quizChoices.map(v => <option key={v.toString()}>{v}</option>);

  return(
    <div className="select-quiz">
      <label htmlFor="quiz-choices">
        Tema
        <select id="quiz-choices">
          {selectOptions}
        </select>
      </label>
      <label htmlFor="questions-amount">
        N° de questões
        <input id="questions-amount" type="number" min="1" defaultValue="20"/>
      </label>
      <Button variant="primary" onClick={handle}>Iniciar</Button>
    </div>
  );
}

export default SelectQuiz;