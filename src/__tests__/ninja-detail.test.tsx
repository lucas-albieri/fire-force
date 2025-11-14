/**
 * Testes para a página de Detalhes do Ninja (/ninjas/[id])
 * 
 * Este arquivo contém testes para:
 * 1. Página com parâmetros dinâmicos
 * 2. Componentes de detalhes (Hero, Jutsu, Power)
 * 3. Estados de erro (ninja não encontrado)
 * 4. Renderização condicional
 * 5. Breadcrumbs e navegação
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NinjaPage from '../app/ninjas/[id]/page';
import { HeroSection } from '../app/ninjas/[id]/_components/hero-section';
import { JutsuSection } from '../app/ninjas/[id]/_components/jutsu-section';
import { PowerSection } from '../app/ninjas/[id]/_components/power-section';
import type { Character } from '../shared/types/characters';

// Mock do Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    // biome-ignore lint/suspicious/noExplicitAny: necessário para mock
    default: (props: any) => {
        return <img alt={props.alt || 'mock'} {...props} />;
    },
}));

// Mock do Next.js Link component
jest.mock('next/link', () => ({
    __esModule: true,
    // biome-ignore lint/suspicious/noExplicitAny: necessário para mock
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock do serviço getNinjaById
jest.mock('../services/ninja', () => ({
    getNinjaById: jest.fn(),
}));

// Mock da função de cores
jest.mock('../shared/hooks/colors', () => ({
    ninjaColorByRank: jest.fn(() => 'orange-400'),
}));

// Dados mockados completos de um ninja
const mockNinja: Character = {
    id: 1,
    name: 'Naruto Uzumaki',
    rank: 'Genin',
    summary: 'Um ninja determinado que sonha em se tornar Hokage e proteger sua vila',
    profile_image: '/naruto.jpg',
    power: 85,
    village: {
        id: 1,
        name: 'Konohagakure'
    },
    father: {
        id: 2,
        name: 'Minato Namikaze'
    },
    mother: {
        id: 3,
        name: 'Kushina Uzumaki'
    },
    images: [
        {
            id: 1,
            character_id: 1,
            image_url: '/naruto-image1.jpg',
            image_type: 'profile'
        },
        {
            id: 2,
            character_id: 1,
            image_url: '/naruto-image2.jpg',
            image_type: 'action'
        }
    ],
    jutsus: [
        {
            id: 1,
            name: 'Rasengan',
            description: 'Uma técnica poderosa',
            type: 'Ninjutsu',
            power: 90
        },
        {
            id: 2,
            name: 'Kage Bunshin',
            description: 'Clones de sombra',
            type: 'Ninjutsu',
            power: 70
        }
    ]
};

// Ninja sem informações opcionais
const mockNinjaMinimal: Character = {
    id: 2,
    name: 'Rock Lee',
    power: 75,
    images: [
        {
            id: 1,
            character_id: 2,
            image_url: '/rock-lee.jpg',
            image_type: 'profile'
        }
    ],
    jutsus: []
};

describe('NinjaPage - Página de Detalhes', () => {
    const { getNinjaById } = require('../services/ninja');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * TESTE 1: Verifica renderização com dados completos
     */
    it('deve renderizar a página com informações do ninja', async () => {
        getNinjaById.mockResolvedValue(mockNinja);

        const params = Promise.resolve({ id: '1' });
        const PageComponent = await NinjaPage({ params });
        render(PageComponent);

        expect(screen.getByRole('heading', { name: 'Naruto Uzumaki' })).toBeInTheDocument();
        expect(screen.getByText(/Um ninja determinado/i)).toBeInTheDocument();
    });

    /**
     * TESTE 2: Verifica estado quando ninja não é encontrado
     */
    it('deve exibir mensagem de erro quando ninja não é encontrado', async () => {
        getNinjaById.mockResolvedValue(null);

        const params = Promise.resolve({ id: '999' });
        const PageComponent = await NinjaPage({ params });
        render(PageComponent);

        expect(screen.getByText('Ninja não encontrado')).toBeInTheDocument();
        expect(screen.getByText('Voltar para galeria')).toBeInTheDocument();
    });

    /**
     * TESTE 3: Verifica link de voltar quando ninja não encontrado
     */
    it('deve ter link para voltar à galeria quando ninja não encontrado', async () => {
        getNinjaById.mockResolvedValue(null);

        const params = Promise.resolve({ id: '999' });
        const PageComponent = await NinjaPage({ params });
        render(PageComponent);

        const link = screen.getByRole('link', { name: /voltar para galeria/i });
        expect(link).toHaveAttribute('href', '/ninjas');
    });

    /**
     * TESTE 4: Verifica chamada da API com ID correto
     */
    it('deve buscar ninja pelo ID correto', async () => {
        getNinjaById.mockResolvedValue(mockNinja);

        const params = Promise.resolve({ id: '1' });
        await NinjaPage({ params });

        expect(getNinjaById).toHaveBeenCalledWith(1);
    });

    /**
     * TESTE 5: Verifica conversão de string para número no ID
     */
    it('deve converter ID de string para número', async () => {
        getNinjaById.mockResolvedValue(mockNinja);

        const params = Promise.resolve({ id: '42' });
        await NinjaPage({ params });

        expect(getNinjaById).toHaveBeenCalledWith(42);
    });
});

