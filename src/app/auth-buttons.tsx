import { signIn, signOut } from "@/auth";

type AuthButtonsProps = {
    isLoggedIn: boolean;
    userName?: string | null;
};

export function AuthButtons({ isLoggedIn, userName }: AuthButtonsProps) {
    if (isLoggedIn) {
        return (
            <div className="auth-controls">
                <span>สวัสดี {userName ?? "ผู้ใช้งาน"}</span>
                <form
                    className="auth-form"
                    action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                    }}
                >
                    <button className="button button--quiet" type="submit">ออกจากระบบ</button>
                </form>
            </div>
        );
    }

    return (
        <form
            className="auth-form"
            action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
            }}
        >
            <button className="button" type="submit">เข้าสู่ระบบด้วย Google</button>
        </form>
    );
} 