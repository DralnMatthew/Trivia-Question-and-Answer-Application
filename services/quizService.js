import { executeQuery } from "../database/database.js";

const listTopics = async () => {
    const res = await executeQuery(`SELECT * FROM topics`);
    return res.rows;
};

const listQuestions = async (topic_id) => {
    const res = await executeQuery(`SELECT * FROM questions WHERE topic_id = $1`, topic_id);
    return res.rows;
};

const getQuestionText = async (question_id) => {
    const res = await executeQuery(`SELECT * FROM questions WHERE id = $1`, question_id);
    return (res.rows)[0].question_text;
}

const listQuestionOptions = async (question_id) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id = $1`, question_id);
    return res.rows;
}

const addAnswer = async (user_id, question_id, question_answer_option_id) => {
    await executeQuery(`INSERT INTO question_answers(user_id, question_id, question_answer_option_id) VALUES ($1, $2, $3)`,
        user_id,
        question_id,
        question_answer_option_id
    );
}



export { listTopics, listQuestions, getQuestionText, listQuestionOptions, addAnswer};