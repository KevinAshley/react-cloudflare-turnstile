import React, { Fragment, useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        turnstile?: Turnstile.Turnstile;
    }
}

export default function ReactCloudflareTurnstile({
    turnstileSiteKey,
    value,
    setValue,
    theme,
}: {
    turnstileSiteKey: string;
    value: string;
    setValue: (param: string) => void;
    theme: "auto" | "light" | "dark";
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
                        callback: function (token) {
                            setValue(token);
                        },
                        theme,
                    }
                );
                turnstileIdRef.current = renderedTurnstileId;
                attemptingTurnstileRef.current = false;
            })();
        }
    }, [mounted, theme, setValue]);

    useEffect(() => {
        return () => {
            if (turnstileIdRef.current && window.turnstile?.remove) {
                window.turnstile.remove(turnstileIdRef.current);
            }
        };
    }, []);

    return (
        <Fragment>
            <div ref={turnstileRef} className={"react-cloudflare-turnstile"} />
            <input
                className={"hidden-input"}
                value={value}
                onChange={() => {}}
                required={true}
            />
        </Fragment>
    );
}
