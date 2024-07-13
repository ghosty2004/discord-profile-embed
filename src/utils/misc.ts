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
