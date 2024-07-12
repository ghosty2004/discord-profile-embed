import { twi } from '../utils/tailwind-to-css';
import { ExpectedStr } from '../types';

export const addDataUriPrefix = <
  Base64Str extends ExpectedStr,
  MimeType extends ExpectedStr,
>(
  base64Str: Base64Str,
  mimeType: MimeType,
): `data:${MimeType};base64,${Base64Str}` =>
  `data:${mimeType};base64,${base64Str}`;

export const convertClassToTailwindInlineStyle = (htmlStr: ExpectedStr) =>
  htmlStr.replace(/class="([^"]+)"/g, (match, classes) => {
    const classNames = classes.trim().split(' ');
    let inlineStyle = '';

    classNames.forEach((className: ExpectedStr) => {
      inlineStyle += twi(className);
    });

    return `style="${inlineStyle}"`;
  });
