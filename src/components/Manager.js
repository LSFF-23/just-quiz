import { useState } from "react";
import { Button } from "react-bootstrap";

import questions from "./static/questions";
import { question2markdown, markdown2question, markdown_template } from "./static/util";

function Manager () {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("questions-data")) || questions);
    const [categories, setCategories] = useState(Object.keys(data));
    const [categoryFeedback, setCategoryFeedback] = useState("");
    const [index, setIndex] = useState(0);
    const [qCategory, setQCategory] = useState(categories[0]);
    const [textValue, setTextValue] = useState(question2markdown(data[categories[0]][0] || {}));

    function addCategory () {
        const categorySelect = document.getElementById("new-category");
        const cValue = categorySelect.value;
        if (!cValue) return;

        const newData = {...data};
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].toLowerCase() === cValue.toLowerCase()) {
                setCategoryFeedback(<span style={{color: "var(--bs-danger)"}}>A categoria {document.getElementById("new-category").value} já existe.</span>);
                return;
            }
        }
        newData[cValue] = [];
        
        setData(newData);
        setCategories(categories.concat(cValue));
        setCategoryFeedback(<span style={{color: "var(--bs-success)"}}>A categoria {document.getElementById("new-category").value} foi adicionada com sucesso!</span>);
    }

    function saveData (data) {
        const newData = {...data};
        const dCategories = Object.keys(newData);
        for (let i = 0; i < dCategories.length; i++)
            if (newData[dCategories[i]] && newData[dCategories[i]].length === 0)
                delete newData[dCategories[i]];
        localStorage.setItem("questions-data", JSON.stringify(newData));
    }

    return (
        <div className="manager-container">
            <div className="manage-questions dark-container">
                <div className="questions-container w-100">
                    <div className="manage-category">
                        <label htmlFor="questions-category">
                            Categoria
                        </label>
                        <select id="questions-category" className="questions-category same-height" onChange={(e) => {
                            setQCategory(e.target.value);
                            const d = data[e.target.value][index] || {};
                            setTextValue(question2markdown(d));
                        }}>
                            {categories.map((v, i) => <option key={"cg"+v+i} value={v}>{v}</option>)}
                        </select>
                        <label htmlFor="new-category">
                            Nova Categoria
                        </label>
                        <div className="manager-input-btn-group">
                            <input className="same-height" id="new-category" type="text"/>
                            <Button className="same-height" variant="primary" onClick={addCategory}>Adicionar</Button>
                        </div>
                        <div id="add-success-failure" style={{display: (categoryFeedback !== "")?"flex":"none", justifyContent: "center"}}>
                            {categoryFeedback}
                        </div>
                    </div>
                    <div className="d-flex flex-row gap-2 align-items-center">
                        <Button variant="secondary" onClick={() => {
                            if (index === 0) return;
                            setIndex(index - 1);
                        }}>&lt;</Button>
                        <div style={{textAlign: "center"}}>
                            {`${Math.min(index + 1, data[qCategory].length)} / ${data[qCategory].length}`}
                        </div>
                        <Button variant="secondary" onClick={() => {
                            if (index >= data[qCategory].length - 1) return;
                            setIndex(index + 1);
                        }}>&gt;</Button>
                    </div>
                    <textarea placeholder="Digite as questões..." id="question-markdown" value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
                    <div className="d-flex flex-row gap-2 align-items-center">
                        <Button variant="danger" onClick={() => {
                            const newData = {...data};
                            const newIndex = Math.max(0, index - 1)
                            newData[qCategory][index] && newData[qCategory].splice(index, 1);
                            console.log(newData);
                            setData(newData);
                            setIndex(newIndex);
                            setTextValue(question2markdown(data[qCategory][newIndex] || {}));
                            saveData(newData);
                        }}>Deletar</Button>
                        <Button variant="light" onClick={() => setTextValue(markdown_template)}>Resetar</Button>
                        <Button variant="success" onClick={() => {
                            const lsData = JSON.parse(localStorage.getItem("questions-data"));
                            const typedQuestion = markdown2question(textValue);
                            if (typedQuestion === null) return;
                            lsData[qCategory][index] = typedQuestion;
                            setData(lsData);
                            saveData(lsData);
                        }}>Salvar</Button>
                        <Button variant="primary" onClick={() => {
                            const text = document.getElementById("question-markdown").value;
                            const newData = {...data};
                            const questionObject = markdown2question(text);
                            if (questionObject !== null) {
                                for (let i = 0; i < data[qCategory].length; i++) if (data[qCategory][i].body === questionObject.body) return;
                                newData[qCategory].push(questionObject);
                                setData(newData);
                                saveData(newData);
                            }
                        }}>Adicionar</Button>
                    </div>
                </div>
                <div className="question-space w-100">
                    <div className="question-header">{(data[qCategory].length === 0)?"":(() => {
                        return data[qCategory][index].body;
                    })()}</div>
                    <div className="question-choices">
                        {   
                            (data[qCategory].length === 0)?"":
                            data[qCategory][index].choices.map((v, i) =>
                                <label className={(data[qCategory][index].correct === i)?"correct-choice":""} key={`manager-label-${index}-${i}`}><input className="question-radio" key={`manager-input-${index}-${i}`} type="radio" name={"q" + index} disabled={true} defaultChecked={data[qCategory][index].correct === i}/> {v}</label>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manager;