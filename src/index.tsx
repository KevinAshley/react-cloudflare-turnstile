import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";

declare global {
    interface Window {
        turnstile?: Turnstile.Turnstile;
    }
}

export default function ReactCloudflareTurnstile({
    turnstileSiteKey,
    callback,
    // optional params below
    theme = "auto",
    size = "normal",
    expiredCallback,
    beforeInteractiveCallback,
    afterInteractiveCallback,
    unsupportedCallback,
    errorCallback,
}: {
    turnstileSiteKey: string;
    callback: (token: string) => void;
    // optional params below
    theme?: "auto" | "light" | "dark";
    size?: "normal" | "flexible" | "compact";
    expiredCallback?: (token: string) => void;
    beforeInteractiveCallback?: () => void;
    afterInteractiveCallback?: () => void;
    unsupportedCallback?: () => void;
    errorCallback?: (error: string) => void;
}) {
    const turnstileRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const turnstileIdRef = useRef<string | null | undefined>(undefined);
    const attemptingTurnstileRef = useRef(false);

    useEffect(() => {
        // we only attempt to render the turnstile after mounted is true
        setMounted(true);
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`;
        script.async = true;
        document.head.appendChild(script);
        return () => {
            // remove the script when component un-mounts
            document.head.removeChild(script);
        };
    }, []);

    const resetTheTurnstile = () => {
        console.log("Resetting the Turnstile");
        if (!!window?.turnstile?.reset && turnstileIdRef.current) {
            window.turnstile.reset(turnstileIdRef.current);
        }
    };

    useEffect(() => {
        if (
            mounted &&
            !turnstileIdRef.current &&
            !attemptingTurnstileRef.current
        ) {
            attemptingTurnstileRef.current = true;
            (async () => {
                while (!window.turnstile) {
                    await new Promise((resolve) => setTimeout(resolve, 10));
                }
                const renderedTurnstileId = window.turnstile.render(
                    turnstileRef.current as HTMLElement,
                    {
                        sitekey: turnstileSiteKey,
                        callback,
                        "expired-callback":
                            expiredCallback || resetTheTurnstile,
                        "before-interactive-callback":
                            beforeInteractiveCallback,
                        "after-interactive-callback": afterInteractiveCallback,
                        "unsupported-callback": unsupportedCallback,
                        "error-callback": errorCallback,
                        theme,
                        size,
                    }
                );
                turnstileIdRef.current = renderedTurnstileId;
                attemptingTurnstileRef.current = false;
            })();
        }
    }, [mounted, theme, callback, size]);

    useEffect(() => {
        return () => {
            if (turnstileIdRef.current && window.turnstile?.remove) {
                window.turnstile.remove(turnstileIdRef.current);
            }
        };
    }, []);

    const [height, width] = useMemo(() => {
        switch (size) {
            case "flexible":
                return ["65px", "100%"];
            case "compact":
                return ["140px", "150px"];
            case "normal":
            default:
                return ["65px", "300px"];
        }
    }, [size]);

    return (
        <Fragment>
            <div
                ref={turnstileRef}
                className={"react-cloudflare-turnstile"}
                style={{
                    height,
                    width,
                }}
            />
        </Fragment>
    );
}
