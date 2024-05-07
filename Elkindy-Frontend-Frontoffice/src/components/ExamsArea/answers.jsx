import React, { useState, useEffect } from "react";
import AnswerItemCom from "./AnswerItem";

const AnswersPage = ({ examId }) => {
    const [answers, setAnswers] = useState([]);
    
    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await fetch(`https://elkindy-project-backend.onrender.com/api/answer/answers/${examId}`);
                if (response.ok) {
                    const data = await response.json();
                     // Fetch notes for each answer
                     const answersWithNotes = await Promise.all(data.map(async (answer) => {
                        const noteResponse = await fetch(`https://elkindy-project-backend.onrender.com/api/note/byanswer/${answer._id}`);
                        if (noteResponse.ok) {
                            const noteData = await noteResponse.json();
                            answer.note = noteData;
                        }
                        return answer;
                    }));

                    setAnswers(answersWithNotes);
                } else {
                    throw new Error('Failed to fetch answers');
                }
            } catch (error) {
                console.error('Error fetching answers:', error);
            }
        };

        fetchAnswers();
    }, [examId]);// Empty dependency array ensures the effect runs only once when the component mounts
  
    return (
        <div className="comment-wrap">
            <h2 className="title">
                {answers.length} <span>Answers</span>
            </h2>
            {answers.length === 0 ? (
                <p>No answers yet</p>
            ) : (
                <div className="latest-comments">
                    <ul className="list-wrap">
                        {answers.map((answer) => (
                            <li key={answer._id}>
                                <AnswerItemCom
                                    item={{
                                        src: answer.client?.profilePicture || '/img/blog/comment_avatar01.png',
                                        author: answer.client?.name +" " +answer.client?.lastname || 'Anonymous',
                                        created_at: answer.createdAt,
                                        comment: answer.answerPdf,
                                        score: answer.note ? answer.note.score : '--/20',
                                        id:answer._id,
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AnswersPage;