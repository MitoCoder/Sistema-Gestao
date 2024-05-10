import React, { useState } from "react";
import { Col, Row } from "antd";
import { Input, Button, Tabs, Select, InputNumber, Popconfirm } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const { TabPane } = Tabs;
const { TextArea } = Input;

const App = () => {
  //Codigo de Limpeza dos Campos Atualizado
  const [cep, setCep] = useState("");

  const [enderecoinst, setEnderecoinst] = useState("");

  const [nomeempresa, setnomeempresa] = useState("");

  const [contato, setcontato] = useState("");
  const [numerocontato, setnumerocontato] = useState("");

  const [contato2, setcontato2] = useState("");
  const [numerocontato2, setnumerocontato2] = useState("");

  const [tipodecontrato, settipodecontrato] = useState("");
  const [nlocal, setnlocal] = useState("");
  const [norcamento, setnorcamento] = useState("");
  const [ncontrato, setncontrato] = useState("");

  const [obsgeral, setobsgeral] = useState("");

  const [obs, setobs] = useState("");
  const [obs2, setobs2] = useState("");
  const [obs3, setobs3] = useState("");
  const [obs4, setobs4] = useState("");
  const [obs5, setobs5] = useState("");
  const [obs6, setobs6] = useState("");

  const [qtdcabines, setqtdcabines] = useState(null);
  const [qtdcabines2, setqtdcabines2] = useState(null);
  const [qtdcabines3, setqtdcabines3] = useState(null);
  const [qtdcabines4, setqtdcabines4] = useState(null);
  const [qtdcabines5, setqtdcabines5] = useState(null);
  const [qtdcabines6, setqtdcabines6] = useState(null);

  const [limparModalVisible, setLimparModalVisible] = useState(false);

  const handleCancelarLimpar = () => {
    // Fechar o modal se o usuário cancelar
    setLimparModalVisible(false);
  };

  const handleLimparInput = () => {
    setEnderecoinst();
    setCep();

    setqtdcabines(null);
    setqtdcabines2(null);
    setqtdcabines3(null);
    setqtdcabines4(null);
    setqtdcabines5(null);
    setqtdcabines6(null);

    setnomeempresa();

    setcontato();
    setnumerocontato();
    setcontato2();
    setnumerocontato2();
    settipodecontrato();
    setnlocal();
    setnorcamento();
    setncontrato();

    setobs();
    setobs2();
    setobs3();
    setobs4();
    setobs5();
    setobs6();

    setSelectedManut();
    setSelectedManut2();
    setSelectedManut3();
    setSelectedManut4();
    setSelectedManut5();
    setSelectedManut6();

    setSelectedPeriodo();
    setSelectedPeriodo2();
    setSelectedPeriodo3();
    setSelectedPeriodo4();
    setSelectedPeriodo5();
    setSelectedPeriodo6();

    setSelectedProduto();
    setSelectedProduto2();
    setSelectedProduto3();
    setSelectedProduto4();
    setSelectedProduto5();
    setSelectedProduto6();

    setValorUnitario(null);
    setValorUnitario2(null);
    setValorUnitario3(null);
    setValorUnitario4(null);
    setValorUnitario5(null);
    setValorUnitario6(null);

    setvalortotal(null);
    setvalortotal2(null);
    setvalortotal3(null);
    setvalortotal4(null);
    setvalortotal5(null);
    setvalortotal6(null);

    console.log("Limpando o contrato...");

    // Fechar o modal após a confirmação
    setLimparModalVisible(false);
  };

  //Estados de Carregamento padrão
  const [selectedProduto, setSelectedProduto] = useState();
  const [selectedProduto2, setSelectedProduto2] = useState();
  const [selectedProduto3, setSelectedProduto3] = useState();
  const [selectedProduto4, setSelectedProduto4] = useState();
  const [selectedProduto5, setSelectedProduto5] = useState();
  const [selectedProduto6, setSelectedProduto6] = useState();

  const [selectedManut, setSelectedManut] = useState();
  const [selectedManut2, setSelectedManut2] = useState();
  const [selectedManut3, setSelectedManut3] = useState();
  const [selectedManut4, setSelectedManut4] = useState();
  const [selectedManut5, setSelectedManut5] = useState();
  const [selectedManut6, setSelectedManut6] = useState();

  const [selectedPeriodo, setSelectedPeriodo] = useState();
  const [selectedPeriodo2, setSelectedPeriodo2] = useState();
  const [selectedPeriodo3, setSelectedPeriodo3] = useState();
  const [selectedPeriodo4, setSelectedPeriodo4] = useState();
  const [selectedPeriodo5, setSelectedPeriodo5] = useState();
  const [selectedPeriodo6, setSelectedPeriodo6] = useState();

  const [values, setValues] = useState({
    valortotal: undefined,
    valortotal2: undefined,
    valortotal3: undefined,
    valortotal4: undefined,
    valortotal5: undefined,
    valortotal6: undefined,
    valorunitario: undefined,
    valorunitario2: undefined,
    valorunitario3: undefined,
    valorunitario4: undefined,
    valorunitario5: undefined,
    valorunitario6: undefined,
    freteentrega: undefined,
    freteretirada: undefined,
    freteavulso: undefined,
  });

  const onChange = (id, val) => {
    setValues({ ...values, [id]: val });
  };

  const inputnorcamento = document.getElementById("norcamento")?.value || "";
  const inputncontrato = document.getElementById("ncontrato")?.value || "";
  const inputnomeempresa = document.getElementById("nomeempresa")?.value || "";

  const inputcontato = document.getElementById("contato")?.value || "";
  const inputnumerocontato =
    document.getElementById("numerocontato")?.value || "";

  const inputcontato2 = document.getElementById("contato2")?.value || "";
  const inputnumerocontato2 =
    document.getElementById("numerocontato2")?.value || "";

  const inputtipodecontrato =
    document.getElementById("tipodecontrato")?.value || "";

  const inputobsgeral = document.getElementById("obsgeral")?.value || "";

  const inputqtdcabines = document.getElementById("qtdcabines")?.value || "";
  const inputqtdcabines2 = document.getElementById("qtdcabines2")?.value || "";
  const inputqtdcabines3 = document.getElementById("qtdcabines3")?.value || "";
  const inputqtdcabines4 = document.getElementById("qtdcabines4")?.value || "";
  const inputqtdcabines5 = document.getElementById("qtdcabines5")?.value || "";
  const inputqtdcabines6 = document.getElementById("qtdcabines6")?.value || "";

  const inputobs = document.getElementById("obs")?.value || "";
  const inputobs2 = document.getElementById("obs2")?.value || "";
  const inputobs3 = document.getElementById("obs3")?.value || "";
  const inputobs4 = document.getElementById("obs4")?.value || "";
  const inputobs5 = document.getElementById("obs5")?.value || "";
  const inputobs6 = document.getElementById("obs6")?.value || "";

  const inputprodutos = selectedProduto || "";
  const inputprodutos2 = selectedProduto2 || "";
  const inputprodutos3 = selectedProduto3 || "";
  const inputprodutos4 = selectedProduto4 || "";
  const inputprodutos5 = selectedProduto5 || "";
  const inputprodutos6 = selectedProduto6 || "";

  const inputmanut = selectedManut || "";
  const inputmanut2 = selectedManut2 || "";
  const inputmanut3 = selectedManut3 || "";
  const inputmanut4 = selectedManut4 || "";
  const inputmanut5 = selectedManut5 || "";
  const inputmanut6 = selectedManut6 || "";

  const algumProdutoSelecionado =
    selectedProduto ||
    selectedProduto2 ||
    selectedProduto3 ||
    selectedProduto4 ||
    selectedProduto5 ||
    selectedProduto6;

  const [valorUnitario, setValorUnitario] = useState(values.valorunitario);
  const [valorUnitario2, setValorUnitario2] = useState(values.valorunitario2);
  const [valorUnitario3, setValorUnitario3] = useState(values.valorunitario3);
  const [valorUnitario4, setValorUnitario4] = useState(values.valorunitario4);
  const [valorUnitario5, setValorUnitario5] = useState(values.valorunitario5);
  const [valorUnitario6, setValorUnitario6] = useState(values.valorunitario6);

  const [valortotal, setvalortotal] = useState(values.valortotal);
  const [valortotal2, setvalortotal2] = useState(values.valortotal2);
  const [valortotal3, setvalortotal3] = useState(values.valortotal3);
  const [valortotal4, setvalortotal4] = useState(values.valortotal4);
  const [valortotal5, setvalortotal5] = useState(values.valortotal5);
  const [valortotal6, setvalortotal6] = useState(values.valortotal6);

  // API de Busca de Endereço de Instalação
  function instalacaoCEP() {
    if (cep) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const { data } = response;
          if (data.erro) {
            alert("CEP não encontrado. Verifique o CEP e tente novamente.");
          } else {
            setEnderecoinst(
              `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`
            );
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
        });
    } else {
      alert("Por favor, insira um CEP válido.");
    }
  }

  // Gerador de Tabela e PDF Mapeado
  const gerarPDF = () => {
    const data = [
      [
        "Quant.\nCabines",
        "Modelos(s)*",
        "Quant.\nManutenção.",
        "Observações\nSobre a Entrega",
      ],
    ];
    const rowDatas = [
      [inputqtdcabines, inputprodutos, inputmanut, inputobs],
      [inputqtdcabines2, inputprodutos2, inputmanut2, inputobs2],
      [inputqtdcabines3, inputprodutos3, inputmanut3, inputobs3],
      [inputqtdcabines4, inputprodutos4, inputmanut4, inputobs4],
      [inputqtdcabines5, inputprodutos5, inputmanut5, inputobs5],
      [inputqtdcabines6, inputprodutos6, inputmanut6, inputobs6],
    ];

    // Obtém a data atual do navegador
    const dataAtual = new Date();

    // Formata a data no formato desejado
    const dataFormatada = `${dataAtual.getDate()} de ${obterNomeMes(
      dataAtual.getMonth() + 1
    )} de ${dataAtual.getFullYear()}`;

    // Função para obter o nome do mês
    function obterNomeMes(mes) {
      const nomesMeses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ];
      return nomesMeses[mes - 1];
    }

    for (const rowData of rowDatas) {
      let isRowEmpty = true;

      for (let i = 0; i < rowData.length; i++) {
        if (i === 5 || i === 6) {
          // Verifica se o campo Valor Unitário e Valor Total é "R$ " seguido por espaços em branco
          if (rowData[i].startsWith("R$ ") && rowData[i].trim() === "R$") {
            rowData[i] = ""; // Remove o "R$"
          }
        }

        if (rowData[i]) {
          isRowEmpty = false;
          break;
        }
      }

      if (!isRowEmpty) {
        data.push(rowData);
      }
    }

    const pdf = new jsPDF("p", "px", "a4");

    const headerImage = new Image();
    headerImage.src = process.env.PUBLIC_URL + "/imagens/cabecalho.png";

    const insumoImage = new Image();
    insumoImage.src = process.env.PUBLIC_URL + "/imagens/insumo.png"; // Adding the insumo image

    const footerImage = new Image();
    footerImage.src = process.env.PUBLIC_URL + "/imagens/rodape.png";

    let imagesLoaded = 0;

    const addImagesToPDF = () => {
      imagesLoaded++;

      if (imagesLoaded === 3) {
        // Change to 3 for all images loaded
        const headerWidth = 450;
        const headerHeight = 100;
        const footerWidth = 450;
        const footerHeight = 48;

        pdf.addImage(headerImage, "PNG", 0, 0, headerWidth, headerHeight);

        if (data.length > 1) {
          const textXPosition = 11;
          const columnWidths = [30, 155, 70, 169];

          const titleFontSize = 8;
          const rowFontSize = 8;

          pdf.autoTable({
            head: [data[0]],
            body: data.slice(1),
            startY: headerHeight + 130,
            margin: { left: textXPosition },
            tableWidth: pdf.internal.pageSize.width - textXPosition * 2,
            columnStyles: {
              0: { columnWidth: columnWidths[0] },
              1: { columnWidth: columnWidths[1] },
              2: { columnWidth: columnWidths[2] },
              3: { columnWidth: columnWidths[3] },
              4: { columnWidth: columnWidths[4] },
              5: { columnWidth: columnWidths[5] },
              6: { columnWidth: columnWidths[6] },
            },
            tableLineWidth: 0.3,
            headStyles: { fontSize: titleFontSize, fillColor: [5, 10, 48] },
            bodyStyles: { fontSize: rowFontSize },
          });
        }

        pdf.addImage(
          footerImage,
          "PNG",
          0,
          pdf.internal.pageSize.height - footerHeight,
          footerWidth,
          footerHeight
        );

        pdf.setFontSize(9);

        // Função para desenhar uma linha com comprimento aleatório
        function drawRandomLine(x, y) {
          const randomLength = 100 + 323; // Ajuste os valores conforme necessário
          pdf.line(x, y, x + randomLength, y);
        }

        pdf
          .setFont("helvetica", "bold")
          .text(150, headerHeight + 10, `    GUIA DE ENTREGA: SISTEMA GESTÃO`);

        pdf.setFont("helvetica", "normal");

        pdf.text(190, headerHeight + 20, dataFormatada);

        // Coluna da direita
        const secondColumnX = 270;

        pdf
          .setFont("helvetica", "bold")
          .text(11, headerHeight + 30, `DADOS DE ENTREGA`);
        drawRandomLine(11, headerHeight + 35);
        pdf
          .setFont("helvetica", "normal")
          .text(
            30,
            headerHeight + 50,
            `Cliente | Razão Social: ${inputnomeempresa} `
          );
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 60, `Nº Orçamento: ${inputnorcamento} `);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 70, `Nº Contrato: ${inputncontrato}  `);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 80, `Endereço Instalação: ${enderecoinst}`);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 90, `Nº: ${nlocal}`);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 100, `CEP: ${cep}`);

        // Coluna da direita
        const secondColumnXDelivery = 270;

        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 50,
            `Nome Contato: ${inputcontato} `
          );

        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 60,
            `Contato de Instalação: ${inputnumerocontato}`
          );
        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 70,
            `Contato II: ${inputcontato2}`
          );
        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 80,
            `Contato de Instalação II: ${inputnumerocontato2} `
          );
        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 90,
            `Tipo de Contrato: ${inputtipodecontrato} `
          );

        pdf
          .setFont("helvetica", "bold")
          .text(11, headerHeight + 120, `PRODUTOS DESTE CONTRATO:`);
        drawRandomLine(11, headerHeight + 125);

        const textoYPosition = pdf.autoTable.previous.finalY + 5;

        pdf.setFontSize(7);
        pdf
          .setFont("helvetica", "normal")
          .text(11, textoYPosition + 10, `Observações: ${inputobsgeral}`);
        pdf
          .setFont("helvetica", "normal")
          .text(11, textoYPosition + 20, `Informações sobre a Entrega:`);
        pdf
          .setFont("helvetica", "bold")
          .text(
            11,
            textoYPosition + 30,
            `1 - Os itens citados na tabela foram entregues em plena condição de uso? SIM (  ) NÃO (  )\n2 - Os modelos recebidos são os contratados? SIM (  ) NÃO (  )\n3 - Confirmo perante minha assinatura que recebi os equipamentos contratados acima.`
          );
        drawRandomLine(11, textoYPosition + 50);

        function drawRandomLinee(x1, y, length) {
          const randomLength = length || 100; // Padrão para 100 se nenhum comprimento for fornecido
          const x2 = x1 + randomLength;
          pdf.line(x1, y, x2, y);

          // Adiciona um "X" no início da linha
          pdf.text(x1, y - 3, "X");
        }

        // Assinatura da Empresa
        drawRandomLinee(70, textoYPosition + 100, 100); // Ajuste o valor 150 conforme necessário para o comprimento desejado
        pdf
          .setFont("helvetica", "bold")
          .text(70, textoYPosition + 108, `     SISTEMA GESTÃO E MOBILE`);

        // Assinatura do Cliente
        drawRandomLinee(
          secondColumnX,
          textoYPosition + 100,
          100,
          `  ASSINATURA DO RESPONSAVEL`
        ); // Ajuste o valor 120 conforme necessário para o comprimento desejado
        pdf
          .setFont("helvetica", "bold")
          .text(
            secondColumnX,
            textoYPosition + 108,
            `      ASSINATURA DO RESPONSAVEL`
          );

        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);

        alert(
          'PDF gerado com sucesso! Clique em "OK" para abrir o PDF em uma nova aba.'
        );

        window.open(pdfUrl);
      }
    };

    headerImage.onload = () => {
      addImagesToPDF();
    };

    insumoImage.onload = () => {
      addImagesToPDF();
    };

    footerImage.onload = () => {
      addImagesToPDF();
    };
  };

  const calcularValorTotal = (qtd, valorUni) => {
    return qtd * valorUni;
  };

  const handleQuantidadeChange = (
    value,
    setQuantidade,
    setValorTotal,
    valorUni
  ) => {
    setQuantidade(value);
    const total = calcularValorTotal(value, valorUni);
    setValorTotal(total);
  };

  const handleValorUnitarioChange = (
    value,
    setValorUni,
    setValorTotal,
    qtd
  ) => {
    setValorUni(value);
    const total = calcularValorTotal(qtd, value);
    setValorTotal(total);
  };

  return (
    //Campos de Textos Diversos vou melhorar e arrumar essa bagunça
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Dados de Entrega" key="1">
        <h2>Entrega: Mandou bem! agora vamos a Logistica.</h2>
        <Row gutter={16} style={{ display: "flex", alignItems: "flex-start" }}>
          <Col xs={24} md={8} lg={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "2px" }}>Nº Orçamento:</span>
              <Input
                placeholder="Ex. 4748-23"
                id="norcamento"
                className="norcamento-input"
                value={norcamento}
                onChange={(e) => setnorcamento(e.target.value)}
              />
              <span style={{ marginBottom: "2px" }}>Nº Contrato:</span>
              <Input
                placeholder="Ex. 8423-23"
                id="ncontrato"
                className="ncontrato-input"
                value={ncontrato}
                onChange={(e) => setncontrato(e.target.value)}
              />
              <span style={{ marginBottom: "2px" }}>Nome Empresa:</span>
              <Input
                placeholder="Davos Sistema Personalizados Ltda"
                id="nomeempresa"
                className="nomeempresa-input"
                value={nomeempresa}
                onChange={(e) => setnomeempresa(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={24} md={8} lg={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "2px" }}>CEP Instalação:</span>
              <Input.Search
                placeholder="07242-130"
                id="cep"
                className="cep-input"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onSearch={instalacaoCEP}
              />
              <span style={{ marginBottom: "2px" }}>Nº Instalação:</span>
              <Input
                placeholder="Ex. 111"
                id="nlocal"
                className="nlocal-input"
                value={nlocal}
                onChange={(e) => setnlocal(e.target.value)}
              />
              <span style={{ marginBottom: "2px" }}>
                Endereço de Instalação:
              </span>
              <Input
                placeholder="R. Santa Isabel, Vila Sonia, Guarulhos/SP"
                value={enderecoinst}
                id="enderecoinst"
                className="enderecoinst-input"
                onChange={(e) => setEnderecoinst(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={24} md={8} lg={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ marginBottom: "10px" }}></span>
              <img src="/imagens/entrega.png" alt="" width="160" height="100" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                selectdjustify: "space-evenly",
                alignItems: "center",
                gap: "2px", // Espaçamento vertical entre os elementos
              }}
            >
              <div style={{ marginTop: "1px" }}>
                Selecione um produto antes de criar a Guia de Entrega!
              </div>

              <div>
                <Popconfirm
                  title="Deseja Limpar Form. Entrega?"
                  onConfirm={handleLimparInput}
                  onCancel={handleCancelarLimpar}
                  okText="Sim"
                  cancelText="Não"
                  visible={limparModalVisible}
                >
                  <Button danger onClick={() => setLimparModalVisible(true)}>
                    Limpar - Form. Entrega
                  </Button>
                </Popconfirm>

                <Button
                  type="primary"
                  onClick={gerarPDF}
                  disabled={!algumProdutoSelecionado}
                  style={{ marginLeft: "10px" }}
                >
                  Finalizar Form. Entrega
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </TabPane>

      <TabPane tab="Contatos e Observações" key="2">
        <h2>Contatos e Informações: Emissão da Guia de Entrega</h2>
        <Row gutter={10} style={{ display: "flex", alignItems: "flex-start" }}>
          <Col xs={24} md={8} lg={8}>
            <div>
              <span style={{ marginBottom: "2px" }}>Telefone contato I:</span>
              <Input
                placeholder="11 95720-7168"
                id="numerocontato"
                className="numerocontato-input"
                value={numerocontato}
                onChange={(e) => setnumerocontato(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Nome contato I:</span>
              <Input
                placeholder="Thais Maciel"
                id="contato"
                className="contato-input"
                value={contato}
                onChange={(e) => setcontato(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Telefone contato II:</span>
              <Input
                placeholder="11 95720-7199"
                id="numerocontato2"
                className="numerocontato2-input"
                value={numerocontato2}
                onChange={(e) => setnumerocontato2(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Nome contato II:</span>
              <Input
                placeholder="Edvam Santos"
                id="contato2"
                className="contato2-input"
                value={contato2}
                onChange={(e) => setcontato2(e.target.value)}
              />
            </div>
          </Col>

          <Col xs={24} md={8} lg={8}>
            <div>
              <span style={{ marginBottom: "1px" }}>Tipo de Contrato:</span>
              <Input
                placeholder="Obra ou Evento"
                id="tipodecontrato"
                className="tipodecontrato-input"
                value={tipodecontrato}
                onChange={(e) => settipodecontrato(e.target.value)}
              />
              <span style={{ marginBottom: "1px" }}>Observações:</span>
              <TextArea
                rows={6}
                placeholder="Limite de no máximo 75 caracteres"
                maxLength={75}
                id="obsgeral"
                className="obsgeral-input"
                value={obsgeral}
                onChange={(e) => setobsgeral(e.target.value)}
              />
            </div>
          </Col>

          <Col xs={24} md={8} lg={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ marginBottom: "10px" }}></span>
              <img
                src="/imagens/entrega2.png"
                alt=""
                width="230"
                height="150"
              />
              <div style={{ marginTop: "1px" }}>
                Dica do Guru: Observações ajudam a facilitar a Entrega!
              </div>
            </div>
          </Col>
        </Row>
      </TabPane>

      <TabPane tab="Produtos" key="3">
        <h2>Seleção dos Produtos: Emissão da Guia de Entrega</h2>
        <Row gutter={16} style={{ display: "flex", alignItems: "flex-start" }}>
          <Col xs={24} md={8} lg={2} flex={1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "9px" }}>Quantidade:</span>
              <InputNumber
                id="qtdcabines"
                className="qtdcabines-input"
                min={1}
                value={qtdcabines}
                onChange={(value) =>
                  handleQuantidadeChange(
                    value,
                    setqtdcabines,
                    setvalortotal,
                    valorUnitario
                  )
                }
              />

              <span style={{ marginBottom: "9px" }}></span>
              <InputNumber
                id="qtdcabines2"
                className="qtdcabines2-input"
                min={1}
                value={qtdcabines2}
                onChange={(value) =>
                  handleQuantidadeChange(
                    value,
                    setqtdcabines2,
                    setvalortotal2,
                    valorUnitario2
                  )
                }
              />

              <span style={{ marginBottom: "9px" }}></span>
              <InputNumber
                id="qtdcabines3"
                className="qtdcabines3-input"
                min={1}
                value={qtdcabines3}
                onChange={(value) =>
                  handleQuantidadeChange(
                    value,
                    setqtdcabines3,
                    setvalortotal3,
                    valorUnitario3
                  )
                }
              />

              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                id="qtdcabines4"
                className="qtdcabines4-input"
                min={1}
                value={qtdcabines4}
                onChange={(value) =>
                  handleQuantidadeChange(
                    value,
                    setqtdcabines4,
                    setvalortotal4,
                    valorUnitario4
                  )
                }
              />

              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                id="qtdcabines5"
                className="qtdcabines5-input"
                min={1}
                value={qtdcabines5}
                onChange={(value) =>
                  handleQuantidadeChange(
                    value,
                    setqtdcabines5,
                    setvalortotal5,
                    valorUnitario5
                  )
                }
              />

              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                id="qtdcabines6"
                className="qtdcabines6-input"
                min={1}
                value={qtdcabines6}
                onChange={(value) =>
                  handleQuantidadeChange(
                    value,
                    setqtdcabines6,
                    setvalortotal6,
                    valorUnitario6
                  )
                }
              />
            </div>
          </Col>
          <Col xs={24} md={8} lg={7}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "8px" }}>Descrição do Produto:</span>
              <Select
                placeholder="Lista de produtos"
                id="produtos"
                value={selectedProduto}
                onChange={(value) => setSelectedProduto(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Cabine Sanitaria Portatil Modelo Standard" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Extra Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Convencional" />
                <Select.Option value="Sanitario Portatil Chuveiro" />
                <Select.Option value="Sanitario Portatil Kross" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Lista de produtos"
                id="produtos2"
                value={selectedProduto2}
                onChange={(value) => setSelectedProduto2(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Cabine Sanitaria Portatil Modelo Standard" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Extra Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Convencional" />
                <Select.Option value="Sanitario Portatil Chuveiro" />
                <Select.Option value="Sanitario Portatil Kross" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Lista de produtos"
                id="produtos3"
                value={selectedProduto3}
                onChange={(value) => setSelectedProduto3(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Cabine Sanitaria Portatil Modelo Standard" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Extra Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Convencional" />
                <Select.Option value="Sanitario Portatil Chuveiro" />
                <Select.Option value="Sanitario Portatil Kross" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Lista de produtos"
                value={selectedProduto4}
                id="produtos4"
                onChange={(value) => setSelectedProduto4(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Cabine Sanitaria Portatil Modelo Standard" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Extra Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Convencional" />
                <Select.Option value="Sanitario Portatil Chuveiro" />
                <Select.Option value="Sanitario Portatil Kross" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Lista de produtos"
                id="produtos5"
                value={selectedProduto5}
                onChange={(value) => setSelectedProduto5(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Cabine Sanitaria Portatil Modelo Standard" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Extra Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Convencional" />
                <Select.Option value="Sanitario Portatil Chuveiro" />
                <Select.Option value="Sanitario Portatil Kross" />
              </Select>

              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Lista de produtos"
                id="produtos6"
                value={selectedProduto6}
                onChange={(value) => setSelectedProduto6(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Cabine Sanitaria Portatil Modelo Standard" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Extra Luxo" />
                <Select.Option value="Cabine Sanitaria Portatil Modelo Convencional" />
                <Select.Option value="Sanitario Portatil Chuveiro" />
                <Select.Option value="Sanitario Portatil Kross" />
              </Select>
            </div>
          </Col>
          <Col xs={24} md={8} lg={3} flex={1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "8px" }}>Quant. Manutenção</span>
              <Select
                placeholder="Manutenções"
                id="manutencoes"
                value={selectedManut}
                onChange={(value) => setSelectedManut(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="0x Semana" />
                <Select.Option value="1x Semana" />
                <Select.Option value="2x Semana" />
                <Select.Option value="3x Semana" />
                <Select.Option value="4x Semana" />
                <Select.Option value="5x Semana" />
                <Select.Option value="6x Semana" />
                <Select.Option value="7x Semana" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Manutenções"
                id="manutencoes2"
                value={selectedManut2}
                onChange={(value) => setSelectedManut2(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="0x Semana" />
                <Select.Option value="1x Semana" />
                <Select.Option value="2x Semana" />
                <Select.Option value="3x Semana" />
                <Select.Option value="4x Semana" />
                <Select.Option value="5x Semana" />
                <Select.Option value="6x Semana" />
                <Select.Option value="7x Semana" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Manutenções"
                id="manutencoes3"
                value={selectedManut3}
                onChange={(value) => setSelectedManut3(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="0x Semana" />
                <Select.Option value="1x Semana" />
                <Select.Option value="2x Semana" />
                <Select.Option value="3x Semana" />
                <Select.Option value="4x Semana" />
                <Select.Option value="5x Semana" />
                <Select.Option value="6x Semana" />
                <Select.Option value="7x Semana" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Manutenções"
                id="manutencoes4"
                value={selectedManut4}
                onChange={(value) => setSelectedManut4(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="0x Semana" />
                <Select.Option value="1x Semana" />
                <Select.Option value="2x Semana" />
                <Select.Option value="3x Semana" />
                <Select.Option value="4x Semana" />
                <Select.Option value="5x Semana" />
                <Select.Option value="6x Semana" />
                <Select.Option value="7x Semana" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Manutenções"
                id="manutencoes5"
                value={selectedManut5}
                onChange={(value) => setSelectedManut5(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="0x Semana" />
                <Select.Option value="1x Semana" />
                <Select.Option value="2x Semana" />
                <Select.Option value="3x Semana" />
                <Select.Option value="4x Semana" />
                <Select.Option value="5x Semana" />
                <Select.Option value="6x Semana" />
                <Select.Option value="7x Semana" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Manutenções"
                id="manutencoes6"
                value={selectedManut6}
                onChange={(value) => setSelectedManut6(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="0x Semana" />
                <Select.Option value="1x Semana" />
                <Select.Option value="2x Semana" />
                <Select.Option value="3x Semana" />
                <Select.Option value="4x Semana" />
                <Select.Option value="5x Semana" />
                <Select.Option value="6x Semana" />
                <Select.Option value="7x Semana" />
                <Select.Option value="Outros" />
              </Select>
            </div>
          </Col>
          <Col xs={24} md={8} lg={3} flex={1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "9px" }}>Observação:</span>
              <Input
                id="obs"
                className="obs-input"
                value={obs}
                onChange={(e) => setobs(e.target.value)}
              />

              <span style={{ marginBottom: "8px" }}></span>
              <Input
                id="obs2"
                className="obs2-input"
                value={obs2}
                onChange={(e) => setobs2(e.target.value)}
              />

              <span style={{ marginBottom: "8px" }}></span>
              <Input
                id="obs3"
                className="obs3-input"
                value={obs3}
                onChange={(e) => setobs3(e.target.value)}
              />

              <span style={{ marginBottom: "8px" }}></span>
              <Input
                id="obs4"
                className="obs4-input"
                value={obs4}
                onChange={(e) => setobs4(e.target.value)}
              />

              <span style={{ marginBottom: "8px" }}></span>
              <Input
                id="obs5"
                className="obs5-input"
                value={obs5}
                onChange={(e) => setobs5(e.target.value)}
              />

              <span style={{ marginBottom: "8px" }}></span>
              <Input
                id="obs6"
                className="obs6-input"
                value={obs6}
                onChange={(e) => setobs6(e.target.value)}
              />
            </div>
          </Col>
          <Col xs={24} md={8} lg={3} flex={1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "8px" }}>Periodo</span>
              <Select
                placeholder="Periodo"
                id="periodo"
                value={selectedPeriodo}
                onChange={(value) => setSelectedPeriodo(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Diaria" />
                <Select.Option value="Quinzenal" />
                <Select.Option value="Mensal" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Periodo"
                id="periodo2"
                value={selectedPeriodo2}
                onChange={(value) => setSelectedPeriodo2(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Diaria" />
                <Select.Option value="Quinzenal" />
                <Select.Option value="Mensal" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Periodo"
                id="periodo3"
                value={selectedPeriodo3}
                onChange={(value) => setSelectedPeriodo3(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Diaria" />
                <Select.Option value="Quinzenal" />
                <Select.Option value="Mensal" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Periodo"
                id="periodo4"
                value={selectedPeriodo4}
                onChange={(value) => setSelectedPeriodo4(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Diaria" />
                <Select.Option value="Quinzenal" />
                <Select.Option value="Mensal" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Periodo"
                id="periodo5"
                value={selectedPeriodo5}
                onChange={(value) => setSelectedPeriodo5(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Diaria" />
                <Select.Option value="Quinzenal" />
                <Select.Option value="Mensal" />
                <Select.Option value="Outros" />
              </Select>
              <span style={{ marginBottom: "8px" }}></span>
              <Select
                placeholder="Periodo"
                id="periodo6"
                value={selectedPeriodo6}
                onChange={(value) => setSelectedPeriodo6(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Diaria" />
                <Select.Option value="Quinzenal" />
                <Select.Option value="Mensal" />
                <Select.Option value="Outros" />
              </Select>
            </div>
          </Col>
          <Col xs={24} md={8} lg={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "8px" }}>Valor Unitario:</span>
              <InputNumber
                className="valorunitario-input"
                id="valorunitario"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) =>
                  handleValorUnitarioChange(
                    val,
                    setValorUnitario,
                    setvalortotal,
                    qtdcabines
                  )
                }
                value={valorUnitario}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valorunitario2-input"
                id="valorunitario2"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) =>
                  handleValorUnitarioChange(
                    val,
                    setValorUnitario2,
                    setvalortotal2,
                    qtdcabines2
                  )
                }
                value={valorUnitario2}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valorunitario3-input"
                id="valorunitario3"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) =>
                  handleValorUnitarioChange(
                    val,
                    setValorUnitario3,
                    setvalortotal3,
                    qtdcabines3
                  )
                }
                value={valorUnitario3}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valorunitario4-input"
                id="valorunitario4"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) =>
                  handleValorUnitarioChange(
                    val,
                    setValorUnitario4,
                    setvalortotal4,
                    qtdcabines4
                  )
                }
                value={valorUnitario4}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valorunitario5-input"
                id="valorunitario5"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) =>
                  handleValorUnitarioChange(
                    val,
                    setValorUnitario5,
                    setvalortotal5,
                    qtdcabines5
                  )
                }
                value={valorUnitario5}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valorunitario6-input"
                id="valorunitario6"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) =>
                  handleValorUnitarioChange(
                    val,
                    setValorUnitario6,
                    setvalortotal6,
                    qtdcabines6
                  )
                }
                value={valorUnitario6}
              />
            </div>
          </Col>

          <Col xs={24} md={8} lg={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "8px" }}>Valor Total:</span>
              <InputNumber
                className="valortotal-input"
                id="valortotal"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setvalortotal(val);
                  onChange("valortotal", val);
                }}
                value={valortotal}
                readOnly
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valortotal2-input"
                id="valortotal2"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setvalortotal2(val);
                  onChange("valortotal2", val);
                }}
                value={valortotal2}
                readOnly
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valortotal3-input"
                id="valortotal3"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setvalortotal3(val);
                  onChange("valortotal3", val);
                }}
                value={valortotal3}
                readOnly
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valortotal4-input"
                id="valortotal4"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setvalortotal4(val);
                  onChange("valortotal4", val);
                }}
                value={valortotal4}
                readOnly
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valortotal5-input"
                id="valortotal5"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setvalortotal5(val);
                  onChange("valortotal5", val);
                }}
                value={valortotal5}
                readOnly
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              ></div>
              <span style={{ marginBottom: "8px" }}></span>
              <InputNumber
                className="valortotal6-input"
                id="valortotal6"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setvalortotal6(val);
                  onChange("valortotal6", val);
                }}
                value={valortotal6}
                readOnly
              />
            </div>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default App;
