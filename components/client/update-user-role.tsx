"use client";

import { UpdateUser } from "@actions/database/User";
import { useState } from "react";
import { User } from "@actions/types/User";

type UserRoleTogglerProps = {
    user: User;
};

export default function UserRoleToggler(props: UserRoleTogglerProps) {
    const { user } = props;
    const userId = user.id;
    const initialRole = user.role;
    const [role, setRole] = useState<"USER" | "MODO" | "ADMIN">(initialRole);

    const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = event.target.value as "USER" | "MODO" | "ADMIN";
        setRole(newRole);

        // Appel de la fonction pour mettre à jour le rôle dans la base de données
        await UpdateUser({
            userId,
            data: {
                role: newRole,
            },
        });
    };

    return (
        <select className="rounded-md border px-2 py-1" value={role} onChange={handleRoleChange}>
            <option value="USER">Utilisateur</option>
            <option value="MODO">Modérateur</option>
            <option value="ADMIN">Admin</option>
        </select>
    );
}
