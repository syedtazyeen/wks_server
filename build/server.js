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
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const gql_1 = __importDefault(require("./gql"));
const config_1 = __importDefault(require("./mongoose/config"));
dotenv_1.default.config();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 1000;
        app.use((0, cors_1.default)());
        (0, config_1.default)();
        app.use('/gql', express_1.default.json(), (0, express4_1.expressMiddleware)(yield (0, gql_1.default)()));
        app.listen({ port: PORT }, () => {
            console.log(`\nserver running at http://localhost:${PORT}`);
            console.log(`\tgql server running at http://localhost:${PORT}/gql`);
        });
    });
}
init();
