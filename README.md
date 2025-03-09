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
            turnstileSiteKey={"YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY"}
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
            turnstileSiteKey={"YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY"}
            callback={(token) => {
                // save the token, validate it server-side
            }}
            // =====================================
            // ADVANCED USAGE PROPS BELOW (OPTIONAL)
            // =====================================
            theme={"dark"} // ("auto" | "light" | "dark")
            size={"flexible"} // ("normal" | "flexible" | "compact")
            execution={"execute"} // ("execute" | "render")
            action={"WIDGET_IDENTIFIER"} // (string)
            cData={"CUSTOMER_DATA"} // (string)
            language={"en-US"} // (string)
            tabIndex={1} // (number)
            responseField={false} // (boolean)
            responseFieldName={"cf-turnstile-response"} // (string)
            retry={"never"} // "auto" | "never"
            retryInterval={10000} // number
            refreshExpired={"never"} // "auto" | "manual" | "never"
            refreshTimeout={"never"} // "auto" | "manual" | "never"
            beforeInteractiveCallback={() => {
                // ...
            }}
            afterInteractiveCallback={() => {
                // ...
            }}
            unsupportedCallback={() => {
                // ...
            }}
            expiredCallback={(token: string) => {
                // ...
                // NOTE: if no callback is passed,
                // we set a "fallback" expiredCallback
                // as a convenience that...
                // 1.) Executes your callback with an
                //     empty string token
                // 2.) Resets the Turnstile
            }}
            errorCallback={() => {
                // ...
                // NOTE: if no callback is passed,
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
