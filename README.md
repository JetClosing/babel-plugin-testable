# babel-plugin-testable

Babel plugin that exports private members for testing purposes

![npm downloads total](https://img.shields.io/npm/dt/babel-plugin-testable.svg) ![npm version](https://img.shields.io/npm/v/babel-plugin-testable.svg) ![npm license](https://img.shields.io/npm/l/babel-plugin-testable.svg)

## Installation

```sh
npm install babel-plugin-testable --save-dev
```
or
```sh
yarn add babel-plugin-testable --dev
```

### Enable Plugin

Add `babel-plugin-testable` to your `.babelrc`

```json
{
  "plugins": ["testable"]
}
```
or 
```json
{
  "env": {
    "test": {
      "plugins": [ "testable" ]
    }
  }
}
```

## Usage

```javascript
// @testable
const MY_PRIVATE_CONSTANT = 'Some constant';

// @testable
let someTestableField = true;

// @testable - This is a testable class with additional comments
class TestableClass {
  // Class code
}
```

## Options

The plugin provides the following options to tweak the behavior of the plugin during code generation.

| Option | Values | Default | Description  |
| :--- | :--- | :--- | :--- |
| `testComment` | String | `testable` | The comment name to key off for exporting testable code |
| `testCommentRegex` | Regular Expression | `^\s*@##comment##\b` | The comment regular expression to search for testable code. `##comment##` is the placeholder used for the value of `testComment`. |

#### Options Example

A `.babelrc` configuration example which looks for `__TestExport__` anywhere in a comment.

```json
{
  "plugins": [
    [ 
      "testable", 
      {
        "testComment": "TestExport",
        "testCommentRegex": ".*__##comment##__.*"
      }
    ]
  ]
}
```

## Example Output Code

```javascript
// @testable
export const MY_PRIVATE_CONSTANT = 'Some constant';

// @testable
export let someTestableField = true;

// @testable - This is a testable class with additional comments
export class TestableClass {
  // Class code
}
```
