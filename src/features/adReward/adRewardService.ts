import { splitApi } from "../../store/query/splitApi";

export const adRewardApi = splitApi.injectEndpoints({
    endpoints: build => ({
        createAdReward: build.mutation<void, void>({
            query: () => ({
                url: "/adRewards",
                method: "POST"
            })
        })
    })
});

export const { useCreateAdRewardMutation } = adRewardApi;
