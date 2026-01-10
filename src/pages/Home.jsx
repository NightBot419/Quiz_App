import React from 'react'
import { listPage } from '../constants/listPages'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-8">
                        Chào mừng bạn đến với Ứng dụng Quiz
                    </h1>
                    <p className="text-sm sm:text-lg text-gray-700 mb-12">
                        Chọn một chủ đề để bắt đầu ôn tập
                    </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
                        {listPage.map((page) => (
                            <Link key={page.id} to={page.href} className="block">
                                <div className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-6 text-white flex flex-col justify-between h-full">
                                    <h2 className="text-lg sm:text-xl font-bold mb-2">{page.name}</h2>
                                    <p className="text-sm opacity-90">{page.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
