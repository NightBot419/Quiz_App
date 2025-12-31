import React, { useEffect } from 'react'
import QuizStart from './QuizStart'
import ProgressBar from './ProgressBar'
import Timer from './Timer'
import Questions from './Questions'
import Results from './Results'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import { sampleQuestions } from "../data/questions"
import { setQuestions } from "../store/quizSlice"

export default function Quiz() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setQuestions(sampleQuestions))
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
