# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This project was to practice:
1. CSS
2. JQuery
3. AJAX
4. Responsive Design

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Using the App (images below show desktop and mobile layouts)
### On web-page load
* The home page will be the only page a user will visit
* Here they can see all Tweets by scrolling to the bottom.
* The navbar will remain at the top at all times
* The navbar includes:
  1. App Logo on the left
  2. Create Tweet button on the right, which will fade-out upon scrolling further down and this will trigger a fade-in of a red icon (see next bullet point)
* When user scrolls past a certain point a red circle icon will appear to help the user quickly navigate back to the top
![desktop Home](https://github.com/Eric-Lombardo/tweeter/blob/master/Docs/desktop_home.png?raw=true)
![mobile home](https://github.com/Eric-Lombardo/tweeter/blob/master/Docs/mobile_home.png?raw=true)


### Creating a new Tweet
Here the user has 2 options:
1. Upon page load, the user can click the right navbar button which will slide-out a "Compose Tweet" element which automatically focuses into a textarea HTML element. This is so that the user can immediately start typing without having to mouse click inside the textarea.
![desktop compose](https://github.com/Eric-Lombardo/tweeter/blob/master/Docs/desktop_compose.png?raw=true)
![mobile compose](https://github.com/Eric-Lombardo/tweeter/blob/master/Docs/mobile_compose.png?raw=true)
2. If user scrolls further down the above option will fade-out but be replaced with a red icon that will take them back to the top and slide-out (if it isn't already) the textarea where they can write their tweet.
![desktop scroll bottom](https://github.com/Eric-Lombardo/tweeter/blob/master/Docs/desktop_scroll_bottom.png?raw=true)
![mobile scroll bottom](https://github.com/Eric-Lombardo/tweeter/blob/master/Docs/mobile_hover_scroll_bottom.png?raw=true)

### How Tweets are displayed
Each Tweet is styled in the following way displaying:
1. User's profile picture
2. User's name
3. User's tag-name (only upon mouse hover)
4. Tweet text body
5. Date created
6. Flag, Retweet and Like icons (only upon mouse hover)
![hover tweet](https://github.com/Eric-Lombardo/tweeter/blob/master/Docs/desktop_hover_tweet.png?raw=true)

### Mobile and Desktop
This app will adjust to the user's screen size by dynamically adjusting the layout of the HTML for a better user experience. 

## Dependencies

- Express
- Node 5.10.x or above
