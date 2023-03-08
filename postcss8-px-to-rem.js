const DEFAULTS = {
  base: 16,
  precision: 3,
  minPixelValue: 0,
};

module.exports = function (opts = {}) {
  opts = {...DEFAULTS, ...opts};

  const regex = /(?<valuePx>[0-9]+(?<decimal>[.][0-9]*)?|[.][0-9]+)px/;

  const convert = function (context) {
    let matches;

    // eslint-disable-next-line no-cond-assign
    while (matches = regex.exec(context)) {
      const { 0: fullMatch, groups: { valuePx }, index } = matches;

      const valueEm = (valuePx / opts.base).toFixed(opts.precision);

      if (valuePx < opts.minPixelValue) continue;

      context = context.substring(0, index) + `${valueEm}rem` + context.substring(index + fullMatch.length);
    }

    return context;
  };

  return {
    postcssPlugin: 'postcss-px-to-rem',
    Once(css) {
      let pluginEnabled = true;
      css.walk(function (some) {
        if (!some) return;
        if (some.type === 'comment' && some.text.includes('postcss-px-to-rem-disable')) {
          pluginEnabled = false;
          return some.remove();
        }
        if (some.type === 'comment' && some.text.includes('postcss-px-to-rem-enable')) {
          pluginEnabled = true;
          return some.remove();
        }
        if (some.type === 'decl' && pluginEnabled) {
          some.value = convert(some._value ? some._value.raw : some.value);
        }
      });
    }
  };
};

module.exports.postcss = true;
