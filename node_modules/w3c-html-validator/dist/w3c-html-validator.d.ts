//! w3c-html-validator v1.1.3 ~~ https://github.com/center-key/w3c-html-validator ~~ MIT License

export declare type ValidatorOptions = {
    html?: string;
    filename?: string;
    website?: string;
    checkUrl?: string;
    ignoreLevel?: 'info' | 'warning';
    ignoreMessages?: string | RegExp;
    output?: ValidatorResultsOutput;
};
export declare type ValidatorResultsMessage = {
    type: 'info' | 'error' | 'non-document-error' | 'network-error';
    subType?: 'warning' | 'fatal' | 'io' | 'schema' | 'internal';
    message: string;
    extract: string;
    lastLine: number;
    firstColumn: number;
    lastColumn: number;
    hiliteStart: number;
    hiliteLength: number;
};
export declare type ValidatorResultsMessageType = ValidatorResultsMessage['type'];
export declare type ValidatorResultsMessageSubType = ValidatorResultsMessage['subType'];
export declare type ValidatorResults = {
    validates: boolean;
    mode: 'html' | 'filename' | 'website';
    title: string;
    html: string | null;
    filename: string | null;
    website: string | null;
    output: 'json' | 'html';
    status: number;
    messages: ValidatorResultsMessage[] | null;
    display: string | null;
};
export declare type ValidatorResultsOutput = ValidatorResults['output'];
export declare type ReporterOptions = {
    maxMessageLen?: number | null;
    quiet?: boolean;
    title?: string | null;
};
declare const w3cHtmlValidator: {
    version: string;
    validate(options: ValidatorOptions): Promise<ValidatorResults>;
    reporter(results: ValidatorResults, options?: ReporterOptions): ValidatorResults;
};
export { w3cHtmlValidator };
