import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho"

const estadoInicial = []

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial)
    const [quantidade, setQuantidade] = useState(0)
    const [valorTotal, setValorTotal] = useState(0)

    const { totalTemp, quantidadeTemp } = useMemo(() => {
        return carrinho.reduce((acumulador, produto) => ({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.quantidade * produto.preco
        }), { // Valor inicial do Acumulador  ->  array.reduce(callback(acumulador, produto), valorInicial);
            quantidadeTemp: 0,
            totalTemp: 0
        })
    }, [carrinho])

    useEffect(() => {
        setQuantidade(quantidadeTemp)
        setValorTotal(totalTemp)

    }) // Após a virgula tinha um [carrinho] usado antes de colocar o useMemo, pois la no useMemo ja estamos passando o [carrinho] para ser analisado se tem mudanças

    return (
        <CarrinhoContext.Provider value={{ carrinho, dispatch, quantidade, valorTotal }} >
            {children}
        </CarrinhoContext.Provider>
    )
}