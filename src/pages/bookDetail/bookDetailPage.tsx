import { Button, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    selectBookById,
    bookViewed,
    selectFirstChapterId,
} from "@/features/books/booksSlice";
import BookCard from "@/features/books/components/BookCard";
import Content from "@/features/books/components/Content";
import { useEffect } from "react";
import { selectIsLogin } from "@/features/user/userSlice";
import {
    useAddBookFavMutation,
    useCheckBookFavQuery,
    useRemoveBookFavMutation,
} from "@/features/bookFav/bookFavService";
import Taro from "@tarojs/taro";
import { useGetBooksQuery } from "@/features/books/booksService";
import routes from "@/routes/routes";
import {
    useDeleteChapterDoneMutation,
    useGetChapterDoneQuery,
} from "@/features/chapterDone/chapterDoneService";
import { navigate } from "@/utils/navigator/navigator";
import toast from "@/utils/toast/toast";
import { useBookProgress } from "@/features/progress/hooks/useWorkingBook";
import { selectHasProgress } from "@/features/progress/progressSlice";
import { resetProgress } from "@/features/progress/progressThunks";
import styles from "./bookDetailPage.module.scss";
import clsx from "clsx";

export default function BookDetailPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    /** tech debts
     * 不使用 as
     */
    const { bookId } = router.params as { bookId: string };

    useEffect(() => {
        dispatch(bookViewed(bookId));
    }, [bookId, dispatch]);

    return (
        <View className="page">
            <View className={styles.bookCard}>
                <BookCardWrapper bookId={bookId} />
            </View>
            <StartPracticeButton bookId={bookId} />

            <View className={styles.btnGroup}>
                <FavButton bookId={bookId} />
                <Button
                    className={clsx(
                        "btn btn-primary--outline",
                        styles.btnGroupRight
                    )}
                    open-type="share"
                >
                    分享
                </Button>
            </View>

            <Content bookId={bookId} />
            <ResetProgressButton bookId={bookId} />
            <View className={styles.bottomBox}></View>
        </View>
    );
}

/**
 * show book card
 */
function BookCardWrapper({ bookId }: { bookId: string }) {
    const book = useAppSelector(selectBookById(bookId));
    useGetBooksQuery(undefined, { skip: !!book });

    if (!book) {
        return <View>获取书籍中...</View>;
    }

    return <BookCard book={book} />;
}

/**
 * Feature：收藏和取消收藏
 */
function FavButton({ bookId }: { bookId: string }) {
    const isLogin = useAppSelector(selectIsLogin);

    const { data: isFav, isLoading } = useCheckBookFavQuery(bookId, {
        skip: !isLogin,
    });

    const [addBookFav, { isLoading: isAdding }] = useAddBookFavMutation();
    const [removeBookFav, { isLoading: isRemoving }] =
        useRemoveBookFavMutation();

    const disableAddFav = isLoading || isAdding || isRemoving;

    const isUpdating = isAdding || isRemoving;

    const toggleBookFav = async () => {
        if (!isLogin) {
            toast.error("请先登录");
            setTimeout(() => {
                navigate(routes.mine(), { method: "switchTab" });
            }, 1500);
        }

        if (disableAddFav) return;

        const mutation = isFav ? removeBookFav : addBookFav;
        const toastText = isFav ? "取消收藏成功" : "收藏成功";

        try {
            await mutation(bookId).unwrap();
            toast.success(toastText);
        } catch (err) {
            // handled by middlware
        }
    };

    return (
        <View
            className={clsx("btn btn-secondary--outline", styles.btnGroupLeft)}
            onClick={toggleBookFav}
        >
            {isFav ? "取消收藏" : "收藏"}
            {isUpdating && "中..."}
        </View>
    );
}

/**
 * Feature: 重置 chapter dones
 * product debt: 这个操作没有展示 loading
 */
function ResetProgressButton({ bookId }: { bookId: string }) {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectIsLogin);

    const { data: chaptersDone } = useGetChapterDoneQuery(bookId, {
        skip: !isLogin,
    });

    const [removeChapterDone] = useDeleteChapterDoneMutation();

    const hasChapterDones = chaptersDone && chaptersDone.length > 0;
    const hasProgress = useAppSelector(selectHasProgress(bookId));
    const showBtn = hasChapterDones || hasProgress;

    const handleConfirm = async () => {
        try {
            dispatch(resetProgress(bookId));
            await removeChapterDone(bookId).unwrap();
            toast.success("重置成功");
        } catch (err) {
            // handled by middleware
        }
    };

    const showDeleteModal = () => {
        Taro.showModal({
            title: "重置进度",
            content: "确定吗？",
            success: (res) => {
                if (res.confirm) {
                    handleConfirm();
                }
            },
        });
    };

    return (
        <>
            {showBtn && (
                <View
                    className="btn btn-primary--outline"
                    onClick={() => showDeleteModal()}
                >
                    重置进度
                </View>
            )}
        </>
    );
}

function StartPracticeButton({ bookId }: { bookId: string }) {
    const progress = useBookProgress(bookId);
    const firstChapterId = useAppSelector(selectFirstChapterId);

    if (progress.isDone) {
        return (
            <View className={styles.finishPracticeHintWrapper}>
                <View className={styles.finishPracticeHint}>
                    已经完成所有练习
                </View>
                <ResetProgressButton bookId={bookId} />
            </View>
        );
    }

    const toPractice = () => {
        const startingChapterId = progress.chapterId ?? firstChapterId;

        const firstQuestionSetIndex = progress.questionSetIndex ?? 0;

        if (startingChapterId) {
            navigate(
                routes.practiceChapter(startingChapterId, firstQuestionSetIndex)
            );
        } else {
            console.error("找不到 startingChapterId");
        }
    };

    const hasProgress = progress.chapterId !== undefined;

    const btnText = hasProgress ? "继续练习" : "开始练习";

    return (
        <View className={styles.startPracticeButton}>
            <View className="btn btn-primary" onClick={toPractice}>
                {btnText}
            </View>
        </View>
    );
}
