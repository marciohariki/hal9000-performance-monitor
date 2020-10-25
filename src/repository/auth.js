import * as firebaseui from "firebaseui";
import { firebase } from "./firebase";

const initAuth = (containerId, loaderId) => {
  const ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        console.log("autenticado", authResult);
        console.log("redirect", redirectUrl);
        return true;
      },
      uiShown: function () {
        document.getElementById(loaderId).style.display = "none";
      },
    },
    signInSuccessUrl: "/app",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    tosUrl: "/termos-de-uso",
    privacyPolicyUrl: "/politica-de-privacidade",
  };
  ui.start(`#${containerId}`, uiConfig);
};

export default initAuth;
