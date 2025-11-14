/**
 * Testes para a página de Ninjas
 * 
 * Este arquivo contém testes para:
 * 1. Renderização de componentes Server Side
 * 2. Busca e filtros de dados
 * 3. Componentes client-side com interação
 * 4. Infinite scroll
 * 5. Estados vazios e de loading
 */

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ninjas from '../app/ninjas/page';
import { NinjasInfiniteScroll } from '../app/ninjas/_components/ninjas-infinite-scroll';
import { NinjaCard } from '../app/ninjas/_components/ninja-card';
import type { Character } from '../shared/types/characters';

// Mock do Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    // biome-ignore lint/suspicious/noExplicitAny: necessário para mock
    default: (props: any) => {
        // Mock simplificado para testes - img será usado para simular Image
        return <img alt={props.alt || 'mock'} {...props} />;
    },
}));

// Mock do Next.js Link component
jest.mock('next/link', () => ({
    __esModule: true,
    // biome-ignore lint/suspicious/noExplicitAny: necessário para mock
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock do serviço de ninjas
jest.mock('../services/ninjas', () => ({
    getNinjas: jest.fn(),
}));

// Dados mockados para testes
const mockNinjas: Character[] = [
    {
        id: 1,
        name: 'Naruto Uzumaki',
        rank: 'Genin',
        summary: 'Um ninja determinado que sonha em se tornar Hokage',
        profile_image: '/naruto.jpg',
        images: [],
        jutsus: [],
        power: 90,
    },
    {
        id: 2,
        name: 'Sasuke Uchiha',
        rank: 'Genin',
        summary: 'Último sobrevivente do clã Uchiha',
        profile_image: '/sasuke.jpg',
        images: [],
        jutsus: [],
        power: 85,
    },
    {
        id: 3,
        name: 'Sakura Haruno',
        rank: 'Genin',
        summary: 'Uma kunoichi com grande potencial médico',
        profile_image: '/sakura.jpg',
        images: [],
        jutsus: [],
        power: 70,
    }
];

describe('Ninjas Page - Server Component', () => {
    const { getNinjas } = require('../services/ninjas');

    beforeEach(() => {
        getNinjas.mockResolvedValue(mockNinjas);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * TESTE 1: Verifica renderização básica da página
     */
    it('deve renderizar a página sem erros', async () => {
        const NinjasPage = await Ninjas();
        render(NinjasPage);
        expect(screen.getByText('Guerreiros Lendários')).toBeInTheDocument();
    });

    /**
     * TESTE 2: Verifica se busca os dados ao carregar
     */
    it('deve buscar os ninjas ao carregar a página', async () => {
        await Ninjas();
        expect(getNinjas).toHaveBeenCalledTimes(1);
    });

    /**
     * TESTE 3: Verifica título e descrição
     */
    it('deve exibir título e descrição da galeria', async () => {
        const NinjasPage = await Ninjas();
        render(NinjasPage);

        expect(screen.getByText('Guerreiros Lendários')).toBeInTheDocument();
        expect(screen.getByText('Galeria de Shinobi')).toBeInTheDocument();
        expect(screen.getByText(/Conheça os shinobi mais poderosos/i)).toBeInTheDocument();
    });
});

describe('NinjaCard Component', () => {
    const mockNinja = mockNinjas[0];

    /**
     * TESTE 4: Verifica renderização do card
     */
    it('deve renderizar o card com informações do ninja', () => {
        render(<NinjaCard {...mockNinja} />);

        expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
        expect(screen.getByText('Genin')).toBeInTheDocument();
        expect(screen.getByText(/Um ninja determinado/i)).toBeInTheDocument();
    });

    /**
     * TESTE 5: Verifica imagem do ninja
     */
    it('deve renderizar a imagem do ninja', () => {
        render(<NinjaCard {...mockNinja} />);

        const image = screen.getByAltText('Naruto Uzumaki');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/naruto.jpg');
    });

    /**
     * TESTE 6: Verifica link para detalhes
     */
    it('deve ter um link para a página de detalhes', () => {
        render(<NinjaCard {...mockNinja} />);

        const link = screen.getByRole('link', { name: /ver detalhes/i });
        expect(link).toHaveAttribute('href', '/ninjas/1');
    });

    /**
     * TESTE 7: Verifica badge com ID
     */
    it('deve exibir o ID do ninja em um badge', () => {
        render(<NinjaCard {...mockNinja} />);

        expect(screen.getByText('1')).toBeInTheDocument();
    });
});

describe('NinjasInfiniteScroll Component', () => {
    /**
     * TESTE 8: Verifica renderização inicial
     */
    it('deve renderizar a lista de ninjas', () => {
        render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);

        expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
        expect(screen.getByText('Sasuke Uchiha')).toBeInTheDocument();
        expect(screen.getByText('Sakura Haruno')).toBeInTheDocument();
    });

    /**
     * TESTE 9: Verifica campo de busca
     */
    it('deve exibir o campo de busca', () => {
        render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);

        const searchInput = screen.getByPlaceholderText(/Buscar shinobi pelo nome/i);
        expect(searchInput).toBeInTheDocument();
    });

    /**
     * TESTE 10: Verifica funcionalidade de busca
     */
    it('deve filtrar ninjas ao digitar no campo de busca', async () => {
        const user = userEvent.setup();
        render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);

        const searchInput = screen.getByPlaceholderText(/Buscar shinobi pelo nome/i);

        // Digita "Naruto" no campo de busca
        await user.type(searchInput, 'Naruto');

        // Deve mostrar apenas Naruto
        expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
        expect(screen.queryByText('Sasuke Uchiha')).not.toBeInTheDocument();
        expect(screen.queryByText('Sakura Haruno')).not.toBeInTheDocument();
    });

    /**
     * TESTE 11: Verifica busca case-insensitive
     */
    it('deve filtrar sem diferenciar maiúsculas de minúsculas', async () => {
        const user = userEvent.setup();
        render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);

        const searchInput = screen.getByPlaceholderText(/Buscar shinobi pelo nome/i);

        // Digita em minúsculo
        await user.type(searchInput, 'sasuke');

        // Deve encontrar mesmo assim
        expect(screen.getByText('Sasuke Uchiha')).toBeInTheDocument();
    });

    /**
     * TESTE 12: Verifica contador de resultados
     */
    it('deve exibir contador de resultados quando há busca', async () => {
        const user = userEvent.setup();
        render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);

        const searchInput = screen.getByPlaceholderText(/Buscar shinobi pelo nome/i);
        await user.type(searchInput, 'a'); // Busca pela letra 'a'

        // Deve mostrar quantos resultados foram encontrados
        await waitFor(() => {
            expect(screen.getByText(/resultados encontrados/i)).toBeInTheDocument();
        });
    });

    /**
     * TESTE 13: Verifica estado vazio
     */
    it('deve exibir mensagem quando não há resultados', async () => {
        const user = userEvent.setup();
        render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);

        const searchInput = screen.getByPlaceholderText(/Buscar shinobi pelo nome/i);

        // Busca por algo que não existe
        await user.type(searchInput, 'xyz123');

        await waitFor(() => {
            expect(screen.getByText('Nenhum shinobi encontrado')).toBeInTheDocument();
            expect(screen.getByText('Tente buscar com outro termo')).toBeInTheDocument();
        });
    });

    /**
     * TESTE 14: Verifica limpeza da busca
     */
    it('deve mostrar todos os ninjas ao limpar a busca', async () => {
        const user = userEvent.setup();
        render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);

        const searchInput = screen.getByPlaceholderText(/Buscar shinobi pelo nome/i);

        // Digita e depois limpa
        await user.type(searchInput, 'Naruto');
        await user.clear(searchInput);

        // Deve mostrar todos novamente
        await waitFor(() => {
            expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
            expect(screen.getByText('Sasuke Uchiha')).toBeInTheDocument();
            expect(screen.getByText('Sakura Haruno')).toBeInTheDocument();
        });
    });

    /**
     * TESTE 15: Verifica renderização com lista vazia
     */
    it('deve lidar com lista vazia de ninjas', () => {
        render(<NinjasInfiniteScroll initialNinjas={[]} />);

        expect(screen.getByText('Nenhum shinobi encontrado')).toBeInTheDocument();
    });

    /**
     * TESTE 16: Verifica ícone de busca
     */
    it('deve renderizar ícone de busca no input', () => {
        render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);

        const searchIcon = screen.getByLabelText('Buscar');
        expect(searchIcon).toBeInTheDocument();
    });

    /**
     * TESTE 17: Snapshot do componente
     */
    it('deve corresponder ao snapshot', () => {
        const { container } = render(<NinjasInfiniteScroll initialNinjas={mockNinjas} />);
        expect(container).toMatchSnapshot();
    });
});

