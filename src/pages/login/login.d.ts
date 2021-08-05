declare type Form = {
    username: string;
    password: string | number;
    code: string | number;
    key: string;
}

declare type RulesType = {
    message: string;
    trigger: string;
    required?: boolean;
    min?: number;
    max?: number;
}

declare type Rules = {
    username: Array<RulesType>;
    password: Array<RulesType>;
    code: Array<RulesType>
}

export declare interface DataType{
    ruleForm: any
    codeUrl: string,
    // 表单数据
    form:Form;
    // 验证规则
    rules: Rules;
}
