export const pageNames = {
    homePage: "/pages/index/index",
    bookDetail: "/pages/bookDetail/bookDetail",
    rendererExample: "/pages/rendererExample/rendererExample",
    practiceChapter: "/pages/practiceChapter/practiceChapter",
    practiceReview: "/pages/practiceReview/practiceReview",
    chapterResult: "/pages/chapterResult/chapterResult",
    play: "/pages/play/play",
    mine: "/pages/mine/mine",
    bookShelf: "/pages/bookShelf/bookShelf"
};

export const pageList = [
    removeFirstCharacter(pageNames.homePage),
    removeFirstCharacter(pageNames.bookDetail),
    removeFirstCharacter(pageNames.rendererExample),
    removeFirstCharacter(pageNames.practiceChapter),
    removeFirstCharacter(pageNames.practiceReview),
    removeFirstCharacter(pageNames.chapterResult),
    removeFirstCharacter(pageNames.play),
    removeFirstCharacter(pageNames.mine),
    removeFirstCharacter(pageNames.bookShelf)
];

const routesBuilder = {
    homePage: () => pageNames.homePage,
    bookDetail: (bookId: string) => `${pageNames.bookDetail}?bookId=${bookId}`,
    practiceChapter: (chapterId: string) =>
        `${pageNames.practiceChapter}?chapterId=${chapterId}`,
    chapterResult: (chapterId: string) =>
        `${pageNames.chapterResult}?chapterId=${chapterId}`,
    practiceReview: (questionSetId: string) =>
        `${pageNames.practiceReview}?questionSetId=${questionSetId}`,
    rendererExample: () => pageNames.rendererExample,
    play: () => pageNames.play,
    mine: () => pageNames.mine,
    bookShelf: () => pageNames.bookShelf
};

export default routesBuilder;

export function removeFirstCharacter(str: string) {
    return str.substring(1);
}
