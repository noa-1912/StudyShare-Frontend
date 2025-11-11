import { Solutions } from "../components/solutions-list/solutions-list"
import { CommentsModel } from "./comments.model"
import { SolutionsModel } from "./solutions.model"
import { SuggestionModel } from "./suggestion.model"

export class UsersModel {

    id!: number

    name!: string
    email!: string
    password!: string
    date?: Date
    solutions: SolutionsModel[] = [];
    suggestions: SuggestionModel[] = [];
    comments: CommentsModel[] = [];

     imagePath?: string;      // שם קובץ (אם יש)
    image?: string;          // בייס64 (לצפייה)




    public constructor(name: string, email: string, password: string, date?: Date, imagePath?: string, image?: string) {
        this.name = name
        this.email = email
        this.password = password
        this.date = date
        this.imagePath=imagePath
        this.image=image
    }
    public constructorEmpty() { }

}