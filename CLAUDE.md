# Instruções para assistentes de IA (Claude Code etc.)

## Autoria dos commits — regra obrigatória

Todo commit feito neste repositório deve ter como **autor** a dona do projeto:

- **Nome:** `Flavia Lima Corpas`
- **E-mail:** `flavia.corpas@ufrj.br`

Regras:

1. **Nunca** faça commits com o autor `Claude`, `noreply@anthropic.com` ou
   qualquer identidade da Anthropic/assistente. Antes do primeiro commit,
   confirme e, se preciso, ajuste a config do git:

   ```sh
   git config user.name "Flavia Lima Corpas"
   git config user.email "flavia.corpas@ufrj.br"
   ```

2. **Não** adicione rodapés de coautoria ou de sessão nas mensagens de
   commit. Especificamente, **não** inclua linhas como:
   - `Co-Authored-By: Claude ...`
   - `Claude-Session: ...`
   - `🤖 Generated with ...`

3. A assistência de IA não deve aparecer como autora nem como coautora em
   nenhum branch, nem na lista de *Contributors* do repositório.

4. Mensagens de commit em **português**, curtas e descritivas, seguindo o
   estilo já existente no histórico (ex.: `Curso: ...`, `Cartucho: ...`).
