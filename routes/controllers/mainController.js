import * as mainService from "../../services/mainService.js";
const showMain = async({ render }) => {
  const cntTopics = await mainService.cntTopics();
  const cntQuestions = await mainService.cntQuestions();
  const cntAnswers = await mainService.cntAnswers();
  const usersWithMostAnsweredQuestions = await mainService
      .findFiveUsersWithMostAnsweredQuestions();
  console.log(usersWithMostAnsweredQuestions)
  render("main.eta", {cntTopics: cntTopics, cntQuestions: cntQuestions, cntAnswers: cntAnswers, most: usersWithMostAnsweredQuestions});
};



export { showMain };
