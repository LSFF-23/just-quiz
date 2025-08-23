import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function SelectQuiz ({handle, quizChoices}) {
  const [value, setValue] = useState("");
  const [limit, setLimit] = useState(0);

  const selectOptions = quizChoices.map(v => <option key={v.toString()} value={v}>{v}</option>);

  useEffect(() => {
    const selectElement = document.getElementById("quiz-choices");
    const inputElement = document.getElementById("questions-amount");
    const options = Array.from(selectElement.options).map((option) => option.value);
    const initialOption = localStorage.getItem("quiz-choices") || options[0];
    const initialLimit = localStorage.getItem("questions-amount") || inputElement.value;
    selectElement.value = initialOption;
    inputElement.value = initialLimit;
    setValue(initialOption);
    setLimit(initialLimit);
  }, []);

  return(
    <div className="select-quiz">
      <label htmlFor="quiz-choices">
        Tema
        <select id="quiz-choices" onChange={(e) => setValue(e.target.value)}>
          {selectOptions}
        </select>
      </label>
      <label htmlFor="questions-amount">
        N° de questões
        <input id="questions-amount" type="number" min="1" defaultValue={localStorage.getItem("questions-amount") || 20} onChange={(e) => setLimit(e.target.value)}/>
      </label>
      <Button variant="primary" onClick={() => {
        localStorage.setItem("quiz-choices", value.toString());
        localStorage.setItem("questions-amount", limit.toString());
        handle(value, limit);
      }}>Iniciar</Button>
    </div>
  );
}

export default SelectQuiz;