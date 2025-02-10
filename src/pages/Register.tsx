import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  checkmarkDoneOutline,
  logInOutline,
  personCircleOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState <string | null>(null)
  const history = useHistory()

  const handleRegister = async(e: React.FormEvent) => {
    e.preventDefault()
    
    try {
          await registerWithEmailAndPassword(email,password)
          setSuccessMessage('Registro bem-sucedido!');
          setTimeout(() => history.push('/'), 5000);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError("Erro ao fazer o registro, tente novamente")
            setTimeout (() => setError(''), 3000)
          } else {
            setError("Erro desconhecido ao tentar fazer o registro")
          }
        }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={handleRegister}>
                    <IonInput
                      fill="outline"
                      labelPlacement="floating"
                      label="Email"
                      type="email"
                      placeholder="insira seu email"
                      required
                      onIonChange={(e : any) => setEmail(e.target.value)}
                    ></IonInput>
                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement="floating"
                      label="Password"
                      type="password"
                      placeholder="insira sua senha"
                      required
                      onIonChange={(e : any) => setPassword(e.target.value)}
                    ></IonInput>
                    <IonButton
                      type="submit"
                      expand="block"
                      className="ion-margin-top"
                    >
                      Create my account
                      <IonIcon icon={checkmarkDoneOutline} slot="end" />
                    </IonButton>
                  </form>
                  <div>
                        {/*exibindo mensagem de sucesso com estilização*/}
                        {successMessage && (
                          <div style={{
                            backgroundColor: 'green', 
                            color: 'white', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            marginBottom: '10px' 
                          }}>
                          {successMessage}
                        </div>
                        )}
                      </div>
                      <div>
                        {/*exibindo mensagem de sucesso com estilização*/}
                        {error && (
                          <div style={{
                            backgroundColor: 'red', 
                            color: 'white', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            marginBottom: '10px' 
                          }}>
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
  );
};

export default Register;
