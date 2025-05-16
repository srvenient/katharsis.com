import {Role} from "@/common/types/role";

export interface User {
    id: string;
    email: string;
    username: string;
    phone_number: string;
    is_active: boolean;
    full_name: string;
    role_id: number;
    role: Role | null
}