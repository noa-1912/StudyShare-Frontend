
import { SolutionsModel } from "./solutions.model"
import { SubjectsModel } from "./subjects.model"
import { SuggestionModel } from "./suggestion.model"

export class BooksModel {

    id!: number
    bookName!: string
    author!: string
    description!: string
    subject!: SubjectsModel | undefined
    suggestion: SuggestionModel[] = [];
    solutions: SolutionsModel[] = [];
    grade!: "ט" | "י" | "יא" | "יב"

    // public constructor(bookName: string, author: string, description: string, subject: SubjectsModel) {
    //     this.bookName = bookName
    //     this.author = author
    //     this.description = description
    //     this.subject = subject
    // }

    constructor() {} // ← או פשוט למחוק לגמרי



}