import { BooksModel } from "./books.model"
import { UsersModel } from "./users.model"

export class SuggestionModel {

  id?: number;
  page?: number;
  exercise?: number;
  section?: number;
  subSection?: number;
  content?: string;
  uploadDate?: Date;
  imagePath?: string;

    user?: any;              // ← תואם ל- private Users user
      userDTO?: UsersModel;  // מוצג במסך (שם, תמונה וכו')

    book?: BooksModel;              // ← תואם ל- private Books book

  image?: string;


  public constructor(page: number, exercise: number, section: number, subSection: number, content: string, uploadDate: Date, imagePath: string,  user: any, book: BooksModel, image :string) {
    this.page = page;
    this.exercise = exercise;
    this.section = section;
    this.subSection = subSection;
    this.content = content;
    this.uploadDate = uploadDate;
    this.imagePath = imagePath;
    this.user = user;
    this.book = book;
    this.image = image;
  }
}
