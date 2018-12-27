export default {
  validateRacks: (rule, value, callback) => {
    const pattern = /^\d*$/g;
    if (!pattern.test(value)) {
      callback(new Error("纯数字"));
    } else {
      const num = parseInt(value, 10);
      if (num > 60) {
        callback(new Error("机架数不能大于60"));
      } else if (num < 37) {
        callback(new Error("机架数不能小于37"));
      } else {
        callback();
      }
    }
  },
  validatePhone: (rule, value, callback) => {
    if (!value && value !== 0) {
      callback();
    } else {
      const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/g;
      if (!pattern.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    }
  },
  validateMail: (rule, value, callback) => {
    const pattern = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/g;
    if (!pattern.test(value)) {
      callback(new Error("请输入正确邮箱"));
    } else {
      callback();
    }
  },
  validateTotalPrice: (rule, value, callback) => {
    const pattern = /^\d*$/g;
    if (!pattern.test(value)) {
      callback(new Error("纯数字"));
    } else {
      const num = parseInt(value, 10);
      if (num > 100000000) {
        callback(new Error("不能超过1亿"));
      } else {
        callback();
      }
    }
  },
  validateNum: (rule, value, callback) => {
    const pattern = /^\d*$/g;
    if (!pattern.test(value) && value) {
      callback(new Error("纯数字"));
    } else {
      callback();
    }
  },
  validateNoReNum: (rule, value, callback) => {
    if (value) {
      const pattern = /^\d*$/g;
      if (!pattern.test(value)) {
        callback(new Error("纯数字"));
      } else {
        callback();
      }
    } else {
      callback()
    }
  },
  validateRackLoc: (rule, value, callback) => {
    const pattern = /^\d+$/;
    const pattern1 = /^\d+-\d+$/;
    if (pattern.test(value)) {
      callback();
    } else {
      if (pattern1.test(value)) {
        callback();
      } else {
        callback(new Error("格式不正确"));
      }
    }
  },
  validateIp: (rule, value, callback) => {
    const pattern = /^\d+\.\d+\.\d+\.\d+$/;
    if (pattern.test(value)) {
      const arr = value.split(".");
      let valid = true;
      const flag = arr.every(item => {
        const num = parseInt(item, 10);
        return 256 > num && num > -1 ? true : false;
      });
      if (flag) {
        callback();
      } else {
        callback(new Error("ip介于0-255"));
      }
    } else {
      callback(new Error("格式不正确"));
    }
  },
  validateDot1: (rule, value, callback) => {
    if (value) {
      const pattern = /(^\d+\.\d$)|(^\d+$)/;
      if (pattern.test(value)) {
        callback();
      } else {
        callback(new Error("纯数字或一位小数"));
      }
    } else {
      callback();
    }
  },
  validateDot2: (rule, value, callback) => {
    if (value) {
      const pattern = /(^\d+\.\d{1,2}$)|(^\d+$)/;
      if (pattern.test(value)) {
        callback();
      } else {
        callback(new Error("纯数字或之至两位小数"));
      }
    } else {
      callback();
    }
  },
  validateBlank: (rule, value, callback) => {
    const pattern = /^\s+$/;
    if (pattern.test(value)) {
      callback(new Error("必填(空格视为空)"));
    } else {
      callback();
    }
  },
  validateLetter: (rule, value, callback) => {
    const pattern = /^[0-9a-zA-Z_]{1}[0-9a-zA-Z-_]*$/;
    if (pattern.test(value)) {
      callback();
    } else {
      callback(new Error("格式不正确"));
    }
  }
};
