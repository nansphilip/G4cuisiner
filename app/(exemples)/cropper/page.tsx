"use client";

import Button from "@comps/client/button";
import { useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import ImageSquare from "./image-square";
import { getCroppedImg } from "./lib";

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
    }, [imageFile]);

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const saveImage = async () => {
        const croppedImage = await getCroppedImg(imageString, croppedAreaPixels, rotate);
        setCroppedImage(croppedImage as string);
    };

    return (
        <>
            <div className="flex flex-row gap-4">
                <div
                    id="cropper-container"
                    className="flex size-96 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-300"
                >
                    {imageFile && (
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
                    )}
                </div>

                <div className="flex size-96 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-300">
                    {croppedImage ? (
                        <ImageSquare divClassName="size-full" image={croppedImage} alt="Cropped image" />
                    ) : (
                        <div>Cropped image preview.</div>
                    )}
                </div>
            </div>

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

            <Button type="button" onClick={saveImage}>
                Crop
            </Button>
        </>
    );
}
