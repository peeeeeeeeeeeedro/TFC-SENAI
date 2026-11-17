# Laço de Cuidado

Site educativo de conscientização sobre o **Outubro Rosa** (câncer de mama) e o **Novembro Azul** (saúde do homem / câncer de próstata), com um **quiz interativo** de perguntas mistas.

Projeto em **HTML + CSS + JavaScript**.
---

## 1. Visão e objetivos

**Problema:** muita gente ainda tem dúvidas básicas sobre prevenção, confunde mitos com fatos e adia a ida ao médico por medo ou vergonha.

**Proposta:** um site curto, claro e acolhedor que ensina o essencial em poucos minutos e fixa o conteúdo com um quiz.

**Objetivos do projeto**

1. Informar sobre sinais de alerta, fatores de risco e exames das duas campanhas.
2. Combater desinformação com respostas diretas a mitos comuns.
3. Estimular a busca por atendimento na rede de saúde (UBS/SUS).
4. Funcionar bem em celular, com leitura confortável e navegação simples.
5. Ser fácil de manter: conteúdo em HTML e perguntas em um único arquivo JS.

**Público-alvo**

- Pessoas adultas em geral, com atenção especial a mulheres a partir dos 40–50 anos e homens a partir dos 45–50 anos.
- Estudantes, professores e agentes de saúde que precisem de material de apoio.
- Familiares que queiram entender como apoiar alguém.

---

## 2. Arquitetura da informação

```
Início
--- Outubro Rosa
_ O que é a campanha
_ O que é o câncer de mama
_ Sinais de alerta
_ Fatores de risco
_ Prevenção e rastreamento
_ Mitos e verdades
_ Quando procurar ajuda
--- Novembro Azul
_ O que é a campanha
_ O que é o câncer de próstata
_ Sinais e sintomas
_ Fatores de risco
_ Como é feita a investigação
_ Saúde integral do homem
_ Mitos e verdades
_ Quando procurar ajuda
--- Quiz
_ Tela inicial (regras + melhor resultado)
_ Perguntas com feedback imediato
_ Resultado com revisão e opção de refazer
```
---

## 3. Estrutura do projeto

```
Projeto Padrão/
├── index.html            # Tela inicial
├── outubro-rosa.html     # Área Outubro Rosa
├── novembro-azul.html    # Área Novembro Azul
├── quiz.html             # Quiz interativo
├── css/
│   └── styles.css        # Design system + todos os componentes
├── js/
│   ├── main.js           # Menu mobile, ano do rodapé, animações
│   ├── perguntas.js      # Banco de perguntas (conteúdo editável)
│   └── quiz.js           # Motor do quiz
└── README.md
````

## 4. Wireframes (esboço)

### Início
```
┌──────────────────────────────────────────────┐
│ Logo        Início  Rosa  Azul  [Quiz]        │
├──────────────────────────────────────────────┤
│  Campanha de conscientização                  │
│  Informação que cuida.                        │  ┌─────────────┐
│  Prevenção que salva.                         │  │ 2 campanhas │
│  [Fazer o quiz] [Explorar campanhas]          │  │ Rosa / Azul │
│                                               │  └─────────────┘
├──────────────────────────────────────────────┤
│  Duas cores, um mesmo cuidado                 │
│  ┌───────────────┐  ┌───────────────┐         │
│  │ Outubro Rosa  │  │ Novembro Azul │         │
│  └───────────────┘  └───────────────┘         │
├──────────────────────────────────────────────┤
│  Números que importam  (4 cards)              │
├──────────────────────────────────────────────┤
│  Como aproveitar o site (3 passos)            │
├──────────────────────────────────────────────┤
│  Mitos e verdades rápidos (accordion)         │
├──────────────────────────────────────────────┤
│  [ Quanto você sabe sobre prevenção? → Quiz ] │
└──────────────────────────────────────────────┘
```

### Área de campanha (Rosa / Azul)
```
┌──────────────────────────────────────────────┐
│ Header + breadcrumb                           │
│ Título da campanha + resumo + CTA  │ laço    │
├──────────────────────────────────────────────┤
│ O que é a campanha  │  Card "Em resumo"       │
├──────────────────────────────────────────────┤
│ O que é a doença (3 cards)                    │
├──────────────────────────────────────────────┤
│ Sinais de alerta (6 cards) + aviso            │
├──────────────────────────────────────────────┤
│ Fatores de risco (texto + lista)              │
├──────────────────────────────────────────────┤
│ Prevenção / exames (passos) + hábitos         │
├──────────────────────────────────────────────┤
│ Mitos e verdades (accordion)                  │
├──────────────────────────────────────────────┤
│ Quando procurar ajuda (callout)               │
├──────────────────────────────────────────────┤
│ CTA para o quiz                               │
└──────────────────────────────────────────────┘
```

### Quiz
```
┌──────────────────────────────────────────────┐
│ Título + explicação                           │
├──────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────┐ │
│ │ Progresso  ─────────────── 40%           │ │
│ │ [OUTUBRO ROSA]                           │ │
│ │ Pergunta?                                │ │
│ │ (A) Alternativa                          │ │
│ │ (B) Alternativa                          │ │
│ │ (C) Alternativa                          │ │
│ │ (D) Alternativa                          │ │
│ │ ✓ Feedback com explicação                │ │
│ │                     [Próxima pergunta]   │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

## 5. Design system

**Cores** (definidas como variáveis CSS em `:root`)

