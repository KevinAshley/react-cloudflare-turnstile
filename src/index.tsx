import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";

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
    hiddenInput,
    size = "normal",
}: {
    turnstileSiteKey: string;
    value: string;
    setValue: (param: string) => void;
    theme: "auto" | "light" | "dark";
    hiddenInput?: {
        name?: string;
        id?: string;
        className?: string;
        required?: boolean;
    };
    size?: "normal" | "flexible" | "compact";
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
                        size,
                    }
                );
                turnstileIdRef.current = renderedTurnstileId;
                attemptingTurnstileRef.current = false;
            })();
        }
    }, [mounted, theme, setValue, size]);

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
            default:
                return ["65px", "300px"];
        }
    }, [size]);

    return (
        <div>
            <div
                style={{
                    height,
                    width,
                }}
            >
                <div
                    ref={turnstileRef}
                    className={"react-cloudflare-turnstile"}
                />
            </div>
            {!!hiddenInput && (
                <input
                    name={hiddenInput.name}
                    id={hiddenInput.id}
                    className={hiddenInput.className}
                    required={hiddenInput.required}
                    ///
                    value={value}
                    onChange={() => {}}
                    style={{ display: "none" }}
                />
            )}
        </div>
    );
}
