import { Button, View, Text } from "@tarojs/components";
import {
    getBackgroundAudioManager,
    BackgroundAudioManager
} from "@tarojs/taro";
import { useEffect, useState } from "react";
import { IAudio } from "../questionSetTypes";

/**
 *
 */
export default function Audio({ audio }: { audio: IAudio }) {
    const [audioManager, setAudioManager] = useState<BackgroundAudioManager>();
    const [canPlay, setCanPlay] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        console.log("init audioManager");
        setAudioManager(getBackgroundAudioManager());
    }, []);

    useEffect(() => {
        if (audioManager) {
            console.log("set audio manager events");

            audioManager.onError(() => {
                setIsError(true);
            });

            audioManager.onCanplay(() => {
                setCanPlay(true);
            });
        }
    }, [audioManager]);

    useEffect(() => {
        if (audioManager) {
            // 当设置了新的 src 时，会自动开始播放
            audioManager.src = audio.key;
            audioManager.title = audio.title; // 需要设置 title，否则无法播放
        }
        return () => {
            audioManager?.stop();
        };
    }, [audioManager, audio.key]);

    if (isError) {
        return (
            <View>
                <Text>听力资源加载错误</Text>
            </View>
        );
    }

    if (!audioManager || !canPlay) {
        return (
            <View>
                <Text>听力组件启动中...</Text>
                <Text>Todo: 这里要做一个 skeleton </Text>
            </View>
        );
    }

    return (
        <View>
            <Button
                onClick={() => {
                    audioManager.play();
                }}
            >
                Play
            </Button>
            <Button
                onClick={() => {
                    audioManager.pause();
                }}
            >
                Pause
            </Button>
        </View>
    );
}
