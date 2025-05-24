
"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    console.warn("Login attempt with Firebase removed. Values:", values);
    toast({
      title: "Login Unavailable",
      description: "Firebase has been removed from this project. Login is not functional.",
      variant: "destructive",
    });
    // Optionally, redirect or show a message
    // router.push("/"); // Or keep them on the page
  };

  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account. (Note: Firebase is currently removed)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm
            formSchema={loginSchema}
            onSubmit={handleLogin}
            buttonText="Login"
          />
          <p className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button variant="link" asChild className="px-0 text-primary">
              <Link href="/register">Register here</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
