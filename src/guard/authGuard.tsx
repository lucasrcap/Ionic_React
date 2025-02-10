import React, { useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { auth } from '../firebase/firebase'; // Importando a configuração do Firebase

interface AuthGuardProps extends RouteProps {
  component: React.ComponentType<any>;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Se existir um usuário autenticado, atualiza o estado
      setLoading(false); // Quando o estado de autenticação for verificado, podemos desativar o carregamento
    });

    return () => unsubscribe(); // Limpa o ouvinte quando o componente for desmontado
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Exibe o "Loading..." enquanto verifica o estado de autenticação
  }

  return (
    <Route
      {...rest}
      render={(props) => 
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthGuard;