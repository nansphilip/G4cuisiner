// pages/api/upload.js
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false, // Désactive le parsing par Next.js
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const form = formidable({
        uploadDir: path.join(process.cwd(), "/public/recipes"),
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // Limite de 10 MB, par exemple
        filename: (name, ext, part, form) => {
            // Vous pouvez personnaliser le nom du fichier ici
            // Par exemple, créer un nom unique en utilisant le timestamp et le nom original
            const uniqueName = `${part.originalFilename}`;
            return uniqueName; // Retourne le nouveau nom du fichier
        },
    });

    try {
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error("Error parsing file:", err);
                return res.status(500).json({ message: "File upload failed" });
            }

            const file = files.image; // Nom du champ pour l'image
            const filePath = `/recipes/${path.basename(file.filepath)}`;
            return res.status(200).json({ filePath }); // URL de l'image
        });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
}
