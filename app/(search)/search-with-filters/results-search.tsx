import Link from "next/link";
import { ResultsSearchProps } from "./type";

export default function ResultsSearch({ results }: ResultsSearchProps) {
    return (
        <div className="p-4 text-center">
            {results.map((result) => (
                <div key={result.id} className="mb-4 rounded border border-gray-300 p-4 shadow">
                    <Link href={`/recipe/${result.slug}`}>{result.title}</Link>
                </div>
            ))}
        </div>
    );
}
