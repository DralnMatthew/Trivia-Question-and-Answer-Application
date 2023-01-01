import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as quizController from "./controllers/quizController.js";

import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);

router.get("/topics/:id/questions/:qId", optionController.listOptions);
router.post("/topics/:id/questions/:qId/options", optionController.addOption);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOption);

router.get("/quiz", quizController.showTopics);
router.get("/quiz/:tId", quizController.getRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showRandomQuestion);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.submitAnswer);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctAnswer);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.inCorrectAnswer);

router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.testAnswer);

export { router };
