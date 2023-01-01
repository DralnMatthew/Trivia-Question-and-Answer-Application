import { executeQuery } from "../database/database.js";

const listQuestions = async () => {
    const res = await executeQuery(`SELECT * FROM questions`);
    return res.rows;
};

const listOptions = async (question_id) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id = $1`,
        question_id
    );
    return res.rows;
};

const judgeCorrect = async (question_id, option_id) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id = $1 AND id = $2`,
        question_id,
        option_id
    );
    return res.rows;
}

export {listQuestions, listOptions, judgeCorrect};