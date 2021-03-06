module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js']
      }
    }
  },
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  globals: {
    fetch: true,
    __DEV__: true
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    impliedStrict: false,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  plugins: [
    'babel',
    'jsx-a11y',
    'graphql',
    'sort-class-members',
    'flow-vars',
    'react',
    'react-native'
  ],
  rules: {
    'graphql/template-strings': ['error', {
      env: 'relay',
      schemaJson: require('./data/schema.json')
    }],
    'flow-vars/define-flow-type': 1,
    'flow-vars/use-flow-type': 1,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'jsx-quotes': ['error', 'prefer-double'],
    'jsx-a11y/href-no-hash': 2,
    'jsx-a11y/label-has-for': 2,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/aria-props': 2,
    'react/display-name': 1,
    'react/jsx-boolean-value': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-sort-prop-types': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-filename-extension': 0, // NOTE react-native packager doesn't support .jsx extensions
    'babel/flow-object-type': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-multi-comp': 1,
    'react/no-unknown-property': 1,
    'react/prop-types': 1,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 1,
    'sort-class-members/sort-class-members': [2, {
      'order': [
        '[static-properties]',
        '[static-methods]',
        '[properties]',
        '[conventional-private-properties]',
        'constructor',
        '[lifecycle]',
        '[everything-else]',
        '/^render.+$/',
        'render',
      ],
      'groups': {
        'lifecycle': [
          'displayName',
          'propTypes',
          'contextTypes',
          'childContextTypes',
          'mixins',
          'statics',
          'defaultProps',
          'constructor',
          'getDefaultProps',
          'state',
          'getInitialState',
          'getChildContext',
          'componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'componentDidUpdate',
          'componentWillUnmount'
        ]
      }
    }],
    'react/sort-comp': 0,
    'react/wrap-multilines': 1,
    'babel/generator-star-spacing': 0,
    'babel/new-cap': 0,
    'babel/object-curly-spacing': 0,
    'babel/object-shorthand': 1,
    'babel/arrow-parens': 0,
    'babel/no-await-in-loop': 1,
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'comma-dangle': [
      'warn',
      'always-multiline'
    ],
    'no-unused-vars': 1,
    'no-use-before-define': 0,
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
