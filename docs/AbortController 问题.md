# AbortController 问题

微信小程序中无法直接使用 AbortController 对象。

Redux Toolkit 的 `listnerMiddleware` 需要使用 AbortController。当我在小程序里使用 listenerMiddleware 时，会报错：

> Unhandled promise rejection ReferenceError: AbortController is not defined

`createAsynThunk` 里也适用了 AbortController，它提供了 polyfill。所以我可以正常使用 `createAsynThunk`。但是，redux 即将移除对 AbortController 的 polyfill。

如果我想继续在小程序里使用 redux，必须解决 AbortController 的问题。

## 使用 polyfill package

可以使用[abortcontroller-polyfill](https://www.npmjs.com/package/abortcontroller-polyfill)。

我只需要 `abortController` 的 polyfill，在 root 文件引入：

```ts
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
```

引入这个代码后， listnerMiddleware 可以成功运行了。但程序会报错：

> Unhandled promise rejection TypeError: event.initEvent is not a function

这是因为 `abortcontroller-polyfill` 一行针对 IE 11 的代码被执行了。

我需要避免这个错误的出现。

有两个思路：

1. catch 这个错误。我不知道应该在什么地方 catch 这个错误，所以这个思路先忽略。
2. 直接修改源码

第2个思路最快，所以执行第2个思路。
