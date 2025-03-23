import ReactCloudflareTurnstile from "./ReactCloudflareTurnstile";

export const verifyTurnstileToken = async ({
    cloudflareTurnstileSecretKey,
    turnstileToken,
}: {
    cloudflareTurnstileSecretKey: string;
    turnstileToken: string;
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let verificationFormData = new FormData();
            verificationFormData.append("secret", cloudflareTurnstileSecretKey);
            verificationFormData.append("response", turnstileToken);
            const url =
                "https://challenges.cloudflare.com/turnstile/v0/siteverify";
            const turnstileVerifyResponse = await fetch(url, {
                body: verificationFormData,
                method: "POST",
            });
            const turnstileVerifyOutcome = await turnstileVerifyResponse.json();
            if (!turnstileVerifyOutcome.success) {
                throw new Error("Invalid Cloudflare Verification");
            }
            resolve(true);
        } catch (error: any) {
            reject(error);
        }
    });
};

export default ReactCloudflareTurnstile;
