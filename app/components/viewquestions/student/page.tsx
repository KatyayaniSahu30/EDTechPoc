'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


type QuestionData = {
    question: string;
    type: string;
    options: string[];
    rightAnswer: string;
};

// Create Functional Component ViewQuestionsPage 
const ViewQuestionsPage: React.FC = () => {
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fetchedQuestions, setFetchedQuestions] = useState<QuestionData[]>([]);


    const handleQuestionTypeChange = (value: string) => {
        setSelectedQuestionType(value);
        setCurrentQuestionIndex(0);
    };


    const handleCourseChange = (value: string) => {
        setSelectedCourse(value);
        setCurrentQuestionIndex(0);
    };


    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };


    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };


    const handleDeleteQuestion = () => {
        if (fetchedQuestions.length > 0) {
            const updatedQuestions = fetchedQuestions.filter((question, index) => index !== currentQuestionIndex);
            setFetchedQuestions(updatedQuestions);
            console.log('Question deleted:', fetchedQuestions[currentQuestionIndex]);
            alert('Question Deleted'); // Add an alert box
        }
    };


    const fetchQuestions = async () => {
        try {
            const response = await axios.get('/api/getQuestions', {
                params: {
                    course: selectedCourse,
                    type: selectedQuestionType,
                },
            });
            setFetchedQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };


    useEffect(() => {
        console.log('Fetched Questions:', fetchedQuestions); // Add this console log statement


        if (fetchedQuestions.length > 0) {
            console.log('Current Question:', fetchedQuestions[currentQuestionIndex]); // Add this console log statement
        }
    }, [fetchedQuestions, currentQuestionIndex]);


    return (
        <div className="container mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-sky-300 via-purple-400 to-red-400 w-5/12">
            <h1 className="text-4xl mb-6 text-center font-bold hover:text-red-500 text-purple-800">
                VIEW <span className="bg-gradient-to-r font-black from-sky-500 via-purple-600 to-red-500 text-transparent bg-clip-text"> QUIZ </span> QUESTIONS
            </h1>
            <form className="grid grid-cols-1 gap-4">
                <div className="flex flex-row">
                    <div className="flex-1 p-5">
                        <label htmlFor="course" className="mb-5 text-2xl font-bold block">
                            Select Course:
                        </label>
                        <select
                            id="course"
                            value={selectedCourse}
                            onChange={(e) => handleCourseChange(e.target.value)}
                            className="w-80 p-2 border rounded-md"
                        >
                            <option value="">Select Course</option>
                            <option value="JAVA">JAVA</option>
                            <option value="HTML">HTML</option>
                            <option value="Python">Python</option>
                            <option value="ASP.NET">ASP.NET</option>
                        </select>
                    </div>
                    <div className="flex-1 p-5">
                        <label htmlFor="questionType" className="mb-5 text-2xl font-bold block">
                            Select Question Type:
                        </label>
                        <select
                            id="questionType"
                            value={selectedQuestionType}
                            onChange={(e) => handleQuestionTypeChange(e.target.value)}
                            className="w-80 p-2 border rounded-md"
                        >
                            <option value="">Select Question Type</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="input">Input</option>
                            <option value="boolean">Boolean</option>
                        </select>
                    </div>
                </div>
                {fetchedQuestions.length > 0 && (
                    <div className="mb-5 border rounded-lg p-5">
                        <h3>{fetchedQuestions[currentQuestionIndex].question}</h3>
                        {fetchedQuestions[currentQuestionIndex].options && fetchedQuestions[currentQuestionIndex].options.map((option, optionIndex) => (
                            <div key={optionIndex}>
                                {fetchedQuestions[currentQuestionIndex].type === 'radio' && (
                                    <div>
                                        <input type="radio" id={option} name={fetchedQuestions[currentQuestionIndex].question} value={option} />
                                        <label htmlFor={option} className="p-3">
                                            {option}
                                        </label>
                                    </div>
                                )}
                                {fetchedQuestions[currentQuestionIndex].type === 'checkbox' && (
                                    <div>
                                        <input type="checkbox" id={option} name={option} value={option} />
                                        <label htmlFor={option} className="p-3">
                                            {option}
                                        </label>
                                    </div>
                                )}
                            </div>
                        ))}
                        {fetchedQuestions[currentQuestionIndex].type === 'boolean' && (
                            <div>
                                <input type="radio" id="true" name={fetchedQuestions[currentQuestionIndex].question} value="true" className="p-15" />
                                <label htmlFor="true" className="mr-5">
                                    True
                                </label>
                                <input type="radio" id="false" name={fetchedQuestions[currentQuestionIndex].question} value="false" className="p-15" />
                                <label htmlFor="false">False</label>
                            </div>
                        )}
                        {fetchedQuestions[currentQuestionIndex].type === 'input' && <input type="text" className="mt-5 w-96" />}
                        <div className="mt-10">
                            <label>Right Answer:</label>
                            <input
                                type="text"
                                value={fetchedQuestions[currentQuestionIndex].rightAnswer}
                                disabled
                                className="ml-10 p-2 w-96"
                            />
                        </div>
                    </div>
                )}


                <div className="flex justify-between">
                    {currentQuestionIndex > 0 && (
                        <button onClick={handlePreviousQuestion} className="w-24 p-3 bg-blue-500 text-white font-bold rounded-lg mt-5">
                            Previous
                        </button>
                    )}
                    {currentQuestionIndex < fetchedQuestions.length - 1 && (
                        <button onClick={handleNextQuestion} className="w-24 p-3 bg-blue-500 text-white font-bold rounded-lg mt-5">
                            Next
                        </button>
                    )}
                    <div className="flex justify-end">
                        <button onClick={handleDeleteQuestion} className="w-24 p-3 bg-red-500 text-white font-bold rounded-lg mt-5">
                            Delete
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default ViewQuestionsPage;
