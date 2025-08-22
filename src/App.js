import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

import AppHeader from './components/AppHeader';
import SelectQuiz from './components/SelectQuiz';
import ListQuestions from './components/ListQuestions';
import ReportScreen from './components/ReportScreen';

function App () {
  const quiz_choices = ["Quiz 11111111", "Quiz 2222222222222","Quiz 33333333333333333"];
  const question_list = [
    {
      "body": "Qual é capital do Maranhão?",
      "choices": ["São Luís", "Salvador", "Fortaleza", "Teresina"],
      "correct": 0,
      "feedback": "A capital do Maranhão é São Luís"
    },
    {
      "body": "Qual é capital do Ceará?",
      "choices": ["São Luís", "Salvador", "Fortaleza", "Teresina"],
      "correct": 2,
      "feedback": "A capital do Ceará é Fortaleza"
    },
    {
      "body": "1+1?",
      "choices": ["5", "2", "3", "1/2"],
      "correct": 1,
      "feedback": "1+1 é igual a dois"
    }
  ];

  const [showSelect, setShowSelect] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState({});

  function startQuiz () {
    setShowSelect(false);
    setShowQuestions(true);
    setShowReport(false);
  }

  function submitQuiz (data) {
    setReportData(data);

    setShowSelect(false);
    setShowQuestions(false);
    setShowReport(true);
  }

  function selectScreen () {
    setShowSelect(true);
    setShowQuestions(false);
    setShowReport(false);
  }

  return (
    <div className="App">
      <AppHeader title="Simulados"/>
      {showSelect?<SelectQuiz handle={startQuiz} quizChoices={quiz_choices}/>:<></>}
      {!showSelect?<Button variant="secondary" onClick={selectScreen} style={{margin: "1rem 0"}}>Voltar</Button>:<></>}
      {showQuestions?<ListQuestions handle={submitQuiz} questions={question_list}/>:<></>}
      {showReport?<ReportScreen answers={reportData} questions={question_list}/>:<></>}
    </div>
  );
}

export default App;
