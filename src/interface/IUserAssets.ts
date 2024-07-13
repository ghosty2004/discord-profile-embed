import { ExpectedInt, ExpectedNull, ExpectedStr } from '../types';

export interface IUserAssets {
  id: ExpectedStr;
  username: ExpectedStr;
  avatar: ExpectedStr | ExpectedNull;
  discriminator: ExpectedStr;
  public_flags: ExpectedInt;
  banner: ExpectedStr | ExpectedNull;
  accent_color: ExpectedInt;
  global_name: ExpectedStr;
  avatar_decoration_data?: {
    asset: ExpectedStr;
    sku_id: ExpectedStr;
  };
  banner_color: ExpectedStr | ExpectedNull;
  clan: ExpectedNull;
  avatarUri: ExpectedStr | ExpectedNull;
  bannerUri: ExpectedStr | ExpectedNull;
  decorationUri: ExpectedStr | ExpectedNull;
}