describe('HeroSection Component', () => {
    /**
     * TESTE 6: Verifica renderização do nome do ninja
     */
    it('deve renderizar o nome do ninja', () => {
        render(<HeroSection ninja={mockNinja} />);

        expect(screen.getByRole('heading', { name: 'Naruto Uzumaki' })).toBeInTheDocument();
    });    /**
     * TESTE 7: Verifica renderização do rank
     */
    it('deve exibir o rank do ninja', () => {
        render(<HeroSection ninja={mockNinja} />);

        expect(screen.getByText('Genin')).toBeInTheDocument();
    });

    /**
     * TESTE 8: Verifica renderização da descrição
     */
    it('deve exibir a descrição/sumário do ninja', () => {
        render(<HeroSection ninja={mockNinja} />);

        expect(screen.getByText(/Um ninja determinado/i)).toBeInTheDocument();
    });

    /**
     * TESTE 9: Verifica breadcrumbs de navegação
     */
    it('deve renderizar breadcrumbs de navegação', () => {
        render(<HeroSection ninja={mockNinja} />);

        expect(screen.getByText('Início')).toBeInTheDocument();
        expect(screen.getByText('Ninjas')).toBeInTheDocument();
    });

    /**
     * TESTE 10: Verifica links nos breadcrumbs
     */
    it('deve ter links corretos nos breadcrumbs', () => {
        render(<HeroSection ninja={mockNinja} />);

        const homeLink = screen.getByRole('link', { name: 'Início' });
        const ninjasLink = screen.getByRole('link', { name: 'Ninjas' });

        expect(homeLink).toHaveAttribute('href', '/');
        expect(ninjasLink).toHaveAttribute('href', '/ninjas');
    });

    /**
     * TESTE 11: Verifica informações sobre vila
     */
    it('deve exibir informações da vila quando disponível', () => {
        render(<HeroSection ninja={mockNinja} />);

        expect(screen.getByText(/Vila:/i)).toBeInTheDocument();
        expect(screen.getByText('Konohagakure')).toBeInTheDocument();
    });

    /**
     * TESTE 12: Verifica informações sobre pai
     */
    it('deve exibir informações do pai quando disponível', () => {
        render(<HeroSection ninja={mockNinja} />);

        expect(screen.getByText(/Pai:/i)).toBeInTheDocument();
        expect(screen.getByText('Minato Namikaze')).toBeInTheDocument();
    });

    /**
     * TESTE 13: Verifica informações sobre mãe
     */
    it('deve exibir informações da mãe quando disponível', () => {
        render(<HeroSection ninja={mockNinja} />);

        expect(screen.getByText(/Mãe:/i)).toBeInTheDocument();
        expect(screen.getByText('Kushina Uzumaki')).toBeInTheDocument();
    });

    /**
     * TESTE 14: Verifica contador de jutsus
     */
    it('deve exibir contador de jutsus', () => {
        render(<HeroSection ninja={mockNinja} />);

        const jutsuLabel = screen.getByText('Jutsus');
        expect(jutsuLabel).toBeInTheDocument();
        // Verifica que existe um contador próximo ao label
        expect(jutsuLabel.closest('.grid')?.textContent).toContain('2');
    });    /**
     * TESTE 15: Verifica contador de imagens
     */
    it('deve exibir contador de imagens', () => {
        render(<HeroSection ninja={mockNinja} />);

        expect(screen.getByText('Imagens')).toBeInTheDocument();
    });

    /**
     * TESTE 16: Verifica imagem principal do ninja
     */
    it('deve renderizar imagem principal do ninja', () => {
        render(<HeroSection ninja={mockNinja} />);

        const image = screen.getByAltText('Naruto Uzumaki');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/naruto-image1.jpg');
    });

    /**
     * TESTE 17: Verifica renderização sem informações opcionais
     */
    it('deve lidar com ninja sem vila, pai ou mãe', () => {
        render(<HeroSection ninja={mockNinjaMinimal} />);

        expect(screen.getByRole('heading', { name: 'Rock Lee' })).toBeInTheDocument();
        expect(screen.queryByText(/Vila:/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Pai:/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Mãe:/i)).not.toBeInTheDocument();
    });    /**
     * TESTE 18: Verifica texto padrão quando não há summary
     */
    it('deve exibir texto padrão quando não há descrição', () => {
        render(<HeroSection ninja={mockNinjaMinimal} />);

        expect(screen.getByText('Nenhuma descrição disponível')).toBeInTheDocument();
    });

    /**
     * TESTE 19: Verifica texto padrão quando não há rank
     */
    it('deve exibir "Desconhecido" quando não há rank', () => {
        render(<HeroSection ninja={mockNinjaMinimal} />);

        expect(screen.getByText('Desconhecido')).toBeInTheDocument();
    });
});

