import ReactCloudflareTurnstile from "./ReactCloudflareTurnstile";

interface VerifyTurnstileTokenOutcomeIf {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    "error-codes": string[];
    action?: string;
    cdata?: string;
    metadata?: {
        [key: string]: string;
    };
}

class VerifyTurnstileTokenError extends Error {
    verifyTurnstileTokenOutcome: VerifyTurnstileTokenOutcomeIf;
    constructor(
        message: string,
        verifyTurnstileTokenOutcome: VerifyTurnstileTokenOutcomeIf
    ) {
        super(message);
        this.verifyTurnstileTokenOutcome = verifyTurnstileTokenOutcome;
    }
}

interface VerifyTurnstileTokenIf {
    turnstileSecretKey: string;
    token: string;
}

export const verifyTurnstileToken: (
    props: VerifyTurnstileTokenIf
) => Promise<VerifyTurnstileTokenOutcomeIf> = async ({
    turnstileSecretKey,
    token,
}: VerifyTurnstileTokenIf) => {
    return new Promise(async (resolve, reject) => {
        try {
            let verificationFormData = new FormData();
            verificationFormData.append("secret", turnstileSecretKey);
            verificationFormData.append("response", token);
            const url =
                "https://challenges.cloudflare.com/turnstile/v0/siteverify";
            const verifyTurnstileTokenResponse = await fetch(url, {
                body: verificationFormData,
                method: "POST",
            });
            const verifyTurnstileTokenOutcome: VerifyTurnstileTokenOutcomeIf =
                await verifyTurnstileTokenResponse.json();
            if (!verifyTurnstileTokenOutcome.success) {
                throw new VerifyTurnstileTokenError(
                    "Turnstile Token Verification Failed",
                    verifyTurnstileTokenOutcome
                );
            }
            resolve(verifyTurnstileTokenOutcome);
        } catch (error: any) {
            reject(error);
        }
    });
};

export default ReactCloudflareTurnstile;
