"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn")
  return(
    <div className="h-full flex items-center justify-center">
      <div className="md:h-auto">
        {state === "signIn" ? <SignInCard setState={setState}/> : <SignUpCard setState={setState}/>}
      </div>
    </div>
  )
}