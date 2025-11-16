import { Injectable } from '@angular/core';
import { BooksModel } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public books: BooksModel[] = [

    /* -------------------------  כיתה ט – מתמטיקה  ------------------------- */
    { id: 1, bookName: "Algebra Basics – אלגברה בסיסית (ט)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 2, bookName: "Geometry Foundations – גיאומטריה (ט)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 3, bookName: "Functions Introduction – פונקציות בסיס (ט)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 4, bookName: "Equations & Inequalities – משוואות ואי־שוויונים (ט)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },

    /* -------------------------  כיתה י – מתמטיקה  ------------------------- */
    { id: 10, bookName: "Math Part A – חלק א׳ (י')", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 11, bookName: "Math Part B – חלק ב׳ (י')", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 12, bookName: "Graphs & Functions – גרפים ופונקציות (י')", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 13, bookName: "Algebra Advanced – אלגברה מתקדמת (י')", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 14, bookName: "Analytic Geometry – גיאומטריה אנליטית (י')", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },

    /* ------------------------- כיתה י״א – 4 יח״ל ------------------------- */
    { id: 20, bookName: "Trigonometry 4p – טריגונומטריה (י״א, 4 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 21, bookName: "Quadratic & Exponential – ריבועיות ומעריכיות (4 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 22, bookName: "Basic Probability – הסתברות בסיסית (4 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 23, bookName: "Analytic Geometry – גיאומטריה אנליטית (י״א, 4 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },

    /* ------------------------- כיתה י״ב – 4 יח״ל ------------------------- */
    { id: 30, bookName: "Exam 402 Practice – שאלון 402", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 31, bookName: "Exam 403 Practice – שאלון 403", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 32, bookName: "Derivatives & Graphs – נגזרות וגרפים (4 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },

    /* ------------------------- כיתה י״א – 5 יח״ל ------------------------- */
    { id: 40, bookName: "Trigonometry 5p – טריגונומטריה (5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 41, bookName: "Differential Calculus – חשבון דיפרנציאלי (5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 42, bookName: "Basic Integral – אינטגרלים בסיסיים (5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 43, bookName: "Sequences – סדרות (5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },

    /* ------------------------- כיתה י״ב – 5 יח״ל ------------------------- */
    { id: 50, bookName: "Optimization – בעיות קיצון (5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 51, bookName: "Motion Problems – בעיות תנועה (5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 52, bookName: "Advanced Integrals – אינטגרלים מתקדמים (5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 53, bookName: "Probability & Statistics – הסתברות וסטטיסטיקה (י״ב, 5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 54, bookName: "Logarithms & Exponents – לוגריתמים וחזקות (5 יח״ל)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 55, bookName: "Parametric Equations – משוואות פרמטריות (י״ב)", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 56, bookName: "Exam 802 Practice – שאלוני 802", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 57, bookName: "Exam 807 Practice – שאלוני 807", author: "יואל גבע", description: "", subject: undefined!, suggestion: [], solutions: [] },

    /* ------------------------- אנגלית – 4 יח״ל ------------------------- */
    { id: 70, bookName: "Grammar for 4 Points – דקדוק 4 יח\"ל", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 71, bookName: "Reading 4 Units – הבנת הנקרא 4 יח\"ל", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 72, bookName: "Vocabulary 4p – אוצר מילים 4 יח\"ל", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 73, bookName: "Writing Practice – כתיבה 4 יח\"ל", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },

    /* ------------------------- אנגלית – 5 יח״ל ------------------------- */
    { id: 80, bookName: "Grammar for 5 Points – דקדוק 5 יח\"ל", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 81, bookName: "Reading 5 Units – הבנת הנקרא 5 יח\"ל", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 82, bookName: "Literature for 5 Units – ספרות 5 יח\"ל", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 83, bookName: "Writing 5 Units – כתיבה 5 יח\"ל", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },

    /* ------------------------- אנגלית – כיתות ט–י״ב ------------------------- */
    { id: 90, bookName: "English for 9th Grade – אנגלית כיתה ט", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 91, bookName: "English for 10th Grade – אנגלית כיתה י", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 92, bookName: "English Reinforcement – חיזוק אנגלית י״א", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
    { id: 93, bookName: "English for 12th Grade – אנגלית י״ב", author: "Yoel Geva", description: "", subject: undefined!, suggestion: [], solutions: [] },
  ];

  getAllBooks() {
    return this.books;
  }
}
