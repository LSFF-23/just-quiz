import { useState } from "react";
import { Button } from "react-bootstrap";

import questions from "./static/questions";

function Manager () {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("questions-data")) || questions);
    const [categories, setCategories] = useState(Object.keys(data));
    const [catFeedback, setCatFeedback] = useState("");

    function addCategory () {
        const categorySelect = document.getElementById("new-category");
        const cValue = categorySelect.value;
        if (!cValue) return;

        const newData = {...data};
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].toLowerCase() === cValue.toLowerCase()) {
                setCatFeedback(<span style={{color: "var(--bs-danger)"}}>A categoria {document.getElementById("new-category").value} já existe.</span>);
                return;
            }
        }
        newData[cValue] = [];
        localStorage.setItem("questions-data", JSON.stringify(newData));
        
        setData(newData);
        setCategories(categories.concat([cValue]));
        setCatFeedback(<span style={{color: "var(--bs-success)"}}>A categoria {document.getElementById("new-category").value} foi adicionada com sucesso!</span>);
    }

    return (
        <div>
            <div className="manage-category">
                <label htmlFor="current-category">
                    Categoria
                    <select id="current-category" className="current-category">
                        {categories.map((v, i) => <option key={"cg"+v+i} value={v}>{v}</option>)}
                    </select>
                </label>
                <div className="add-category">
                    <label htmlFor="new-category">
                        Nova Categoria:
                        <input id="new-category" type="text"/>
                    </label>
                    <Button variant="primary" onClick={addCategory}>Adicionar</Button>
                </div>
                <div id="add-success-failure">
                    {catFeedback}
                </div>
            </div>
        </div>
    );
}

export default Manager;