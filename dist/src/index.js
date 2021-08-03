"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.default,
    context: ({ req, res }) => ({ req, res }),
});
mongoose_1.default
    .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("database connected");
    return server.listen({ port: 5000 });
})
    .then((res) => {
    console.log(`Server running at ${res.url} 🎉`);
});
//# sourceMappingURL=index.js.map