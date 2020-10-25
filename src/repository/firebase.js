import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import config from "../config/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
firebase.analytics();

const db = firebase.firestore();

const firebaseAuthProviders = (providerData) => {
  return providerData.reduce((accumulator, value) => {
    const { providerId, uid } = value;
    const providerName = providerId.replace(".com", "");
    accumulator = {
      ...accumulator,
      [providerName]: {
        providerId: providerId,
        userProviderId: uid,
      },
    };
    return accumulator;
  }, {});
};

const useGetAuthUser = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const {
          uid,
          email,
          displayName,
          photoURL,
          refreshToken,
          providerData,
        } = currentUser;

        const providers = firebaseAuthProviders(providerData);

        setUser({
          uid,
          email,
          fullName: displayName,
          photoURL,
          refreshToken,
          providers,
        });
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        setError(true);
      }
    });
  }, [setUser]);

  return { data: user, loading, error };
};

const useGetCollection = (collection) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    db.collection(collection)
      .get()
      .then((querySnapshot) => {
        setDocs([]);
        querySnapshot.forEach((doc) => {
          setDocs((docs) => [...docs, doc.data()]);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Collection not found.", error);
        setLoading(false);
        setError(error);
      });
  }, [collection]);

  return {
    data: docs,
    loading,
    error,
  };
};

const useGetUserDocument = () => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    data: currentUser,
    loading: loadingCurrentUser,
    error: errorCurrentUser,
  } = useGetAuthUser();

  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setDoc(doc.data());
          } else {
            console.error("Document not exists");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Document not found.", error);
          setError(error);
          setLoading(false);
        });
    }

    if ((!loadingCurrentUser && !currentUser) || errorCurrentUser) {
      console.error("User not found.");
      setLoading(false);
    }
  }, [currentUser, loadingCurrentUser, errorCurrentUser]);

  return {
    data: doc,
    loading,
    error,
  };
};

const useGetDocument = (collection, docId) => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (docId) {
      db.collection(collection)
        .doc(docId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setDoc(doc.data());
          } else {
            console.error("Document not exists");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Document not found.", error);
          setError(error);
          setLoading(false);
        });
    }
  }, [collection, docId]);

  return {
    data: doc,
    loading,
    error,
  };
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  firebase,
  firebaseAuthProviders,
  useGetAuthUser,
  useGetCollection,
  useGetDocument,
  useGetUserDocument,
  signOut,
};
