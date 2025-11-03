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

    public constructor(name: string, email: string, password: string, date?: Date) {
        this.name = name
        this.email = email
        this.password = password
        this.date = date
    }
    public constructorEmpty() { }

}