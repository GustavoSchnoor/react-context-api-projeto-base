export const ADD_PRODUTO = "ADD_PRODUTO";
export const REMOVE_PRODUTO = "REMOVE_PRODUTO";
export const UPDATE_QUANTIDADE = "UPDATE_QUANTIDADE";

export const carrinhoReducer = (state, action) => { // STATE é os produtos do carrinho |  ACTION é um objeto que tem o tipo de ação que vamos executar
    switch (action.type) { // type: Um identificador que descreve o tipo de ação a ser executada
        case ADD_PRODUTO:
            const novoProduto = action.payload // O conteúdo do payload dependendo do tipo de ação. Ao adicionar um produto, o payload contém o novo produto a ser adicionado.
            const produto = state.findIndex((item) => item.id === novoProduto.id)
            if (produto === -1) { // -1 é igual ao findIndex NAO ENCONTRAR um produto
                novoProduto.quantidade = 1;
                return [...state, novoProduto];
            } else {
                return state.map((item, index) =>
                    index === produto  // INDEX É IGUAL AO PRODUTO ?
                        ? { ...item, quantidade: item.quantidade + 1 } // SIM
                        : item                                 // NAO
                );
            }
        case REMOVE_PRODUTO:
            const produtoId = action.payload;
            return state.filter((item) => item.id !== produtoId);
        case UPDATE_QUANTIDADE:
            const { produtoId: id, quantidade } = action.payload;
            return state.map((item) =>
                item.id === id ? { ...item, quantidade } : item
            );
        default:
            return state


    }
}