declare interface ValidConfig {
    validFun: (_: any) => boolean;
    tip?: string;
}
declare type ValidStyle = ValidConfig | ValidBase;
declare class ValidBase {
    config: any;
    valid: boolean;
    do(_: any): boolean;
}
declare class ValidGroup extends ValidBase {
    config: {
        [key: string]: ValidStyle;
    };
    valid: boolean;
    constructor(config: {
        [key: string]: ValidStyle;
    });
    do(value: any): boolean;
}
declare class ValidArray extends ValidBase {
    config: ValidBase | {
        [key: string]: ValidStyle;
    } | ValidValue;
    valid: boolean;
    constructor(config: ValidBase | {
        [key: string]: ValidStyle;
    } | ValidValue);
    do(value: Array<any>): boolean;
}
declare class ValidValue extends ValidBase {
    config: ValidConfig;
    valid: boolean;
    constructor(config: ValidConfig);
    do(value: any): boolean;
}
export { ValidArray, ValidGroup, ValidValue, ValidBase };
