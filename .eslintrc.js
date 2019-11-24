module.exports = {
	root: false,
	"env": {
		"browser": true,
		"node": true,
		"es6": true
  },
	"extends": [
		"eslint:recommended",
		"plugin:vue/essential"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
    "sourceType": "module",
    parser: 'babel-eslint'
	},
	"plugins": [
    "vue",
    'eslint-plugin'
	],
	"rules": {
		/**
     * 【================================================ Possible Errors ================================================】
     * 这些规则与JavaScript代码中可能的错误或逻辑错误有关。
     */
    // 强制"for"循环中更新子句的计算器朝着正确的方向移动
    'for-direction': 2,
    // 禁止function定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止对象字面量中出现重复的key
    'no-dupe-keys': 2,
    // 禁止出现重复的case标签
    'no-duplicate-case': 2,
    // 禁止对catch子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止对关系运算符的左操作数使用否定操作符
    'no-unsafe-negation': 2,
    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 2,
    // 禁止在return、throw、continue、break语句之后出现不可达代码
    'no-unreachable': 2,
    // 禁止在finally语句块中出现控制流语句
    'no-unsafe-finally': 2,
    // 要求使用isNaN()检查NaN
    'use-isnan': 2,
    // 强制typeof表达式与有效的字符串进行比较
    'valid-typeof': 2,
    // 还可以写表达式，厉害了~
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error': 'off',
 
    /**
     * 【================================================ Best Practices ================================================】
     * 这些规则是关于最佳实践的，帮助你避免一些问题。
     */
    // 强制 getter 和 setter在对象中成对出现
    'accessor-pairs': 2,
    // 强制所有控制语句使用一致的括号风格
    'curly': [2, 'multi-line'],
    // 强制在点号之前和之后一致的换行
    'dot-location': [2, 'property'],
    // 要求使用 ===和 !==
    'eqeqeq': [2, 'allow-null'],
    // 禁用arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 禁止使用空解构模式
    'no-empty-pattern': 2,
    // 禁止eval()
    'no-eval': 2,
    // 禁止使用类似eval()的方法
    'no-implied-eval': 2,
    // 禁止扩展原生类型
    'no-extend-native': 2,
    // 禁止不必要的.bind()调用
    'no-extra-bind': 2,
    // 禁止case语句落空
    'no-fallthrough': 2,
    // 禁止数字字面量中使用前导和末尾小数点
    'no-floating-decimal': 2,
    // 禁用__iterator__属性
    'no-iterator': 2,
    // 禁用标签语句
    'no-labels': [2, {
      'allowLoop'  : false,
      'allowSwitch': false
    }],
    // 禁用不必要嵌套块
    'no-lone-blocks': 2,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止使用多行字符串
    'no-multi-str': 2,
    // 禁止对String，Number 和 Boolean 使用new操作符
    'no-new-wrappers': 2,
    // 禁用八进制字面量
    'no-octal': 2,
    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': 2,
    // 禁止使用__proto__属性
    'no-proto': 2,
    // 禁止多次声明同一变量
    'no-redeclare': 2,
    // 禁止在return语句中使用赋值语句
    'no-return-assign': [2, 'except-parens'],
    // 禁止自我赋值
    'no-self-assign': 2,
    // 禁止自我比较
    'no-self-compare': 2,
    // 禁用逗号操作符
    'no-sequences': 2,
    // 禁止抛出异常字面量
    'no-throw-literal': 2,
    // 禁止一成不变的循环条件
    'no-unmodified-loop-condition': 2,
    // 禁止不必要的.call()和.apply()
    'no-useless-call': 2,
    // 禁止不必要的转义字符
    'no-useless-escape': 2,
    // 禁用with语句
    'no-with': 2,
    // 要求IIFE使用括号括起来
    'wrap-iife': 2,
    // 要求或禁止Yoda条件。 if("red" === color) { //字面量在前，变量在后 }
    'yoda': [2, 'never'],   //  比较绝不能是Yoda条件（需要变量在前，字面量在后）
 
    /**
     * 【================================================ ECMAScript 6 ================================================】
     * 这些规则只与ES6有关，即通常所说的ES2015。
     */
    // 强制箭头函数前后使用一致的空格
    'arrow-spacing': [2, {
      'before': true,
      'after' : true
    }],
    // 要求在构造函数中有super()调用
    'constructor-super': 2,
    // 强制generator函数中*号周围使用一致的空格
    'generator-star-spacing': [2, {
      'before': true,
      'after' : true
    }],
    // 禁止修改类声明的变量
    'no-class-assign': 2,
    // 禁止修改const声明的变量
    'no-const-assign': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止 Symbolnew 操作符和 new 一起使用
    'no-new-symbol': 2,
    // 禁止在构造函数中，在调用super()之前使用 this 或 super
    'no-this-before-super': 2,
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 2,
    // 禁止不必要的构造函数
    'no-useless-constructor': 2,
    // 禁止模板字符串中嵌入表达式周围空格的使用
    'template-curly-spacing': [2, 'never'],
    // 强制yield*表达式中的*周围使用空格
    'yield-star-spacing': [2, 'both'],
    // 要求使用const声明那些声明后不再被修改的变量
    'prefer-const': 2,
 
    /**
     * 【================================================ Stylistic Issues ================================================】
     * 这些规则是关于代码风格的。
     */
    //  获取当前执行环境的上下文时，强制使用一致的命名（此处强制使用 'that'）。
    'consistent-this': [2, 'that'],
    // 禁止或强制在代码块中开括号前和闭括号后有空格  { return 11 }
    'block-spacing': [2, 'always'],
    // 强制在代码块中使用一致的大括号风格
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    // 强制使用驼峰拼写法命名规定
    'camelcase': [0, {
      'properties': 'always'
    }],
    // 要求或禁止末尾逗号
    'comma-dangle': [2, 'never'],
    // 强制在逗号前后使用一致的空格
    'comma-spacing': [2, {
      'before': false,
      'after' : true
    }],
    // 强制在逗号前后使用一致的空格
    'comma-style': [2, 'last'],
    // 要求或禁止文件末尾存在空行
    'eol-last': 2,
    // 强制使用一致的缩进
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    // 强制在JSX属性中一致地使用双引号或单引号
    'jsx-quotes': [2, 'prefer-single'],
    // 要求构造函数首字母大写
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    // 要求构造无参构造函数时有圆括号
    'new-parens': 2,
    // 禁用Array构造函数
    'no-array-constructor': 2,
    // 禁止空格和tab的混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止出现多行空行
    'no-multiple-empty-lines': [2, {
      // 最大连续空行数
      max: 2
    }],
    // 禁止在函数标识符和其调用之间有空格
    'func-call-spacing': 2,
    // 禁止行尾空格
    'no-trailing-spaces': 2,
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': [2, {
      // 允许表达式作为默认的赋值模式
      'defaultAssignment': true
    }],
    // 禁止属性前有空白
    'no-whitespace-before-property': 2,
    // 强制函数中的变量要么一起声明要么分开声明
    'one-var': [2, {
      'initialized': 'never'
    }],
    // 强制操作符使用一致的换行符
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    // 要求或禁止块内填充
    'padded-blocks': [2, 'never'],
    // 强烈使用一致的反勾号``、双引号""或单引号''
    'quotes': [2, 'single', {
      // 允许字符串使用单引号或者双引号，只要字符串中包含了一个其他引号，否则需要转义
      'avoidEscape': true,
      // 允许字符串使用反勾号
      'allowTemplateLiterals': true
    }],
    // 禁止使用分号代替ASI(自动分号插入)
    'semi': [2, 'never'],
    // 强制分号之前和之后使用一致的空格
    'semi-spacing': [2, {
      'before': false,
      'after' : true
    }],
    // 强制在块之前使用一致的空格
    'space-before-blocks': [2, 'always'],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': [2, 'never'],
    // 要求操作符周围有空格
    'space-infix-ops': 2,
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': [2, {
      'words'   : true,
      'nonwords': false
    }],
    // 强制在注释// 或/*使用一致的空格
    'spaced-comment': [1, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    // 强制在大括号中使用一致的空格
    'object-curly-spacing': [2, 'always', {
      'objectsInObjects': false
    }],
    // 禁止或强制在括号内使用空格
    'array-bracket-spacing': [2, 'never'],
    // 强制要求在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon' : true
    }],
   
    /**
     * 【================================================ Node.js and CommonJS ================================================】
     * 这些规则是关于Node.js 或 在浏览器中使用CommonJS的。
     */
    // 要求回调函数中有容错处理
    'handle-callback-err': [2, '^(err|error)$'],
    // 禁止调用 require 时使用new操作符
    'no-new-require': 2,
    // 禁止对__dirname和__filename进行字符串连接
    'no-path-concat': 1,
    // 强制在function的左括号之前使用一致的空格
    'space-before-function-paren': [2, 'never'], 
    
    /**
     * 【================================================ Possible Errors ================================================】
     * 这些规则与JavaScript代码中可能的错误或逻辑错误有关。
     */
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 禁止在正则表达式中使用控制字符
    'no-control-regex': 0,
    // 禁止在正则表达式中使用空字符集
    'no-empty-character-class': 2,
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 禁止不必要的括号
    'no-extra-parens': [2, 'functions'],
    // 禁止对function声明重新赋值
    'no-func-assign': 2,
    // 禁止在嵌套块中出现变量声明或function声明
    'no-inner-declarations': [2, 'functions'],
    // 禁止RegExp构造函数中存在无效的正则表达式字符串
    'no-invalid-regexp': 2,
    // 禁止在字符串和注释之外不规则的空白
    'no-irregular-whitespace': 2,
    // 禁止把全局对象作为函数调用
    'no-obj-calls': 2,
    // 禁止正则表达式字面量中出现多个空格
    'no-regex-spaces': 2,
    // 禁用稀疏数组
    'no-sparse-arrays': 2,
 
    /**
     * 【================================================ Variables ================================================】
     * 这些规则与变量声明有关。
     */
    // 禁止删除变量
    'no-delete-var': 2,
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁止将标识符定义为受限的名字
    'no-shadow-restricted-names': 2,
    // 禁止未声明的变量，除非它们在/*global */注释中被提到
    'no-undef': 2,
    // 禁止将变量初始化为undefined
    'no-undef-init': 2,
    // 禁止出现未使用的变量
    'no-unused-vars': [2, {
      'var' : 'all',
      'args': 'none'
    }],
 
    /**
     * 【================================================ 配置定义在插件中的规则 ================================================】
     * 格式： 插件名/规则ID
     */
    // 
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
	}
};