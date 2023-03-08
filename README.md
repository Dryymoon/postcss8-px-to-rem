# postcss8-px-to-rem

This plugin convert all px values to rem.
Plugin use postcss v8.

## Usage
```bash
npm i -D postcss8-px-to-rem
```
Configure your bundler for use this plugin.

## How it work?
###Before:
```css
/* Before */
.someClass {
  top: 10px;
}

/* postcss-px-to-rem-disable */
.otherClass {
  top: 10px;
}
/* postcss-px-to-rem-enable */
```
###After:
```css
.someClass {
  top: 0.625rem;
}

.otherClass {
  top: 10px;
}

```

## Configuration
### base: 16
Base size value, all pixels values converting to rem by divide to this value

Variable: base

Default value: 16

Example: 10px ===> 10/16 ===> 0.625rem


### precision: 3
Precission of dividing

Variable: precision

Default value: 3


### minPixelValue: 0
Prevent converting less than that value

Variable: minPixelValue

Default value: 0

## Directives
### Partialy disable this plugin in css
To prevent converting some values by this plugin use css comments:
* postcss-px-to-rem-disable
* postcss-px-to-rem-enable

## License

[MIT License](./LICENSE)

Copyright (c) Igor Pylypenko