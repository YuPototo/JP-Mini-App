import { View, Text } from "@tarojs/components";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectChildrenByLevel, categoryPicked } from "../booksSlice";
import { useGetCategoriyesQuery } from "../booksService";
import type { ICategory } from "../booksTypes";
import { extractQueyError } from "@/store/utils/errorHandling";
import styles from "./CategoryNav.module.scss";

export default function CategoryNav() {
    const { isLoading, error } = useGetCategoriyesQuery();

    const topCategories = useAppSelector((state) => state.books.categories);

    return (
        <View className={clsx(styles.categoryNav, "full-width")}>
            {isLoading ? (
                <CategoryLoader />
            ) : (
                <CategoryList categories={topCategories} categoryLevel={0} />
            )}

            {error && (
                <Text>{`获取内容分类出错：${extractQueyError(error)}`}</Text>
            )}
        </View>
    );
}

interface CategoryListProps {
    categories: ICategory[];
    categoryLevel: number;
    selectedCategoryKeys?: string[];
}

function CategoryList({ categories, categoryLevel }: CategoryListProps) {
    const dispatch = useAppDispatch();
    const children = useAppSelector(selectChildrenByLevel(categoryLevel));

    const selectedCategoryKey = useAppSelector(
        (state) => state.books.selectedCategoryKeys?.[categoryLevel]
    );

    const handleClickCategory = (key: string) => {
        dispatch(categoryPicked({ categoryLevel, key }));
    };

    return (
        <>
            <View className={styles.itemList}>
                {categories.map((category) => (
                    <View
                        className={clsx(
                            selectedCategoryKey === category.key &&
                                styles.categoryItemSelected,
                            styles.categoryItem
                        )}
                        key={category.key}
                        onClick={() => handleClickCategory(category.key)}
                    >
                        {category.displayValue}
                    </View>
                ))}
            </View>

            <View>
                {children && (
                    <CategoryList
                        categories={children}
                        categoryLevel={categoryLevel + 1}
                    />
                )}
            </View>
        </>
    );
}

function CategoryLoader() {
    return (
        <View className={styles.itemList}>
            <View
                style={{ width: "25%" }}
                className="skeleton skeleton-text"
            ></View>
            <View
                style={{ width: "25%" }}
                className="skeleton skeleton-text"
            ></View>
        </View>
    );
}
