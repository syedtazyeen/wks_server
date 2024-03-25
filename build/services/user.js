"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../mongoose/user.model");
const ServerError_1 = __importDefault(require("../utils/ServerError"));
const JWT_SECRET_KEY = '123';
class UserService {
    // return a hashed password
    static createHashPassword(password, salt) {
        return (0, node_crypto_1.createHmac)('sha256', salt)
            .update(password)
            .digest("hex");
    }
    // finds user in db and return credentials
    static getUserCredentialsByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({ email: email });
                return { email: user.email, hashedPassword: user.password, salt: user.salt };
            }
            catch (error) {
                throw new ServerError_1.default(404, "User does not exist");
            }
        });
    }
    // match password and return boolean
    static matchUserPassword(password, hashedPassword, salt) {
        const currentHashedPassword = this.createHashPassword(password, salt);
        console.log({ hashedPassword, currentHashedPassword });
        if (hashedPassword === currentHashedPassword)
            return true;
        else
            return false;
    }
    // geenerate user token
    static generateUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = this.getUserCredentialsByEmail(email);
            if (!user)
                throw new ServerError_1.default(404, "User does not exist");
            const token = jsonwebtoken_1.default.sign({ id: email, email: email }, JWT_SECRET_KEY);
            return token;
        });
    }
    // public function to register / create user in db
    static registerUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = payload;
            const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
            const hashedPassword = this.createHashPassword(password, salt);
            try {
                const newUser = yield new user_model_1.User({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    salt: salt
                }).save();
                return {
                    email: newUser.email,
                    accessToken: this.generateUserToken({ email, password })
                };
            }
            catch (error) {
                if (error.code === 11000) { // MongoDB duplicate key error
                    throw new ServerError_1.default(400, "Email already exists", [], error.stack);
                }
                throw new ServerError_1.default(500);
            }
        });
    }
    // funtion to login user from db
    static loginUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield this.getUserCredentialsByEmail(email);
            if (!user || user === null)
                throw new ServerError_1.default(400, "User does not exists");
            if (!this.matchUserPassword(password, user.hashedPassword, user.salt))
                throw new ServerError_1.default(401, "Incorrect password");
            console.log(user);
            return {
                email: user.email,
                accessToken: this.generateUserToken({ email, password })
            };
        });
    }
}
exports.default = UserService;
