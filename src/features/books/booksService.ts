import { splitApi } from "../../store/query/splitApi";
import type { ICategory, IBook, ISection} from "./booksTypes";

export const booksApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriyes: build.query<ICategory[], void>({
            query: () => "categories",
            transformResponse: (res: { categories: ICategory[] }) =>
                res.categories,
        }),
        getBooks: build.query<IBook[], void>({
            query: () => "books",
            transformResponse: (res: { books: IBook[] }) => res.books,
        }),
        getBookContent: build.query<ISection[], string>({
            query: bookId => `books/${bookId}/contents`,
            transformResponse: (res: { sections: ISection[] }) => res.sections
        })
        
    }),
});

export const { useGetCategoriyesQuery, useGetBooksQuery, useGetBookContentQuery } = booksApi;
