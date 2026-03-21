/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-standard-scss"],
    plugins: ["stylelint-plugin-logical-css", "stylelint-scss"],
    rules: {
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": [true, {
            ignoreAtRules: [
                "function", "mixin", "include", "extend", "use", "forward",
                "return", "if", "else", "for", "each", "while", "warn", "debug",
                "error", "layer", "property"
            ],
            severity: "warning"
        }],
        "function-no-unknown": null,
        "scss/function-no-unknown": [true, {
            ignoreFunctions: ["color-mix", "oklch", "oklab", "style", "emoji-to-icon", "md3-color", "md3-color-scheme", "config"],
            severity: "warning"
        }],
        "keyframes-name-pattern": null,
        "selector-type-no-unknown": null,
        "no-descending-specificity": null,
        "selector-class-pattern": null,
        "scss/at-extend-no-missing-placeholder": null,
        "scss/selector-no-redundant-nesting-selector": null,
        "scss/selector-no-union-class-name": null,
        "scss/no-global-function-names": null,
        "scss/dollar-variable-pattern": null,
        "scss/dollar-variable-empty-line-before": null,
        "scss/at-function-pattern": null,
        "scss/at-if-no-null": null,
        "scss/operator-no-unspaced": null,
        "syntax-string-no-invalid": null,
        "font-family-name-quotes": null,
        "property-no-deprecated": null,
        "declaration-property-value-keyword-no-deprecated": null,
        "length-zero-no-unit": null,
        "declaration-block-no-redundant-longhand-properties": null,
        "color-function-alias-notation": null,
        "selector-not-notation": null,
        "property-no-vendor-prefix": null,
        "property-no-unknown": [true, { ignoreProperties: ["user-drag", "-webkit-user-drag"] }],
        "rule-empty-line-before": null,
        "declaration-block-no-shorthand-property-overrides": null,
        "comment-whitespace-inside": null,
        "declaration-block-single-line-max-declarations": null,
        "block-no-redundant-nested-style-rules": null,
        "scss/at-mixin-argumentless-call-parentheses": null,
        "scss/double-slash-comment-empty-line-before": null,
        "scss/double-slash-comment-whitespace-inside": null,
        "scss/dollar-variable-colon-space-before": null,
        "scss/dollar-variable-colon-space-after": null,
        "lightness-notation": null,
        "hue-degree-notation": null,
        "color-hex-length": ["short", { "severity": "warning" }],
        "color-function-notation": ["modern", { "severity": "warning" }],
        "alpha-value-notation": ["percentage", { "severity": "warning" }],
        "declaration-block-no-duplicate-properties": [true, { "severity": "warning" }]
    }
};
