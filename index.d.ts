export type OptionsLogger = {
    regexExclude?: RegExp | false;
    loopStart?: string;
    logMethod?: string;
};

export declare function proxyLogger(obj: any, options?: OptionsLogger|{}): any;
