import React from 'react';

const NoteTable = ({ notes }) => {
    return (
        <div className="note-table-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
            <h2>Notes</h2>
            <table className="note-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Exam</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Teacher's remark</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Score</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>View Your answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{note.exam.title}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{note.content}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{note.score}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                {/* Eye icon for viewing */}
                                <a href={note.answer.answerPdf} target="_blank" rel="noopener noreferrer">
                    <i className="fal fa-eye" style={{ color: 'blue', marginRight: '10px', cursor: 'pointer' }}></i>
                </a>
                                {/* Report icon for reporting */}
                               {/*  <i className="fal fa-exclamation-triangle" style={{ color: 'red', cursor: 'pointer' }}></i>*/}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
};

export default NoteTable;