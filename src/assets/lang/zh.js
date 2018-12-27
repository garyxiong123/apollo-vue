export const m = {
    switchView: 'JSON编辑器',
}
export const f = {
    tab1: '服务',
    tab2: '网络',
    tab3: '卷',
    tab4: '健康检查',
    tab5: '环境'
}
export const tab1 = {
    title: '服务',
    titleDesc: '在下面配置您的服务。首先为您的服务提供ID',
    severId: '服务id',
    idDesc: '在群集中为您的服务提供唯一的名称，例如my-service',
    instance: '实例',
    image: '容器镜像',
    imageDesc: '输入要运行的Docker镜像，例如nginx',
    cpu: 'CPU',
    mem: '内存(MiB)',
    command: '命令',
    commandInfo: '命令值将由底层Mesos执行程序通过/ bin / sh -c $ {cmd}包装',
    commandDesc: '用于容器执行的shell命令',
    moreSetting: '更多设置',
    runtime: '容器运行',
    runtimeInfo: '您可以使用两个容器运行时运行Docker容器。DC / OS中更好地支持Universal Container Runtime',
    runtimeDesc: '容器运行时负责运行您的服务。我们支持Mesos和Docker容器',
    radio1: 'DOCKER引擎',
    radio1Desc: 'Docker的容器运行时。不支持多个容器（Pod）或GPU资源',
    radio2: 'MESOS运行',
    radio2Desc: '默认的Mesos容器',
    radio3: '通用容器运行',
    radio3Desc: 'Mesos中的本机容器引擎，使用标准Linux功能。支持Docker文件格式，多个容器（Pod）和GPU资源',
    constraintsTitle: '设置约束',
    constraintsInfo: '约束有三个部分：字段名称，运算符和可选参数。该字段可以是代理节点的主机名或代理节点的任何属性',
    constraintsDesc: '约束控制应用程序运行的位置，以允许针对容错或位置进行优化',
    addCon: '添加展示位置约束',
    conTable1: '字段',
    conTable2: '操作者',
    conTable3: '值',
    conTable3Desc: '该字段是可选的',
    advanceTitle: '高级设置',
    advanceDesc: '与您在上面选择的运行时相关的高级设置',
    adCheck1: '授予运行时权限',
    adCheck1Desc: '默认情况下，容器是“非特权的”，例如，不能在Docker容器内运行Docker守护程序',
    adCheck2: '部署时强制拉取镜像',
    adCheck2Desc: '强制Docker在启动每个实例之前拉取图像',
    artifactTitle: '工件URI',
    artiAdd: '新增工件'
}

export const tab2 = {
    title: '联网',
    titleDesc: '为您的服务配置网络',
    netType: '网络类型',
    portAuto: '端口自动分配',
    portAutoDesc: 'DC / OS可以自动分配端口',
    portAutoCheck: '自动分配主机端口',
    endPointsTitle: '服务端点',
    endPointsInfo: '服务端点将来自单个VIP的流量映射到多个IP地址和端口',
    endPointsDesc: 'DC / OS可以自动生成服务地址以连接到每个负载平衡端点',
    addEndPoint: '添加服务端点',
    input1: '服务端点名称',
    input1Info: '将端点命名为使用有意义的名称而不是端口号进行搜索',
    input2: '主机端口',
    input2Info: '该主机端口可作为名为“$ PORT0”的环境变量访问',
    input3: '协议',
    input3Info: '大多数服务将使用TCP',
    check1: '启用负载平衡服务地址',
    balancedPort: '负载均衡端口',
    balancedPortDesc: '在.marathon.l4lb.thisdcos.directory：2内部对此服务进行负载均衡'
}

export const tab3 = {
    title: '卷',
    titleDesc: '通过配置持久卷来创建有状态服务。持久卷使实例能够重新启动而不会丢失数据',
    local: '本地卷',
    localDesc: '如果需要快速访问存储的数据，请选择本地持久卷',
    addLocal: '添加本地卷',
    add1Input: '卷类型',
    external: '外部卷',
    externalDesc: '如果容错对您的服务至关重要，请选择外部永久卷',
    addExternal: '添加外部卷',
    add2Input1: '名称',
    add2Input2: '尺码（MiB）',
    add2Input3: '集装箱路径',
}

export const tab4 ={
    title:'健康检查',
    titleDesc:'可以为每个应用程序指定的健康检查，对应用程序运行的“ 小号实例',
    add:'添加健康检查',
    pro:'协议',
    cmd:'指令',
    advance:'高级健康检查设置',
    cInput1:'宽限期',
    cInput2:'间隔期',
    cInput3:'超时',
    cInput4:'最大失败',
    hInput1:'服务端点',
    hInput2:'路径',
    hCheck:'制作HTTPS'
}

export const tab5 ={
    title:'环境',
    titleDesc:'配置要附加到启动的每个实例的任何环境值',
    envVar:'环境变量',
    envVarDesc:'为服务启动的每个实例设置环境变量',
    addEnv:'添加环境变量',
    label:'标签',
    labelDesc:'附加元数据以向其他服务公开其他信息',
    addLabel:'添加标签'
}