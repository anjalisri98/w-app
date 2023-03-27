///////////////// [ RANDOM CODE GENERATOR ] /////////////////
function generateCode(length) {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// string validation (required: true)
const isValid = function (value) {
    if (typeof value === "undefined" || typeof value === null) return false;
    if (typeof value === "string" && value.trim().length == 0) return false;
    if (typeof value === "string") return true;
};


// email validation
const isValidEmail = function (email) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email); // returns a boolean
};

// phone validation
const isValidPhone = function (phone) {
    const pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    return pattern.test(phone); // returns a boolean
};


//password validation
const isValidPassword = function (password) {
    if (password.length >= 8 && password.length <= 15) {
        return true;
    }
    return false;
};

//reviewedBy validation
const isValidName = function (value) {
    const pattern = /^[a-zA-Z,'.\-\s]*$/;
    return pattern.test(value);
};

//valid time
const isValidTime = function (value) {
    const pattern = /^(0?[0-9]|1[0-9]|2[0-3])$/;
    return pattern.test(value);

};
function getUUID() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }


module.exports = { generateCode, isValid, isValidEmail, isValidPhone, isValidPassword, isValidName , isValidTime, getUUID};
