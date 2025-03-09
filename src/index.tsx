import React, { useEffect, useRef, useState } from "react";

export default function ReactCloudflareTurnstile({
    turnstileSiteKey,
    value,
    setValue,
    mode,
}: {
    turnstileSiteKey: string;
    value: string;
    setValue: (param: string) => void;
    mode: "auto" | "light" | "dark";
}) {
    return <div>test</div>;
}
