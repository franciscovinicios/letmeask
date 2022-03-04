import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, SignIn } from "../services/firebase";


type User = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  sigInWithFacebook: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await SignIn(auth, provider)

    if (result?.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  async function sigInWithFacebook() {
    const provider = new FacebookAuthProvider()

    const results = await (await signInWithPopup(auth, provider))

    provider.addScope('public_profile');

    if (results.user) {
      const { displayName, photoURL, uid } = results.user
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Facebook Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, sigInWithFacebook }} >
      {props.children}
    </AuthContext.Provider>
  )
}