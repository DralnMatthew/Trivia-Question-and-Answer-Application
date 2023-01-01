import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text")
  };
};

const addQuestion = async ({ request, response, render, user, params }) => {
  const questionData = await getQuestionData(request);
  const topic_id = params.id;

  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    //console.log(errors);
    questionData.validationErrors = errors;
    questionData.questions = await questionService.listQuestions(topic_id);
    questionData.topic_id = topic_id;
    render("partials/topics/questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id,
      topic_id,
      questionData.question_text
    );

    response.redirect(`/topics/${topic_id}`);
  }
};

const listQuestions = async ({ render, params }) => {
  const topic_id = params.id;
  const questions = await questionService.listQuestions(topic_id);
  render("partials/topics/questions.eta", {questions: questions, topic_id: topic_id});
};

const deleteQuestion = async ({ response, params }) => {
  const topic_id = params.tId;
  const question_id = params.qId;
  await questionService.deleteQuestion(question_id);
  response.redirect(`/topics/${topic_id}`);
};

export { addQuestion, listQuestions, deleteQuestion };