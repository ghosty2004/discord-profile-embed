import {
  ExpectedAny,
  ExpectedArray,
  ExpectedBoolean,
  ExpectedInt,
  ExpectedNull,
  ExpectedStr,
} from '../types';

export interface IUserProfile {
  user: {
    id: ExpectedStr;
    username: ExpectedStr;
    global_name: ExpectedStr;
    avatar: ExpectedStr;
    avatar_decoration_data: {
      asset: ExpectedStr;
      sky_id: ExpectedStr;
    };
    discriminator: ExpectedStr;
    public_flags: ExpectedInt;
    clan: ExpectedNull;
    flags: ExpectedInt;
    banner: ExpectedStr | ExpectedNull;
    banner_color: ExpectedStr | ExpectedNull;
    accent_color: ExpectedInt | ExpectedNull;
    bio: ExpectedStr;
  };
  connected_accounts: ExpectedArray<{
    type: ExpectedStr;
    id: ExpectedStr;
    name: ExpectedStr;
    verified: ExpectedBoolean;
    metadata?: ExpectedArray<ExpectedAny>;
  }>;
  premium_since: ExpectedStr | ExpectedNull;
  premium_type: ExpectedInt | ExpectedNull;
  premium_guild_since: ExpectedStr | ExpectedNull;
  profile_themes_experiment_bucket: ExpectedInt;
  user_profile: {
    bio: ExpectedStr;
    accent_color: ExpectedInt | ExpectedNull;
    pronouns: ExpectedStr;
    profile_effect?: {
      id: ExpectedStr;
    };
    banner?: ExpectedStr;
    theme_colors: [ExpectedInt, ExpectedInt];
    popout_animation_particle_type?: ExpectedAny;
    emoji?: ExpectedAny;
  };
  badges: ExpectedArray<{
    id: ExpectedStr;
    description: ExpectedStr;
    icon: ExpectedStr;
    link?: ExpectedStr;
  }>;
  guild_badges: ExpectedArray<ExpectedAny>;
  mutual_guilds: ExpectedArray<{
    id: ExpectedStr;
    nick: ExpectedStr | ExpectedNull;
  }>;
  legacy_username: ExpectedStr;
}
