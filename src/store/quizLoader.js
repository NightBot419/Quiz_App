// Helper function to shuffle an array
const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

// Shuffles questions and their options
export function shuffleQuiz(questions) {
    if (!questions || questions.length === 0) {
        return [];
    }

    // 1. Shuffle main questions
    const shuffledQuestions = shuffleArray(questions);

    // 2. Shuffle options within each question and update correctAnswer
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
            id: index + 1, // (Optional) Re-assign IDs for consistency
            options: shuffledOptions.map(o => o.text),
            correctAnswer: newCorrectAnswer
        };
    });
}

export async function loadQuizQuestions(quizType, quizId = null) {
    const modules = import.meta.glob('../data/**/*.js');
    let allQuestions = [];

    if (quizId === 'random') {
        const quizPathPrefix = `../data/${quizType}/`;
        for (const path in modules) {
            if (path.startsWith(quizPathPrefix)) {
                const mod = await modules[path]();
                if (mod.sampleQuestions) {
                    allQuestions = allQuestions.concat(mod.sampleQuestions);
                }
            }
        }
        return shuffleArray(allQuestions).slice(0, 60);
    }
    
    if (quizId) {
        const path = `../data/${quizType}/Quiz${quizId}.js`;
        if (modules[path]) {
            const mod = await modules[path]();
            if (mod.sampleQuestions) {
                allQuestions = allQuestions.concat(mod.sampleQuestions);
            }
        }
    } else {
        const quizPathPrefix = `../data/${quizType}/`;
        for (const path in modules) {
            if (path.startsWith(quizPathPrefix)) {
                const mod = await modules[path]();
                if (mod.sampleQuestions) {
                    allQuestions = allQuestions.concat(mod.sampleQuestions);
                }
            }
        }
    }
    return allQuestions;
}