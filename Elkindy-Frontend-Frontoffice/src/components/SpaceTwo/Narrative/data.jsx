
 export const quiz = {
    quizTitle: 'React Quiz Component Demo',
    quizSynopsis: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim',
    nrOfQuestions: '6',
    questions: [
      {
        question: 'How can you access the state of a component from inside of a member function?',
        questionType: 'text',
        answers: [
          'this.getState()',
          'this.prototype.stateValue',
          'this.state',
          'this.values',
        ],
        correctAnswer: '3',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        point: '20',
       
      },
      {
        question: 'ReactJS is developed by ?',
        questionType: 'text',
      
        answers: [
          'Google Engineers',
          'Facebook Engineers',
        ],
        correctAnswer: '2',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        point: '20',
        
      },
      {
        question: 'ReactJS is an MVC based framework?',
        questionType: 'text',
        
        answers: [
          'True',
          'False',
        ],
        correctAnswer: '2',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        point: '10',
      },
      {
        question: 'Which of the following concepts is/are key to ReactJS?',
        questionType: 'text',

        answers: [
          'Component-oriented design',
          'Event delegation model',
          'Both of the above',
        ],
        correctAnswer: '3',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        point: '30',
        
      },
      {
        question: 'What are the advantages of React JS?',
        questionType: 'text',
        answers: [
          'React can be used on client and as well as server side too',
          'Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps',
          'React components have lifecycle events that fall into State/Property Updates',
          'React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer',
        ],
        correctAnswer: [1, 2, 4],
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        point: '20',
      },
    ],
  };
  
  export default quiz;