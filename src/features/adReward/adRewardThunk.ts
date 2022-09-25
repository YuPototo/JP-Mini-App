import { AppThunk } from "@/store/store";
import { rewardAdWatched } from "../user/userSlice";
import { adRewardApi } from "./adRewardService";

export const grantAdRewards = (): AppThunk => dispatch => {
    dispatch(rewardAdWatched());
    dispatch(adRewardApi.endpoints.createAdReward.initiate());
};
