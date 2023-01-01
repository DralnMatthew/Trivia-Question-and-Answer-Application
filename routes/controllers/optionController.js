import * as optionService from "../../services/optionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request) => {
  const body = request.body();
  const params = await body.value;
  return {
    option_text: params.get("option_text"),
    is_correct: params.get("is_correct") === "on"
  };
};

const addOption = async ({ request, response, render, params }) => {
  const optionData = await getOptionData(request);
  const topic_id = params.id;
  const question_id = params.qId;

  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );

  if (!passes) {
    //console.log(errors);
    optionData.validationErrors = errors;
    optionData.options = await optionService.listOptions(question_id);
    optionData.question_id = question_id;
    optionData.topic_id = topic_id;
    const question = await optionService.getQuestion(question_id);
    optionData.question_text = question[0].question_text;
    render("partials/topics/options.eta", optionData);
  } else {
    await optionService.addOption(
      question_id,
      optionData.option_text,
      optionData.is_correct
    );

    response.redirect(`/topics/${topic_id}/questions/${question_id}`);
  }
};

const listOptions = async ({ render, params }) => {
  const topic_id = params.id;
  const question_id = params.qId;
  const options = await optionService.listOptions(question_id);
  const question = await optionService.getQuestion(question_id);
  render("partials/topics/options.eta", {options: options, topic_id: topic_id, question_id: question_id, question_text: question[0].question_text});
};

const deleteOption = async ({ response, params }) => {
  const topic_id = params.tId;
  const question_id = params.qId;
  const option_id = params.oId;
  await optionService.deleteOption(option_id);
  response.redirect(`/topics/${topic_id}/questions/${question_id}`);
};

export { addOption, listOptions, deleteOption };