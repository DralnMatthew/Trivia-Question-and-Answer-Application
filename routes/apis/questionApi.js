import * as apiService from "../../services/apiService.js";

const getRandomQuestion = async ({ response }) => {
    const questions = await apiService.listQuestions();
    if(questions.length === 0) return {};
    const r = Math.floor(Math.random() * questions.length);
    const question = {};
    question.questionId = questions[r].id;
    question.questionText = questions[r].question_text;
    const options = await apiService.listOptions(questions[r].id);
    for (let i = 0; i < options.length; i++) {
        delete options[i].question_id;
        delete options[i].is_correct;
        options[i].optionId = options[i].id;
        options[i].optionText = options[i].option_text;
        delete options[i].id;
        delete options[i].option_text;
    }
    question.answerOptions = options;
    response.body = question;
}

const testAnswer = async ({response, request}) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    const question_id = document.questionId;
    const option_id = document.optionId;

    const res = await apiService.judgeCorrect(question_id, option_id);
    if (res.length > 0) response.body = {correct: res[0].is_correct === true};
    else response.body = {correct: false};
}

export {getRandomQuestion, testAnswer};
