module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-essential'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
      "vue/valid-v-model": "off",
      "@typescript-eslint/no-explicit-any" : 'off',
      'no-undef':'off',
      'vue/singleline-html-element-content-newline':'off', // html 内容换行 vue 模板
      'vue/max-attributes-per-line':
        [
          'error',
          {
            singleline:
            {
              max: 3
            },
            multiline:
            {
              max: 1
            }
          }
        ],
      'comma-spacing': [2,
        {
          // 强制在逗号前后使用一致的间距  例  a , b   or a, b
          before: false,
          after: true
        }
      ],
      'key-spacing': [2,
        {
          // 在对象文本属性中的键和值之间强制实施一致的间
          beforeColon: false,
          afterColon: true
        }
      ],
      "[vue/valid-v-model]" : 'off',
      "@typescript-eslint/no-non-null-asserted-optional-chain" : 'off',
      'vue/multi-word-component-names': 'off',
      'accessor-pairs': 2, // 在对象和类中强制实施 getter 和 setter 对.
      'block-spacing': 1, // 块间距   return  { a : 'a' }  --> always   , default : return {a:'a'}
      'arrow-spacing': ['error',
        {
          // 强制 调整 箭头函数 的间距  () => {}  --> true    ()=>{} --> false
          before: false,
          after: true
        }
      ],
      'keyword-spacing': [2, {  // 关键字的 前后空格  例如 if else  import
        'before': true,
        'after': true
      }],
      "no-var": "error",
      'curly': [2, 'multi-line'],
      'eqeqeq': ["error", "always", { "null": "ignore" }],  //要求使用 === 和 !==   不允许出现  a == b  or  a != b
      'space-unary-ops': [2, { // 在一元运算符之前或之后强制使用一致的间距 typeof !foo 而不是 typeof!foo;
        'words': true,
        'nonwords': false
      }],
      'semi-spacing': [2, { // 强制分号前后的间距一致
        'before': false,
        'after': true
      }],
      "indent": "off",
      "indent-legacy": ["error", "tab"],
      "no-empty" : 0

    }
}
