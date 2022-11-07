/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import Taro from '@tarojs/taro';

export type IconNames = 'bg-ie-browser' | 'icon_love_hover' | 'circle' | 'wenhao' | 'rili' | 'zhanghao' | 'icon_xinyong_xianxing_jijin-' | 'huiyuan' | 'cuowu' | 'zuijinchangyong' | 'wodeshujia' | 'xuanze' | 'shiting' | 'yuedu' | 'repeat' | '24gf-pause2' | '24gf-play' | 'arrow-right-bold' | 'map-marker' | 'check' | 'plus-circle-fill' | 'share' | 'star' | 'star-fill' | 'arrow-up-bold' | 'arrow-down-bold' | 'guanbi';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<Props> = (props) => {
  const { name, size, color, style } = props;

  // @ts-ignore
  return <iconfont name={name} size={parseFloat(Taro.pxTransform(size))} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