| Token | Uso | Valor |
|---|---|---|
| `--rosa-500` | Ações e destaques Outubro Rosa | `#d81b60` |
| `--rosa-50` | Fundos suaves rosa | `#fff1f6` |
| `--azul-500` | Ações e destaques Novembro Azul | `#1565c0` |
| `--azul-50` | Fundos suaves azul | `#eef6ff` |
| `--ink` | Texto principal | `#161a2b` |
| `--muted` | Texto secundário | `#5f6579` |
| `--surface` | Fundo alternado de seções | `#faf8fb` |

**Tipografia:** pilha de fontes do sistema (`Segoe UI`, system-ui). Zero requisições externas e carregamento instantâneo. Títulos com `clamp()` para escala fluida.

**Componentes:** botões (`btn`), cartões (`card`, `theme-card`), listas com ícone, passos numerados, estatísticas, callouts, accordion nativo (`<details>`), faixa de CTA, breadcrumb, telas do quiz.

**Layout:** container de 1120 px, grids de 2/3/4 colunas que colapsam em 1 coluna no mobile. Breakpoints em 900 px, 760 px e 520 px.

**Formas:** cantos arredondados (10–28 px), sombras suaves e gradientes discretos rosa→azul para representar a união das campanhas.

---

## 6. Funcionalidades

### Quiz
- 13 perguntas mistas (Outubro Rosa, Novembro Azul e prevenção geral).
- Embaralhamento de perguntas **e** alternativas a cada tentativa.
- Feedback imediato com a resposta correta e uma explicação.
- Barra de progresso com `role="progressbar"`.
- Tela de resultado com anel de pontuação, mensagem personalizada por faixa e revisão das questões erradas.
- Melhor pontuação salva em `localStorage` (sem dados pessoais).
- Botão de refazer sem recarregar a página.

### Site
- Menu mobile acessível (Esc fecha, clique fora fecha, `aria-expanded`).
- Accordion nativo para mitos e verdades — funciona até sem JavaScript.
- Animações de entrada com `IntersectionObserver`, desativadas em `prefers-reduced-motion`.
- Ano do rodapé atualizado automaticamente.
- Layout responsivo e estilos de impressão.

---

## 7. Como editar o conteúdo

**Textos das páginas:** edite diretamente os arquivos `.html`. Cada seção está comentada (`<!-- SINAIS DE ALERTA -->`, etc.).

**Perguntas do quiz:** abra `js/perguntas.js` e copie um objeto:

```js
{
  tema: "rosa",                       // "rosa" | "azul" | "geral"
  pergunta: "Pergunta aqui?",
  alternativas: ["A", "B", "C", "D"],
  correta: 1,                         // índice da correta (começa em 0)
  explicacao: "Explicação exibida após a resposta."
}
```

**Cores e espaçamentos:** altere os tokens no início de `css/styles.css`. O site inteiro se ajusta.

**Nome do site:** troque o texto "Laço de Cuidado" nos quatro arquivos HTML e no `<title>`.

---

## 8. Acessibilidade

- Estrutura semântica com `header`, `nav`, `main`, `section`, `footer` e hierarquia de títulos.
- Link "Ir para o conteúdo" no topo.
- Contraste de texto e foco visível em todos os elementos interativos.
- Alternativas do quiz são botões reais (funcionam com teclado e leitores de tela).
- Feedback anunciado com `aria-live="polite"`; foco move para a pergunta e para o resultado.
- Accordion com `<details>/<summary>` nativo.
- Respeito a `prefers-reduced-motion`.
- Conteúdo não depende de cor para ser compreendido (há rótulos e ícones).

Checklist sugerido antes de publicar: navegar só com Tab, testar com leitor de tela (NVDA/VoiceOver) e validar contraste com o WAVE.

---

## 9. Conteúdo e responsabilidade

- Fontes usadas como referência: INCA, Ministério da Saúde (gov.br) e diretrizes de rastreamento.
- Números de incidência são estimativas e podem mudar a cada atualização do INCA — revise antes de publicar.
- Todo o site traz aviso de que o conteúdo é educativo e **não substitui consulta médica**.
- Recomendações de exames são gerais. A decisão final é sempre individual, com um profissional de saúde.

---

## 10. Publicação

Como é um site estático, basta subir a pasta inteira para qualquer serviço de hospedagem estática:

- **GitHub Pages:** envie os arquivos para um repositório e ative Pages na branch principal.
- **Netlify / Vercel:** arraste a pasta ou conecte o repositório (sem comando de build).
- **Hospedagem tradicional:** copie os arquivos para a pasta pública (`public_html`).

Para testar localmente, abra `index.html` no navegador ou rode um servidor simples:

```bash
# Python 3
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## 11. Próximos passos (roadmap sugerido)

**Curto prazo**
- Revisar o conteúdo com um profissional de saúde.
- Adicionar uma página "Sobre o projeto" e créditos.
- Incluir botão de compartilhamento do resultado do quiz.

**Médio prazo**
- Versão do quiz por campanha (Rosa / Azul) reaproveitando o mesmo motor.
- Painel simples de acessibilidade (aumentar fonte, alto contraste).
- Conteúdo em áudio ou vídeo com transcrição.

**Longo prazo**
- Área de depoimentos (com consentimento e moderação).
- Integração com calendário de exames.
- Versão em outros idiomas.

---

## 12. Licença e uso

Projeto educativo de código aberto para uso em escolas, campanhas comunitárias e unidades de saúde. Ao reutilizar, mantenha o aviso de que o conteúdo não substitui orientação médica e atualize os dados conforme as fontes oficiais.
