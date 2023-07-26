import React from 'react';
import { server } from './mocks/server';

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleCorrectAnswerChange = (event) => {
    const updatedCorrectIndex = parseInt(event.target.value);
    server
      .patch(`http://localhost:4000/questions/${id}`, { correctIndex: updatedCorrectIndex })
      .then((res) => {
        onUpdateCorrectAnswer(res.data);
      })
      .catch((error) => {
        console.error('Error updating the correct answer:', error);
      });
  };

  const handleDelete = () => {
    server
      .delete(`http://localhost:4000/questions/${id}`)
      .then(() => {
        onDeleteQuestion(id);
      })
      .catch((error) => {
        console.error('Error deleting the question:', error);
      });
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
