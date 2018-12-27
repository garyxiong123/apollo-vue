function SetIp() {

  const ips = {
    ["localhost:8100"]: "localhost:9999",
    // ["localhost:8088"]: "test.middleground-gateway.caiyikeji.com",
  };
  this.ip = "http://" + ips[document.location.host];
  this.socketIp = "ws://" + ips[document.location.host]
}

const ipObj = new SetIp();

export default ipObj;
