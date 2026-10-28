"""
Gera versões WebP responsivas das fotos do site, SEM alterar os originais.

Uso (na raiz do projeto, com Python 3 + Pillow):
    pip install pillow
    python scripts/otimizar_fotos.py

Saída:
- public/fotos/otimizadas/<nome>-<largura>.webp  (640, 1024 e largura original)
- src/content/responsiveImages.js                (manifesto lido pelo PhotoImage)

Para incluir uma foto nova, adicione-a em FOTOS abaixo e rode de novo.
"""
import json
import os
import re
import unicodedata

from PIL import Image, ImageOps

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(RAIZ, 'public')
SAIDA = os.path.join(PUBLIC, 'fotos', 'otimizadas')
MANIFESTO = os.path.join(RAIZ, 'src', 'content', 'responsiveImages.js')

# caminho público original -> qualidade WebP
FOTOS = {
    '/fotos/rose-ambiente-trabalho.jpg': 80,
    '/fotos/rose-retrato.jpg': 80,
    '/fotos/equipe-completa.jpg': 80,
    '/fotos/equipe-trabalhando.jpg': 80,
    '/fotos/equipe-reuniao.jpg': 82,
    '/fotos/fachada.jpg': 80,
    '/fotos/Emilly e rose.jpg': 80,
    '/fotos/equipena fachada.jpg': 80,
    '/cf-diagnostico-consultivo.webp': 80,
    '/fotos/emilly-atendimento.jpg': 80,
}
LARGURAS = [640, 1024]


def slug(nome):
    base = os.path.splitext(os.path.basename(nome))[0]
    base = unicodedata.normalize('NFKD', base).encode('ascii', 'ignore').decode()
    base = base.replace('equipena', 'equipe-na')  # corrige o nome do arquivo original só na versão otimizada
    return re.sub(r'[^a-z0-9]+', '-', base.lower()).strip('-')


def main():
    os.makedirs(SAIDA, exist_ok=True)
    manifesto = {}
    for caminho, qualidade in FOTOS.items():
        origem = os.path.join(PUBLIC, caminho.lstrip('/'))
        img = ImageOps.exif_transpose(Image.open(origem)).convert('RGB')
        largura, altura = img.size
        # pula larguras quase iguais à original (evita arquivo duplicado)
        alvos = [w for w in LARGURAS if w < largura * 0.87] + [largura]
        variantes = []
        for w in alvos:
            h = round(altura * w / largura)
            arquivo = f'{slug(caminho)}-{w}.webp'
            destino = os.path.join(SAIDA, arquivo)
            (img if w == largura else img.resize((w, h), Image.LANCZOS)).save(
                destino, 'WEBP', quality=qualidade, method=6
            )
            variantes.append({'w': w, 'url': f'/fotos/otimizadas/{arquivo}', 'kb': os.path.getsize(destino) // 1024})
        manifesto[caminho] = {
            'src': variantes[-1]['url'],
            'srcSet': ', '.join(f"{v['url']} {v['w']}w" for v in variantes),
            'width': largura,
            'height': altura,
        }
        print(caminho, os.path.getsize(origem) // 1024, 'KB ->', [(v['w'], v['kb']) for v in variantes])

    cabecalho = (
        '// GERADO por scripts/otimizar_fotos.py — não editar à mão.\n'
        '// Original (public/) -> versões WebP responsivas usadas pelo PhotoImage.\n'
        '// Os arquivos originais continuam em public/ e servem de fallback.\n'
    )
    with open(MANIFESTO, 'w', encoding='utf-8') as f:
        f.write(cabecalho + 'const responsiveImages = ' + json.dumps(manifesto, indent=2, ensure_ascii=False) + ';\n\nexport default responsiveImages;\n')


if __name__ == '__main__':
    main()
