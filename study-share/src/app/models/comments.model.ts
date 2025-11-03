import { SolutionsModel } from "./solutions.model"
import { UsersModel } from "./users.model"

export class CommentsModel {

    id!: number
    commentText!: string
    commentDate!: Date
    ratingValue!: number
    user!: UsersModel
    solutions!: SolutionsModel

    public constructor(commentText: string, commentDate: Date, ratingValue: number, user: UsersModel, solutions: SolutionsModel) {
        this.commentText = commentText
        this.commentDate = commentDate
        this.ratingValue = ratingValue
        this.user = user
        this.solutions = solutions
    }



}