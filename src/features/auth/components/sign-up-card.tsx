"use client"

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pending, setPending] = useState<boolean>(false)
  const [error, setError] = useState("")

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match")
      return;
    }

    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch((err) => {
        console.log('err', err)
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false)
      })
  }

  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true)
    signIn(value)
      .finally(() => {
        setPending(false);
      })
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="pt-0 px-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={pending}

          >Continue</Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="w-full relative"
            onClick={() => handleProviderSignUp("google")}
            variant={"outline"}
            size={"lg"}
            disabled={pending}
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with google
          </Button>
          <Button
            className="w-full relative"
            onClick={() => handleProviderSignUp("github")}
            variant={"outline"}
            size={"lg"}
            disabled={pending}
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with github
          </Button>
          <p className="text-xs text-muted-foreground">
            Already have an account ? <span onClick={() => setState("signIn")} className="text-sky-700 hover:underline cursor-pointer">Sign In</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}