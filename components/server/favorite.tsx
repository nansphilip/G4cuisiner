import { combo } from "@lib/combo";
import { Heart } from "lucide-react";

type FavoriteProps = {
    favorite: boolean;
    classDiv?: string;
    classSvg?: string;
};

export default function Favorite(props: FavoriteProps) {
    const { favorite, classDiv, classSvg } = props;

    return (
        <div className={combo("flex size-fit items-center justify-center", classDiv)}>
            <Heart
                className={combo(
                    "size-5 stroke-[1.5px]",
                    classSvg,
                    favorite ? "fill-red-400 stroke-red-400" : "stroke-gray-600 fill-white"
                )}
            />
        </div>
    );
}
