import React, { useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin, Typography } from "antd";
import App from "./App";

// Tela de carregamento
const SplashScreen = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <Spin spinning={true} size="large" />
    <Typography.Title level={3} style={{ marginTop: 16 }}>
      Carregando Sistema Gestão
    </Typography.Title>
  </div>
);

// Componente principal do formulário de login
const LoginForm = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Código para verificar se há credenciais salvas no armazenamento local
    const storedCredentials = localStorage.getItem("savedCredentials");
    if (storedCredentials) {
      const {
        username: storedUsername,
        password: storedPassword,
        remember: storedRememberMe,
      } = JSON.parse(storedCredentials);

      setUsername(storedUsername || "");
      setPassword(storedPassword || "");
      setRememberMe(storedRememberMe || false);

      // Se existirem credenciais salvas e a opção "Lembrar-me" estiver marcada, tenta fazer login automaticamente
      if (storedRememberMe && storedUsername && storedPassword) {
        attemptLogin({
          username: storedUsername,
          password: storedPassword,
          remember: storedRememberMe,
        });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Função para tentar fazer login
  const attemptLogin = async (values) => {
    setLoading(true);

    // Simula uma requisição assíncrona para verificar as credenciais
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Verifica as credenciais (usuário e senha)
    if (values.username === "Edvam" && values.password === "2001") {
      console.log("Login bem-sucedido!");
      setAuthenticated(true);

      // Salva as credenciais no armazenamento local, independentemente do estado de 'Lembrar-me'
      console.log("Salvando credenciais:", values);
      localStorage.setItem(
        "savedCredentials",
        JSON.stringify({
          username: values.username,
          password: values.password,
          remember: values.remember,
        })
      );
    } else {
      console.log("Credenciais inválidas");
    }

    setLoading(false);
  };

  // Verifica se está em processo de carregamento
  if (loading) {
    // Se ainda estiver carregando, exibe a tela de splash
    return <SplashScreen />;
  }

  // Verifica se o usuário está autenticado
  if (authenticated) {
    // Se autenticado, renderiza o App
    return <App />;
  }

  // Renderiza o formulário de login
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL}/imagens/fundologin.jpg)`, // Caminho relativo para a imagem de fundo
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          width: "90vw",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Cor de fundo do card (branco com opacidade 0.8)
          borderRadius: "10px", // Cantos arredondados do card
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra do card para destacá-lo
        }}
      >
        <img
          src="/imagens/LogoBrancoLinhas50px.png"
          alt="Imagem"
          style={{ width: "150px", height: "150px" }}
        />
        <Typography.Title level={3} style={{ marginTop: 16 }}>
          Sistema Gestão: Login
        </Typography.Title>

        {/* Formulário de login */}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: rememberMe,
            username,
            password,
          }}
          onFinish={attemptLogin}
          style={{
            width: "100%",
            maxWidth: "300px",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          {/* Campo de nome de usuário */}
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu nome de usuário!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Usuário"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Campo de senha */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, insira sua senha!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Checkbox "Lembrar-me" */}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembrar-me</Checkbox>
            </Form.Item>
          </Form.Item>

          {/* Botão de login */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
