"use server";

import { promises as fs } from "fs";
import ToSlug from "./ToSlug";

type SendImageToServerProps = {
    recipeTitle: string;
    imageList: File[];
};

export default async function UploadImages(props: SendImageToServerProps) {
    try {
        const { recipeTitle, imageList } = props;

        // TODO : add image validation

        imageList.map(async (image, index) => {
            // Convert image to buffer
            const imageBuffer = await image.arrayBuffer();

            // Get image name
            const titleSlugged = ToSlug(recipeTitle);

            // Get image extension
            const imageExtensionIndex = image.name.lastIndexOf(".");
            const imageExtension = image.name.slice(imageExtensionIndex + 1);

            // Create complete image name
            const newImageName = titleSlugged + "-" + (index + 1) + "." + imageExtension;

            // Import image to public folder
            await fs.writeFile(`${process.cwd()}/public/recipes/${newImageName}`, Buffer.from(imageBuffer));
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
        // throw new Error("UploadImages -> " + (error as Error).message);
    }
}
