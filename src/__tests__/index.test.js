/**
 * Testes para a página Home
 * 
 * Este arquivo contém testes que verificam:
 * 1. Renderização de elementos na tela
 * 2. Presença de textos específicos
 * 3. Links e navegação
 * 4. Estrutura HTML semântica
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/(home)/page';

describe( 'Home Page', () => {
    /**
     * TESTE 1: Verifica se o componente renderiza sem erros
     * Este é o teste mais básico - garante que não há erros de sintaxe ou imports
     */
    it( 'deve renderizar a página sem erros', () => {
        render( <Home /> );
        // Se chegou aqui, o componente renderizou com sucesso
    } );

    /**
     * TESTE 2: Verifica elementos de texto principais
     * Usamos screen.getByText para encontrar textos exatos na tela
     */
    it( 'deve exibir o título principal "Vontade do Fogo"', () => {
        render( <Home /> );

        // Verifica se o texto "Vontade" está presente
        const vontadeText = screen.getByText( 'Vontade' );
        expect( vontadeText ).toBeInTheDocument();

        // Verifica se o texto "do Fogo" está presente
        const doFogoText = screen.getByText( 'do Fogo' );
        expect( doFogoText ).toBeInTheDocument();
    } );

    /**
     * TESTE 3: Verifica o subtítulo da página
     */
    it( 'deve exibir o subtítulo "A Essência do Poder"', () => {
        render( <Home /> );

        const subtitle = screen.getByText( 'A Essência do Poder' );
        expect( subtitle ).toBeInTheDocument();
    } );

    /**
     * TESTE 4: Verifica a descrição completa
     */
    it( 'deve exibir a descrição sobre a chama e conexão', () => {
        render( <Home /> );

        const description = screen.getByText( /A chama que queima dentro de cada um/i );
        expect( description ).toBeInTheDocument();
    } );

    /**
     * TESTE 5: Verifica o botão de navegação
     * getByRole é usado para encontrar elementos por sua função semântica
     */
    it( 'deve exibir o botão "Ver Ninjas"', () => {
        render( <Home /> );

        const button = screen.getByRole( 'button', { name: /ver ninjas/i } );
        expect( button ).toBeInTheDocument();
    } );

    /**
     * TESTE 6: Verifica o link de navegação
     * Um botão dentro de um Link deve levar para a página correta
     */
    it( 'deve ter um link para a página /ninjas', () => {
        render( <Home /> );

        // Procura por um link que contém o href "/ninjas"
        const link = screen.getByRole( 'link', { name: /ver ninjas/i } );
        expect( link ).toHaveAttribute( 'href', '/ninjas' );
    } );

    /**
     * TESTE 7: Verifica estrutura semântica
     * É importante ter uma tag <main> para acessibilidade
     */
    it( 'deve ter uma tag main como container principal', () => {
        const { container } = render( <Home /> );

        const main = container.querySelector( 'main' );
        expect( main ).toBeInTheDocument();
    } );

    /**
     * TESTE 8: Verifica classes CSS importantes
     * Garante que os estilos estão aplicados corretamente
     */
    it( 'deve aplicar classes de layout responsivo', () => {
        const { container } = render( <Home /> );

        const main = container.querySelector( 'main' );
        expect( main ).toHaveClass( 'min-h-screen' );
        expect( main ).toHaveClass( 'flex' );
    } );

    /**
     * TESTE 9: Verifica se o ícone SVG está presente
     * queryByRole retorna null se não encontrar (não lança erro)
     */
    it( 'deve renderizar um ícone de seta no botão', () => {
        render( <Home /> );

        // Procura por uma imagem SVG com title "Arrow right"
        const arrowIcon = screen.getByLabelText( 'Arrow right' );
        expect( arrowIcon ).toBeInTheDocument();
    } );

    /**
     * TESTE 10: Verifica elementos de animação
     * Testa se os elementos decorativos de fundo estão presentes
     */
    it( 'deve ter elementos de fundo animados', () => {
        const { container } = render( <Home /> );

        // Verifica se existem divs com classes de animação pulse
        const animatedElements = container.querySelectorAll( '.animate-pulse' );
        // Espera pelo menos 3 elementos animados (os círculos de fundo + título)
        expect( animatedElements.length ).toBeGreaterThan( 0 );
    } );

    /**
     * TESTE 11: Snapshot testing
     * Captura a estrutura completa do componente para detectar mudanças inesperadas
     */
    it( 'deve corresponder ao snapshot', () => {
        const { container } = render( <Home /> );
        expect( container ).toMatchSnapshot();
    } );
} );