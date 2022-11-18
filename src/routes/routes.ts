export const pageNames = {
    homePage: "/pages/index/index",
    bookDetail: "/pages/bookDetail/bookDetailPage",
    rendererExample: "/pages/rendererExample/rendererExamplePage",
    practiceChapter: "/pages/practiceChapter/practiceChapterPage",
    practiceReview: "/pages/practiceReview/practiceReviewPage",
    chapterResult: "/pages/chapterResult/chapterResultPage",
    play: "/pages/play/playPage",
    mine: "/pages/mine/minePage",
    bookShelf: "/pages/bookShelf/bookShelfPage",
    notebookList: "/pages/notebookList/notebookListPage",
    createNotebook: "/pages/createNotebook/createNotebookPage",
    notebook: "/pages/notebook/notebookPage",
    renameNotebook: "/pages/renameNotebook/renameNotebookPage",
    practiceNotebook: "/pages/practiceNotebook/practiceNotebookPage",
    wrongNotebook: "/pages/wrongNotebook/wrongNotebookPage",
    practiceWrongRecord: "/pages/practiceWrongRecord/practiceWrongRecordPage",
    memberLanding: "/pages/memberLanding/memberLandingPage",
    webAppIntro: "/pages/webAppIntro/webAppIntro",
    pdfShare: "/pages/pdfShare/pdfShare",
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
    removeFirstCharacter(pageNames.bookShelf),
    removeFirstCharacter(pageNames.notebookList),
    removeFirstCharacter(pageNames.createNotebook),
    removeFirstCharacter(pageNames.notebook),
    removeFirstCharacter(pageNames.renameNotebook),
    removeFirstCharacter(pageNames.practiceNotebook),
    removeFirstCharacter(pageNames.wrongNotebook),
    removeFirstCharacter(pageNames.practiceWrongRecord),
    removeFirstCharacter(pageNames.memberLanding),
    removeFirstCharacter(pageNames.webAppIntro),
    removeFirstCharacter(pageNames.pdfShare),
];

const routes = {
    home: () => pageNames.homePage,
    bookDetail: (bookId: string) => `${pageNames.bookDetail}?bookId=${bookId}`,
    practiceChapter: (chapterId: string, startingIndex: number) =>
        `${pageNames.practiceChapter}?chapterId=${chapterId}&startingIndex=${startingIndex}`,
    chapterResult: (chapterId: string) =>
        `${pageNames.chapterResult}?chapterId=${chapterId}`,
    practiceReview: (questionSetId: string) =>
        `${pageNames.practiceReview}?questionSetId=${questionSetId}`,
    rendererExample: () => pageNames.rendererExample,
    play: () => pageNames.play,
    mine: () => pageNames.mine,
    bookShelf: () => pageNames.bookShelf,
    notebookList: () => pageNames.notebookList,
    createNotebook: () => pageNames.createNotebook,
    notebookPage: (notebookId: string) =>
        `${pageNames.notebook}?notebookId=${notebookId}`,
    renameNotebook: (notebookId: string) =>
        `${pageNames.renameNotebook}?notebookId=${notebookId}`,
    practiceNotebook: (notebookId: string, startingIndex: number) =>
        `${pageNames.practiceNotebook}?notebookId=${notebookId}&startingIndex=${startingIndex}`,
    wrongNotebook: () => pageNames.wrongNotebook,
    practiceWrongRecord: () => pageNames.practiceWrongRecord,
    memberLanding: () => pageNames.memberLanding,
    webAppIntro: () => pageNames.webAppIntro,
    pdfShare: () => pageNames.pdfShare,
};

export default routes;

export function removeFirstCharacter(str: string) {
    return str.substring(1);
}
