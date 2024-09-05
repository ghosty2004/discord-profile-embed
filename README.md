# Discord Profile Embed

Embed your discord profile to markdowns or html iframes tags

## Features which are displayed
- Profile photo & banner
- Badges
- Avatar decoration & profile effect (animated)
- About me
- Current activity (spotify / game)

## Usage
- Clone this repo `git clone https://github.com/ghosty2004/discord-profile-embed`
- Copy the env boilerplate `cp .env.example .env.prod`
- Fill the variables from `.env.prod`
  - `TOKEN` - your discord bot token
  - `CLIENT_TOKEN` - your client token - an user token which is not used by you (this will be used to fetch the profile effects and decorations)
  - `GUILD_ID` - from which guild to read the members when the request is made to the `/:userId` HTTP endpoint
  - `LISTEN_PORT` - set this to `80`
- Start the docker compose `docker compose up`
- Visit `http://localhost/:your_user_id` endpoint

## Preview
![Preview](https://i.imgur.com/a1Nzwud.png)
