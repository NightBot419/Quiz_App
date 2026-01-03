import { BookOpen, Clock, Play, Trophy } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startQuiz } from '../store/quizSlice'

export default function QuizStart({ quizTitle, totalQuestions }) {
    const dispatch = useDispatch()

    const handleStartQuiz = () => {
        dispatch(startQuiz())
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="mb-8 grid grid-rows">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6 mx-auto">
                        <BookOpen className='w-12 h-12 items-center' />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{quizTitle}</h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Chúc bạn may mắn</p>
                </div>

                {/* Card  */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                        <div className="flex items-center justify-center mb-4">
                            <BookOpen className='w-8 h-8 text-blue-600' />
                        </div>
                        <div className="text-2xl font-bold text-blue-800 mb-2">{totalQuestions}</div>
                        <div className="text-2xl font-medium">Câu hỏi</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                        <div className="flex items-center justify-center mb-4">
                            <Clock className='w-8 h-8 text-purple-600' />

                        </div>
                        <div className="text-2xl font-bold text-purple-600 mb-2">15:00</div>
                        <div className="text-2xl font-medium">Phút</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                        <div className="flex items-center justify-center mb-4">
                            <Trophy className='w-8 h-8 text-green-600' />

                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                        <div className="text-2xl font-medium">Điểm tối đa</div>
                    </div>
                </div>

                {/* Rules */}

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Quy tắc</h3>
                    <div className="text-left bg-gray-50 p-6 rounded-xl max-w-2xl mx-auto">
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="flex-shring-0 justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center text-sm font-semibold mr-3 mt-0.5">
                                    1
                                </span>
                                <span className="">Mỗi câu hỏi đều có nhiều đáp án để lựa chọn</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shring-0 justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center text-sm font-semibold mr-3 mt-0.5">
                                    2
                                </span>
                                <span className="">Bạn có 60 phút để hoàn thành tất cả câu hỏi</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shring-0 justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center text-sm font-semibold mr-3 mt-0.5">
                                    3
                                </span>
                                <span className="">Chọn đáp án và bạn sẽ thấy câu trả lời chính xác cho câu hỏi</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shring-0 justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center text-sm font-semibold mr-3 mt-0.5">
                                    4
                                </span>
                                <span className="">Đừng nhấn nút quay lại vì đang bị lỗi!!</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <button className=' inline-flex items-center space-x-3 py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold text-lg cursor-pointer'
                    onClick={handleStartQuiz}>
                    <Play size={24} />
                    <span>Bắt đầu</span>
                </button>
            </div>
        </div>
    )
}
