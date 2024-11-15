// pages/api/upload.js
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export const config = {
    api: {
        bodyParser: false, // Désactive le parsing par Next.js
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const form = formidable({
        uploadDir: path.join(process.cwd(), "/public/recipes"),
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // Limite de 10 MB, par exemple
        filename: (name, ext, part) => {
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

            const file = files.image as unknown as formidable.File[] ; // Nom du champ pour l'image
            const filePath = `/recipes/${path.basename(file[0]?.filepath)}`;
            return res.status(200).json({ filePath }); // URL de l'image
        });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: (error as Error).message });
    }
}

// form.parse(req, (err: any, fields: Fields, files: Files) => {
//     if (err) {
//         console.error("Error parsing file:", err);
//         return res.status(500).json({ message: "File upload failed" });
//     }

//     // `files.image` peut être un `File` ou un tableau de `File`
//     const uploadedFiles = files.image;

//     if (!uploadedFiles) {
//         return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Gestion des fichiers multiples ou uniques
//     const processFile = (file: File) => {
//         const filePath = `/recipes/${path.basename(file.filepath)}`;
//         // Traitez le fichier selon vos besoins
//         return filePath;
//     };

//     if (Array.isArray(uploadedFiles)) {
//         const filePaths = uploadedFiles.map((file) => processFile(file));
//         return res.status(200).json({ filePaths });
//     } else {
//         const filePath = processFile(uploadedFiles as File);
//         return res.status(200).json({ filePath });
//     }
// });
// } catch (error: any) {
// res.status(500).json({ message: "Upload failed", error: error.message });
// }