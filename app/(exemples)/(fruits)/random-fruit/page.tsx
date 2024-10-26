// Composant client
import FruitsClient from "./client";

// Composant Page Fruits
export default function FruitsPage() {

    return (
        <>
            <p>Click button to dynamically fetch fruits from server.</p>
            <FruitsClient/>
        </>
    );
}
