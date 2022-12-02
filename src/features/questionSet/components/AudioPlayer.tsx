import IconFont from "@/components/iconfont";
import { View, Text, Slider } from "@tarojs/components";
import {
    getBackgroundAudioManager,
    BackgroundAudioManager,
} from "@tarojs/taro";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IAudio } from "../questionSetTypes";
import styles from "./AudioPlayer.module.scss";

/**
 *
 */
export default function Audio({ audio }: { audio: IAudio }) {
    const [audioManager, setAudioManager] = useState<BackgroundAudioManager>();
    const [canPlay, setCanPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(100);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isRepeat, setIsRepeat] = useState<boolean>(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        console.log("init audioManager");
        setAudioManager(getBackgroundAudioManager());
    }, []);

    useEffect(() => {
        setCanPlay(false);
    }, [audio]);

    useEffect(() => {
        if (audioManager) {
            console.log("set audio manager events");

            audioManager.onError(() => {
                setIsError(true);
            });

            audioManager.onCanplay(() => {
                setCanPlay(true);
                setDuration(audioManager.duration);
                setIsPlaying(true);
            });

            audioManager.onTimeUpdate(() => {
                setCurrentTime(audioManager.currentTime);
                setDuration(audioManager.duration);
            });
        }
    }, [audioManager, audio]);

    useEffect(() => {
        if (audioManager) {
            // 当设置了新的 src 时，会自动开始播放
            audioManager.src = audio.key;
            audioManager.title = audio.title; // 需要设置 title，否则无法播放
        }

        return () => {
            audioManager?.stop();
        };
    }, [audioManager, audio]);

    useEffect(() => {
        audioManager?.onEnded(() => {
            audioManager.src = audio.key;
            audioManager.title = audio.title; // 需要设置 title，否则无法播放
            setCurrentTime(0);

            if (!isRepeat) {
                console.log("not repeat, stop playing");
                // 不实用 timeout 的话没有办法 pause
                setTimeout(() => {
                    audioManager.pause();
                    setIsPlaying(false);
                }, 150);
            }
        });
    }, [audioManager, audio, isRepeat]);

    if (isError) {
        return (
            <View className={clsx("full-width", styles.wrapper)}>
                <Text>听力资源加载错误</Text>
            </View>
        );
    }

    if (!audioManager || !canPlay) {
        return (
            <View
                className={clsx("full-width", styles.wrapper)}
                style={{ marginLeft: "30rpx" }}
            >
                <Text>听力加载中...</Text>
            </View>
        );
    }

    const handlePause = () => {
        audioManager.pause();
        setIsPlaying(false);
    };

    const handlePlay = () => {
        if (!canPlay) return;
        audioManager.play();
        setIsPlaying(true);
    };

    const handleChangeBySec = (sec: number) => {
        setCurrentTime(currentTime + sec);
        audioManager.seek(currentTime + sec);
        audioManager.play();
    };

    const handleChange = (e: any) => {
        const targetTime = e.detail.value;
        setCurrentTime(targetTime);
        audioManager.seek(targetTime);
        audioManager.play();
    };

    const handleChanging = () => {
        audioManager.pause();
    };

    return (
        <View className={clsx("full-width", styles.wrapper)}>
            <>
                <Slider
                    value={currentTime}
                    max={duration}
                    activeColor="#10b981" // $color-green-500
                    blockColor="#d1d5db" // $color-gray-300
                    onChange={handleChange}
                    onChanging={handleChanging}
                />
                <View className={styles.btnWrapper}>
                    {isPlaying ? (
                        <View onClick={handlePause}>
                            <IconFont
                                name="24gf-pause2"
                                size={56}
                                color={"#10b981"}
                            />
                        </View>
                    ) : (
                        <View onClick={handlePlay}>
                            <IconFont
                                name="24gf-play"
                                size={56}
                                color={"#10b981"}
                            />
                        </View>
                    )}
                    <View
                        className={clsx(styles.changeSecBtn)}
                        onClick={() => handleChangeBySec(5)}
                    >
                        <Text>+5</Text>
                    </View>
                    <View
                        className={clsx(styles.changeSecBtn)}
                        onClick={() => handleChangeBySec(-5)}
                    >
                        <Text>-5</Text>
                    </View>
                    <View
                        className={styles.btnRepeatWrapper}
                        onClick={() => setIsRepeat(!isRepeat)}
                    >
                        <IconFont
                            name="repeat"
                            size={52}
                            color={isRepeat ? "#10b981" : "#9ca3af"}
                        />
                    </View>
                </View>
            </>
        </View>
    );
}
