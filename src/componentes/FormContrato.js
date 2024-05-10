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
  const [cepp2, setCepp2] = useState("");
  const [enderecoinst, setEnderecoinst] = useState("");
  const [enderecofat, setEnderecofat] = useState("");
  const [cno, setcno] = useState("");
  const [ccm, setccm] = useState("");
  const [contatocobranca, setcontatocobranca] = useState("");
  const [telcontatocobranca, settelcontatocobranca] = useState("");
  const [pc, setpc] = useState("");
  const [sfobras, setsfobras] = useState("");
  const [cnpj, setcnpj] = useState("");
  const [ie, setie] = useState("");

  const [rg, setrg] = useState("");
  const [cpf, setcpf] = useState("");

  const [nomecliente, setnomecliente] = useState("");
  const [nomeempresa, setnomeempresa] = useState("");
  const [email, setemail] = useState("");

  const [contato, setcontato] = useState("");
  const [numerocontato, setnumerocontato] = useState("");

  const [contato2, setcontato2] = useState("");
  const [numerocontato2, setnumerocontato2] = useState("");

  const [tipodecontrato, settipodecontrato] = useState("");
  const [nlocal, setnlocal] = useState("");
  const [nflocal, setnflocal] = useState("");
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
    setSelectedPagamento();

    setEnderecoinst();
    setCep();
    setCepp2();

    setqtdcabines(null);
    setqtdcabines2(null);
    setqtdcabines3(null);
    setqtdcabines4(null);
    setqtdcabines5(null);
    setqtdcabines6(null);

    setnomecliente();
    setnomeempresa();
    setemail();
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
  const inputncontrato = document.getElementById("ncontrato")?.value || "";
  const inputnomeempresa = document.getElementById("nomeempresa")?.value || "";
  const inputemail = document.getElementById("email")?.value || "";

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

  // API de Busca de Endereço de Cobrança
  function cobrançaCEP() {
    if (cepp2) {
      axios
        .get(`https://viacep.com.br/ws/${cepp2}/json/`)
        .then((response) => {
          const { data } = response;
          if (data.erro) {
            alert("CEP não encontrado. Verifique o CEP e tente novamente.");
          } else {
            setEnderecofat(
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
          const columnWidths = [30, 155, 50, 50, 40, 55, 44];

          const titleFontSize = 8;
          const rowFontSize = 8;

          pdf.autoTable({
            head: [data[0]],
            body: data.slice(1),
            startY: headerHeight + 240,
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
          .text(150, headerHeight + 10, `CONTRATO DE LOCAÇÃO: SISTEMA GESTÃO`);

        pdf.setFont("helvetica", "normal");

        pdf.text(190, headerHeight + 20, dataFormatada);

        pdf.setFontSize(8);

        pdf
          .setFont("helvetica", "bold")
          .text(11, headerHeight + 35, `DADOS DO CLIENTE`);
        drawRandomLine(11, headerHeight + 40);

        // Coluna da esquerda
        pdf
          .setFont("helvetica", "normal")
          .text(
            30,
            headerHeight + 50,
            `Locatária / Contratante: ${inputnomeempresa} `
          );

        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 60, `End. de Faturamento: ${enderecofat} `);

        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 70, `Nº: ${nflocal}`);

        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 80, `Estado: SP`);

        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 90, `CEP: ${cepp2}`);

        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 100, `E-mail: ${inputemail} `);

        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 110, `CNPJ: ${cnpj}`);

        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 120, `CPF: ${cpf}`);

        pdf
          .setFont("helvetica", "normal")
          .text(
            30,
            headerHeight + 130,
            `Forma de Pagamento: ${imputpagamento}`
          );

        // Coluna da direita
        const secondColumnX = 270;
        pdf.setFontSize(8);
        pdf
          .setFont("helvetica", "normal")
          .text(secondColumnX, headerHeight + 50, `RG: ${rg}`);

        pdf
          .setFont("helvetica", "normal")
          .text(secondColumnX, headerHeight + 60, `CNO: ${cno}`);

        pdf
          .setFont("helvetica", "normal")
          .text(secondColumnX, headerHeight + 70, `Inscrição Estadual: ${ie}`);

        pdf
          .setFont("helvetica", "normal")
          .text(secondColumnX, headerHeight + 80, `CCM: ${ccm}`);
        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnX,
            headerHeight + 90,
            `Contato: ${contatocobranca}`
          );
        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnX,
            headerHeight + 100,
            `Contato Cobrança: ${telcontatocobranca}`
          );
        pdf
          .setFont("helvetica", "normal")
          .text(secondColumnX, headerHeight + 110, `Pedido de Compra: ${pc}`);
        pdf
          .setFont("helvetica", "normal")
          .text(secondColumnX, headerHeight + 120, `SFobras: ${sfobras}`);

        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnX,
            headerHeight + 130,
            `Envio de nota e boleto: ${inputemail}`
          );

        pdf
          .setFont("helvetica", "bold")
          .text(11, headerHeight + 145, `DADOS DE ENTREGA`);
        drawRandomLine(11, headerHeight + 150);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 160, `Cliente: ${inputnomecliente} `);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 170, `Nº Orçamento: ${inputnorcamento} `);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 180, `Nº Contrato: ${inputncontrato}  `);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 190, `Endereço Instalação: ${enderecoinst}`);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 200, `Nº: ${nlocal}`);
        pdf
          .setFont("helvetica", "normal")
          .text(30, headerHeight + 210, `CEP: ${cep}`);

        // Coluna da direita
        const secondColumnXDelivery = 270;

        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 160,
            `Nome Contato: ${inputcontato} `
          );

        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 170,
            `Contato de Instalação: ${inputnumerocontato}`
          );
        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 180,
            `Contato II: ${inputcontato2}`
          );
        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 190,
            `Contato de Instalação II: ${inputnumerocontato2} `
          );
        pdf
          .setFont("helvetica", "normal")
          .text(
            secondColumnXDelivery,
            headerHeight + 200,
            `Tipo de Contrato: ${inputtipodecontrato} `
          );

        pdf
          .setFont("helvetica", "bold")
          .text(11, headerHeight + 230, `PRODUTOS DESTE CONTRATO:`);
        drawRandomLine(11, headerHeight + 235);

        const textoYPosition = pdf.autoTable.previous.finalY + 5;

        pdf.setFontSize(7);
        pdf
          .setFont("helvetica", "normal")
          .text(11, textoYPosition + 10, `Observações: ${inputobsgeral}`);
        pdf
          .setFont("helvetica", "normal")
          .text(
            11,
            textoYPosition + 30,
            `1.0. Clausula ou Observação (ESCOLHA TOTAL DO CLIENTE)`
          );
        pdf
          .setFont("helvetica", "bold")
          .text(
            22,
            textoYPosition + 40,
            `Reajuste: Na periodicidade mínima prevista em lei, de acordo com a variação do IPC-FIPE ou outro índice oficial que reflita a inflação do período de Locação.`
          );
        drawRandomLine(11, textoYPosition + 45);

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
      <TabPane tab="Emissão de Contrato" key="1">
        <h2>Contrato: Cliente fechou? Otimo vamos trabalhar!</h2>
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
              <span style={{ marginBottom: "2px" }}>Nome do Cliente:</span>
              <Input
                placeholder="Ex. Edvam dos Santos"
                id="nomecliente"
                className="nomecliente-input"
                value={nomecliente}
                onChange={(e) => setnomecliente(e.target.value)}
              />
              <span style={{ marginBottom: "2px" }}>CNPJ:</span>
              <Input
                placeholder="03.434.448/0001-01"
                id="cnpj"
                className="cnpj-input"
                value={cnpj}
                onChange={(e) => setcnpj(e.target.value)}
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
              <span style={{ marginBottom: "2px" }}>E-mail:</span>
              <Input
                placeholder="edvamsantos444@gmail.com"
                id="email"
                className="email-input"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <span style={{ marginBottom: "2px" }}>IE:</span>
              <Input
                placeholder="456.123.123.456"
                id="ie"
                className="ie-input"
                value={ie}
                onChange={(e) => setie(e.target.value)}
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
              <span style={{ marginBottom: "2px" }}>CEP Faturamento:</span>
              <Input.Search
                placeholder="07045-300"
                id="cepp2"
                className="cepp2-input"
                value={cepp2}
                onChange={(e) => setCepp2(e.target.value)}
                onSearch={cobrançaCEP}
              />
              <span style={{ marginBottom: "2px" }}>Nº Faturamento:</span>
              <Input
                placeholder="Ex. 97"
                id="nflocal"
                className="nflocal-input"
                value={nflocal}
                onChange={(e) => setnflocal(e.target.value)}
              />
              <span style={{ marginBottom: "2px" }}>
                Endereço de Faturamento:
              </span>
              <Input
                placeholder="R. Santa Amelia, Vila Paraiso, Guarulhos/SP"
                value={enderecofat}
                id="enderecofat"
                className="enderecofat-input"
                onChange={(e) => setEnderecofat(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                selectdjustify: "space-evenly",
                alignItems: "center",
                gap: "4px", // Espaçamento vertical entre os elementos
              }}
            >
              <div style={{ marginTop: "30px" }}>
                Selecione um produto antes de criar o contrato!
              </div>

              <div>
                <Popconfirm
                  title="Deseja Limpar o Contrato?"
                  onConfirm={handleLimparInput}
                  onCancel={handleCancelarLimpar}
                  okText="Sim"
                  cancelText="Não"
                  visible={limparModalVisible}
                >
                  <Button danger onClick={() => setLimparModalVisible(true)}>
                    Limpar - Contrato
                  </Button>
                </Popconfirm>

                <Button
                  type="primary"
                  onClick={gerarPDF}
                  disabled={!algumProdutoSelecionado}
                  style={{ marginLeft: "10px" }}
                >
                  Finalizar Contrato
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </TabPane>

      <TabPane tab="Contatos e Outros" key="2">
        <h2>Informações do Contrato: Contatos e Outros</h2>
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

              <span style={{ marginBottom: "2px" }}>RG:</span>
              <Input
                placeholder="58.613.709-9"
                id="rg"
                className="rg-input"
                value={rg}
                onChange={(e) => setrg(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>CPF:</span>
              <Input
                placeholder="514.100.038-92"
                id="cpf"
                className="cpf-input"
                value={cpf}
                onChange={(e) => setcpf(e.target.value)}
              />
            </div>
          </Col>

          <Col xs={24} md={8} lg={8}>
            <div>
              <span style={{ marginBottom: "2px" }}>Forma de Pagamento:</span>
              <Select
                placeholder="Forma de Pagamento"
                id="pagamento"
                value={selectedPagamento}
                onChange={(value) => setSelectedPagamento(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Pix - Liberado apos comprovação financeira." />
              </Select>

              <span style={{ marginBottom: "2px" }}>Tipo de Contrato:</span>
              <Input
                placeholder="Obra ou Evento"
                id="tipodecontrato"
                className="tipodecontrato-input"
                value={tipodecontrato}
                onChange={(e) => settipodecontrato(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Pedido de Compra:</span>
              <Input
                placeholder="PC do Cliente"
                id="pc"
                className="pc-input"
                value={pc}
                onChange={(e) => setpc(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>CNO:</span>
              <Input
                placeholder="CNO do Cliente"
                id="cno"
                className="cno-input"
                value={cno}
                onChange={(e) => setcno(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>CCM:</span>
              <Input
                placeholder="CCM do Cliente"
                id="ccm"
                className="ccm-input"
                value={ccm}
                onChange={(e) => setccm(e.target.value)}
              />

              <span style={{ marginBottom: "5px" }}>Sfobras:</span>
              <Input
                placeholder="Sfobras do Cliente"
                id="sfobras"
                className="sfobras-input"
                value={sfobras}
                onChange={(e) => setsfobras(e.target.value)}
              />
            </div>
          </Col>

          <Col xs={24} md={8} lg={8}>
            <div>
              <span style={{ marginBottom: "2px" }}>Nome do Contato:</span>
              <Input
                placeholder="Luca Botini"
                id="contatocobranca"
                className="contatocobranca-input"
                value={contatocobranca}
                onChange={(e) => setcontatocobranca(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Contato Cobrança:</span>
              <Input
                placeholder="11 94036-5231"
                id="telcontatocobranca"
                className="telcontatocobranca-input"
                value={telcontatocobranca}
                onChange={(e) => settelcontatocobranca(e.target.value)}
              />

              <span style={{ marginBottom: "2px" }}>Observações:</span>
              <TextArea
                rows={2}
                placeholder="Limite de no máximo 75 caracteres"
                maxLength={75}
                id="obsgeral"
                className="obsgeral-input"
                value={obsgeral}
                onChange={(e) => setobsgeral(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span style={{ marginBottom: "1px" }}>
                  Dica do Guru: Sempre revise os dados antes de finalizar!
                </span>

                <img
                  src="/imagens/contrato.jpg"
                  alt=""
                  width="190"
                  height="120"
                />
                {/* <div style={{ marginTop: "1px" }}> */}
                {/* Dica do Guru: Sempre revise os dados antes de finalizar! */}
                {/* </div> */}
              </div>
            </div>
          </Col>
        </Row>
      </TabPane>

      <TabPane tab="Produtos" key="3">
        <h2>Seleção dos Produtos: Emissão do Contrato</h2>
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
