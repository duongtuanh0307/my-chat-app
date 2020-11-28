import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React, { useState, useEffect } from "react";
import { CREATE_USER } from "./graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: "AIzaSyBhG5EbFZgR6yAGMWk5Zc516JH18MbE37E",
  authDomain: "mychatapp-1cd56.firebaseapp.com",
  databaseURL: "https://mychatapp-1cd56.firebaseio.com",
  projectId: "mychatapp-1cd56",
  storageBucket: "mychatapp-1cd56.appspot.com",
  messagingSenderId: "1004140524",
  appId: "1:1004140524:web:9f58f55d4f53cdc2ab72c9",
});

type AuthContextProps = {
  authState: AuthStateTypes;
  signOut: () => Promise<void>;
  logInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signUpWithEmailAndPassword: (formData: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextProps>(undefined!);

type AuthStateTypes = {
  status: string;
  user?: any;
  token?: string;
};
type Props = { children: React.ReactNode };

const AuthProvider = function (props: Props) {
  const [authState, setAuthState] = useState<AuthStateTypes>({
    status: "loading",
  });
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState({ status: "in", user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref("metadata/" + user.uid + "/refreshTime");

          metadataRef.on("value", async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
    });
  }, []);

  const signOut = async function () {
    await firebase.auth().signOut();
  };

  const logInWithEmailAndPassword = async function (
    email: string,
    password: string
  ) {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return data;
  };

  const signUpWithEmailAndPassword = async function (formData: {
    email: string;
    password: string;
    username: string;
  }) {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password);

    if (data.additionalUserInfo?.isNewUser) {
      const variables = {
        firebaseUserId: data.user!.uid,
        username: formData.username,
        email: data.user!.email,
        aboutMe: "",
        dob: "",
        phoneNumber: "",
        profileImage: "",
      };
      await createUser({ variables });
    }
  };

  if (authState.status === "loading" && !AuthContext) {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          signOut,
          logInWithEmailAndPassword,
          signUpWithEmailAndPassword,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  }
};

export default AuthProvider;
