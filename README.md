# React Cloudflare Turnstile

A simple and lightweight React component for [Cloudflare's Turnstile](https://developers.cloudflare.com/turnstile/).

## Installation

```sh
npm i react-cloudflare-turnstile
```

## Basic Usage

```jsx
import ReactCloudflareTurnstile from "react-cloudflare-turnstile";

function MyComponent() {
    // ...
    return (
        <ReactCloudflareTurnstile
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
import ReactCloudflareTurnstile from "react-cloudflare-turnstile";

function MyComponent() {
    // ...
    return (
        <ReactCloudflareTurnstile
            turnstileSiteKey={"YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY"}
            callback={(token) => {
                // save the token, validate it server-side
            }}
            // =====================================
            // ADVANCED USAGE PROPS BELOW (OPTIONAL)
            // =====================================
            theme={"auto"} // ("auto" | "light" | "dark")
            size={"normal"} // ("normal" | "flexible" | "compact")
            execution={"render"} // ("execute" | "render")
            action={"WIDGET_IDENTIFIER"} // (string)
            cData={"CUSTOMER_DATA"} // (string)
            language={"auto"} // ("auto" | "en-US" | ...)
            tabIndex={0} // (number)
            responseField={true} // (boolean)
            responseFieldName={"cf-turnstile-response"} // (string)
            retry={"auto"} // ("auto" | "never")
            retryInterval={8000} // (number)
            refreshExpired={"auto"} // ("auto" | "manual" | "never")
            refreshTimeout={"auto"} // ("auto" | "manual" | "never")
            beforeInteractiveCallback={() => {
                // ...
            }}
            afterInteractiveCallback={() => {
                // ...
            }}
            unsupportedCallback={() => {
                // ...
            }}
            errorCallback={(error) => {
                // ...
            }}
            expiredCallback={(token) => {
                // ...
                // NOTE: if no callback is passed,
                // we set a "fallback" expiredCallback
                // as a convenience that...
                // 1.) Executes your callback with an
                //     empty string token
                // 2.) Resets the Turnstile
            }}
        />
    );
}
```
