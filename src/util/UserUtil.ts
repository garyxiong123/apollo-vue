class UserUtil {

  private static userKey: string = "userInfo";

  public static getUserInfo() {
    debugger
    const userInfo = localStorage.getItem(this.userKey);
    return userInfo;
  }

  public static setUserInfo(userInfo: User) {
    localStorage.setItem(this.userKey, JSON.stringify(userInfo));
    return;
  }

}
