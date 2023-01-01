import * as quizService from "../../services/quizService.js";

const showTopics = async ({ render }) => {
    const topics = await quizService.listTopics();
    render("partials/quiz/topics.eta", {topics: topics});
};

const getRandomQuestion = async ({ response, params, render }) => {
    const topic_id = params.tId;
    const questions = await quizService.listQuestions(topic_id);
    if (questions.length === 0) {
        render("partials/quiz/noquestion.eta");
        return ;
    }
    const r = Math.floor(Math.random() * questions.length);
    response.redirect(`/quiz/${topic_id}/questions/${questions[r].id}`)
};

const showRandomQuestion = async ({ params, render }) => {
    const topic_id = params.tId;
    const question_id = params.qId;
    const question_text = await quizService.getQuestionText(question_id);
    const options = await quizService.listQuestionOptions(question_id);
    render("partials/quiz/question.eta", {question_text: question_text, options: options, topic_id: topic_id});
};

const submitAnswer = async ({ params, user, response }) => {
    const question_id = params.qId;
    const topic_id = params.tId;
    const option_id = params.oId;
    await quizService.addAnswer(user.id, question_id, option_id);
    const options = await quizService.listQuestionOptions(question_id);
    const result = options.filter(option => option.id === Number(option_id) && option.is_correct === true);
    if(result.length) response.redirect(`/quiz/${topic_id}/questions/${question_id}/correct`);
    else response.redirect(`/quiz/${topic_id}/questions/${question_id}/incorrect`);
};

const correctAnswer = async ({ params, render }) => {
    const topic_id = params.tId;
    render("partials/quiz/correct.eta", {topic_id: topic_id});
};

const inCorrectAnswer = async ({ params, render }) => {
    const topic_id = params.tId;
    const question_id = params.qId;
    const options = await quizService.listQuestionOptions(question_id);
    const result = options.filter(option => option.is_correct === true);
    const option_text = result[0].option_text;
    render("partials/quiz/incorrect.eta", {topic_id: topic_id, option_text: option_text});
};


export { showTopics, getRandomQuestion, showRandomQuestion, submitAnswer, correctAnswer, inCorrectAnswer };
