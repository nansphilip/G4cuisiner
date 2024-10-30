"use client";

import Button from "@comps/client/button";
import { useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

export default function CropperPage() {
    const [imageFile, setImageFile] = useState<File | undefined>();
    const [imageString, setImageString] = useState<string>("");
    const [croppedImage, setCroppedImage] = useState<string>("");

    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({ x: 0, y: 0, width: 0, height: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotate, setRotate] = useState(0);

    const imageToString = async (file: File) => {
        // Create a new FileReader
        const reader = new FileReader();
        // Read the file as data url
        reader.readAsDataURL(file);
        // When the file is read, set the image string
        reader.onloadend = (reading) => setImageString(reading.target?.result as string);
    };

    useEffect(() => {
        if (!imageFile) return;
        imageToString(imageFile);
        // console.log("Image file", imageFile);
    }, [imageFile]);

    useEffect(() => {
        if (imageString !== "") return;
        // console.log("Image string", imageString);
    }, [imageString]);

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        console.log(croppedArea, croppedAreaPixels);
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const saveImage = async () => {
        const croppedImage = await getCroppedImg(imageString, croppedAreaPixels, rotate);
        setCroppedImage(croppedImage as string);
    };

    return (
        <>
            <div
                id="cropper-container"
                className="flex size-96 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-300"
            >
                {imageFile ? (
                    <Cropper
                        // Overriding
                        style={{
                            containerStyle: { position: "relative" },
                            mediaStyle: {},
                            cropAreaStyle: {},
                        }}
                        // Add classes to the elements
                        classes={{
                            containerClassName: "size-full",
                            mediaClassName: "",
                            cropAreaClassName: "",
                        }}
                        image={imageString}
                        aspect={1}
                        onCropComplete={onCropComplete}
                        zoom={zoom}
                        onZoomChange={setZoom}
                        rotation={rotate}
                        onRotationChange={setRotate}
                        crop={crop}
                        onCropChange={setCrop}
                    />
                ) : (
                    <label id="import-picture" className="mx-6 flex flex-col gap-1">
                        <div>
                            <span>Profile picture</span>
                        </div>
                        <input
                            className="h-6 cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                            name="profilePicture"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0])}
                        />
                    </label>
                )}
            </div>

            <div className="flex flex-row gap-4">
                <label id="zoom">
                    <div>Zoom</div>
                    <input
                        type="range"
                        min={1}
                        max={5}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                    />
                </label>
                <label id="rotate">
                    <div>Rotate</div>
                    <input
                        type="range"
                        min={0}
                        max={360}
                        step={1}
                        value={rotate}
                        onChange={(e) => setRotate(Number(e.target.value))}
                    />
                </label>
            </div>
            {croppedImage && (
                <div className="flex aspect-square size-40">
                    <img className="object-cover" src={croppedImage} alt="Cropped" />
                </div>
            )}
            <Button type="button" onClick={saveImage}>
                Crop
            </Button>
        </>
    );
}

export const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });
};

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    rotation = 0,
    flip = { horizontal: false, vertical: false }
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const rotRad = (rotation * Math.PI) / 180;

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = {
        width: Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height),
        height: Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height),
    };

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");

    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
        return null;
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // As Base64 string
    // return croppedCanvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve) => {
        croppedCanvas.toBlob((file) => {
            resolve(URL.createObjectURL(file as Blob));
        }, "image/png");
    });
}

export async function getRotatedImage(imageSrc: string, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const orientationChanged = rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
    if (orientationChanged) {
        canvas.width = image.height;
        canvas.height = image.width;
    } else {
        canvas.width = image.width;
        canvas.height = image.height;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(URL.createObjectURL(file as Blob));
        }, "image/png");
    });
}
