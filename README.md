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

Learn more about these Advanced Usage props here:\
[https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations)

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
            beforeInteractiveCallback={() => {
                // (OPTIONAL) no default callback is set
            }}
            afterInteractiveCallback={() => {
                // (OPTIONAL) no default callback is set
            }}
            unsupportedCallback={() => {
                // (OPTIONAL) no default callback is set
            }}
            expiredCallback={(token: string) => {
                // (OPTIONAL) if no callback is passed,
                // we set a "fallback" expiredCallback
                // as a convenience that...
                // 1.) Executes your callback with an
                //     empty string token
                // 2.) Resets the Turnstile
            }}
            errorCallback={() => {
                // (OPTIONAL) if no callback is passed,
                // we set a "fallback" errorCallback
                // as a convenience that...
                // 1.) Executes your callback with an
                //     empty string token
                // 2.) Resets the Turnstile
                // 3.) Logs the error to the console
            }}
        />
    );
}
```
