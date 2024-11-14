"use client";

import { useState } from "react";

type StarRatingProps = {
    number: number;
    editable?: boolean; // Nouvelle prop pour contrôler si le composant est modifiable
};

function StarRating({ number, editable = true }: StarRatingProps) {
    const [rateHover, setRateHover] = useState(0);
    const [rateClick, setRateClick] = useState(number);

    // Handler pour la souris qui passe sur le composant
    const handleMouseOver = (value: number) => {
        if (editable) setRateHover(value);
    };

    // Handler pour quand la souris sort du composant
    const handleMouseOut = () => {
        if (editable) setRateHover(0);
    };

    // Handler pour le clic sur une étoile
    const handleClick = (value: number) => {
        if (editable) setRateClick(value);
    };
    return (
        <label className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-xl font-bold">Difficulté : </h2>
            <div className="flex items-center justify-center">
                {[1, 2, 3].map((value) => (
                    <svg
                        key={value}
                        onMouseEnter={() => handleMouseOver(value)}
                        onMouseLeave={handleMouseOut}
                        onClick={() => handleClick(value)}
                        className={`size-14 cursor-pointer transition duration-200`}
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        width="512px"
                        height="512px"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g fill="#000000">
                            <path
                                fill={`${rateClick >= value ? "#black" : "#D3D3D3"}`}
                                stroke={`${rateHover >= value ? "black" : "transparent"}`}
                                strokeWidth="1.5"
                                d="M72 498 c-18.4 -1.7 -41.8 -6.6 -45.1 -9.6 -2.5 -2.3 -3.1 -6 -1.5 -9.2 3 -5.7 23.1 -28.7 25.1 -28.7 4.5 0 2.5 4 -8.4 17 -9.9 11.8 -10.7 13.1 -8.7 13.7 3.4 1 16.1 0.9 30.7 -0.3 64 -5.1 123.2 -33.2 166.3 -79.1 5.8 -6.2 26.7 -30.9 46.4 -54.8 35.5 -43.2 39.7 -47.5 39.7 -41.3 0 3.1 -68.2 85.9 -84.5 102.7 -31.6 32.4 -68.7 55.1 -111.9 68.2 -18.8 5.7 -36 8.7 -63.1 11 l-8.5 0.8 6.5 1.2 c3.6 0.7 12.9 1.8 20.8 2.3 62.5 4.7 125.5 -19.7 169.2 -65.5 4.7 -4.9 30.7 -35.8 57.8 -68.7 34.5 -41.9 49.2 -60.5 49.2 -62.2 0 -2.7 -1.7 -4.3 -30 -27.5 -22.1 -18.1 -24.4 -21.4 -20.4 -29.1 1.1 -2.2 2.1 -2.9 3.7 -2.7 2.3 0.3 2.4 1.1 1.1 7.4 -0.7 3.6 -1.1 3.2 29.6 28.3 10.2 8.3 19.3 16.4 20.2 17.9 2.4 3.7 2.2 8.3 -0.5 12.3 -6.2 9.1 -102 124.1 -110.2 132.2 -33.5 33.4 -77.2 55.2 -124.5 62.1 -13.3 1.9 -36.7 2.7 -49 1.6z"
                            />
                            <path
                                d="M65.3 433.4 c-0.3 -0.9 -0.1 -2.5 0.5 -3.5 2.7 -4.2 174.8 -212.8 179.4 -217.3 4.7 -4.7 5.1 -4.8 9.6 -4.4 l4.7 0.5 6.5 -7.9 c10 -12.2 9.6 -11.5 7.6 -14.9 -1.1 -1.9 -1.6 -4 -1.2 -5.4 0.5 -2 110.1 -136.3 128.4 -157.3 3 -3.5 7.2 -7.2 9.3 -8.2 4.5 -2.4 12.5 -2.6 17.2 -0.6 5 2.1 55.3 44.2 57.9 48.3 3.4 5.6 3.1 13 -0.7 18.4 -4.3 6 -8.6 8.1 -16 7.7 -4.5 -0.3 -7 -1.1 -10 -3.1 -5 -3.4 -11 -3.6 -14.9 -0.6 -1.5 1.2 -22.5 26.1 -46.7 55.5 -24.2 29.4 -44.3 53.4 -44.7 53.4 -0.5 0 -7.9 -5.8 -16.6 -13 -8.7 -7.1 -16.2 -13 -16.6 -13 -2.5 0 -4 1.5 -4 3.9 0 2.2 2.7 4.8 16 15.9 l16.1 13.2 -6.3 7.8 c-11.6 14.2 -13.7 16.2 -17.4 16.2 -3.6 0 -3.3 0.2 -28.6 -20.7 -7.5 -6.2 -13.9 -11.3 -14.2 -11.3 -0.3 0 -4.2 4.4 -8.6 9.8 l-8.1 9.7 2.8 2.4 c9.3 7.8 9.4 8 6.8 10.1 -1.7 1.4 -2 1.2 -10.6 -5.7 -9.6 -7.7 -10 -7.6 -21.2 6 -5.1 6.1 -46.1 55.9 -91.1 110.5 -44.9 54.5 -82.4 99.2 -83.2 99.2 -0.8 0 -1.7 -0.7 -2.1 -1.6z m227.9 -244.3 c-0.5 -6.8 0.9 -11.9 4.4 -16.1 l2.5 -2.9 -3.3 -3 c-1.8 -1.7 -3.6 -3.1 -4 -3.1 -0.8 0 -14.8 17 -14.8 18.1 0 0.8 14 12.8 15.1 12.9 0.3 0 0.3 -2.7 0.1 -5.9z m57.5 -27.1 c4.7 -2.8 6.6 -7.2 6.1 -13.8 -0.4 -4.8 -1 -6 -4.1 -8.8 -4.7 -4.4 -9.6 -5.2 -15.6 -2.8 -8.1 3.4 -11.3 13.8 -6.5 21.2 3.9 6 13.8 8.1 20.1 4.2z m40.9 -49.1 c5.5 -5.1 6.8 -11.2 3.8 -17.5 -4.8 -10.1 -18.8 -10.9 -25.2 -1.4 -4.5 6.6 -1.8 16.8 5.3 20.5 4.5 2.3 12.8 1.5 16.1 -1.6z m38.1 -46.9 c10.3 -6.3 8 -22.6 -3.8 -26.1 -7.8 -2.4 -16.8 3.3 -18.3 11.5 -0.9 5 2.2 11.9 6.6 14.6 4.3 2.6 11.3 2.6 15.5 0z"
                                fill={`${rateClick >= value ? "#black" : "#D3D3D3"}`}
                                stroke={`${rateHover >= value ? "black" : "transparent"}`}
                                strokeWidth="1.5"
                            />
                        </g>
                    </svg>
                ))}
                <input type="hidden" name="dificultyLevel" value={rateClick} />
            </div>
        </label>
    );
}
export default StarRating;
