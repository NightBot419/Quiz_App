import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sampleQuestions } from "../data/LSD/Quiz1"
import { setQuestions } from "../store/quizSlice"
import shuffleQuiz from '../store/randomQuiz'
import { QuizStart, ProgressBar, Timer, Questions, Results, Loading } from "./"

export default function Quiz() {

    const dispatch = useDispatch()
    const randomizedQuiz = shuffleQuiz(sampleQuestions)
    useEffect(() => {
        dispatch(setQuestions(randomizedQuiz))
    }, dispatch)

    const {
        questions,
        currentQuestionIndex,
        isQuizCompleted,
        isTimerActive,
        answers }
        = useSelector((state) => state.quiz)


    if (questions.length === 0) {
        return (
            <Loading />
        )
    }

    if (isQuizCompleted) {
        return (
            <div className='py-8 px-4 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
                <Results />
            </div>
        )
    }

    if (!isTimerActive && answers.length === 0) {
        return (
            <div className='py-8 px-4 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 '>
                <QuizStart />
            </div>
        )
    }


    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-while to-purple-50 py-8 px-4'>
            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex-1">
                            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                        </div>
                        <div className='md:ml-6'>
                            <Timer />
                        </div>
                    </div>
                </div>
            </div>
            <Questions />
        </div>
    )
}


function shuffleQuestionsAndOptions(questions) {
    return questions.map(q => {
        const optionsWithIndex = q.options.map((opt, index) => ({
            text: opt,
            index
        }));

        // shuffle options
        for (let i = optionsWithIndex.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsWithIndex[i], optionsWithIndex[j]] =
                [optionsWithIndex[j], optionsWithIndex[i]];
        }

        const newCorrectAnswer = optionsWithIndex.findIndex(
            o => o.index === q.correctAnswer
        );

        return {
            ...q,
            options: optionsWithIndex.map(o => o.text),
            correctAnswer: newCorrectAnswer
        };
    });
}
