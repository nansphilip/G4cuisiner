"use client";
import { ac } from "better-auth/plugins";
import { useState } from "react";
// import { set } from "zod";

const TypePlatCard = (props) => {
    const { imageSrc, title, isActive, onClick } = props;

    return (
        <div
            className={`max-w-sm overflow-hidden rounded shadow-lg transition duration-300 ${
                isActive
                    ? "border-blue-500 bg-blue-200"
                    : "border-gray-300 bg-white"
            } ${!isActive ? "opacity-50" : ""} hover:scale-105`}
            onClick={onClick}
        >
            <img
                className="h-42 w-full object-cover"
                src={imageSrc}
                alt={title}
            />
            <div className="px-6 py-4">
                <h1 className="mb-2 text-xl font-bold">{title}</h1>
            </div>
        </div>
    );
};

const TypePlatCards = ({ lunchStepList }) => {
    const [activeCard, setActiveCard] = useState(null);

    // const plateList = [
    //     {
    //         imageSrc:
    //             "https://images.partir.com/HlZJJUo6PASOAM-F_CMnsdLFQrE=/750x/filters:sharpen(0.3,0.3,true)/lieux-interet/nouvelle-caledonie/nouvelle-caledonie-lifou.jpg",
    //         title: "Entrée",
    //         index: 1,
    //         isActive: activeCard === 1,
    //         onClick: () => handleCardClick(1),
    //     },
    //     {
    //         imageSrc:
    //             "https://images.partir.com/HlZJJUo6PASOAM-F_CMnsdLFQrE=/750x/filters:sharpen(0.3,0.3,true)/lieux-interet/nouvelle-caledonie/nouvelle-caledonie-lifou.jpg",
    //         title: "Plat",
    //         index: 2,
    //         isActive: activeCard === 2,
    //         onClick: () => handleCardClick(2),
    //     },
    //     {
    //         imageSrc:
    //             "https://images.partir.com/HlZJJUo6PASOAM-F_CMnsdLFQrE=/750x/filters:sharpen(0.3,0.3,true)/lieux-interet/nouvelle-caledonie/nouvelle-caledonie-lifou.jpg",
    //         title: "Dessert",
    //         index: 3,
    //         isActive: activeCard === 3,
    //         onClick: () => handleCardClick(3),
    //     },
    //     {
    //         imageSrc:
    //             "https://images.partir.com/HlZJJUo6PASOAM-F_CMnsdLFQrE=/750x/filters:sharpen(0.3,0.3,true)/lieux-interet/nouvelle-caledonie/nouvelle-caledonie-lifou.jpg",
    //         title: "Apéritif",
    //         index: 4,
    //         isActive: activeCard === 4,
    //         onClick: () => handleCardClick(4),
    //     },
    // ];
    // Expose la méthode reset à travers la référence

    return (
        <div className="flex w-1/3 flex-none items-center justify-center gap-2 rounded-xl border p-4 shadow">
            <label className="flex w-full flex-col gap-1">
                Selectionner le type de plat :
                <div className="grid grid-cols-2 gap-4 p-4">
                    {lunchStepList.map((plate) => {
                        const isActive = activeCard === plate.id;
                        return (
                            <TypePlatCard
                                key={plate.id}
                                imageSrc="https://images.partir.com/HlZJJUo6PASOAM-F_CMnsdLFQrE=/750x/filters:sharpen(0.3,0.3,true)/lieux-interet/nouvelle-caledonie/nouvelle-caledonie-lifou.jpg"
                                title={plate.name}
                                isActive={isActive}
                                onClick={() => setActiveCard(plate.id)}
                            />
                        );
                    })}
                    <input
                        type="hidden"
                        name="plateType"
                        value={activeCard ? activeCard : "Plat"}
                    />
                </div>
            </label>
        </div>
    );
};

export default TypePlatCards;
