module.exports = {
  root: true,
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'prettier/standard',
    'plugin:prettier/recommended'
  ],
  plugins: ['import', 'standard', 'node', 'promise', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
