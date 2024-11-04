import { Slider } from "@nextui-org/slider";
import { FilterRecipeProps } from "./type";
import { RecipeResult } from "@app/(search)/search-with-filters/type";

interface FilterRecipeSlideProps {
    setResults: (results: RecipeResult[]) => void;
}

export default function FilterRecipeSlide({
    setResults,
}: FilterRecipeSlideProps) {
    const handleChange = async (value: number | number[]) => {
        const filters = [{ type: "preparationTime", value }];

        const response = await fetch("/api/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filters }),
        });

        const resultData = await response.json();
        setResults(resultData);
    };

    return (
        <>
            <div>
                <form>
                    <Slider
                        size="md"
                        step={5}
                        color="foreground"
                        label="Temps de préparation (mn)   "
                        showSteps={true}
                        maxValue={240}
                        minValue={0}
                        defaultValue={5}
                        className="max-w-md"
                        onChange={handleChange}
                    />
                </form>
            </div>
        </>
    );
}
