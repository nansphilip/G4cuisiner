import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

interface FilterConditions {
    [key: string]: number[];
}

interface Filter {
    type: string;
    value: string | number;
}

export async function POST(req: NextRequest) {
    try {
        const { filters } = await req.json();

        if (filters.length === 0) {
            return NextResponse.json([]);
        }

        const filterConditions = filters.reduce(
            (acc: FilterConditions, filter: Filter) => {
                const { type, value } = filter;
                if (!acc[type]) {
                    acc[type] = [];
                }
                acc[type].push(Number(value));
                return acc;
            }
        );
        const results = await prisma.recipe.findMany({
            where: {
                AND: [
                    filterConditions.LunchType && {
                        lunchType: {
                            some: {
                                id: {
                                    in: filterConditions.LunchType,
                                },
                            },
                        },
                    },
                    filterConditions.LunchStep && {
                        lunchStep: {
                            some: {
                                id: {
                                    in: filterConditions.LunchStep,
                                },
                            },
                        },
                    },
                    filterConditions.Ingredient && {
                        ingredient: {
                            some: {
                                id: {
                                    in: filterConditions.Ingredient,
                                },
                            },
                        },
                    },
                    filterConditions.preparationTime && {
                        preparationTime: {
                            lte: filterConditions.preparationTime[0],
                        },
                    },
                ].filter(Boolean),
            },
        });
        console.log("Results:", results);
        console.log("Filter conditions:", filterConditions);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch recipes" },
            { status: 500 }
        );
    }
}
