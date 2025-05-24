"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: values.name });
      }
      toast({ title: "Registration Successful", description: "Your account has been created." });
      router.push("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm
            formSchema={registerSchema}
            onSubmit={handleRegister}
            buttonText="Register"
            showNameField={true}
          />
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" asChild className="px-0 text-primary">
              <Link href="/login">Login here</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
