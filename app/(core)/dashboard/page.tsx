import Button from "@comps/server/button";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import { CircleAlert, CircleCheck } from "lucide-react"; // Ajout des icônes Lock et Unlock
import TimerClient from "@comps/client/timer";
import { combo } from "@lib/combo";
import type { Metadata } from "next";
import RestrictClient from "@comps/client/restrict-user";
import { SelectEveryUser, SelectUserById } from "@actions/database/User";
import UserRoleToggler from "@comps/client/update-user-role";
import { SelectEveryPendingRecipe } from "@actions/database/Recipe";
import ReviewRecipes from "@/components/client/review-recipe";
import { ReturnUserType } from "@actions/types/User";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page.",
};

export default async function DashboardPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const user = await SelectUserById({ userId: session.user.id });
    const userRole = user ? user.role : null;
    if (!(userRole === "ADMIN" || userRole === "MODO")) redirect("/favorites");

    const name = session.user.name;
    const email = session.user.email;
    const emailVerified = session.user.emailVerified;

    const userList = await SelectEveryUser();
    const pendingRecipes = await SelectEveryPendingRecipe();

    const timerList: {
        type: "Created" | "Updated" | "Expires";
        date: Date;
    }[] = [
        { type: "Created", date: session.user.createdAt },
        { type: "Updated", date: session.user.updatedAt },
        { type: "Expires", date: session.session.expiresAt },
    ];

    return (
        <div className="mt-2 size-full space-y-5">
            {/* Header avec le titre et bouton Logout */}
            <div className="flex items-center justify-between p-4">
                <h2 className="text-2xl font-bold">User Dashboard</h2>
                <Button type="link" href="/logout" variant="danger">
                    Déconnexion
                </Button>
            </div>

            {/* Section utilisateur */}
            <div className="grid grid-cols-2 gap-8 p-4">
                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Nom</p>
                        <span className="font-semibold">{name}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Email</p>
                        <span className="font-semibold">{email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Vérifié</p>
                        <div
                            className={combo(
                                "flex items-center justify-start gap-1 font-semibold",
                                emailVerified ? "text-green-500" : "text-red-500"
                            )}
                        >
                            {emailVerified ? (
                                <>
                                    <span>Oui</span>
                                    <CircleCheck size={16} />
                                </>
                            ) : (
                                <>
                                    <span>Non</span>
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
                            return <DisplayTimer key={index} sessionDate={date} type={type} text="ago" />;
                        })}
                    </div>
                </div>
            </div>
            {userRole === "ADMIN" && userList && <UserList userList={userList} />}
            {pendingRecipes && <ReviewRecipes recipes={pendingRecipes} />}
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
    userList: ReturnUserType[];
};

