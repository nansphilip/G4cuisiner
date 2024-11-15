import React, { useState } from "react";

interface QuestionCardProps {
    onComplete: (answers: string[]) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ onComplete }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [numQuestion, setNumQuestion] = useState(1);
    const [answer, setAnswer] = useState<string[]>([]);
    const [isFading, setIsFading] = useState(false);

    const questions = [
        { id: 1, text: "La recette que tu veux concocter sera pour : " },
        { id: 2, text: "Très bien, et tu veux cuisiner :" },
        { id: 3, text: "Parfait, et enfin niveau temps, tu es plutôt..." },
    ];

    const answers = [
        { id: 1, text: "Le midi", idQ: 1 },
        { id: 2, text: "Le soir", idQ: 1 },
        { id: 3, text: "Aucun des deux, c'est à un autre moment", idQ: 1 },
        { id: 4, text: "Du salé", idQ: 2 },
        { id: 5, text: "Du sucré", idQ: 2 },
        { id: 6, text: "Pressé, et j'ai faim !", idQ: 3 },
        { id: 7, text: "J'ai tout mon temps !", idQ: 3 },
    ];

    const filterAnswers = answers.filter((answer) => answer.idQ === numQuestion);

    const handleClick = (option: { id: number; text: string; idQ: number }) => {
        setSelected(option.id);
        setAnswer((prev) => [...prev, option.text]);

        // Délai supplémentaire d'une seconde avant d'activer le fondu
        setTimeout(() => {
            setIsFading(true);
            // Attendre 2 secondes après l'effet de fondu avant de passer à la prochaine question
            setTimeout(() => {
                if (numQuestion === questions.length) {
                    setAnswer((prev) => [...prev, option.text]);
                    onComplete([...answer, option.text]); // Appel de la fonction du parent avec toutes les réponses
                    return;
                }
                // Passer à la question suivante
                setNumQuestion((prev) => prev + 1);
                setSelected(null);
                setIsFading(false); // Afficher la prochaine question avec fondu
            }, 1200); // Durée du fondu
        }, 500); // Délai avant le fondu
    };

    return (
        <>
            <div
                className={`flex w-3/4 flex-col items-center space-y-4 p-4 transition-opacity duration-700 ease-in-out ${
                    isFading ? "opacity-0" : "opacity-100"
                }`}
            >
                <h2 className="mb-4 text-3xl font-semibold">{questions[numQuestion - 1].text}</h2>
                <div className="flex w-full gap-4 space-x-4" style={{ perspective: "1000px" }}>
                    {filterAnswers.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleClick(option)}
                            className={`flex h-32 w-full cursor-pointer items-center justify-center rounded-md bg-tertiary p-6 text-center text-2xl text-white transition-all duration-700 ease-in-out hover:bg-black ${
                                selected === option.id ? "animate-rotate-y-and-fade" : ""
                            }`}
                        >
                            {option.text}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default QuestionCard;
