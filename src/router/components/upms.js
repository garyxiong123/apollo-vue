const User = () => import("@/components/upms/user");
const Role = () => import("@/components/upms/role");
const Menu = () => import("@/components/upms/menu");
const Organization = () => import("@/components/upms/organization");
const Background = () => import("@/components/upms/background");

export default [
    {
        path: "/upms/user",
        name: "user",
        component: User
    },
    {
        path: "/upms/role",
        name: "role",
        component: Role
    },
    {
        path: "/upms/menu",
        name: "menu",
        component: Menu
    },
    {
        path: "/upms/organization",
        name: "organization",
        component: Organization
    },
    {
        path: "/upms/background",
        name: "background",
        component: Background
    }
]