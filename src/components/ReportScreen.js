import { useEffect, useState } from "react";

function ReportScreen ({answers, questions}) {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        let countCorrect = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] === questions[i].correct) countCorrect += 1;
        }
        setPercentage(Math.round(countCorrect/answers.length*100));
    }, [answers, questions]);

    return (
        <div>
            Você acertou {percentage}% das questões.
        </div>
    );
}

export default ReportScreen