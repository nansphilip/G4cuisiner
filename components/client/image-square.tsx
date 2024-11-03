import { combo } from "@lib/combo";
import Image from "next/image";

type ImageSquareProps = {
    image: string;
    alt: string;
    divClassName?: string;
    imgClassName?: string;
};

export default function ImageSquare(props: ImageSquareProps) {
    const { image, alt, divClassName, imgClassName } = props;

    return (
        <div className={combo("aspect-square", divClassName)}>
            <Image
                className={combo(imgClassName)}
                src={image}
                alt={alt}
                height={100}
                width={100}
                layout="responsive"
            />
        </div>
    );
}
