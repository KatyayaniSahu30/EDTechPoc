'use client';
import React, { useState } from 'react';

// Define the AddQuestion functional component
const AddQuestion: React.FC = () => {
    // State variables to manage various aspects of the component
    const [course, setCourse] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: [''] }]);
    const [rightAnswers, setRightAnswers] = useState(['']);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionType, setQuestionType] = useState('radio');
    // const [marks, setMarks] = useState(2);

    // Function to add an option to a question
    const handleAddOption = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options.push('');
        setQuestions(updatedQuestions);
    };

    // Function to navigate back to the previous question
    const handleBack = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    // Function to remove an option from a question
    const handleRemoveOption = (qIndex: number, oIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options.splice(oIndex, 1);
        setQuestions(updatedQuestions);
    };

    // Function to handle changes in an option for a question
    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = value;
        setQuestions(updatedQuestions);
    };

    // Function to add a right answer
    const handleAddRightAnswer = () => {
        setRightAnswers([...rightAnswers, '']);
    };

    // Function to remove a right answer
    const handleRemoveRightAnswer = (index: number) => {
        const updatedRightAnswers = [...rightAnswers];
        updatedRightAnswers.splice(index, 1);
        setRightAnswers(updatedRightAnswers);
    };

    // Function to handle changes in a right answer
    const handleRightAnswerChange = (index: number, value: string) => {
        const updatedRightAnswers = [...rightAnswers];
        updatedRightAnswers[index] = value;
        setRightAnswers(updatedRightAnswers);
    };

    // Function to handle changes to the question type
    const handleQuestionTypeChange = (value: string) => {
        setQuestionType(value);
    };

    // Function to handle form submission

    const handleSubmit = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const data = {
                course,
                questions: questions.map((q) => ({
                    question: q.question,
                    options: JSON.stringify(q.options), // Convert the options array to a string
                })),
                rightAnswers,
                currentQuestionIndex,
                questionType,
            };

            // Log the data before sending
            console.log('Data to be sent:', data);

            //Show an alert box to confirm submission
            const confirmSubmit = window.confirm('Do you want to submit the data?');
            if (confirmSubmit) {
                // Send the data to the server
                fetch('/api/postQuestions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Success:', data);
                        // Add a new question for the next round
                        setQuestions([...questions, { question: '', options: [''] }]);
                        // Set Marks
                        //setMarks(0);
                        setCurrentQuestionIndex(questions.length); // Set the question index to the new value
                        setRightAnswers([]); // Reset the right answers
                        setCourse(''); // Reset the course
                        setQuestionType('radio'); // Reset the question type
                        //window.location.reload(); // Reload the page
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }

        }
    };

    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];

    // JSX to render the component
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {/* Heading for the component */}
            <h1 className="text-4xl mb-6 text-center font-bold hover:text-red-500 text-purple-800">
                ADD <span className="bg-gradient-to-r font-black from-sky-400 via-purple-600 to-red-500 text-transparent bg-clip-text"> QUIZ </span> QUESTIONS
            </h1>
            {/* Form for adding questions */}
            <div className="container mx-auto mt-0 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-sky-300 via-purple-400 to-red-400 w-5/12">
                <form className="grid grid-cols-1 gap-4">

                    {/* Dropdown to select course */}
                    <div className="flex flex-row mb-4">
                        <div className="w-1/2 pr-2">
                            <label htmlFor="course" className="mb-2 text-md font-bold">
                                Select Course:
                            </label>
                            <select
                                id="course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            >
                                <option value="">Select Course</option>
                                <option value="JAVA">JAVA</option>
                                <option value="ASP.NET">ASP.NET</option>
                                <option value="Python">Python</option>
                            </select>
                        </div>

                        <div className="w-1/2 pl-2">
                            <label htmlFor="questionType" className="mb-2 text-md font-bold">
                                Question Type:
                            </label>
                            {/* Dropdown to select question type */}
                            <select
                                id="questionType"
                                value={questionType}
                                onChange={(e) => handleQuestionTypeChange(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            >
                                <option value="radio">Radio Button</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="boolean">Boolean (True/False)</option>
                                <option value="input">Input Field</option>
                            </select>
                        </div>
                    </div>


                    {/* Input for the current question */}
                    <div className="flex flex-col mb-4">

                        <label htmlFor={`question`} className="mb-2 text-md font-bold flex justify-between">
                            <span>Question {currentQuestionIndex + 1}:</span>
                            <span className="text-md font-bold">Marks: 2</span>
                        </label>

                        <textarea
                            id={`question`}
                            placeholder={`Enter question`}
                            value={currentQuestion.question}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[currentQuestionIndex].question = e.target.value;
                                setQuestions(updatedQuestions);
                            }}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />

                        {/* Options for the current question */}

                        <div className="flex flex-col">
                            <label htmlFor={`options`} className="mb-2 text-md font-bold">
                                Options:
                            </label>
                            <div id={`options`} className="flex flex-col">
                                {currentQuestion.options.map((option, oIndex) => (
                                    <div key={oIndex} className="flex items-center">
                                        <div className="mr-2">{String.fromCharCode(65 + oIndex)})</div>
                                        <input
                                            type="text"
                                            placeholder={`Option ${oIndex + 1}`}
                                            value={option}
                                            onChange={(e) => handleOptionChange(currentQuestionIndex, oIndex, e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded mb-2"
                                        />
                                        {currentQuestion.options.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveOption(currentQuestionIndex, oIndex)}
                                                className="p-2 text-black-700 hover:text-black-900"
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddOption(currentQuestionIndex)}
                                    className="p-2 text-black-700 hover:text-black-900"
                                >
                                    Add Option
                                </button>
                            </div>
                        </div>

                        {/* Right Answers */}
                        <div className="flex flex-col">
                            <label htmlFor={`rightAnswers`} className="mb-2 text-md font-bold">
                                Right Answers:
                            </label>
                            <div id={`rightAnswers`} className="flex flex-col">
                                {rightAnswers.map((rightAnswer, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="mr-2">{String.fromCharCode(65 + index)})</div>
                                        <input
                                            type="text"
                                            placeholder={`Right Answer ${index + 1}`}
                                            value={rightAnswer}
                                            onChange={(e) => handleRightAnswerChange(index, e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded mb-2"
                                        />
                                        {rightAnswers.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveRightAnswer(index)}
                                                className="p-2 text-black-700 hover:text-black-900"
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddRightAnswer}
                                    className="p-2 text-black-700 hover:text-black-900"
                                >
                                    Add Right Answer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Back & Submit buttons */}
                    <div className="flex justify-between items-start">

                        {currentQuestionIndex > 0 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-indigo-700 text-white h-14 px-4 rounded-lg hover:bg-indigo-800 hover:text-white w-32 rounded-xl hover:shadow-halo transition-all"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-indigo-700 text-white h-14 px-4 rounded-lg hover:bg-indigo-800 hover:text-white w-32 rounded-xl hover:shadow-halo transition-all"
                        >
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuestion;
