import { Verificacao } from "./classVerificacao.js";
// Gerando o cardapaio para futura utilização
class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        let verificandoInputs = new Verificacao();// Variável com objeto para executar as verificações

        if (verificandoInputs.verificaMetodoDePagamento(metodoDePagamento.toLowerCase())){// transforma o método de pagamento em minúsculo e verifica se é um método válido
            let retorno = verificandoInputs.verificaItens(itens);
            switch (retorno) {
                case 'semItens':
                    return 'Não há itens no carrinho de compra!';
                case 'itensInvalidos':
                    return 'Item inválido!';
                case 'itensValidos':
                    var pos = 0, pedidos = [], quantidade = [],itensAMais = [];
                    itens.forEach(item => { // Separa os itens em pedidos e suas respectivas quantidades
                        pedidos[pos] = item.split(",")[0];
                        quantidade[pos] = Number(item.split(",")[1]);
                        if (item.split(",")[2] != undefined){ // Verifica se não foi feito mais de uma quantidade no pedido, igual: ['cafe,1,2']
                            itensAMais[pos] = item.split(",")[2];
                        }
                        pos++;
                    })
                    break;
                default:
                    return 'Bug no sistema! Contato a equipe de suporte!'; // Nunca deve chegar aqui
            }
        }else {
            return 'Forma de pagamento inválida!';
        }

        if (itensAMais.length === 0) {
            let temCardapio,isExtra, extraValido,qtdValida,valorPedido = 0, retorno = null;
            pos = 0;
            pedidos.forEach(pedido => { // Verifica os valores de cada pedido
                temCardapio = verificandoInputs.verificaItemCardapio(pedido);
                isExtra = verificandoInputs.verificaItemExtra(pedido);
                qtdValida = (quantidade[pos] > 0 && Number.isInteger(quantidade[pos]) ? true: false);
                if(temCardapio) {
                    if(qtdValida){
                        if(isExtra){
                            extraValido = verificandoInputs.verificaExtraValido(pedido, pedidos);
                            if (extraValido){
                                valorPedido += verificandoInputs.getValorPedido(pedido,quantidade[pos]);
                            }else{
                                retorno = 'Item extra não pode ser pedido sem o principal';
                            }
                        }else{
                            valorPedido += verificandoInputs.getValorPedido(pedido,quantidade[pos]);
                        }
                    }else{
                        retorno = 'Quantidade inválida!';
                    }
                }else {
                    retorno = 'Item inválido!';
                }
                pos++;
            })

            if (retorno === null) { // Se não houve problemas, continua para o valor total
                let valorTotal = 0;
                switch (metodoDePagamento) {
                    case 'dinheiro':
                        valorTotal = valorPedido + (valorPedido * -0.05);
                        return 'R$ ' + valorTotal.toFixed(2).replace('.', ',');
                    case 'credito':
                        valorTotal = valorPedido + (valorPedido * 0.03);
                        return 'R$ ' + valorTotal.toFixed(2).replace('.', ',');
                    case 'debito':
                        valorTotal = valorPedido;
                        return 'R$ ' + valorTotal.toFixed(2).replace('.', ',');
                    default:
                        return 'Bug no sistema! Contato a equipe de suporte!'; //Nunca deve chegar aqui
                }
            } else {
                return retorno;
            }
        }else {
            return 'Quantidade inválida!';
        }
    }
}

export { CaixaDaLanchonete };