export const pageNames = {
    homePage: "/pages/index/index",
    bookDetail: "/pages/bookDetail/bookDetail",
    rendererExample: "/pages/rendererExample/rendererExample",
    practiceChapter: "/pages/practiceChapter/practiceChapter",
    practiceReview: "/pages/practiceReview/practiceReview",
    chapterResult: "/pages/chapterResult/chapterResult",
    play: "/pages/play/play",
    mine: "/pages/mine/mine"
};

export const pageList = [
    removeFirstCharacter(pageNames.homePage),
    removeFirstCharacter(pageNames.bookDetail),
    removeFirstCharacter(pageNames.rendererExample),
    removeFirstCharacter(pageNames.practiceChapter),
    removeFirstCharacter(pageNames.practiceReview),
    removeFirstCharacter(pageNames.chapterResult),
    removeFirstCharacter(pageNames.play),
    removeFirstCharacter(pageNames.mine)
];

const routes = {
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
    mine: () => pageNames.mine
};

export default routes;

export function removeFirstCharacter(str: string) {
    return str.substring(1);
}
