# React Cloudflare Turnstile

A simple and lightweight React component for [Cloudflare's Turnstile](https://developers.cloudflare.com/turnstile/).

## Installation

```sh
npm i react-cloudflare-turnstile
```

## Basic Usage

```jsx
import Turnstile from "react-cloudflare-turnstile";

function MyComponent() {
    // ...
    return (
        <Turnstile
            turnstileSiteKey="YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY"
            callback={(token) => {
                // save the token, validate it server-side
            }}
        />
    );
}
```

## Advanced Usage

```jsx
import Turnstile from "react-cloudflare-turnstile";

function MyComponent() {
    // ...
    return (
        <Turnstile
            turnstileSiteKey="YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY"
            callback={(token) => {
                // save the token, validate it server-side
            }}
            theme="auto" // "auto" | "light" | "dark"
            size="normal" // "normal" | "flexible" | "compact"
            expiredCallback={(token: string) => {
                // (OPTIONAL) if no callback is passed, a default callback
                // is set for you that resets the Turnstile
            }}
            beforeInteractiveCallback={() => {
                // (OPTIONAL) no default callback is set
            }}
            afterInteractiveCallback={() => {
                // (OPTIONAL) no default callback is set
            }}
            unsupportedCallback={() => {
                // (OPTIONAL) no default callback is set
            }}
            errorCallback={() => {
                // (OPTIONAL) no default callback is set
            }}
        />
    );
}
```
