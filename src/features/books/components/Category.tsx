import { View, Text } from "@tarojs/components";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import stringifyRtkQuerryError from "../../../store/storeUtils/stringifyRtkQuerryError";
import { selectChildrenByLevel, setCategoryKey } from "../booksSlice";
import { useGetCategoriyesQuery } from "../booksService";
import type { Category } from "../booksTypes";

export default function CategoryNav() {
    const { isLoading, error } = useGetCategoriyesQuery();

    const topCategories = useAppSelector((state) => state.bookList.categories);

    return (
        <View className="my-4">
            {isLoading ? (
                <View className="skeleton mb-4 h-6  w-60"></View>
            ) : (
                <CategoryList categories={topCategories} categoryLevel={0} />
            )}

            {error && (
                <Text className="text-red-500">
                    {`获取内容分类出错：${stringifyRtkQuerryError(error)}`}
                </Text>
            )}
        </View>
    );
}

interface CategoryListProps {
    categories: Category[];
    categoryLevel: number;
    selectedCategoryKeys?: string[];
}

function CategoryList({ categories, categoryLevel }: CategoryListProps) {
    const dispatch = useAppDispatch();
    const children = useAppSelector(selectChildrenByLevel(categoryLevel));

    const selectedCategoryKey = useAppSelector(
        (state) => state.bookList.selectedCategoryKeys?.[categoryLevel]
    );

    const handleClickCategory = (key: string) => {
        dispatch(setCategoryKey({ categoryLevel, key }));
    };

    return (
        <>
            <View className="m-2">
                {categories.map((category) => (
                    <Text
                        className={clsx(
                            selectedCategoryKey === category.key &&
                                "bg-red-200",
                            "m-2 p-2 hover:cursor-pointer hover:bg-red-200"
                        )}
                        key={category.key}
                        onClick={() => handleClickCategory(category.key)}
                    >
                        {category.displayValue}
                    </Text>
                ))}
            </View>

            <View className="m-2">
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
