import { Cardapio } from "./classCardapio.js";

const itensExtra = [ // Objeto com os itens extras
    'chantily',
    'queijo'
]
const mtdPgtAceitos = [ // Objeto com as formas de pagamento
    'dinheiro',
    'credito',
    'debito'
];
const cardapio = [ // Objeto com os itens do cardápio
    new Cardapio ('cafe','Café',3),
    new Cardapio ('chantily','Chantily (extra do Café)',1.5),
    new Cardapio ('suco','Suco Natural',6.2),
    new Cardapio ('sanduiche','Sanduíche',6.5),
    new Cardapio ('queijo','Queijo (extra do Sanduíche)',2),
    new Cardapio ('salgado','Salgado',7.25),
    new Cardapio ('combo1','1 Suco e 1 Sanduíche',9.5),
    new Cardapio ('combo2','1 Café e 1 Sanduíche',7.5)
];

class Verificacao { // Classe para realizar todas as verificações necessárias
    // Verifica se o método de pagamento é aceito na lanchonete
    verificaMetodoDePagamento(mtdPgt) {
        let result = mtdPgtAceitos.includes(mtdPgt) ? true : false;
        return result;
    }
    // Verifica os itens pedidos estão de forma correta
    verificaItens(itens) {        
        if (itens === undefined || itens.length == 0){
            return 'semItens';
        }else{
            if(typeof(itens) === 'object'){
                let testeVirgula;
                for(let i = 0; i < itens.length;i++){
                    testeVirgula = itens[i].includes(',');
                    if(!testeVirgula) {
                        return 'itensInvalidos';
                    }
                }
                return 'itensValidos';
            }else {
                return 'itensInvalidos';
            }
        }
    }
    // Verifica se os itens pedidos existem no cardápio
    verificaItemCardapio(pedido) {
        return cardapio.some(value => value.codigo.includes(pedido)? true : false);
    }
    // Verifica se os itens extras existem no cardápio
    verificaItemExtra(pedido) {
        return itensExtra.includes(pedido)? true : false;
    }
    // Verifica se o item extra tem o item principal no pedido
    verificaExtraValido(pedido,pedidos) {
        if (pedido === 'chantily') {
            return pedidos.includes('cafe')? true : false;
        }else {
            return pedidos.includes('sanduiche')? true : false;
        }
    }
    // Pega as valores dos itens do pedido para o cálculo
    getValorPedido (pedido, qtd) {
        let indice = cardapio.findIndex(function(value){
            return value.codigo === pedido;
        })
        return (cardapio[indice].valor * qtd);
    }
}

export { Verificacao };