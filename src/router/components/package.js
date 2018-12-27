const Version = () => import("@/components/packagePut/version");
const VersionAdd = () => import("@/components/packagePut/version/components/add");
const VersionEdit = () => import("@/components/packagePut/version/components/edit");

const Channel = () => import("@/components/packagePut/channel");
const ChannelAdd = () => import("@/components/packagePut/channel/components/add");
const ChannelEdit = () => import("@/components/packagePut/channel/components/edit");

const ModuleConfig = () => import("@/components/packagePut/moduleConfig");
const ModuleConfigAdd = () => import("@/components/packagePut/moduleConfig/components/add");
const ModuleConfigEdit = () => import("@/components/packagePut/moduleConfig/components/edit");

export default [
    {
        path: "/packagePut/version",
        name: "version",
        component: Version
    },
    {
        path: "/packagePut/version/add",
        name: "versionAdd",
        component: VersionAdd
    },
    {
        path: "/packagePut/version/edit",
        name: "versionEdit",
        component: VersionEdit
    },
    {
        path: "/packagePut/channel",
        name: "channel",
        component: Channel
    },
    {
        path: "/packagePut/channel/add",
        name: "channelAdd",
        component: ChannelAdd
    },
    {
        path: "/packagePut/channel/edit",
        name: "channelEdit",
        component: ChannelEdit
    },
    {
        path: "/packagePut/moduleConfig",
        name: "moduelConfig",
        component: ModuleConfig
    },
    {
        path: "/packagePut/moduleConfig/add",
        name: "moduelConfigAdd",
        component: ModuleConfigAdd
    },
    {
        path: "/packagePut/moduleConfig/edit",
        name: "moduelConfigEdit",
        component: ModuleConfigEdit
    }
]
