import { useAppSelector } from "@/store/hooks";

/**
 * 是否需要显示没有做题机会的 modal
 */
export function useChanceGuard() {
    const isMember = useAppSelector(state => state.user.isMember);

    const quizChance = useAppSelector(state => state.user.quizChance);

    // 会员不考虑这个
    if (isMember) {
        return false;
    }

    return quizChance <= 0;
}
