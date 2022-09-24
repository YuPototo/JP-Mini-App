import { View, Button } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectBookById, bookViewed } from "@/features/books/booksSlice";
import BookCard from "@/features/books/components/BookCard";
import Content from "@/features/books/components/Content";
import { useEffect } from "react";
import { selectIsLogin } from "@/features/user/userSlice";
import {
    useAddBookFavMutation,
    useCheckBookFavQuery,
    useRemoveBookFavMutation
} from "@/features/bookFav/bookFavService";
import Taro from "@tarojs/taro";
import { useGetBooksQuery } from "@/features/books/booksService";
import routes from "@/routes/routes";
import {
    useDeleteChapterDoneMutation,
    useGetChapterDoneQuery
} from "@/features/chapterDone/chapterDoneService";
import { navigate } from "@/utils/navigator/navigator";
import toast from "@/utils/toast/toast";
import { useBookProgress } from "@/features/progress/hooks/useWorkingBook";

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
        <View>
            <BookCardWrapper bookId={bookId} />
            <WorkingProgress bookId={bookId} />
            <FavButton bookId={bookId} />
            <ResetChapterDoneBtn bookId={bookId} />
            <Content bookId={bookId} />
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
        skip: !isLogin
    });

    const [addBookFav, { isLoading: isAdding }] = useAddBookFavMutation();
    const [
        removeBookFav,
        { isLoading: isRemoving }
    ] = useRemoveBookFavMutation();

    const disableAddFav = isLoading || isAdding || isRemoving;

    const isUpdating = isAdding || isRemoving;

    const toggleBookFav = async () => {
        if (!isLogin) {
            toast.error("请先登录");
            setTimeout(() => {
                navigate(routes.mine(), { method: "switchTab" });
            }, 1500);
        }

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
        <View>
            <Button onClick={toggleBookFav} disabled={disableAddFav}>
                {isFav ? "取消收藏" : "收藏"}
                {isUpdating && "中..."}
            </Button>
        </View>
    );
}

/**
 * Feature: 重置 chapter dones
 * product debt: 这个操作没有展示 loading
 */
function ResetChapterDoneBtn({ bookId }: { bookId: string }) {
    const isLogin = useAppSelector(selectIsLogin);

    const { data: chaptersDone } = useGetChapterDoneQuery(bookId, {
        skip: !isLogin
    });

    const [removeChapterDone] = useDeleteChapterDoneMutation();

    const hasChapterDones = chaptersDone && chaptersDone.length > 0;

    const handleConfirm = async () => {
        try {
            await removeChapterDone(bookId).unwrap();
            toast.success("重置成功");
        } catch (err) {
            // handled by middleware
        }
    };

    const showDeleteModal = () => {
        Taro.showModal({
            title: "重置章节进度",
            content: "确定吗？",
            success: res => {
                if (res.confirm) {
                    handleConfirm();
                }
            }
        });
    };

    return (
        <>
            {hasChapterDones && (
                <Button onClick={() => showDeleteModal()}>重置进度</Button>
            )}
        </>
    );
}

/**
 * Feature: 做题进度
 */
function WorkingProgress({ bookId }: { bookId: string }) {
    const {
        isDone,
        questionSetIndex,
        chapterTitle,
        sectionTitle
    } = useBookProgress(bookId);

    if (isDone) return <View>做完了！</View>;

    return (
        <View className="m-2 bg-red-100 p-2">
            <View>{sectionTitle}</View>
            <View>{chapterTitle}</View>
            {questionSetIndex !== undefined && (
                <View>第{questionSetIndex + 1}题</View>
            )}
        </View>
    );
}
