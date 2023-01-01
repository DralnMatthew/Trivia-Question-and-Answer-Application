import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  };
};

const addTopic = async ({ request, response, render, user }) => {
  const topicData = await getTopicData(request);

  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes) {
    //console.log(errors);
    topicData.validationErrors = errors;
    topicData.topics = await topicService.listTopics();
    render("partials/topics/topics.eta", topicData);
  } else {
    await topicService.addTopic(
      user.id,
      topicData.name,
    );

    response.redirect("/topics");
  }
};

const listTopics = async ({ render, user }) => {
  const userdata = {id: user.id, email: user.email, admin: user.admin};
  const topics = await topicService.listTopics();
  render("partials/topics/topics.eta", {topics: topics, user: userdata});
};

const deleteTopic = async ({ response, params }) => {
  const topic_id = params.id;
  await topicService.deleteTopic(topic_id);
  response.redirect("/topics");
};

export { addTopic, listTopics, deleteTopic };