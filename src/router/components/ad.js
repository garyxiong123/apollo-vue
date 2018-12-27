const PositionM = () => import("@/components/ad/positionM");

const PositionAdd = () => import('@/components/ad/positionM/components/add');
const PositionEdit = () => import('@/components/ad/positionM/components/edit');
const PositionContent = () => import('@/components/ad/positionM/components/content');
const PositionContentAdd = () => import('@/components/ad/positionM/components/content/components/add');
const PositionContentEdit = () => import('@/components/ad/positionM/components/content/components/edit');

const SpecialContentM = () => import("@/components/ad/specialContentM");
const SpecialContentAdd = () => import("@/components/ad/specialContentM/components/add");
const SpecialContentEdit = () => import("@/components/ad/specialContentM/components/edit");

const IconM = () => import("@/components/ad/iconM");
const IconMAdd = () => import("@/components/ad/iconM/components/add");
const IconMEdit = () => import("@/components/ad/iconM/components/edit");

export default [
    {
        path: "/ad/positionM",
        name: "positionM",
        component: PositionM,
    },
    {
        path: "/ad/positionM/add",
        name: "PositionAdd",
        component: PositionAdd,
    },
    {
        path: "/ad/positionM/edit",
        name: "PositionEdit",
        component: PositionEdit,
    },
    {
        path: "/ad/positionM/content",
        name: "PositionContent",
        component: PositionContent,
    },
    {
        path: "/ad/positionM/content/add",
        name: "PositionContentAdd",
        component: PositionContentAdd,
    },
    {
        path: "/ad/positionM/content/edit",
        name: "PositionContentEdit",
        component: PositionContentEdit,
    },
    {
        path: "/ad/specialContentM",
        name: "specialContentM",
        component: SpecialContentM
    },
    {
        path: "/ad/specialContentM/add",
        name: "SpecialContentAdd",
        component: SpecialContentAdd
    },
    {
        path: "/ad/specialContentM/edit",
        name: "SpecialContentEdit",
        component: SpecialContentEdit
    },
    {
        path: "/ad/iconM",
        name: "iconM",
        component: IconM
    },
    {
        path: "/ad/iconM/add",
        name: "iconMAdd",
        component: IconMAdd
    },
    {
        path: "/ad/iconM/edit",
        name: "iconMEdit",
        component: IconMEdit
    }
]
