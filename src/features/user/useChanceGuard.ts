import { useAppSelector } from "@/store/hooks";

/**
 * 是否需要显示没有做题机会的 modal
 */
export function useChanceGuard() {
    const isMember = useAppSelector((state) => state.user.isMember);
    const quizChance = useAppSelector((state) => state.user.quizChance);
    const isAuditMode = useAppSelector((state) => state.parameter.isAuditMode);

    if (isMember || isAuditMode) return false;

    return quizChance <= 0;
}
