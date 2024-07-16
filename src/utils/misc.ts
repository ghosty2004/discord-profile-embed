import { format, intervalToDuration } from 'date-fns';
import { ExpectedStr } from '../types';

export const addDataUriPrefix = <
  Base64Str extends ExpectedStr,
  MimeType extends ExpectedStr,
>(
  base64Str: Base64Str,
  mimeType: MimeType,
): `data:${MimeType};base64,${Base64Str}` =>
  `data:${mimeType};base64,${base64Str}`;

export const formatElapsedTime = (startTime: Date) => {
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - startTime.getTime();

  const duration = intervalToDuration({ start: startTime, end: now });

  const formatString = (duration?.hours || 0) > 0 ? 'H:mm:ss' : 'mm:ss';

  return format(new Date(elapsedMilliseconds), formatString);
};
