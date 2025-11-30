import { BooksModel } from "./books.model"
import { SuggestionModel } from "./suggestion.model"
import { UsersModel } from "./users.model"

export class SolutionsModel extends SuggestionModel {

    avg?: number

    public constructor(page: number, exercise: number, section: number, subSection: number, content: string, uploadDate: Date, imagePath: string, user: UsersModel, book: BooksModel, image: string, avg: number) {
        super(page, exercise, section, subSection, content, uploadDate, imagePath, user, book, image)
        this.avg = avg
    }






}