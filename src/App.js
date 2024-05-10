import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button, Popconfirm } from "antd";

import FormHome from "./componentes/FormHome";
import FormOrcamento from "./componentes/FormOrcamento";
import FormContrato from "./componentes/FormContrato";
import FormEntrega from "./componentes/FormEntrega";
import FormPainel from "./componentes/FormPainel";

const { Header, Content, Footer, Sider } = Layout;

const App = ({ username, onLogout }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showFormularioOrcamento, setShowFormularioOrcamento] = useState(false);
  const [showFormularioContrato, setShowFormularioContrato] = useState(false);
  const [showFormularioEntrega, setShowFormularioEntrega] = useState(false);
  const [showFormularioPainel, setShowFormularioPainel] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedModuleName, setSelectedModuleName] = useState("Home");

  const menuItems = useMemo(
    () => [
      { key: "1", icon: <PieChartOutlined />, label: "Home" },
      {
        key: "sub1",
        icon: <UserOutlined />,
        label: "Comercial",
        children: [
          { key: "2", label: "Orçamento" },
          { key: "3", label: "Contrato" },
          { key: "4", label: "Entrega" },
          { key: "5", label: "Painel Comercial" },
        ],
      },
      {
        key: "sub5",
        icon: <UserOutlined />,
        label: "Suporte",
        children: [
          { key: "6", label: "Video Aulas de Uso" },
          { key: "7", label: "Fale Conosco" },
        ],
      },
    ],
    []
  );

  const handleMenuItemClick = useCallback(
    (key) => {
      const selectedModule = menuItems.find((item) =>
        item.children
          ? item.children.some((childItem) => childItem.key === key)
          : item.key === key
      );

      if (selectedModule) {
        setSelectedModuleName(selectedModule.label);
      }

      if (key === "1") {
        setShowHome(true);
        setShowFormularioOrcamento(false);
        setShowFormularioContrato(false);
        setShowFormularioEntrega(false);
        setShowFormularioPainel(false);
      } else if (key === "2") {
        setShowHome(false);
        setShowFormularioOrcamento(true);
        setShowFormularioContrato(false);
        setShowFormularioEntrega(false);
        setShowFormularioPainel(false);
      } else if (key === "3") {
        setShowHome(false);
        setShowFormularioOrcamento(false);
        setShowFormularioContrato(true);
        setShowFormularioEntrega(false);
        setShowFormularioPainel(false);
      } else if (key === "4") {
        setShowHome(false);
        setShowFormularioOrcamento(false);
        setShowFormularioContrato(false);
        setShowFormularioEntrega(true);
        setShowFormularioPainel(false);
      } else if (key === "5") {
        setShowHome(false);
        setShowFormularioOrcamento(false);
        setShowFormularioContrato(false);
        setShowFormularioEntrega(false);
        setShowFormularioPainel(true);
      } else {
        setShowHome(false);
        setShowFormularioOrcamento(false);
        setShowFormularioContrato(false);
        setShowFormularioEntrega(false);
        setShowFormularioPainel(false);
      }
    },
    [menuItems]
  );

  const handleLogout = () => {
    console.log("Usuário deslogado.");
    localStorage.removeItem("savedCredentials");
    setAuthenticated(false);
    if (onLogout) {
      onLogout();
    }
  };

  useEffect(() => {
    const storedCredentials = localStorage.getItem("savedCredentials");
    if (storedCredentials) {
      setAuthenticated(true);
      if (!authenticated) {
        handleMenuItemClick("1");
      }
    } else {
      window.location.href = "/";
    }
  }, [authenticated, handleMenuItemClick]);

  if (!authenticated) {
    return null;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          padding: "0 16px",
          zIndex: 1,
          width: "100%",
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "4px solid blue",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="logo"
          style={{
            padding: "5px",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={"/imagens/LogoBrancoLinhas50px.png"}
            alt="Logo"
            style={{ maxWidth: "30px", marginRight: "8px" }}
          />
          <span
            style={{
              color: "white",
              fontSize: "19px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Sistema Gestão
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Breadcrumb style={{ margin: "0 16px", color: "white" }}>
            <Breadcrumb.Item>{username}</Breadcrumb.Item>
          </Breadcrumb>
          <Popconfirm
            title="Tem certeza que deseja deslogar?"
            onConfirm={handleLogout}
            okText="Sim"
            cancelText="Não"
          >
            <Button
              type="text"
              icon={<LogoutOutlined />}
              style={{ color: "white" }}
            >
              Deslogar
            </Button>
          </Popconfirm>
        </div>
      </Header>

      <Layout style={{ marginTop: "64px" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          style={{
            background: "#001529",
            zIndex: 1,
            overflow: "auto",
            height: "100vh",
            position: "fixed",
          }}
        >
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {menuItems.map((menuItem) => {
              if (menuItem.children) {
                return (
                  <Menu.SubMenu
                    key={menuItem.key}
                    title={menuItem.label}
                    icon={menuItem.icon}
                  >
                    {menuItem.children.map((childItem) => (
                      <Menu.Item
                        key={childItem.key}
                        onClick={() => handleMenuItemClick(childItem.key)}
                      >
                        {childItem.label}
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    key={menuItem.key}
                    icon={menuItem.icon}
                    onClick={() => handleMenuItemClick(menuItem.key)}
                  >
                    {menuItem.label}
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? 80 : 200,
            transition: "margin-left 0.2s",
          }}
        >
          <Content
            style={{
              margin: "0 10px",
              borderRadius: "10px",
              padding: "6px",
            }}
          >
            <Breadcrumb style={{ margin: "6px 0" }}>
              <Breadcrumb.Item>Seleção: {selectedModuleName}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 30,
                minHeight: 360,
                background: "#ffffff",
                borderRadius: "10px",
              }}
            >
              {showFormularioOrcamento && <FormOrcamento />}
              {showFormularioContrato && <FormContrato />}
              {showHome && <FormHome />}
              {showFormularioEntrega && <FormEntrega />}
              {showFormularioPainel && <FormPainel />}
            </div>
          </Content>
          {/* Texto do Footer adicionado abaixo das seções */}
          <Footer
            style={{
              textAlign: "center", // Centraliza o texto no rodapé
              color: "#808080", // Cor cinza
              borderTop: "1px solid #e8e8e8", // Adiciona uma borda superior
              marginTop: "2px", // Espaçamento superior
            }}
          >
            Sistema Gestão Simplificado: Velocidade e Eficiência | v6.2.0 - Dev.
            Edvam S.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
