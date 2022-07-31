import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import Taro from "@tarojs/taro";

const validateStatus = (statusCode: number) =>
    statusCode >= 200 && statusCode <= 299;

// wx.request 支持的方法
type HttpMethods =
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT";

// 我只考虑这一种参数
interface Header {
    authorization: string; // 只考虑添加 authorization 的情形
}

// wx.request 需要的参数，只添加我会用到的
interface WxRequestArgs {
    url: string;
    data?: any; // 暂定
    header?: Header;
    method?: HttpMethods;
}

// BaseQueryFn 需要的 generic
interface QueryArgs {
    url: string;
    method: HttpMethods;
    data?: unknown;
    header?: Header;
    info?: any; // 任何我想往下传的信息
}

// 直接从 fetchBaseQuery 复制
export type FetchBaseQueryError =
    | {
          /**
           * * `number`:
           *   HTTP status code
           */
          status: number;
          data: unknown;
      }
    | {
          /**
           * * `"FETCH_ERROR"`:
           *   An error that occured during execution of `fetch` or the `fetchFn` callback option
           **/
          status: "FETCH_ERROR";
          data?: undefined;
          error: string;
      }
    | {
          /**
           * * `"PARSING_ERROR"`:
           *   An error happened during parsing.
           *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
           *   or an error occured while executing a custom `responseHandler`.
           **/
          status: "PARSING_ERROR";
          originalStatus: number;
          data: string;
          error: string;
      }
    | {
          /**
           * * `"CUSTOM_ERROR"`:
           *   A custom error type that you can return from your `fetchFn` where another error might not make sense.
           **/
          status: "CUSTOM_ERROR";
          data?: unknown;
          error: string;
      };

// 注意：prepareHeaders 的 type 跟 fetchBaseQuery 不一样
export type WxBaseQueryArgs = {
    baseUrl: string;
    prepareHeaders?: (api: { getState: () => unknown }) => Header | undefined;
};

type QueryMeta = {
    info?: any; // QueryArgs 里的 info
};

export function wxRequestBaseQuery({
    baseUrl,
    prepareHeaders,
}: WxBaseQueryArgs): BaseQueryFn<
    string | QueryArgs,
    unknown,
    FetchBaseQueryError,
    {},
    QueryMeta
> {
    return async (arg, { getState }) => {
        let meta: QueryMeta;

        let {
            url,
            method = "GET" as const,
            data = undefined,
            info = undefined,
        } = typeof arg == "string" ? { url: arg } : arg;

        meta = { info };

        let wxRequestArgs: WxRequestArgs = {
            url: baseUrl + url,
            method,
            data,
        };

        if (prepareHeaders) {
            const header = prepareHeaders({ getState });
            if (header) {
                wxRequestArgs.header = header;
            }
        }

        let response;
        try {
            response = await Taro.request(wxRequestArgs);
        } catch (err) {
            return {
                error: { status: "FETCH_ERROR", error: JSON.stringify(err) },
                meta,
            };
        }

        const resultData = response.data;
        const statusCode = response.statusCode;

        return validateStatus(statusCode)
            ? {
                  data: resultData,
                  meta,
              }
            : {
                  error: {
                      status: statusCode,
                      data: resultData,
                  },
                  meta,
              };
    };
}
