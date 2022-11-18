import Taro from "@tarojs/taro";

export const autoUpdate = () => {
    const updateManager = Taro.getUpdateManager();

    updateManager.onUpdateReady(function () {
        Taro.showModal({
            title: "更新提示",
            content: "新版本已经准备好，请重启应用😊",
            success: function (res) {
                if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                }
            },
        });
    });
};

export const checkUpdate = () => {
    const updateManager = Taro.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
            updateManager.onUpdateReady(function () {
                Taro.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，请重启应用😊",
                    success: function (res) {
                        if (res.confirm) {
                            updateManager.applyUpdate();
                        }
                    },
                });
            });

            updateManager.onUpdateFailed(function () {
                Taro.showModal({
                    title: "更新失败",
                    content: "请稍后再试",
                });
            });
        }

        if (!res.hasUpdate) {
            Taro.showToast({
                title: "暂无更新",
                icon: "none",
            });
        }
    });
};
