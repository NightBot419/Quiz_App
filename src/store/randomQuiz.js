export default function shuffleQuiz(questions) {
    // Fisher–Yates shuffle cho mảng
    const shuffleArray = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    // 1. Shuffle câu hỏi
    const shuffledQuestions = shuffleArray(questions);

    // 2. Shuffle options trong từng câu + sửa correctAnswer
    return shuffledQuestions.map((q, index) => {
        const optionsWithIndex = q.options.map((opt, i) => ({
            text: opt,
            oldIndex: i
        }));

        const shuffledOptions = shuffleArray(optionsWithIndex);

        const newCorrectAnswer = shuffledOptions.findIndex(
            o => o.oldIndex === q.correctAnswer
        );

        return {
            ...q,
            id: index + 1, // (tuỳ chọn) đánh lại id cho đẹp
            options: shuffledOptions.map(o => o.text),
            correctAnswer: newCorrectAnswer
        };
    });
}