const UserList = ({ userList }: UserListProps) => {
    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-bold">Gestion des utilisateurs</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Nom</th>
                            <th className="border-b px-4 py-2 text-left">Email</th>
                            <th className="border-b px-4 py-2 text-left">Role</th>
                            <th className="border-b px-4 py-2 text-left">Vérifié</th>
                            <th className="border-b px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => (
                            <tr key={user.id}>
                                <td className="border-b px-4 py-2">{user.name}</td>
                                <td className="border-b px-4 py-2">{user.email}</td>
                                <td className="border-b px-4 py-2">
                                    <UserRoleToggler user={user} />
                                </td>
                                <td className="border-b px-4 py-2">
                                    <div
                                        className={combo(
                                            "flex items-center gap-1 font-semibold",
                                            user.emailVerified ? "text-green-500" : "text-red-500"
                                        )}
                                    >
                                        {user.emailVerified ? "Oui" : "Non"}
                                    </div>
                                </td>
                                <td className="border-b px-4 py-2">
                                    <RestrictClient userId={user.id} initialRestricted={user.restricted} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// // Composant ReviewComments
// type ReviewCommentsProps = {
//     comments: {
//         id: number;
//         text: string;
//         recipe: string;
//         user: string;
//         status: "Pending" | "Approved" | "Rejected";
//     }[];
// };

// const ReviewComments = ({ comments }: ReviewCommentsProps) => {
//     // Calcul des ratios de statut
//     const totalComments = comments.length;
//     const pendingCount = comments.filter(comment => comment.status === "PENDING").length;
//     const approvedCount = comments.filter(comment => comment.status === "APPROVED").length;
//     const rejectedCount = comments.filter(comment => comment.status === "REJECTED").length;

//     return (
//         <div className="space-y-4 p-4">
//             <h3 className="text-xl font-semibold">Evaluation des Commentaires Signalés</h3>

//             {/* Section des ratios des commentaires sur la même ligne */}
//             <div className="mb-4 flex gap-6 text-sm">
//                 <div className="flex items-center">
//                     <span className="mr-2 font-medium text-gray-500">Total Signalés:</span>
//                     <span className="text-gray-500">{totalComments}</span>
//                 </div>
//                 <div className="flex items-center">
//                     <span className="mr-2 font-medium text-yellow-600">En attente:</span>
//                     <span className="text-yellow-600">{pendingCount}</span>
//                 </div>
//                 <div className="flex items-center">
//                     <span className="mr-2 font-medium text-green-500">Approuvé:</span>
//                     <span className="text-green-500">{approvedCount}</span>
//                 </div>
//                 <div className="flex items-center">
//                     <span className="mr-2 font-medium text-red-500">Rejeté:</span>
//                     <span className="text-red-500">{rejectedCount}</span>
//                 </div>
//             </div>

//             {/* Table des commentaires signalés */}
//             <div className="mt-4 overflow-x-auto">
//                 <table className="min-w-full table-auto border-collapse">
//                     <thead>
//                         <tr>
//                             <th className="border-b px-4 py-2 text-left">Commentaire</th>
//                             <th className="border-b px-4 py-2 text-left">Recette</th>
//                             <th className="border-b px-4 py-2 text-left">Utilisateur</th>
//                             <th className="border-b px-4 py-2 text-left">Status</th>
//                             <th className="border-b px-4 py-2 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {comments.map((comment) => (
//                             <tr key={comment.id}>
//                                 <td className="border-b px-4 py-2">
//                                     <div
//                                         className="max-h-20 overflow-hidden overflow-y-auto"
//                                         title={comment.text}
//                                     >
//                                         {comment.text}
//                                     </div>
//                                 </td>
//                                 <td className="border-b px-4 py-2">{comment.recipe}</td>
//                                 <td className="border-b px-4 py-2">{comment.user}</td>
//                                 <td className="border-b px-4 py-2">{comment.status}</td>
//                                 <td className="border-b px-4 py-2">
//                                     <div className="flex items-center gap-2">
//                                         {comment.status === "Pending" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                         {comment.status === "Rejected" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="danger" className="w-20 bg-red-100 text-red-500 hover:bg-red-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                         {comment.status === "Approved" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-green-100 text-green-500 hover:bg-green-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// // Composant pour la révision des recettes
// const ReviewRecipes = ({ recipes }: ReviewRecipesProps) => {
//     return (
//         <div className="space-y-4 p-4">
//             <h3 className="text-xl font-semibold">Evaluation des Nouvelles Recettes</h3>

//             {/* Table des recettes à réviser */}
//             <div className="mt-4 overflow-x-auto">
//                 <table className="min-w-full table-auto border-collapse">
//                     <thead>
//                         <tr>
//                             <th className="border-b px-4 py-2 text-left">Nom</th>
//                             <th className="border-b px-4 py-2 text-left">Description</th>
//                             <th className="border-b px-4 py-2 text-left">Utilisateur</th>
//                             <th className="border-b px-4 py-2 text-left">Status</th>
//                             <th className="border-b px-4 py-2 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {recipes.map((recipe) => (
//                             <tr key={recipe.id}>
//                                 <td className="border-b px-4 py-2">{recipe.recipeName}</td>
//                                 <td className="border-b px-4 py-2">
//                                     <div
//                                         className="max-h-20 overflow-hidden overflow-y-auto"
//                                         title={recipe.description}
//                                     >
//                                         {recipe.description}
//                                     </div>
//                                 </td>
//                                 <td className="border-b px-4 py-2">{recipe.user}</td>
//                                 <td className="border-b px-4 py-2">{recipe.status}</td>
//                                 <td className="border-b px-4 py-2">
//                                     <div className="flex items-center gap-2">
//                                         {recipe.status === "Pending" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                         {recipe.status === "Rejected" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="danger" className="w-20 bg-red-100 text-red-500 hover:bg-red-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                         {recipe.status === "Approved" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-green-100 text-green-500 hover:bg-green-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// // Type pour les ingrédients à réviser
// type ReviewIngredientsProps = {
//     ingredients: {
//         id: number;
//         description: string;
//         ingredientName: string;
//         user: string;
//         status: "Pending" | "Approved" | "Rejected";
//     }[];
// };

// // Composant pour la révision des ingrédients
// const ReviewIngredients = ({ ingredients }: ReviewIngredientsProps) => {
//     return (
//         <div className="space-y-4 p-4">
//             <h3 className="text-xl font-semibold">Evaluation des Nouveaux Ingrédients</h3>

//             {/* Table des ingrédients à réviser */}
//             <div className="mt-4 overflow-x-auto">
//                 <table className="min-w-full table-auto border-collapse">
//                     <thead>
//                         <tr>
//                             <th className="border-b px-4 py-2 text-left">Nom</th>
//                             <th className="border-b px-4 py-2 text-left">Description</th>
//                             <th className="border-b px-4 py-2 text-left">Utilisateur</th>
//                             <th className="border-b px-4 py-2 text-left">Status</th>
//                             <th className="border-b px-4 py-2 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {ingredients.map((ingredient) => (
//                             <tr key={ingredient.id}>
//                                 <td className="border-b px-4 py-2">{ingredient.ingredientName}</td>
//                                 <td className="border-b px-4 py-2">
//                                     <div
//                                         className="max-h-20 overflow-hidden overflow-y-auto"
//                                         title={ingredient.description}
//                                     >
//                                         {ingredient.description}
//                                     </div>
//                                 </td>
//                                 <td className="border-b px-4 py-2">{ingredient.user}</td>
//                                 <td className="border-b px-4 py-2">{ingredient.status}</td>
//                                 <td className="border-b px-4 py-2">
//                                     <div className="flex items-center gap-2">
//                                         {ingredient.status === "Pending" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="default" className="w-20 bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                         {ingredient.status === "Rejected" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="danger" className="w-20 bg-red-100 text-red-500 hover:bg-red-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                         {ingredient.status === "Approved" && (
//                                             <>
//                                                 <Button type="button" variant="default" className="w-20 bg-green-100 text-green-500 hover:bg-green-200">
//                                                     Approuvé
//                                                 </Button>
//                                                 <Button type="button" variant="default" className="w-20 bg-gray-100 text-gray-400 hover:bg-gray-200">
//                                                     Rejeté
//                                                 </Button>
//                                             </>
//                                         )}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
