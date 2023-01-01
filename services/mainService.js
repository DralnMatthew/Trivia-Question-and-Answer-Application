import { executeQuery } from "../database/database.js";

const cntTopics = async () => {
    const res = await executeQuery("SELECT * FROM topics");
    return res.rows.length;
}

const cntQuestions = async () => {
    const res = await executeQuery("SELECT * FROM questions");
    return res.rows.length;
}

const cntAnswers = async () => {
    const res = await executeQuery("SELECT * FROM question_answers");
    return res.rows.length;
}

const findFiveUsersWithMostAnsweredQuestions = async () => {
    const res = await executeQuery(
        `SELECT users.email, count(*) as count FROM question_answers, question_answer_options, users
    WHERE question_answers.question_answer_option_id = question_answer_options.id AND question_answer_options.is_correct = true
    AND question_answers.question_id = question_answer_options.question_id AND question_answers.user_id = users.id
    GROUP BY users.id
    ORDER BY count
    LIMIT 5`,
    );

    return res.rows;
};

export {cntTopics, cntQuestions, cntAnswers, findFiveUsersWithMostAnsweredQuestions};