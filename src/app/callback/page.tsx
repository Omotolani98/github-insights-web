'use client';

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        async function handleCallback() {
            const code = searchParams.get("code");

            if (!code) {
                console.error("No code found in search params");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:52000/v1/github/callback?code=${code}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = response.data;
                console.log(data);
                sessionStorage.setItem("token", data.body.access_token);
                router.push('/dashboard');
            } catch (error) {
                console.error("Error during callback handling:", error);
            }
        }

        handleCallback();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-4xl font-bold mb-4">Redirecting You to Dashboard</h1>
        </div>
    );
}

export default function Callback() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-black text-white">Loading...</div>}>
            <CallbackContent />
        </Suspense>
    );
}