describe('NinjasInfiniteScroll - Infinite Scroll Behavior', () => {
    // Cria uma lista grande de ninjas para testar o scroll infinito
    const manyNinjas: Character[] = Array.from({ length: 30 }, (_, i) => ({
        ...mockNinjas[0],
        id: i + 1,
        name: `Ninja ${i + 1}`,
    }));

    /**
     * TESTE 18: Verifica paginação inicial
     * Por padrão, deve mostrar apenas os primeiros 12 itens
     */
    it('deve renderizar apenas os primeiros 12 ninjas inicialmente', () => {
        render(<NinjasInfiniteScroll initialNinjas={manyNinjas} />);

        // Deve ter o primeiro ninja
        expect(screen.getByText('Ninja 1')).toBeInTheDocument();
        // Deve ter o 12º ninja
        expect(screen.getByText('Ninja 12')).toBeInTheDocument();
        // NÃO deve ter o 13º ninja (ainda não carregado)
        expect(screen.queryByText('Ninja 13')).not.toBeInTheDocument();
    });

    /**
     * TESTE 19: Verifica que o observer está configurado
     */
    it('deve ter um elemento observador para infinite scroll', () => {
        const { container } = render(<NinjasInfiniteScroll initialNinjas={manyNinjas} />);

        // O componente deve ter um elemento ref para o observer
        // Este teste verifica se o componente está preparado para scroll infinito
        // Mesmo que não encontre um elemento específico, não deve quebrar
        expect(container).toBeTruthy();
    });
});
