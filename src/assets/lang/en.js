export const m = {
    switchView: 'JSON EDITOR',//网易云音乐
}
export const f = {
    tab1: 'Service',
    tab2: 'Networking',
    tab3: 'Volumes',
    tab4: 'Health Checks',
    tab5: 'Environment'
}
export const tab1 ={
    title:'Service',
    titleDesc:'Configure your service below. Start by giving your service an ID.',
    severId:'SERVICE ID',
    idDesc:'Give your service a unique name within the cluster, e.g. my-service',
    instance:'INSTANCES',
    image:'CONTAINER IMAGE',
    imageDesc:'Enter a Docker image you want to run, e.g. nginx.',
    command:'COMMAND',
    commandInfo:'The command value will be wrapped by the underlying Mesos executor via /bin/sh -c ${cmd}',
    commandDesc:'A shell command for your container to execute.',
    moreSetting:'MORE SETTINGS',
    runtime:'Container Runtime',
    runtimeInfo:'You can run Docker containers with both container runtimes. The Universal Container Runtime is better supported in DC/OS',
    runtimeDesc:'The container runtime is responsible for running your service. We support the Mesos and Docker containerizers',
    radio1:'DOCKER ENGINE',
    radio1Desc:'DDocker’s container runtime. No support for multiple containers (Pods) or GPU resources',
    radio2:'MESOS RUNTIME',
    radio2Desc:'The default Mesos containerizer',
    radio3:'UNIVERSAL CONTAINER RUNTIME',
    radio3Desc:'Native container engine in Mesos using standard Linux features. Supports Docker file format, multiple containers (Pods) and GPU resources.',
    constraintsTitle:'Placement Constraints',
    constraintsInfo:'Constraints have three parts: a field name, an operator, and an optional parameter. The field can be the hostname of the agent node or any attribute of the agent node',
    constraintsDesc:'Constraints control where apps run to allow optimization for either fault tolerance or locality.',
    addCon:'ADD PLACEMENT CONSTRAINT',
    conTable1:'FIELD',
    conTable2:'OPERATOR',
    conTable3:'VALUE',
    conTable3Desc:'This field is optional',
    advanceTitle:'Advanced Settings',
    advanceDesc:'Advanced settings related to the runtime you have selected above',
    adCheck1:'GRANT RUNTIME PRIVILEGES',
    adCheck1Desc:'By default, containers are “unprivileged” and cannot, for example, run a Docker daemon inside a Docker container',
    adCheck2:'FORCE PULL IMAGE ON LAUNCH',
    adCheck2Desc:'Force Docker to pull the image before launching each instance',
    artifactTitle:'ARTIFACT URI',
    artiAdd:'ADD ARTIFACT'
}

export const tab2 = {
    title:'Networking',
    titleDesc:'Configure the networking for your service',
    netType:'Network Type',
    portAuto:'Ports Auto Assign',
    portAutoDesc:'DC/OS can automatically assign ports',
    portAutoCheck:'Assign Host Ports Automatically',
    endPointsTitle:'Service Endpoints',
    endPointsInfo:'Service endpoints map traffic from a single VIP to multiple IP addresses and ports',
    endPointsDesc:'DC/OS can automatically generate a Service Address to connect to each of your load balanced endpoints.',
    addEndPoint:'Add Service Endpoint',
    input1:'Service Endpoint Name',
    input1Info:'Name your endpoint to search for it by a meaningful name, rather than the port number.',
    input2:'Host Port',
    input2Info:'This host port will be accessible as an environment variable called $PORT0',
    input3:'Protocol',
    input3Info:'Most services will use TCP',
    check1:'Enable Load Balanced Service Address',
    balancedPort:'Add Service Endpoint',
    balancedPortDesc:'Load balance this service internally at .marathon.l4lb.thisdcos.directory:2'
}

export const tab3 = {
    title: 'Volumes',
    titleDesc: 'Create a stateful service by configuring a persistent volume. Persistent volumes enable instances to be restarted without data loss.',
    local: 'Local Volumes',
    localDesc: 'Choose a local persistent volume if you need quick access to stored data',
    addLocal: 'Add Local Volume',
    add1Input: 'Volume Type',
    external: 'External Volumes',
    externalDesc: 'Choose an external persistent volume if fault-tolerance is crucial for your service',
    addExternal: 'Add External Volume',
    add2Input1: 'Name',
    add2Input2: 'SIZE (MiB)',
    add2Input3: 'Container Path',
}

export const tab4 ={
    title:'Health Checks',
    titleDesc:"Health checks may be specified per application to be run against the application's instances",
    add:'Add Health Check',
    pro:'Protocol',
    cmd:'Command',
    advance:'Advanced Health Check Settings',
    cInput1:'Grace Period (s)',
    cInput2:'Interval (s)',
    cInput3:'Timeout (s)',
    cInput4:'Max Failures',
    hInput1:'Service Endpoint',
    hInput2:'Path',
    hCheck:'Make HTTPS'
}

export const tab5 ={
    title:'Environment',
    titleDesc:'Configure any environment values to be attached to each instance that is launched.',
    envVar:'Environment Variables',
    envVarDesc:'Set up environment variables for each instance your service launches.',
    addEnv:'Add Environment Variable',
    label:'Labels',
    labelDesc:'Attach metadata to expose additional information to other services.',
    addLabel:'Add Label'
}