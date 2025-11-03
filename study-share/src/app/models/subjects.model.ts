import { BooksModel } from "./books.model"

export class SubjectsModel {

    id!: number
    subjectName!: string
   books:BooksModel[]=[];
   public constructor(subjectName: string) {
        this.subjectName = subjectName
    }


}