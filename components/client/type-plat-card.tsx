"use client";
import { useState } from "react";
import Image from "next/image";
// import { set } from "zod";

type TypePlatCardProps = {
    imageSrc: string;
    title: string;
    isActive: boolean;
    onClick: () => void;
};
const TypePlatCard = (props: TypePlatCardProps) => {
    const { imageSrc, title, isActive, onClick } = props;

    return (
        <div
            className={`max-w-sm overflow-hidden rounded shadow-xl transition duration-300  ${
                !isActive ? "opacity-50" : ""
            } hover:scale-105`}
            onClick={onClick}
        >
            <Image
                className={`h-32 w-full object-contain ${
                    isActive ? "border-blue-500 bg-primary" : "border-gray-300 bg-white"
                }`}
                src={imageSrc}
                alt={title}
                width={80}
                height={80}
            />
            <div className="px-6 py-4">
                <h1 className="mb-2 text-xl font-bold ">{title}</h1>
            </div>
        </div>
    );
};

const TypePlatCards = () => {
    const [activeCard, setActiveCard] = useState(0);
    const [lunchStep, setLunchStep] = useState("");
    // enum LunchStep {
    //     APPETIZER
    //     STARTER
    //     MAIN
    //     DESSERT
    // }

    const handleCardClick = (index: number) => {
        setActiveCard(index);
        setLunchStep(plateList[index - 1].title);
    };

    const plateList = [
        {
            imageSrc: "/lunchStep/appetizer.webp",
            title: "APPETIZER",
            name: "Apéritif",
            index: 1,
            isActive: activeCard === 1,
            // onClick: () => handleCardClick(1),
        },
        {
            imageSrc: "/lunchStep/starter.webp",
            title: "STARTER",
            name: "Entrée",
            index: 2,
            isActive: activeCard === 2,
            // onClick: () => handleCardClick(2),
        },
        {
            imageSrc: "/lunchStep/main.webp",
            title: "MAIN",
            name: "Plat",
            index: 3,
            isActive: activeCard === 3,
            // onClick: () => handleCardClick(3),
        },
        {
            imageSrc: "/lunchStep/dessert.webp",
            title: "DESSERT",
            name: "Dessert",
            index: 4,
            isActive: activeCard === 4,
            // onClick: () => handleCardClick(4),
        },
    ];

    return (
        <div className="flex w-full flex-col items-center justify-center rounded-xl border p-4 shadow lg:w-3/5">
            <h2 className="mb-6 text-xl font-bold">Sélectionner le type de repas : </h2>
            <div className="grid w-full grid-cols-2 gap-4 md:p-4">
                {plateList.map((plate) => {
                    const isActive = activeCard === plate.index;
                    return (
                        <TypePlatCard
                            key={plate.index}
                            imageSrc={plate.imageSrc}
                            title={plate.name}
                            isActive={isActive}
                            onClick={() => handleCardClick(plate.index)}
                        />
                    );
                })}

                <input type="hidden" name="lunchStep" value={activeCard ? lunchStep : "MAIN"} />
            </div>
        </div>
    );
};

export default TypePlatCards;
