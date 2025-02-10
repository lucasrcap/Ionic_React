import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRedirect,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { logInOutline, navigate, personCircleOutline } from "ionicons/icons";
import icon from "../assets/ionic.jpg";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";
import {
  checkAuthState,
  loginWithEmailAndPassword,
} from "../firebase/firebase";
import { Redirect, Route, useHistory } from "react-router-dom";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(true);
  const [present, dismiss] = useIonLoading();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginWithEmailAndPassword(email, password);
      setSuccessMessage("Login foi bem-sucedido!");
      setTimeout(() => history.push("/app/list"), 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("E-mail e/ou senha inválido(s), tente novamente");
        setTimeout (() => setError(''), 3000)
      } else {
        setError("Erro desconhecido ao tentar fazer login");
      }
    }
  };

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const seeIntroAgain = async () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"success"}>
              <IonTitle>Ionic App</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-text-center ion-padding">
                    <img src={icon} alt="ionic logo" width={"50%"} />
                  </div>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={handleLogin}>
                        <IonInput
                          mode="md"
                          fill="outline"
                          labelPlacement="floating"
                          label="Email"
                          type="email"
                          placeholder="luke@gmail.com"
                          required
                          onIonChange={(e: any) => setEmail(e.detail.value!)}
                        ></IonInput>
                        <IonInput
                          mode="md"
                          className="ion-margin-top"
                          fill="outline"
                          labelPlacement="floating"
                          label="Password"
                          type="password"
                          placeholder="password"
                          required
                          onIonChange={(e: any) => setPassword(e.target.value!)}
                        ></IonInput>
                        <IonButton
                          type="submit"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Login
                          <IonIcon icon={logInOutline} slot="end" />
                        </IonButton>
                        <IonButton
                          routerLink="/register"
                          color={"secondary"}
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Create Account
                          <IonIcon icon={personCircleOutline} slot="end" />
                        </IonButton>
                        <IonButton
                          onClick={seeIntroAgain}
                          fill="clear"
                          size="small"
                          color={"secondary"}
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Watch intro 
                          <IonIcon icon={personCircleOutline} slot="end" />
                        </IonButton>
                      </form>
                      <div>
                        {/*exibindo mensagem de sucesso com estilização*/}
                        {successMessage && (
                          <div
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              padding: "10px",
                              borderRadius: "5px",
                              marginBottom: "10px",
                            }}
                          >
                            {successMessage}
                          </div>
                        )}
                      </div>
                      <div>
                        {/*exibindo mensagem de erro com estilização*/}
                        {error && (
                          <div
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              padding: "10px",
                              borderRadius: "5px",
                              marginBottom: "10px",
                            }}
                          >
                            {error}
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
