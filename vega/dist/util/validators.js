"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateRegisterInput = (input, type) => {
    const errors = {};
    switch (type) {
        case "email":
            if (input === undefined || input.trim() === "") {
                errors.email = "Email field is required";
            }
            else if (String(input).includes("<") ||
                String(input).includes(":") ||
                String(input).includes(">") ||
                String(input).includes("&") ||
                String(input).includes("%") ||
                String(input).includes("`") ||
                String(input).includes("'") ||
                String(input).includes(`"`) ||
                String(input).includes("|") ||
                String(input).includes("*") ||
                String(input).includes("\\") ||
                String(input).includes("/")) {
                errors.email = "only _ {} () ^ + = ? - ! # are allowed";
            }
            else {
                const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
                if (!input.match(regEx)) {
                    errors.email = "Email is not valid";
                }
            }
            break;
        case "password":
            if (input === undefined || input === "") {
                errors.password = "Password field is required";
            }
            else if (String(input).length < 6) {
                errors.password = "Password must be at least 6 characters";
            }
            break;
        case "username":
            if (input === undefined || input.trim() === "") {
                errors.username = "email address is invalid";
            }
            else if (String(input).includes("<") ||
                String(input).includes(":") ||
                String(input).includes(">") ||
                String(input).includes("&") ||
                String(input).includes("%") ||
                String(input).includes("`") ||
                String(input).includes("'") ||
                String(input).includes(`"`) ||
                String(input).includes("|") ||
                String(input).includes("*") ||
                String(input).includes("\\") ||
                String(input).includes("/") ||
                String(input).includes("@")) {
                errors.username = "only _ {} () ^ + = ? - ! # are allowed";
            }
            break;
        default:
            errors.validation = "type not defined";
            break;
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.default = ValidateRegisterInput;
//# sourceMappingURL=validators.js.map