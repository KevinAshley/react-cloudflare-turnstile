# React Cloudflare Turnstile

A simple and lightweight React component for [Cloudflare's Turnstile](https://developers.cloudflare.com/turnstile/).

## Installation

```sh
npm install react-cloudflare-turnstile
```

## Usage

```jsx
import Turnstile from "react-cloudflare-turnstile";

function MyComponent() {
    // ...
    return (
        <Turnstile
            turnstileSiteKey="YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY"
            callback={(token) => {
                // save the token,
                // validate it server-side
            }}
        />
    );
}
```
