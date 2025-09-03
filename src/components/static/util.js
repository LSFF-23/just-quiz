export function shuffle (array) {
  const aCopy = [...array];
  for (let i = aCopy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [aCopy[i], aCopy[j]] = [aCopy[j], aCopy[i]];
  }
  return aCopy;
}

/**
 * @typedef {Object} Question
 * @property {String} body
 * @property {Array<String>} choices
 * @property {number} correct
 * @property {String} feedback
*/

export const markdown_template = `[q][/q]\n[r][/r]\n[o][/o]\n[o][/o]\n[o][/o]\n[f][/f]`;

export function question2markdown (question) {
  if (!("body" in question) || !("choices" in question) || !("correct" in question) || !("feedback" in question)) return markdown_template;

  const markdown = [];
  markdown.push(`[q]${question.body}[/q]`);
  for (let i = 0; i < question.choices.length; i++) {
    if (i === question.correct) markdown.push(`[r]${question.choices[i]}[/r]`);
    else markdown.push(`[o]${question.choices[i]}[/o]`);
  }
  markdown.push(`[f]${question.feedback}[/f]`);
  return markdown.join("\n");
}

export function markdown2question (markdown) {
  const bodyRegex = /\[q\](.*?)\[\/q\]/g;
  const choicesRegex = /\[o\](.*?)\[\/o\]/g;
  const correctRegex = /\[r\](.*?)\[\/r\]/g;
  const feedbackRegex = /\[f\](.*?)\[\/f\]/g;

  const body = [...markdown.matchAll(bodyRegex)].map(v => v[1])[0];
  const choices = [...markdown.matchAll(choicesRegex)].map(v => v[1]);
  const correct = [...markdown.matchAll(correctRegex)].map(v => v[1])[0];
  const feedback = [...markdown.matchAll(feedbackRegex)].map(v => v[1])[0];
  
  if (typeof body !== "string" || body === "" || !(Array.isArray(choices)) || choices.length === 0 || typeof correct !== "string" || correct === "" || typeof feedback !== "string") return null;
  
  return {
    body: body,
    choices: [correct].concat(choices),
    correct: 0,
    feedback: feedback
  }
}

export function exportJSON (objectName) {
  try {
    const data = JSON.parse(localStorage.getItem(objectName));

    if (Object.keys(data).length === 0) return;

    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${objectName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
}

export function importJSON (event, objectName) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);  
      if (typeof data !== 'object' || data === null) {
        return;
      }
      localStorage.setItem(objectName, JSON.stringify(data));
    } catch (error) {
      console.error(error);
      return;
    }
  };
  reader.onerror = function() {
    return;
  };
  reader.readAsText(file);
  
  event.target.value = '';

  return true;
}