import { createHmac, randomBytes } from 'node:crypto';
import JWT from 'jsonwebtoken'
import { User } from '../mongoose/models/user.model'
import ServerError from '../utils/ServerError';

export interface RegisterUserPayload {
    name: string,
    email: string,
    password: string,
    salt: string
}

export interface LoginUserPayload {
    email: string,
    password: string
}

interface UserAuthTokenPayload {
    email: string,
    password: string
}

const JWT_SECRET_KEY = '123'

class UserService {


    // return a hashed password
    private static createHashPassword(password: string, salt: string): string {
        return createHmac('sha256', salt)
            .update(password)
            .digest("hex");
    }

    // finds user in db and return credentials
    private static async getUserCredentialsByEmail(email: string)
        : Promise<{ email: string, hashedPassword: string, salt: string }> {
        try {
            const user = await User.findOne({ email: email })
            return { email: user.email, hashedPassword: user.password, salt: user.salt }
        } catch (error) {
            throw new ServerError(404, "User does not exist")
        }
    }

    // match password and return boolean
    private static matchUserPassword(password: string, hashedPassword: string, salt: string): boolean {
        const currentHashedPassword = this.createHashPassword(password, salt)
        console.log({ hashedPassword, currentHashedPassword });
        if (hashedPassword === currentHashedPassword) return true
        else return false
    }

    // generate user token
    private static async generateUserToken(payload: UserAuthTokenPayload) {
        const { email } = payload
        const user = this.getUserCredentialsByEmail(email)
        if (!user) throw new ServerError(404, "User does not exist")
        const token = JWT.sign({ id: email, email: email }, JWT_SECRET_KEY)
        return token
    }


    // get data from token
    public static decrpytUserToken(accessToken: string) {
        return JWT.verify(accessToken, JWT_SECRET_KEY)
    }


    // public function to register / create user in db
    public static async registerUser(payload: RegisterUserPayload,) {
        const { name, email, password } = payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = this.createHashPassword(password, salt)

        try {
            const newUser = await new User({
                name: name,
                email: email,
                password: hashedPassword,
                salt: salt
            }).save()
            return {
                email: newUser.email,
                accessToken: this.generateUserToken({ email, password })
            }
        } catch (error: any) {
            if (error.code === 11000) { // MongoDB duplicate key error
                throw new ServerError(400, "Email already exists", [], error.stack);
            }
            throw new ServerError(500);
        }
    }


    // funtion to login user from db
    public static async loginUser(payload: LoginUserPayload) {
        const { email, password } = payload
        const user = await this.getUserCredentialsByEmail(email)
        if (!user || user === null) throw new ServerError(400, "User does not exists");
        if (!this.matchUserPassword(password, user.hashedPassword, user.salt)) throw new ServerError(401, "Incorrect password");
        console.log(user);
        return {
            email: user.email,
            accessToken: this.generateUserToken({ email, password })
        }
    }
}

export default UserService;
