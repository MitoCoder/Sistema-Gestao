import React from "react";
import { Row, Col, Card, Button, Divider } from "antd";
import {
  DollarOutlined,
  FileDoneOutlined,
  CarOutlined,
} from "@ant-design/icons";

const MenuHome = () => {
  const cardTitleStyle = {
    borderBottom: "4px solid blue", // Adiciona a borda de 4px sólida azul à linha do título
  };

  return (
    <Row gutter={16} justify="center">
      <Col xs={24} sm={20} md={16} lg={6}>
        <Card
          title="Modulo Comercial: Mais Usados!"
          headStyle={{
            backgroundColor: "#001529",
            color: "white",
            padding: "10px",
            textAlign: "center",
            ...cardTitleStyle, // Adiciona o estilo personalizado ao título do card
          }}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "16px",
          }}
        >
          <p style={{ fontSize: "14px" }}>Orçamento, Contrato ou Entrega em um só lugar!</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "12px",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              <DollarOutlined style={{ marginRight: "8px" }} /> Orçamento
            </Button>
            <Divider
              style={{
                borderColor: "#001529",
                borderWidth: "1px",
                margin: "6px 0",
              }}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "12px",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              <FileDoneOutlined style={{ marginRight: "8px" }} /> Contrato
            </Button>
            <Divider
              style={{
                borderColor: "#001529",
                borderWidth: "1px",
                margin: "6px 0",
              }}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              <CarOutlined style={{ marginRight: "8px" }} /> Entrega
            </Button>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={20} md={16} lg={6}>
        <Card
          title="Pensar"
          headStyle={{
            backgroundColor: "#001529",
            color: "white",
            padding: "10px",
            textAlign: "center",
            ...cardTitleStyle, // Adiciona o estilo personalizado ao título do card
          }}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "16px",
          }}
        >
          <p style={{ fontSize: "14px" }}>Conteúdo do Card vai aqui...</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "12px",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 1
            </Button>
            <Divider
              style={{
                borderColor: "#001529",
                borderWidth: "1px",
                margin: "6px 0",
              }}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "12px",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 2
            </Button>
            <Divider
              style={{
                borderColor: "#001529",
                borderWidth: "1px",
                margin: "6px 0",
              }}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 3
            </Button>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={20} md={16} lg={6}>
        <Card
          title="Pensar"
          headStyle={{
            backgroundColor: "#001529",
            color: "white",
            padding: "10px",
            textAlign: "center",
            ...cardTitleStyle, // Adiciona o estilo personalizado ao título do card
          }}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "16px",
          }}
        >
          <p style={{ fontSize: "14px"  }}>Conteúdo do Card vai aqui...</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "12px",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 1
            </Button>
            <Divider
              style={{
                borderColor: "#001529",
                borderWidth: "1px",
                margin: "6px 0",
              }}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "12px",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 2
            </Button>
            <Divider
              style={{
                borderColor: "#001529",
                borderWidth: "1px",
                margin: "6px 0",
              }}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 3
            </Button>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={20} md={16} lg={6}>
        <Card
          title="Pensar"
          headStyle={{
            backgroundColor: "#001529",
            color: "white",
            padding: "10px",
            textAlign: "center",
            ...cardTitleStyle, // Adiciona o estilo personalizado ao título do card
          }}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "16px",
          }}
        >
          <p style={{ fontSize: "14px"  }}>Conteúdo do Card vai aqui...</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "12px",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 1
            </Button>
            <Divider
              style={{
                borderColor: "#001529",
                borderWidth: "1px",
                margin: "6px 0",
              }}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                marginBottom: "12px",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 2
            </Button>
            <Divider
              style={{
                borderColor: "#001529",
                borderWidth: "1px",
                margin: "6px 0",
              }}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                border: "none",
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#001529",
                fontSize: "14px",
              }}
              ghost
            >
              Definir 3
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default MenuHome;
