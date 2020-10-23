# Movie Jar

Picking a movie to watch is too hard. This app makes a random selection from an AnyList.

## Usage

Sign up for an AnyList account and create a list where you'll add movies you might want to watch in the future.

Make a copy of `.env.sample` called `.env` and fill in your AnyList credentials.

## Run the app locally

Set `NODE_ENV` in the `.env` file to either "development" or "production" to modify CSS builds (the development builds include all of Tailwind CSS; production builds remove unused styles).

Run `npm run dev` and view the app at `http://localhost:8080` in your browser.

## Theming

We're using Tailwind CSS for styling. If you edit markup to include a new class for styling,
run `npm run build:css` to rebuild the stylesheet. (There is probably a nicer way to do this.)
