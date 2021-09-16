import IConfig from "../common/IConfig.interface";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";

const envResult = dotenv.config();

if (envResult.error) {
    throw "The environment path with additional information could not be parsed. Error: " + envResult.error;
}
const Config: IConfig = {
    server: {
        port: 40080,
        static: {
            path: "./static/",
            route: "/static",
            cacheControl: false,
            dotfiles: "deny",
            etag: false,
            maxAge: 3600000,
            index: false,
        },
    },
    logger: {
        path: "logs/access.log",
    },
    database: {
        host: "localhost",
        port: 3307,
        user: "root",
        password: "root",
        database: "aplikacija",
        charset: "utf8",
        timezone: "+01:00",
    },
    mail: {
        hostname: process.env?.MAIL_HOST,
        port: +(process.env?.MAIL_PORT),
        secure: process.env?.MAIL_SECURE === "true",
        fromEmail: process.env?.MAIL_FROM,
        username: process.env?.MAIL_USER,
        password: process.env?.MAIL_PASS,
        debug: true,
    },
    auth: {
        user: {
            issuer: "Praktikum Web Application",
            algorithm: "RS256",
            authToken: {
                duration: 60 * 60 * 24,
                publicKey: readFileSync("keystore/user-auth-token.public", "ascii"),
                privateKey: readFileSync("keystore/user-auth-token.private", "ascii"),
            },
            refreshToken: {
                duration: 60 * 60 * 24,
                publicKey: readFileSync("keystore/user-refresh-token.public", "ascii"),
                privateKey: readFileSync("keystore/user-refresh-token.private", "ascii"),
            }
        },
        administrator: {
            issuer: "Praktikum Web Application",
            algorithm: "RS256",
            authToken: {
                duration: 60 * 60 * 24,
                publicKey: readFileSync("keystore/administrator-auth-token.public", "ascii"),
                privateKey: readFileSync("keystore/administrator-auth-token.private", "ascii"),
            },
            refreshToken: {
                duration: 60 * 60 * 24,
                publicKey: readFileSync("keystore/administrator-refresh-token.public", "ascii"),
                privateKey: readFileSync("keystore/administrator-refresh-token.private", "ascii"),
            }
        },
        allowRequestsEvenWithoutValidTokens: false,
    }
};

export default Config;