import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from "./components/static/questions";
import { shuffle } from './components/static/util.js';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

import AppHeader from './components/AppHeader';
import SelectQuiz from './components/SelectQuiz';
import ListQuestions from './components/ListQuestions';
import ReportScreen from './components/ReportScreen';
import Manager from './components/Manager.js';

const OBJECT_NAME = "questions-data";

function App () {
  const [data, setData] = useState(() => {
    const lsData = JSON.parse(localStorage.getItem(OBJECT_NAME));
    if (lsData === null || Object.keys(lsData).length === 0) {
        localStorage.setItem(OBJECT_NAME, JSON.stringify(questions));
        return structuredClone(questions);
    }
    return lsData;
  });

  const [showSelect, setShowSelect] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [showManager, setShowManager] = useState(false);

  function startQuiz (category, size) {
    const maxLength = Math.min(data[category].length, size);
    const qSubset = [];
    const shuffledQuestions = shuffle(data[category]);
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
    const lsData = JSON.parse(localStorage.getItem(OBJECT_NAME));
    if (lsData === null || Object.keys(lsData).length === 0) {
      localStorage.setItem(OBJECT_NAME, JSON.stringify(questions));
      setData(structuredClone(questions));
    }
    else {
      setData(lsData);
    }

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
      {showSelect?<SelectQuiz handle={startQuiz} categories={Object.keys(data)}/>:<></>}
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
