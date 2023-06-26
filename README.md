# Twitter Clone

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Deploy](#deploy)
- [Running Locally](#running-locally)
- [Contact](#contact)

## Overview

The Twitter clone built with the T3 stack is designed to replicate the core functionalities and user experience of the original Twitter platform. Users will be able to create accounts, post messages (tweets), and follow other users to stay updated with their content. The platform will feature a timeline that displays a user's own tweets as well as tweets from the users they follow. Additionally, users will have the ability to engage in conversations by liking posts. The interface will be intuitive and user-friendly, allowing for easy navigation and interaction. With the T3 stack at its core, this Twitter clone aims to provide a seamless and feature-rich social media experience to its users.

[Demo Link](https://twitter-clone.hareeshr.me/)

### Built With

 - [Next.js](https://nextjs.org/)
 - [React.js](https://react.dev/)
 - [Typescript](https://www.typescriptlang.org/)
 - [Node.js](https://nodejs.org/)
 - [Planet Scale](https://planetscale.com/)
 - [Tailwind CSS](https://tailwindcss.com/)
 - [NextAuth.js](https://next-auth.js.org/)
 - [Prisma](https://www.prisma.io/)
 - [tRPC](https://trpc.io/)

## Features

 - User Registration and Profiles
 - Tweeting
 - Following and Followers
 - Interactions: Like
 - Timeline: View a personalized timeline displaying tweets

## Prerequisites

 - Get your Planet Scale database from [here](https://planetscale.com/).
 - Get your Discord Cloud ID and Secret from [here](https://discord.com/developers/applications).
 -  Get your Twitter Cloud ID and Secret from [here](https://developer.twitter.com/en/portal/dashboard).
 - Git -  [Download & Install Git](https://git-scm.com/downloads) for Windows users. (OSX and Linux machines has it preinstalled).
-   Node.js -  [Download & Install Node.js](https://nodejs.org/en/download/).

## Deploy

**Vercel**
Host your own live version of Chatbot UI with Vercel.

Host your own live version of Chatbot UI with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhareeshr%2Ftwitter-clone&env=DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL,DISCORD_CLIENT_ID,DISCORD_CLIENT_SECRET,TWITTER_CLIENT_ID,TWITTER_CLIENT_SECRET&demo-title=Twitter%20Clone&demo-url=https%3A%2F%2Ftwitter-clone.hareeshr.me%2F)


## Running Locally
**1. Clone Repo**
**2. Install Dependencies**

    npm i
**3. Provide API Key**
Create a .env.local file in the root of the repo with your configuration and API Keys:

	DATABASE_URL=YOUR_PLANET_SCALE_DATABASE_URL
    NEXTAUTH_URL=YOUR_APP_URL
    NEXTAUTH_SECRET=ANY_SECRET_KEY
    DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID
    DISCORD_CLIENT_SECRET=YOUR_DISCORD_CLIENT_SECRET
    TWITTER_CLIENT_ID=YOUR_TWITTER_CLIENT_ID
    TWITTER_CLIENT_SECRET=YOUR_TWITTER_CLIENT_SECRET
**4. Run App**

    npm run dev
    
**5. Happy chatting**
You can now login using your Discord or Twitter account and start a microblogging like on Twitter

## Contact

If you have any questions, feel free to reach out to me on [hareeshr.me](https://hareeshr.me)
