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
    const [textValue, setTextValue] = useState(question2markdown(data[categories[0]][0]));
    const [editMode, setEditMode] = useState("questions");

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

    return (
        <div className="manager-container">
            <div className="manager-radiogroup">
                <label><input name="interface-choice" type="radio" value="questions" onChange={(e) => setEditMode(e.target.value)} checked={editMode === "questions"}/> Questões</label>
                <label><input name="interface-choice" type="radio" value="categories" onChange={(e) => setEditMode(e.target.value)} checked={editMode === "categories"}/> Categorias</label>
            </div>
            {(editMode === "categories")?
            <div className="manage-category dark-container">
                <label htmlFor="current-category">
                    Categorias
                </label>
                <select id="current-category" className="current-category">
                    {categories.map((v, i) => <option key={"cg"+v+i} value={v}>{v}</option>)}
                </select>
                <label htmlFor="new-category">
                    Nova Categoria:
                </label>
                <div className="manager-input-btn-group">
                    <input id="new-category" type="text"/>
                    <Button variant="primary" onClick={addCategory}>Adicionar</Button>
                </div>
                <div id="add-success-failure" style={{display: (categoryFeedback !== "")?"flex":"none", justifyContent: "center"}}>
                    {categoryFeedback}
                </div>
            </div>:<></>}
            {(editMode === "questions")?
            <div className="manage-questions dark-container">
                <div className="questions-container">
                    <label htmlFor="questions-category">
                        Categoria
                        <select id="questions-category" className="questions-category" onChange={(e) => {
                            setQCategory(e.target.value);
                            setTextValue(question2markdown(data[e.target.value][index] || {}));
                        }}>
                            {categories.map((v, i) => <option key={"cg"+v+i} value={v}>{v}</option>)}
                        </select>
                    </label>
                    <div>
                        <Button variant="secondary" onClick={() => {
                            if (index === 0) return;
                            setIndex(index - 1);
                        }}>&lt;</Button>
                        <input style={{textAlign: "center"}} type="text" disabled value={`${Math.min(index + 1, data[qCategory].length)} / ${data[qCategory].length}`}/>
                        <Button variant="secondary" onClick={() => {
                            if (index >= data[qCategory].length - 1) return;
                            setIndex(index + 1);
                        }}>&gt;</Button>
                    </div>
                    <textarea placeholder="Digite as questões..." id="question-markdown" value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
                    <div className="manager-controls">
                        <div>
                            <Button variant="danger">Deletar</Button>
                            <Button variant="light" onClick={() => setTextValue(markdown_template)}>Resetar</Button>
                            <Button variant="success">Salvar</Button>
                            <Button variant="primary" onClick={() => {
                                const text = document.getElementById("question-markdown").value;
                                const newData = {...data};
                                const questionObject = markdown2question(text);
                                if (questionObject !== null) {
                                    newData[qCategory].push(questionObject);
                                    setData(newData);
                                    localStorage.setItem("questions-data", JSON.stringify(newData));
                                }
                            }}>Adicionar</Button>
                        </div>
                    </div>
                </div>
                <div className="question-space">
                    <div className="question-header">{(data[qCategory].length === 0)?"":data[qCategory][index].body}</div>
                    <div className="question-choices">
                        {   
                            (data[qCategory].length === 0)?"":
                            data[qCategory][index].choices.map((v, i) =>
                                <label className={(data[qCategory][index].correct === i)?"correct-choice":""} key={`manager-label-${index}-${i}`}><input className="question-radio" key={`manager-input-${index}-${i}`} type="radio" name={"q" + index} disabled={true} defaultChecked={data[qCategory][index].correct === i}/> {v}</label>
                            )
                        }
                    </div>
                </div>
            </div>:<></>}
        </div>
    );
}

export default Manager;