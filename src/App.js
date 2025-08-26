import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import questions_database from "./components/static/questions";
import { shuffle } from './components/static/util.js';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

import AppHeader from './components/AppHeader';
import SelectQuiz from './components/SelectQuiz';
import ListQuestions from './components/ListQuestions';
import ReportScreen from './components/ReportScreen';
import Manager from './components/Manager.js';

function App () {
  const quiz_choices = Object.keys(questions_database);

  const [showSelect, setShowSelect] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [showManager, setShowManager] = useState(false);

  function startQuiz (data, size) {
    const maxLength = Math.min(questions_database[data].length, size);
    const qSubset = [];
    const shuffledQuestions = shuffle(questions_database[data]);
    for (let i = 0; i < maxLength; i++) {
      const qCopy = {...shuffledQuestions[i]};
      const cAnswer = qCopy.choices[qCopy.correct];
      qCopy.choices = shuffle(qCopy.choices);
      qCopy.correct = qCopy.choices.indexOf(cAnswer);
      qSubset.push(qCopy);
    }
    setQuestionList(qSubset);

    setShowSelect(false);
    setShowQuestions(true);
    setShowReport(false);
    setShowManager(false);
  }

  function submitQuiz (data) {
    setReportData(data);

    setShowSelect(false);
    setShowQuestions(false);
    setShowReport(true);
    setShowManager(false);
  }

  function selectScreen () {
    setShowSelect(true);
    setShowQuestions(false);
    setShowReport(false);
    setShowManager(false);
  }

  function addQuestions () {
    setShowSelect(false);
    setShowQuestions(false);
    setShowReport(false);
    setShowManager(true);
  }

  return (
    <div className="App">
      <AppHeader title="Simulados"/>
      {showSelect?<SelectQuiz handle={startQuiz} quizChoices={quiz_choices}/>:<></>}
      <div className="top-btn-group">
        {showSelect?<Button variant="primary" onClick={addQuestions}>Gerenciar</Button>:<></>}
        {!showSelect?<Button variant="secondary" onClick={selectScreen}>Voltar</Button>:<></>}
      </div>
      {showQuestions?<ListQuestions handle={submitQuiz} questions={questionList}/>:<></>}
      {showReport?<ReportScreen answers={reportData} questions={questionList}/>:<></>}
      {showManager?<Manager/>:<></>}
    </div>
  );
}

export default App;
