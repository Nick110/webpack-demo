/** @format */

module.exports = {
    parser: '@typescript-eslint/parser', // 解析器
    // 继承的规则[扩展]
    extends: [
        // 'plugin:@typescript-eslint/recommended',
        // 'prettier/@typescript-eslint',  // 使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
        // 'airbnb',
        /* 
            同时添加eslint-plugin-prettier和eslint-config-prettier作为开发人员依赖项，然后扩展建议的配置
            eslint-config-prettier是禁用与Prettier冲突的规则的配置。将其添加到中devDependencies，然后从您的.eslintrc配置中扩展它。确保将它放在extends数组的最后，这样它就有机会覆盖其他配置。
        */
        'plugin:prettier/recommended', // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
    ],
    env: {
        browser: true,
        node: true,
    },
    // 定义了该eslint文件所依赖的插件，省略“eslint-plugin-”前缀
    plugins: ['@typescript-eslint', 'prettier'],
    settings: {
        // 自动发现React的版本，从而进行规范react代码
        react: {
            pragma: 'React',
            version: 'detect', // 监听React版本更新
        },
    },
    parserOptions: {
        // 指定ESLint可以解析JSX语法
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    // 规则
    rules: {
        'prettier/prettier': 'error',
    },
};
