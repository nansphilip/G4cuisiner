import { FilterRecipeProps } from "./type";

export default function FilterRecipeCheckbox({
    data,
    legend,
    property,
    setResults,
}: FilterRecipeProps) {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData(
            event.currentTarget.form as HTMLFormElement
        );

        const filters = formData.getAll(property).map((value) => ({
            type: property,
            value,
        }));
        console.log("Filters: ", filters);
        const response = await fetch("/api/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filters }),
        });

        if (!response.ok) {
            console.error("Failed to fetch data");
            return;
        }

        const resultData = await response.json();
        setResults(resultData);
    };
    return (
        <form className="w-full max-w-sm">
            <fieldset className="mb-4 rounded border border-gray-300 p-4">
                <legend className="mb-2 text-lg font-semibold ">
                    {legend}
                </legend>
                {data.map((item) => (
                    <div key={item.id} className="mb-2">
                        <input
                            type="checkbox"
                            name={property}
                            value={item.id}
                            id={`${property}-${item.name}`}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor={`${property}-${item.name}`}
                            className="text-gray-700"
                        >
                            {item.name}
                        </label>
                    </div>
                ))}
            </fieldset>
        </form>
    );
}
