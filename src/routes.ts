function removeFirstCharacter(str: string) {
    return str.substring(1);
}

const pageNames = {
    homePage: "/pages/index/index",
    bookDetail: "/pages/bookDetail/bookDetail",
    rendererExample: "/pages/rendererExample/rendererExample",
    practiceChapter: "/pages/practiceChapter/practiceChapter"
};

export const pageList = [
    removeFirstCharacter(pageNames.homePage),
    removeFirstCharacter(pageNames.bookDetail),
    removeFirstCharacter(pageNames.rendererExample),
    removeFirstCharacter(pageNames.practiceChapter)
];

export default pageNames;
