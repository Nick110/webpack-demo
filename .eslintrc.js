module.exports = {
    parser: '@typescript-eslint/parser', // 解析器
    // 继承的规则[扩展]
    extends: [
        'plugin:@typescript-eslint/recommended',
        // 'prettier/@typescript-eslint',  // 使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
        'airbnb',
        /* 
            同时添加eslint-plugin-prettier和eslint-config-prettier作为开发人员依赖项，然后扩展建议的配置
            eslint-config-prettier是禁用与Prettier冲突的规则的配置。将其添加到中devDependencies，然后从您的.eslintrc配置中扩展它。确保将它放在extends数组的最后，这样它就有机会覆盖其他配置。
        */
        // 'plugin:prettier/recommended', // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
    ],
    env: {
        browser: true,
        node: true,
    },
    // 定义了该eslint文件所依赖的插件，省略“eslint-plugin-”前缀
    plugins: ['@typescript-eslint'],
    settings: {
        // 自动发现React的版本，从而进行规范react代码
        react: {
            pragma: 'React',
            version: 'detect', // 监听React版本更新
        },
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.tsx', '.ts', '.jsx', '.js'],
            }
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
        // 没有依赖
        'import/no-extraneous-dependencies': 'off',
        'max-len': 'off',
        'linebreak-style': [0, 'error', 'windows'],
        'import/extensions': 0,
        'import/order': 0,
        'no-console': 0,
        'no-unused-vars': 0,
        'react/button-has-type': 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "react/jsx-filename-extension": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "no-unused-expressions": 0,
        "no-restricted-globals": 0,
        "react/jsx-props-no-spreading": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/class-name-casing": 0,
        "jsx-a11y/alt-text": 0,
        "consistent-return": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "react/destructuring-assignment": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "react/prop-types": 0,
        "react/no-unused-state": 0
    },
};
