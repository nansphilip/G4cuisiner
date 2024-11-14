import ButtonClient from "@comps/client/button";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import { CircleAlert, CircleCheck } from "lucide-react"; // Ajout des icônes Lock et Unlock
import TimerClient from "@comps/client/timer";
import { combo } from "@lib/combo";
import type { Metadata } from "next";
import RestrictClient from "@comps/client/User";
import { SelectEveryUser } from "@actions/database/User";
import { UserType } from "@actions/types/User";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page.",
};

export default async function DashboardPage() {
    const session = await getSession();
    if (!session) redirect("/login");    

    const name = session.user.name;
    const email = session.user.email;
    const emailVerified = session.user.emailVerified;

    const users = await SelectEveryUser();

    const timerList: {
        type: "Created" | "Updated" | "Expires";
        date: Date;
    }[] = [
        { type: "Created", date: session.user.createdAt },
        { type: "Updated", date: session.user.updatedAt },
        { type: "Expires", date: session.session.expiresAt },
    ];

    // Liste fictive des commentaires signalés
    const reportedComments = [
        { id: 1, text: "This comment is pending review.", recipe: "Recipe A", user: "Alice Johnson", status: "Pending" },
        { id: 2, text: "This comment has been rejected.", recipe: "Recipe B", user: "Bob Smith", status: "Rejected" },
        { id: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim, ligula at bibendum aliquet, tortor arcu malesuada sapien, in varius justo eros eget libero. Aenean ac eros in ex fermentum malesuada. Fusce tincidunt fermentum eros, sit amet pulvinar erat placerat et. Curabitur sit amet feugiat magna. Duis at nulla id urna aliquet dictum. Donec vestibulum nulla ut ligula lacinia, non consectetur eros gravida. Vivamus maximus dolor at mi facilisis, nec vehicula sem tempor.", recipe: "Recipe C", user: "Emma Stone", status: "Approved" },
    ];

    const recipes = [
        { id: 1, description: "This recipe is pending review.", recipeName: "Pates à la crème de marron et fourme d'ambert au poivre de champignon d'espelette du mexique asiatique", user: "Alice Johnson", status: "Pending" },
        { id: 2, description: "This recipe has been rejected.", recipeName: "Recipe B", user: "Bob Smith", status: "Rejected" },
        { id: 3, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim, ligula at bibendum aliquet, tortor arcu malesuada sapien, in varius justo eros eget libero. Aenean ac eros in ex fermentum malesuada. Fusce tincidunt fermentum eros, sit amet pulvinar erat placerat et. Curabitur sit amet feugiat magna. Duis at nulla id urna aliquet dictum. Donec vestibulum nulla ut ligula lacinia, non consectetur eros gravida. Vivamus maximus dolor at mi facilisis, nec vehicula sem tempor.", recipeName: "Recipe C", user: "Emma Stone", status: "Approved" },
    ];

    // Liste fictive d'ingrédients à réviser
    const ingredients = [
        { id: 1, description: "This ingredient is pending review.", ingredientName: "Salt", user: "Alice Johnson", status: "Pending" },
        { id: 2, description: "This ingredient has been rejected.", ingredientName: "Sugar", user: "Bob Smith", status: "Rejected" },
        { id: 3, description: "Est ce que les ingrédients ont vraiment besoin d'une description ? A méditer.", ingredientName: "Stevia", user: "Emma Stone", status: "Approved" },
    ];

    return (
        <div className="mt-2 size-full space-y-5">
            {/* Header avec le titre et bouton Logout */}
            <div className="flex items-center justify-between p-4">
                <h2 className="text-2xl font-bold">User Dashboard</h2>
                <Button type="link" href="/logout" variant="danger">
                    Logout
                </Button>
            </div>

            {/* Section utilisateur */}
            <div className="grid grid-cols-2 gap-8 p-4">
                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Name</p>
                        <span className="font-semibold">{name}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Email</p>
                        <span className="font-semibold">{email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Verified</p>
                        <div
                            className={combo(
                                "flex items-center justify-start gap-1 font-semibold",
                                emailVerified ? "text-green-500" : "text-red-500"
                            )}
                        >
                            {emailVerified ? (
                                <>
                                    <span>Yes</span>
                                    <CircleCheck size={16} />
                                </>
                            ) : (
                                <>
                                    <span>No</span>
                                    <CircleAlert size={16} />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section de session */}
                <div className="space-y-2">
                    <p className="text-xs">Session</p>
                    <div className="flex flex-col gap-2">
                        {timerList.map(({ type, date }, index) => {
                            return (
                                <DisplayTimer key={index} sessionDate={date} type={type} text="ago" />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Filtrage par rôle et barre de recherche */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">Filter Users by Role</h3>
                        <select
                            className="rounded-md border px-4 py-2"
                            defaultValue="All"
                        >
                            <option value="All">All Roles</option>
                            <option value="User">User</option>
                            <option value="Moderator">Moderator</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    {/* Barre de recherche */}
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">Search Users</h3>
                        <input
                            type="text"
                            placeholder="Search by username"
                            className="rounded-md border px-4 py-2"
                        />
                    </div>
                </div>
            </div>

            {/* Liste des utilisateurs */}
            <UserList users={users} />
            <div className="text-center">
                <Button
                    type="button"
                    variant="default"
                >
                    Show More
                </Button>
            </div>

            {/* Section des commentaires signalés */}
            <ReviewComments comments={reportedComments} />

            {/* Section des nouvelles recettes */}
            <ReviewRecipes recipes={recipes} />

            {/* Section des nouveaux ingrédients */}
            <ReviewIngredients ingredients={ingredients} />
        </div>
    );
}

type TimerClientProps = {
    sessionDate: Date;
    type: "Created" | "Updated" | "Expires";
    text: "ago" | "left";
};

const DisplayTimer = (props: TimerClientProps) => {
    const { sessionDate, type, text } = props;

    return (
        <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold">{type}</span>
            <div className="flex flex-col items-end justify-center">
                <TimerClient sessionDate={sessionDate} type={type} className="text-sm" />
                <TimerClient sessionDate={sessionDate} type={type} text={text} className="text-xxs" />
            </div>
        </div>
    );
};

// Composant UserList
type UserListProps = {
    users: UserType[]
};

const UserList = ({ users }: UserListProps) => {
    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold">Users</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Name</th>
                            <th className="border-b px-4 py-2 text-left">Email</th>
                            <th className="border-b px-4 py-2 text-left">Role</th>
                            <th className="border-b px-4 py-2 text-left">Verified</th>
                            <th className="border-b px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border-b px-4 py-2">{user.name}</td>
                                <td className="border-b px-4 py-2">{user.email}</td>
                                <td className="border-b px-4 py-2">
                                    <select className="rounded-md border px-2 py-1" defaultValue={user.role}>
                                        <option value="USER">User</option>
                                        <option value="MODO">Moderator</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </td>
                                <td className="border-b px-4 py-2">
                                    <div className={combo("flex items-center gap-1 font-semibold", user.emailVerified ? "text-green-500" : "text-red-500")}>
                                        {user.emailVerified ? "Yes" : "No"}
                                    </div>
                                </td>
                                <td className="border-b px-4 py-2">
                                <RestrictClient
                                    userId={user.id}
                                    initialRestricted={user.restricted}
                                />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// Composant ReviewComments
type ReviewCommentsProps = {
    comments: {
        id: number;
        text: string;
        recipe: string;
        user: string;
        status: "Pending" | "Approved" | "Rejected";
    }[];
};

const ReviewComments = ({ comments }: ReviewCommentsProps) => {
    // Calcul des ratios de statut
    const totalComments = comments.length;
    const pendingCount = comments.filter(comment => comment.status === "Pending").length;
    const approvedCount = comments.filter(comment => comment.status === "Approved").length;
    const rejectedCount = comments.filter(comment => comment.status === "Rejected").length;

    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold">Review Reported Comments</h3>

            {/* Section des ratios des commentaires sur la même ligne */}
            <div className="mb-4 flex gap-6 text-sm">
                <div className="flex items-center">
                    <span className="mr-2 font-medium text-gray-500">Total Reported:</span>
                    <span className="text-gray-500">{totalComments}</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-2 font-medium text-yellow-600">Pending:</span>
                    <span className="text-yellow-600">{pendingCount}</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-2 font-medium text-green-500">Approved:</span>
                    <span className="text-green-500">{approvedCount}</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-2 font-medium text-red-500">Rejected:</span>
                    <span className="text-red-500">{rejectedCount}</span>
                </div>
            </div>

            {/* Table des commentaires signalés */}
            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Comment</th>
                            <th className="border-b px-4 py-2 text-left">Recipe</th>
                            <th className="border-b px-4 py-2 text-left">User</th>
                            <th className="border-b px-4 py-2 text-left">Status</th>
                            <th className="border-b px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.id}>
                                <td className="border-b px-4 py-2">
                                    <div
                                        className="max-h-20 overflow-hidden overflow-y-auto"
                                        title={comment.text}
                                    >
                                        {comment.text}
                                    </div>
                                </td>
                                <td className="border-b px-4 py-2">{comment.recipe}</td>
                                <td className="border-b px-4 py-2">{comment.user}</td>
                                <td className="border-b px-4 py-2">{comment.status}</td>
                                <td className="border-b px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        {comment.status === "Pending" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {comment.status === "Rejected" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="danger" className="w-20 bg-red-100 text-red-500 hover:bg-red-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {comment.status === "Approved" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-green-100 text-green-500 hover:bg-green-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

type ReviewRecipesProps = {
    recipes: {
        id: number;
        description: string;
        recipeName: string;
        user: string;
        status: "Pending" | "Approved" | "Rejected";
    }[];
};

// Composant pour la révision des recettes
const ReviewRecipes = ({ recipes }: ReviewRecipesProps) => {
    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold">Review New Recipes</h3>

            {/* Table des recettes à réviser */}
            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Name</th>
                            <th className="border-b px-4 py-2 text-left">Description</th>
                            <th className="border-b px-4 py-2 text-left">User</th>
                            <th className="border-b px-4 py-2 text-left">Status</th>
                            <th className="border-b px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => (
                            <tr key={recipe.id}>
                                <td className="border-b px-4 py-2">{recipe.recipeName}</td>
                                <td className="border-b px-4 py-2">
                                    <div
                                        className="max-h-20 overflow-hidden overflow-y-auto"
                                        title={recipe.description}
                                    >
                                        {recipe.description}
                                    </div>
                                </td>
                                <td className="border-b px-4 py-2">{recipe.user}</td>
                                <td className="border-b px-4 py-2">{recipe.status}</td>
                                <td className="border-b px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        {recipe.status === "Pending" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {recipe.status === "Rejected" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="danger" className="w-20 bg-red-100 text-red-500 hover:bg-red-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {recipe.status === "Approved" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-green-100 text-green-500 hover:bg-green-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Type pour les ingrédients à réviser
type ReviewIngredientsProps = {
    ingredients: {
        id: number;
        description: string;
        ingredientName: string;
        user: string;
        status: "Pending" | "Approved" | "Rejected";
    }[];
};

// Composant pour la révision des ingrédients
const ReviewIngredients = ({ ingredients }: ReviewIngredientsProps) => {
    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold">Review New Ingredients</h3>

            {/* Table des ingrédients à réviser */}
            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Name</th>
                            <th className="border-b px-4 py-2 text-left">Description</th>
                            <th className="border-b px-4 py-2 text-left">User</th>
                            <th className="border-b px-4 py-2 text-left">Status</th>
                            <th className="border-b px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map((ingredient) => (
                            <tr key={ingredient.id}>
                                <td className="border-b px-4 py-2">{ingredient.ingredientName}</td>
                                <td className="border-b px-4 py-2">
                                    <div
                                        className="max-h-20 overflow-hidden overflow-y-auto"
                                        title={ingredient.description}
                                    >
                                        {ingredient.description}
                                    </div>
                                </td>
                                <td className="border-b px-4 py-2">{ingredient.user}</td>
                                <td className="border-b px-4 py-2">{ingredient.status}</td>
                                <td className="border-b px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        {ingredient.status === "Pending" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {ingredient.status === "Rejected" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="danger" className="w-20 bg-red-100 text-red-500 hover:bg-red-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {ingredient.status === "Approved" && (
                                            <>
                                                <Button type="button" variant="default" className="w-20 bg-green-100 text-green-500 hover:bg-green-200">
                                                    Approve
                                                </Button>
                                                <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
