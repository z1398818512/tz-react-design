/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production'
  && ENV !== 'test'
  && typeof console !== 'undefined'
  && console.warn
  && typeof window !== 'undefined'
) {
  console.warn(
    'You are using a whole package of antd, '
      + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.'
  );
}
/* @remove-on-es-build-end */

export { default as message } from './message';

export { default as Progress } from './progress';

export { default as Tooltip } from './tooltip';

export { default as Upload } from './upload';

export { default as version } from './version';
