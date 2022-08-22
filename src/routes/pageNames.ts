function removeFirstCharacter(str: string) {
    return str.substring(1);
}

const pageNames = {
    homePage: "/pages/index/index",
    bookDetail: "/pages/bookDetail/bookDetail",
    rendererExample: "/pages/rendererExample/rendererExample",
    practiceChapter: "/pages/practiceChapter/practiceChapter",
    practiceReview: "/pages/practiceReview/practiceReview",
    chapterResult: "/pages/chapterResult/chapterResult"
};

export const pageList = [
    removeFirstCharacter(pageNames.homePage),
    removeFirstCharacter(pageNames.bookDetail),
    removeFirstCharacter(pageNames.rendererExample),
    removeFirstCharacter(pageNames.practiceChapter),
    removeFirstCharacter(pageNames.practiceReview),
    removeFirstCharacter(pageNames.chapterResult)
];

export default pageNames;
