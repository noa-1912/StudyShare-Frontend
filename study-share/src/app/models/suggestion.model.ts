import { BooksModel } from "./books.model"
import { UsersModel } from "./users.model"

export class SuggestionModel {

    id!: number
    page!: number
    exercise!: number
    section!: number
    subSection!: number
    content!: string
    uploadDate!: Date
    imagePath!: string
    user!: UsersModel
    book!: BooksModel

    public constructor(page: number, exercise: number, section: number, subSection: number, content: string, uploadDate: Date, imagePath: string, user: UsersModel, book: BooksModel) {
        this.page = page
        this.exercise = exercise
        this.section = section
        this.subSection = subSection
        this.content = content
        this.uploadDate = uploadDate
        this.imagePath = imagePath
        this.user = user
        this.book = book
    }

}