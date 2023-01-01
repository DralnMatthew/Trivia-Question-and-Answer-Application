import { executeQuery } from "../database/database.js";

const addTopic = async (user_id, name) => {
  await executeQuery(
    `INSERT INTO topics(user_id, name) VALUES ($1, $2)`,
    user_id,
    name
  );
};

const listTopics = async () => {
    const res = await executeQuery(`SELECT * FROM topics`);
    return res.rows;
};

const deleteTopic = async (topic_id) => {
    await executeQuery(
        `DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = $1)`,
        topic_id
    );

    await executeQuery(
        `DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = $1)`,
        topic_id
    );

    await executeQuery(
        `DELETE FROM questions WHERE topic_id = $1`,
        topic_id
    );

    await executeQuery(
        `DELETE FROM topics WHERE id = $1`,
        topic_id,
    );
};
  
export { addTopic, listTopics, deleteTopic };