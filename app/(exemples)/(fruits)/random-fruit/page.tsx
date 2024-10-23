// Composant client
import FruitsClient from "./client";

// Composant Page Fruits
export default function FruitsPage() {

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <p>Click button to dynamically fetch fruits from server.</p>
            <FruitsClient/>
        </main>
    );
}
