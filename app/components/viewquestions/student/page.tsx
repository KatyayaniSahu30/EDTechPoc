'use client';
import React, { useState } from 'react';


type QuestionData = {
    question: string;
    type: string;
    options: string[];
    rightAnswer: string;
};


const questionsData: Record<string, QuestionData[]> = {
    JAVA: [
        {
            question: 'What is Java Virtual Machine (JVM)?',
            type: 'radio',
            options: ['Converts Java bytecode into machine language', 'Interprets Java bytecode', 'None of the above'],
            rightAnswer: 'Converts Java bytecode into machine language',
        },
        {
            question: 'Which one is not a Java feature?',
            type: 'checkbox',
            options: ['Dynamic', 'Architecture Neutral', 'Use of pointers', 'Object-oriented'],
            rightAnswer: 'Use of pointers',
        },
        {
            question: 'What is the use of the System.out.println method?',
            type: 'input',
            options: [],
            rightAnswer: 'To print a string in the console',
        },
        {
            question: 'Is Java platform-independent?',
            type: 'boolean',
            options: ['True', 'False'],
            rightAnswer: 'True',
        },
        // Add two more questions for each type
        {
            question: 'What does JDK stand for?',
            type: 'radio',
            options: ['Java Developer Kit', 'Java Design Kit', 'Just Development Kit'],
            rightAnswer: 'Java Developer Kit',
        },
        {
            question: 'Which keyword is used to prevent a class from being inherited?',
            type: 'checkbox',
            options: ['final', 'abstract', 'sealed', 'private'],
            rightAnswer: 'final',
        },
        {
            question: 'What is the default value of an instance variable?',
            type: 'boolean',
            options: ['0', 'null', 'depends on the type of variable', 'not initialized'],
            rightAnswer: 'depends on the type of variable',
        },
    ],
    HTML: [
        {
            question: 'What does HTML stand for?',
            type: 'radio',
            options: ['Hyperlinks and Text Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language'],
            rightAnswer: 'Hyper Text Markup Language',
        },
        {
            question: 'Choose the correct HTML element for the largest heading:',
            type: 'checkbox',
            options: ['<heading>', '<h1>', '<h6>', '<head>'],
            rightAnswer: '<h1>',
        },
        {
            question: 'What does the <form> element in HTML do?',
            type: 'input',
            options: [],
            rightAnswer: 'Creates an HTML form for user input',
        },
        {
            question: 'Is HTML a programming language?',
            type: 'boolean',
            options: ['True', 'False'],
            rightAnswer: 'False',
        },
    ],
    Python: [
        {
            question: 'What is the output of print(2+3+"Hello")?',
            type: 'radio',
            options: ['5Hello', 'TypeError', 'Compilation Error', 'Hello5'],
            rightAnswer: 'TypeError',
        },
        {
            question: 'Which of the following is an invalid variable?',
            type: 'checkbox',
            options: ['my_string_1', '1st_string', 'foo', 'my-string'],
            rightAnswer: '1st_string',
        },
        {
            question: 'What is the output of print("Hello" * 2)?',
            type: 'input',
            options: [],
            rightAnswer: 'HelloHello',
        },
        {
            question: 'Is Python case-sensitive when dealing with variables?',
            type: 'boolean',
            options: ['True', 'False'],
            rightAnswer: 'True',
        },
    ],
    'ASP.NET': [
        {
            question: 'What does ASP.NET stand for?',
            type: 'radio',
            options: ['Active Server Pages', '.NET Framework', 'Application Service Provider', 'Active Server Page'],
            rightAnswer: 'Active Server Pages',
        },
        {
            question: 'What is the full form of ADO?',
            type: 'checkbox',
            options: ['ActiveX Data Objects', 'Active Data Objects', 'ActiveX Database Objects', 'ActiveX Directory Objects'],
            rightAnswer: 'ActiveX Data Objects',
        },
        {
            question: 'What is the full form of ADO?',
            type: 'checkbox',
            options: ['ActiveX Data Objects', 'Active Data Objects', 'ActiveX Database Objects', 'ActiveX Directory Objects'],
            rightAnswer: 'ActiveX Data Objects',
        },
        {
            question: 'What is the purpose of the web.config file in ASP.NET?',
            type: 'input',
            options: [],
            rightAnswer: 'It configures ASP.NET application settings',
        },
        {
            question: 'Is ASP.NET open-source?',
            type: 'boolean',
            options: ['True', 'False'],
            rightAnswer: 'True',
        },
    ],
};


const ViewQuestionsPage: React.FC = () => {
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');


    const handleQuestionTypeChange = (value: string) => {
        setSelectedQuestionType(value);
    };


    const handleCourseChange = (value: string) => {
        setSelectedCourse(value);
    };


    return (


        <div style={{ margin: '0 auto', maxWidth: '600px', textAlign: 'center', paddingTop: '50px' }}>
            {/* <h1>View Questions Page</h1> */}


            <div style={{ margin: '10px', padding: '10px' }}>


                <label htmlFor="course" style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                    Select Course:
                </label>
                <select
                    id="course"
                    value={selectedCourse}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    style={{ width: '200px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}
                >
                    <option value="">Select Course</option>
                    <option value="JAVA">JAVA</option>
                    <option value="HTML">HTML</option>
                    <option value="Python">Python</option>
                    <option value="ASP.NET">ASP.NET</option>
                </select>
            </div>


            <div style={{ margin: '10px', padding: '10px' }}>
                <label htmlFor="questionType" style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                    Select Question Type:
                </label>
                <select
                    id="questionType"
                    value={selectedQuestionType}
                    onChange={(e) => handleQuestionTypeChange(e.target.value)}
                    style={{ width: '200px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}
                >
                    <option value="">Select Question Type</option>
                    <option value="radio">Radio Button</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="boolean">Boolean (True/False)</option>
                    <option value="input">Input Field</option>
                </select>
            </div>


            {selectedCourse && selectedQuestionType && questionsData[selectedCourse].map((question, index) => {
                if (question.type === selectedQuestionType) {
                    return (
                        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                            <h3>{question.question}</h3>
                            {question.type === 'radio' && question.options && question.options.length > 0 && (
                                <div>
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            <input type="radio" id={option} name={question.question} value={option} />
                                            <label htmlFor={option}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {question.type === 'checkbox' && question.options && question.options.length > 0 && (
                                <div>
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            <input type="checkbox" id={option} name={option} value={option} />
                                            <label htmlFor={option}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {question.type === 'boolean' && (
                                <div>
                                    <input type="radio" id="true" name={question.question} value="true" />
                                    <label htmlFor="true">True</label>
                                    <input type="radio" id="false" name={question.question} value="false" />
                                    <label htmlFor="false">False</label>
                                </div>
                            )}
                            {question.type === 'input' && <input type="text" />}
                            <div style={{ marginTop: '10px' }}>
                                <label>Right Answer:</label>
                                <input type="text" value={question.rightAnswer} disabled style={{ marginLeft: '10px', padding: '5px' }} />
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};


export default ViewQuestionsPage;