import {CallbackWithoutResultAndOptionalError, HydratedDocument, Model, model, Schema, Types} from 'mongoose';
import {generateRidiculousName} from "../utils/utils";
import {FastifyReply} from "fastify";
import {IReview} from "./Review";
import Main from "../Main";

export interface IUser {
    _id: Types.ObjectId,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    role: string,
    notifications: {
        message: string,
        date: Date,
        read: boolean
    }[],
    createdAt: Date,
    following: Types.DocumentArray<IUser>,
    followers: Types.DocumentArray<IUser>,
    watchlist: number[],
    profilePicture: string,
}

interface UserModel extends Model<IUser> {
    findByUsername(username: string, reply?: FastifyReply): Promise<any>;

    findByEmail(email: string): Promise<any>;

    updateByUsername(username: string, user: IUser): Promise<any>;

    deleteByUsername(username: string): Promise<any>;
}

const userSchema = new Schema<IUser, UserModel>({
        firstname: {
            type: "String",
            required: true,
            trim: true,
            set: (firstname: string) => capitalizeName(firstname)
        },
        lastname: {
            type: "String",
            required: true,
            trim: true,
            set: (lastname: string) => capitalizeName(lastname)
        },
        username: {type: "String", required: false, unique: true, default: generateRidiculousName, index: true},
        email: {
            type: "String", required: true, unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v: string) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
            index: true,
        },
        notifications: {
            type: [{
                message: {type: "String", required: true},
                date: {type: "Date", required: true, default: Date.now},
                read: {type: "Boolean", required: true, default: false}
            }],
            default: []
        },
        password: {
            type: "String",
            required: true,
        },
        role: {type: "String", required: false, default: 'user'},
        createdAt: {type: "Date", required: true, default: Date.now},

        following: {
            type: [{type: Schema.Types.ObjectId, ref: 'User'}],
            default: []
        },
        followers: {
            type: [{type: Schema.Types.ObjectId, ref: 'User'}],
            default: []
        },
        watchlist: {
            type: [{type: "Number"}],
            default: []
        },
        profilePicture: {
            type: "String",
            required: false
        },
    }, {
        versionKey: false,
        statics: {
            async findByUsername(username: string): Promise<any> {
                return this.findOne({username});
            },
            async findByEmail(email: string): Promise<any> {
                return this.findOne({email});
            },
            updateByUsername(username: string, user: IUser): Promise<any> {
                return this.findOneAndUpdate({username}, user, {new: true});
            },
            deleteByUsername(username: string): Promise<any> {
                return this.findOneAndDelete({username});
            },
        },
        methods: {
            async notify(message: string): Promise<void> {
                this.notifications.push({message, date: new Date(), read: false});
                await this.save();
            },
            async getReviews(): Promise<HydratedDocument<IReview>[]> {
                return this.model('Review').find({user: this._id});
            },
            async getReview(movieId: number): Promise<HydratedDocument<IReview> | null> {
                return this.model('Review').findOne({user: this._id, movieId});
            },
            async generateToken(): Promise<string> {
                return Main.getWebServer().getServer().jwt.sign({id: this._id, username: this.username});
            },
            async comparePassword(password: string): Promise<boolean> {
                return await Main.getWebServer().getServer().bcrypt.compare(password, this.password);
            },
            withoutPassword(): Omit<IUser, "password"> {
                const {password, ...user} = this.toJSON();
                return user;
            }
        }
    }
)

/**
 * Hash the password before saving the user
 * @param next {CallbackWithoutResultAndOptionalError} Callback to call next middleware
 */
userSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
    if (this.isModified('password')) {
        this.password = await Main.getWebServer().getServer().bcrypt.hash(this.password);
    }
    next();
})

const capitalizeName = (name: string) => {
    return name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

export default model<IUser, UserModel>('User', userSchema, 'users');