describe('JutsuSection Component', () => {
    /**
     * TESTE 20: Verifica renderização de jutsus
     */
    it('deve renderizar lista de jutsus', () => {
        render(<JutsuSection ninja={mockNinja} />);

        expect(screen.getByText('Jutsus Especiais')).toBeInTheDocument();
        expect(screen.getByText('Rasengan')).toBeInTheDocument();
        expect(screen.getByText('Kage Bunshin')).toBeInTheDocument();
    });

    /**
     * TESTE 21: Verifica que não renderiza quando não há jutsus
     */
    it('não deve renderizar quando ninja não tem jutsus', () => {
        const { container } = render(<JutsuSection ninja={mockNinjaMinimal} />);

        expect(container.firstChild).toBeNull();
    });

    /**
     * TESTE 22: Verifica quantidade correta de jutsus
     */
    it('deve renderizar todos os jutsus do ninja', () => {
        render(<JutsuSection ninja={mockNinja} />);

        // Verifica se ambos os jutsus estão presentes
        const jutsuElements = screen.getAllByText(/Rasengan|Kage Bunshin/);
        expect(jutsuElements).toHaveLength(2);
    });

    /**
     * TESTE 23: Verifica não renderização com array vazio
     */
    it('não deve renderizar quando array de jutsus está vazio', () => {
        const ninjaWithoutJutsus = { ...mockNinja, jutsus: [] };
        const { container } = render(<JutsuSection ninja={ninjaWithoutJutsus} />);

        expect(container.firstChild).toBeNull();
    });
});

describe('PowerSection Component', () => {
    /**
     * TESTE 24: Verifica renderização do nível de poder
     */
    it('deve renderizar o nível de poder do ninja', () => {
        render(<PowerSection ninja={mockNinja} />);

        expect(screen.getByText('Nível de Poder')).toBeInTheDocument();
        expect(screen.getByText('85')).toBeInTheDocument();
    });

    /**
     * TESTE 25: Verifica label de poder total
     */
    it('deve exibir label "Poder Total"', () => {
        render(<PowerSection ninja={mockNinja} />);

        expect(screen.getByText('Poder Total')).toBeInTheDocument();
    });

    /**
     * TESTE 26: Verifica renderização da barra de progresso
     */
    it('deve renderizar barra de progresso', () => {
        const { container } = render(<PowerSection ninja={mockNinja} />);

        const progressBar = container.querySelector('[style*="width"]');
        expect(progressBar).toBeInTheDocument();
    });

    /**
     * TESTE 27: Verifica porcentagem da barra de progresso
     */
    it('deve calcular porcentagem correta da barra de progresso', () => {
        const { container } = render(<PowerSection ninja={mockNinja} />);

        const progressBar = container.querySelector('[style*="width"]');
        // Para poder 85, deve ser 85%
        expect(progressBar).toHaveStyle({ width: '85%' });
    });

    /**
     * TESTE 28: Verifica poder baixo
     */
    it('deve exibir corretamente poder baixo', () => {
        const weakNinja = { ...mockNinja, power: 25 };
        render(<PowerSection ninja={weakNinja} />);

        expect(screen.getByText('25')).toBeInTheDocument();
    });

    /**
     * TESTE 29: Verifica poder máximo
     */
    it('deve limitar barra de progresso a 100%', () => {
        const powerfulNinja = { ...mockNinja, power: 150 };
        const { container } = render(<PowerSection ninja={powerfulNinja} />);

        const progressBar = container.querySelector('[style*="width"]');
        // Mesmo com poder 150, a barra não deve passar de 100%
        expect(progressBar).toHaveStyle({ width: '100%' });
    });

    /**
     * TESTE 30: Snapshot da seção de poder
     */
    it('deve corresponder ao snapshot', () => {
        const { container } = render(<PowerSection ninja={mockNinja} />);
        expect(container).toMatchSnapshot();
    });
});
