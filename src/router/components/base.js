const Email = () => import("@/components/base/email");
const EmailDetail = () => import("@/components/base/email/components/detail")

const FileSave = () => import("@/components/base/fileSave");
const AddFile = () => import("@/components/base/fileSave/components/addFile");

const Region = () => import("@/components/base/region");
const BackgroundLog = () => import("@/components/base/backgroundLog");
const Comment = () => import("@/components/base/comment");
const Keyword = () => import("@/components/base/keyword");
const UserCenter = () => import("@/components/base/userCenter");
const BankCenter = () => import("@/components/base/bankCenter");
const PayGateway = () => import("@/components/base/payGateway");
const AndroidVersion = () => import("@/components/base/androidVersion");
const CodeCreate = () => import("@/components/base/codeCreate");

//abtest
const abtestProduct = () => import("@/components/base/abtest/product")
const abtestProductMod = () => import("@/components/base/abtest/product/components/mod")

const abtestExperiment = () => import("@/components/base/abtest/experiment")
const abtestExperimentAdd = () => import("@/components/base/abtest/experiment/components/add")
const abtestExperimentMod = () => import("@/components/base/abtest/experiment/components/mod")

const abtestStrategy = () => import("@/components/base/abtest/experiment/components/strategy")
const abtestStrategyAdd = () => import("@/components/base/abtest/experiment/components/strategy/components/add")
const abtestStrategyMod = () => import("@/components/base/abtest/experiment/components/strategy/components/mod")

export default [
    {
        path: "/base/email",
        name: "email",
        component: Email
    },
    {
        path: "/base/email/detail",
        name: "emailDetail",
        component: EmailDetail
    },
    {
        path: "/base/fileSave",
        name: "fileSave",
        component: FileSave
    },
    {
        path: "/base/fileSave/addFile",
        name: "addFile",
        component: AddFile
    },
    {
        path: "/base/region",
        name: "region",
        component: Region
    },
    {
        path: "/base/backgroundLog",
        name: "backgroundLog",
        component: BackgroundLog
    },
    {
        path: "/base/comment",
        name: "comment",
        component: Comment
    },
    {
        path: "/base/keyword",
        name: "keyword",
        component: Keyword
    },
    {
        path: "/base/userCenter",
        name: "userCenter",
        component: UserCenter
    },
    {
        path: "/base/bankCenter",
        name: "bankCenter",
        component: BankCenter
    },
    {
        path: "/base/payGateway",
        name: "payGateway",
        component: PayGateway
    },
    {
        path: "/base/androidVersion",
        name: "androidVersion",
        component: AndroidVersion
    },
    {
        path: "/base/codeCreate",
        name: "codeCreate",
        component: CodeCreate
    },
    {
        path: "/base/abtest/product",
        name: 'abtestProduct',
        component: abtestProduct
    },
    {
        path: "/base/abtest/product/mod",
        name: "abtestproductmod",
        component: abtestProductMod
    },
    {
        path: "/base/abtest/experiment",
        name: "abtestExperiment",
        component: abtestExperiment
    },
    {
        path: "/base/abtest/experiment/add",
        name: "abtestExperimentAdd",
        component: abtestExperimentAdd
    },
    {
        path: "/base/abtest/experiment/mod",
        name: "abtestExperimentMod",
        component: abtestExperimentMod
    },
    {
        path: "/base/abtest/experiment/strategy",
        name: "abtestExperimentStrategy",
        component: abtestStrategy
    },
    {
        path: "/base/abtest/experiment/strategy/add",
        name: "abtestExperimentStrategyAdd",
        component: abtestStrategyAdd
    },
    {
        path: "/base/abtest/experiment/strategy/mod",
        name: "abtestExperimentStrategyMod",
        component: abtestStrategyMod
    },
]
