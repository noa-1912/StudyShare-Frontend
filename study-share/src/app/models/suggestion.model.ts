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

    userDTO?: UsersModel;
  books?: BooksModel;

    image?: string;
}
