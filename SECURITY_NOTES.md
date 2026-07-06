# Notas de segurança

Este projeto é estático e não possui backend próprio. Mesmo assim, foram aplicadas boas práticas:

- Sem `dangerouslySetInnerHTML`.
- Links externos com `target="_blank"` usam `rel="noopener noreferrer"`.
- Mensagens do WhatsApp são codificadas com `encodeURIComponent`.
- Não são solicitados CPF, senha, dados bancários ou dados sensíveis.
- Headers básicos estão em `vercel.json`.

Para formulários futuros com envio para banco de dados, será necessário adicionar validação no servidor, proteção contra spam e política de privacidade/LGPD.
