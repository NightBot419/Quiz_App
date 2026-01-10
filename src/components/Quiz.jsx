import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setQuestions, resetQuiz } from "../store/quizSlice"
import { shuffleQuiz, loadQuizQuestions } from '../store/quizLoader'
import { QuizStart, ProgressBar, Timer, Questions, Results, Loading } from "./"

export default function Quiz({ quizType }) {

    const dispatch = useDispatch()
    const { quizId } = useParams();
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);

    useEffect(() => {
        dispatch(resetQuiz()); // Reset quiz state when quizType changes
        const fetchAndSetQuestions = async () => {
            setIsLoadingQuiz(true); // Set loading to true before fetching
            const loadedQuestions = await loadQuizQuestions(quizType, quizId);
            const randomizedQuiz = shuffleQuiz(loadedQuestions);
            dispatch(setQuestions(randomizedQuiz));
            setIsLoadingQuiz(false);
        };
        fetchAndSetQuestions();
    }, [quizType, quizId, dispatch])

    const {
        questions,
        currentQuestionIndex,
        isQuizCompleted,
        isTimerActive,
        answers }
        = useSelector((state) => state.quiz)


    if (isLoadingQuiz || questions.length === 0) {
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
        const quizTitle = quizId === 'random' ? `${quizType} đề ngẫu nhiên` : `${quizType} đề ${quizId}`;
        const totalQuestions = questions.length;
        return (
            <div className='py-8 px-4 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 '>
                <QuizStart quizTitle={quizTitle} totalQuestions={totalQuestions} />
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
