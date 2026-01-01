import { Award, Clock, RefreshCcw, Target, Trophy } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetQuiz } from '../store/quizslice'

export default function Results() {

    const dispatch = useDispatch()

    const { score, questions, answers, timeLeft } = useSelector((state) => state.quiz)

    const totalQuestions = questions.length
    const percentage = Math.round((score / totalQuestions) * 100)
    const timeUsed = 300 - timeLeft
    const minuteUsed = Math.floor(timeUsed / 60)
    const secondUsed = timeUsed % 60

    const handleReset = () => {
        dispatch(resetQuiz())
    }

    return (
        <div className=' max-w-4xl mx-auto'>
            <div className=' bg-white rounded-2xl shadow-xl p-8 text-center'>
                {/* Header */}
                <div className="mb-8">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 `}>
                        <Trophy className=' w-12 h-12' />
                    </div>
                    <h1 className=' text-4xl font-bold text-gray-800'>Success</h1>
                    <p className=' text-2xl font-semibold mb-6'>Chúc mừng bàn đã hoàn thành bài thi</p>
                </div>

                {/* Cards */}
                <div className=' grid md:grid-cols-3 gap-6 mb-8'>
                    <div className=' bg-gradient-to-br from-blue-50 to-blue-50 p-6 rounded-xl '>
                        <div className=' flex items-center justify-center mb-4'>
                            <Target className=' w-8 h-8 text-blue-600' />
                        </div>
                        <div className=' text-3xl font-bold to-blue-800 mb-2'>
                            {score} / {totalQuestions}
                        </div>
                        <div className=' text-blue-600 font-medium '> Đáp án chính xác
                        </div>
                    </div>
                    <div className=' bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl '>
                        <div className=' flex items-center justify-center mb-4'>
                            <Award className=' w-10 h-10 text-purple-600' />
                        </div>
                        <div className=' text-3xl font-bold to-purple-800 mb-2'>
                            {percentage}%
                        </div>
                        <div className=' text-purple-600 font-medium '> Tỷ lệ đúng
                        </div>
                    </div>
                    <div className=' bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl '>
                        <div className=' flex items-center justify-center mb-4'>
                            <Clock className=' w-8 h-8 text-green-600' />
                        </div>
                        <div className=' text-3xl font-bold to-green-800 mb-2'>
                            {minuteUsed}:{secondUsed.toString().padStart(2, "0")}
                        </div>
                        <div className=' text-green-600 font-medium '> Thời gian làm bài
                        </div>
                    </div>

                </div>

                {/* Result */}

                <div className='mb-8'>
                    <h3 className=' text-xl font-semibold text-gray-800 mb-4'>
                        Chi tiết
                    </h3>
                    {/* Display dynamic question */}
                    <div className=' grid gap-4 max-h-64 overflow-y-auto'>
                        {questions.map((question, index) => {
                            const answer = answers.find((a) => a.questionId === question.id)
                            const isCorrect = answer?.isCorrect ?? false
                            return (
                                <div key={index} className={`flex items-center justify-between p-4 rounded-lg border-2 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                                    <span className=' text-sm font-medium text-gray-700'>Questoin {index + 1}</span>
                                    <span className={`px-3 rounded-full text-sm font-medium ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <button className='mt-4 inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold text-lg cursor-pointer'
                        onClick={handleReset}>
                        <RefreshCcw size={24} className=' pr-2' />
                        Làm lại
                    </button>
                </div>
            </div>

        </div>
    )
}
