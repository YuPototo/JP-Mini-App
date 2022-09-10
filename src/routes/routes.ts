export const pageNames = {
    homePage: "/pages/index/index",
    bookDetail: "/pages/bookDetail/bookDetailPage",
    rendererExample: "/pages/rendererExample/rendererExamplePage",
    practiceChapter: "/pages/practiceChapter/practiceChapterPage",
    practiceReview: "/pages/practiceReview/practiceReviewPage",
    chapterResult: "/pages/chapterResult/chapterResultPage",
    play: "/pages/play/playPage",
    mine: "/pages/mine/minePage",
    bookShelf: "/pages/bookShelf/bookShelfPage"
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

const routes = {
    home: () => pageNames.homePage,
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

export default routes;

export function removeFirstCharacter(str: string) {
    return str.substring(1);
}
