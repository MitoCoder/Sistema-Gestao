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
  const [endereco, setEndereco] = useState("");

  const [nomecliente, setnomecliente] = useState("");
  const [nomeempresa, setnomeempresa] = useState("");
  const [email, setemail] = useState("");
  const [celular, setcelular] = useState("");
  const [fixo, setfixo] = useState("");
  const [tipodecontrato, settipodecontrato] = useState("");
  const [nlocal, setnlocal] = useState("");
  const [norcamento, setnorcamento] = useState("");

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
    setSelectedPZentrega();
    setSelectedPagamento();

    setEndereco();
    setCep();

    setqtdcabines(null);
    setqtdcabines2(null);
    setqtdcabines3(null);
    setqtdcabines4(null);
    setqtdcabines5(null);
    setqtdcabines6(null);

    setnomecliente();
    setnomeempresa();
    setemail();
    setcelular();
    setfixo();
    settipodecontrato();
    setnlocal();
    setnorcamento();

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

    setSelectedPagamento();

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

    setfreteentrega(null);
    setfreteretirada(null);
    setfreteavulso(null);

    console.log("Limpando o orçamento...");

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

  const [selectedPzEntrega, setSelectedPZentrega] = useState();

  const [selectedPagamento, setSelectedPagamento] = useState();

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

  const inputnomecliente = document.getElementById("nomecliente")?.value || "";
  const inputnorcamento = document.getElementById("norcamento")?.value || "";
  const inputnomeempresa = document.getElementById("nomeempresa")?.value || "";
  const inputemail = document.getElementById("email")?.value || "";
  const inputcelular = document.getElementById("celular")?.value || "";
  const inputfixo = document.getElementById("fixo")?.value || "";
  const inputtipodecontrato =
    document.getElementById("tipodecontrato")?.value || "";
  const inputnlocal = document.getElementById("nlocal")?.value || "";
  const inputobsend = document.getElementById("obsend")?.value || "";
  const inputvlentrega = document.getElementById("freteentrega")?.value || "";
  const inputvlretirada = document.getElementById("freteretirada")?.value || "";

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

  const inputvalorunitario =
    document.getElementById("valorunitario")?.value || "";
  const inputvalorunitario2 =
    document.getElementById("valorunitario2")?.value || "";
  const inputvalorunitario3 =
    document.getElementById("valorunitario3")?.value || "";
  const inputvalorunitario4 =
    document.getElementById("valorunitario4")?.value || "";
  const inputvalorunitario5 =
    document.getElementById("valorunitario5")?.value || "";
  const inputvalorunitario6 =
    document.getElementById("valorunitario6")?.value || "";

  const inputvalortotal = document.getElementById("valortotal")?.value || "";
  const inputvalortotal2 = document.getElementById("valortotal2")?.value || "";
  const inputvalortotal3 = document.getElementById("valortotal3")?.value || "";
  const inputvalortotal4 = document.getElementById("valortotal4")?.value || "";
  const inputvalortotal5 = document.getElementById("valortotal5")?.value || "";
  const inputvalortotal6 = document.getElementById("valortotal6")?.value || "";

  const inputprodutos = selectedProduto || "";
  const inputprodutos2 = selectedProduto2 || "";
  const inputprodutos3 = selectedProduto3 || "";
  const inputprodutos4 = selectedProduto4 || "";
  const inputprodutos5 = selectedProduto5 || "";
  const inputprodutos6 = selectedProduto6 || "";
  const inputpzentrega = selectedPzEntrega || "";

  const inputmanut = selectedManut || "";
  const inputmanut2 = selectedManut2 || "";
  const inputmanut3 = selectedManut3 || "";
  const inputmanut4 = selectedManut4 || "";
  const inputmanut5 = selectedManut5 || "";
  const inputmanut6 = selectedManut6 || "";

  const inputperiodo = selectedPeriodo || "";
  const inputperiodo2 = selectedPeriodo2 || "";
  const inputperiodo3 = selectedPeriodo3 || "";
  const inputperiodo4 = selectedPeriodo4 || "";
  const inputperiodo5 = selectedPeriodo5 || "";
  const inputperiodo6 = selectedPeriodo6 || "";
  const imputpagamento = selectedPagamento || "";

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

  const [freteentrega, setfreteentrega] = useState(values.freteentrega);
  const [freteretirada, setfreteretirada] = useState(values.freteretirada);
  const [freteavulso, setfreteavulso] = useState(values.freteavulso);

  // API de Busca de Endereço
  function buscarCEP() {
    if (cep) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const { data } = response;
          if (data.erro) {
            alert("CEP não encontrado. Verifique o CEP e tente novamente.");
          } else {
            setEndereco(
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
        "Observações",
        "Quant.\nManutenção.",
        "Período",
        "Valor\nUnitário",
        "Valor\nTotal",
      ],
    ];
    const rowDatas = [
      [
        inputqtdcabines,
        inputprodutos,
        inputobs,
        inputmanut,
        inputperiodo,
        inputvalorunitario,
        inputvalortotal,
      ],
      [
        inputqtdcabines2,
        inputprodutos2,
        inputobs2,
        inputmanut2,
        inputperiodo2,
        inputvalorunitario2,
        inputvalortotal2,
      ],
      [
        inputqtdcabines3,
        inputprodutos3,
        inputobs3,
        inputmanut3,
        inputperiodo3,
        inputvalorunitario3,
        inputvalortotal3,
      ],
      [
        inputqtdcabines4,
        inputprodutos4,
        inputobs4,
        inputmanut4,
        inputperiodo4,
        inputvalorunitario4,
        inputvalortotal4,
      ],
      [
        inputqtdcabines5,
        inputprodutos5,
        inputobs5,
        inputmanut5,
        inputperiodo5,
        inputvalorunitario5,
        inputvalortotal5,
      ],
      [
        inputqtdcabines6,
        inputprodutos6,
        inputobs6,
        inputmanut6,
        inputperiodo6,
        inputvalorunitario6,
        inputvalortotal6,
      ],
    ];

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
        const insumoWidth = 450;
        const insumoHeight = 80;

        pdf.addImage(headerImage, "PNG", 0, 0, headerWidth, headerHeight);

        if (data.length > 1) {
          const textXPosition = 11;
          const columnWidths = [30, 155, 50, 50, 40, 55, 44];

          const titleFontSize = 8;
          const rowFontSize = 8;

          pdf.autoTable({
            head: [data[0]],
            body: data.slice(1),
            startY: headerHeight + 145,
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
        pdf.addImage(
          insumoImage,
          "PNG",
          0,
          pdf.autoTable.previous.finalY + 4,
          insumoWidth,
          insumoHeight
        );

        pdf.setFontSize(8);

        pdf.text(185, headerHeight + 470, `www.sistemagestao.vercel.app`);
        pdf.text(175, headerHeight + 480, `FOTOS E ESPECIFICAÇÕES ABAIXO.`);

        pdf.setFontSize(9);

        pdf.text(
          11,
          headerHeight + 10,
          `Numero do Orçamento:${inputnorcamento}`
        );
        pdf.text(11, headerHeight + 30, `Á`);
        pdf.text(11, headerHeight + 40, `${inputnomeempresa}`);
        pdf.text(11, headerHeight + 50, `A/C: ${inputnomecliente}`);
        pdf.text(11, headerHeight + 60, `E-mail: ${inputemail}`);
        pdf.text(11, headerHeight + 70, `Cel: ${inputcelular}`);
        pdf.text(11, headerHeight + 80, `Fixo: ${inputfixo}`);
        pdf.text(
          11,
          headerHeight + 100,
          `Conforme solicitação de V.Sa. Apresentamos nossa proposta para fornecimento de equipamentos portáteis para locação: ${inputtipodecontrato}`
        );
        pdf.text(
          11,
          headerHeight + 110,
          `Endereço: ${endereco} | Nº ${inputnlocal} | CEP: ${cep}`
        );
        pdf.text(11, headerHeight + 120, `Observações: ${inputobsend}`);
        pdf.text(
          11,
          headerHeight + 140,
          `Nossos valores para locação de cabines sanitárias são:`
        );

        const textoYPosition = pdf.autoTable.previous.finalY + 90; // Ajuste o valor (20) conforme necessário para o espaço desejado entre a imagem e o texto

        pdf.text(160, textoYPosition + 2, `CONDIÇÕES DE ENTREGA E RETIRADA`);
        pdf.text(11, textoYPosition + 20, `FRETE DE ENTREGA | RETIRADA`);
        pdf.text(
          11,
          textoYPosition + 30,
          `Frete de entrega: ${inputvlentrega}`
        );
        pdf.text(
          11,
          textoYPosition + 40,
          `Frete de retirada: ${inputvlretirada}`
        );
        pdf.text(11, textoYPosition + 60, `PRAZO DE ENTREGA`);
        pdf.text(11, textoYPosition + 70, `${inputpzentrega}`);
        pdf.text(11, textoYPosition + 90, `CONDIÇÕES DE PAGAMENTO`);
        pdf.text(
          11,
          textoYPosition + 100,
          `Forma de Pagamento: ${imputpagamento}`
        );
        pdf.text(
          11,
          textoYPosition + 110,
          `Validade: Prazo da proposta de 07 dias`
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
      <TabPane tab="Dados do Cliente" key="1">
        <h2>Informações do Cliente: Emissão de Orçamento</h2>
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

              <span style={{ marginBottom: "2px" }}>Nome Empresa:</span>
              <Input
                placeholder="Davos Sistema Personalizados Ltda"
                id="nomeempresa"
                className="nomeempresa-input"
                value={nomeempresa}
                onChange={(e) => setnomeempresa(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Nome do Cliente:</span>
              <Input
                placeholder="Ex. Edvam dos Santos"
                id="nomecliente"
                className="nomecliente-input"
                value={nomecliente}
                onChange={(e) => setnomecliente(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>E-mail:</span>
              <Input
                placeholder="edvamsantos444@gmail.com"
                id="email"
                className="email-input"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Celular:</span>
              <Input
                placeholder="(11) 95720-7168"
                id="celular"
                className="celular-input"
                value={celular}
                onChange={(e) => setcelular(e.target.value)}
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
              <span style={{ marginBottom: "2px" }}>Telefone Fixo:</span>
              <Input
                placeholder="(11) 2486-1386"
                id="fixo"
                className="fixo-input"
                value={fixo}
                onChange={(e) => setfixo(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Tipo de Contrato:</span>
              <Input
                placeholder="Obra ou Evento"
                id="tipodecontrato"
                className="tipodecontrato-input"
                value={tipodecontrato}
                onChange={(e) => settipodecontrato(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Buscar CEP:</span>
              <Input.Search
                placeholder="07242-130"
                id="ceppp"
                className="cep-input"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onSearch={buscarCEP}
              />

              <span style={{ marginBottom: "2px" }}>Nº:</span>
              <Input
                placeholder="Ex. 8000"
                id="nlocal"
                className="nlocal-input"
                value={nlocal}
                onChange={(e) => setnlocal(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Endereço:</span>
              <Input
                placeholder="R. Santa Amelia, Vila Paraiso, Guarulhos/SP"
                value={endereco}
                id="endereco"
                className="endereco-input"
                onChange={(e) => setEndereco(e.target.value)}
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
              <span style={{ marginBottom: "1px" }}>Forma de Pagamento:</span>
              <Select
                placeholder="Forma de Pagamento"
                id="pagamento"
                value={selectedPagamento}
                onChange={(value) => setSelectedPagamento(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Pix - Liberado apos comprovação financeira." />
              </Select>

              <span style={{ marginBottom: "2px" }}>Observações:</span>
              <TextArea
                rows={4}
                placeholder="Limite de no máximo 75 caracteres"
                maxLength={75}
                id="obsend"
                className="obs-input"
                value={nomeempresa}
                onChange={(e) => setnomeempresa(e.target.value)}
              />
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
              <div style={{ marginTop: "25px" }}>
                Selecione um produto antes de criar um orçamento!
              </div>

              <div style={{ marginTop: "4px" }}>
                <Popconfirm
                  title="Deseja Limpar o Orçamento?"
                  onConfirm={handleLimparInput}
                  onCancel={handleCancelarLimpar}
                  okText="Sim"
                  cancelText="Não"
                  visible={limparModalVisible}
                >
                  <Button danger onClick={() => setLimparModalVisible(true)}>
                    Limpar - Orçamento
                  </Button>
                </Popconfirm>

                <Button
                  type="primary"
                  onClick={gerarPDF}
                  disabled={!algumProdutoSelecionado}
                  style={{ marginLeft: "10px" }}
                >
                  Finalizar Orçamento
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </TabPane>

      <TabPane tab="Entrega e Frete" key="2">
        <h2>Informações de Entrega: Entrega e Frete</h2>
        <Row gutter={10} style={{ display: "flex", alignItems: "center" }}>
          <Col xs={24} md={8} lg={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ marginBottom: "8px" }}>Frete de Entrega:</span>
              <InputNumber
                className="freteentrega-input"
                id="freteentrega"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setfreteentrega(val);
                  onChange("freteentrega", val);
                }}
                value={freteentrega}
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
              <span style={{ marginBottom: "8px" }}>Frete de Retirada:</span>
              <InputNumber
                className="freteretirada-input"
                id="freteretirada"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setfreteretirada(val);
                  onChange("freteretirada", val);
                }}
                value={freteretirada}
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
              <span style={{ marginBottom: "8px" }}>Frete de Avulso:</span>
              <InputNumber
                className="freteavulso-input"
                id="freteavulso"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace("R$ ", "").replace(/\./g, "")}
                onChange={(val) => {
                  setfreteavulso(val);
                  onChange("freteavulso", val);
                }}
                value={freteavulso}
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
              <span style={{ marginBottom: "8px" }}>Prazo de Entrega:</span>
              <Select
                placeholder="Prazo de Entrega"
                id="pzentrega"
                value={selectedPzEntrega}
                onChange={(value) => setSelectedPZentrega(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Entrega em ate 2 dias uteis apos pagamento." />
              </Select>
            </div>
          </Col>
          <Col xs={24} md={4} lg={7}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/imagens/entregafoto.png"
                alt=""
                width="260"
                height="180"
              />
            </div>
          </Col>
        </Row>
      </TabPane>

      <TabPane tab="Produtos" key="3">
        <h2>Seleção dos Produtos: Emissão do Orçamento</h2>
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
