module.exports = {
    parser: "@typescript-eslint/parser",  // 解析器
    // 继承的规则[扩展]
    extends: [
        // 'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',  // 使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
        'plugin:prettier/recommended'  // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
    ],  // 使用推荐的React代码检测规范
    env: {
        browser: true,
        node: true,
    },
    plugins: ["@typescript-eslint"],
    settings: {
        // 自动发现React的版本，从而进行规范react代码
        react: {
            pragma: "React",
            version: "detect",  // 监听React版本更新
        },
    },
    parserOptions: {
        // 指定ESLint可以解析JSX语法
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    // 规则
    rules: {},
};
