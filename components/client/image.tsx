"use client";

import { useState } from "react";

export default function ImageImporter() {
    const handleFileUpload = async (event) => {
        const files = event.target.files;

        if (files) {
            if (files.length < 1 || files.length > 3) {
                console.error("Vous devez télécharger entre 1 et 3 images.");
                return; // Afficher un message d'erreur ou prévenir l'utilisateur
            }
            const formData = new FormData();
            const titre = titreState; // Récupère le titre de la recette

            Array.from(files).forEach((file, index) => {
                // Extraire l'extension du fichier original
                const ext = file.name.split(".").pop();
                // Créer un nom unique basé sur le titre de la recette
                const newFileName = `${titre.replace(/\s+/g, "-")}-${index + 1}.${ext}`;
                // Créer un nouveau fichier avec le nom modifié
                const renamedFile = new File([file], newFileName, { type: file.type });
                formData.append("image", renamedFile); // Ajouter le fichier renommé à FormData
            });

            // Récupérer le nom du fichier
            const fileName = files.name;
            console.log("Nom du fichier:", fileName);

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    // Affiche le texte de la réponse en cas d'erreur
                    const errorText = await response.text();
                    console.error("Upload failed:", errorText);
                    return;
                }

                const data = await response.json();
                console.log("File uploaded to:", data.filePath);
            } catch (error) {
                console.error("File upload failed:", error);
            }
        }
    };

    const [titreState, setTitre] = useState("");
    return (
        <>
            <label className="flex w-2/3 flex-col gap-1">
                <h2 className="text-xl font-bold">Titre</h2>
                <input
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="title"
                    type="text"
                    required
                    autoFocus
                    value={titreState}
                    onChange={(e) => setTitre(e.target.value)}
                />
            </label>
            <label className="flex w-2/3 flex-col gap-1">
                <h2 className="text-xl font-bold">Description</h2>
                <textarea
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="description"
                    required
                />
            </label>
            <div>
                <h2 className="text-xl font-bold">Image</h2>
            </div>
            <input
                className="h-6 cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                name="image"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
            />
        </>
    );
}
