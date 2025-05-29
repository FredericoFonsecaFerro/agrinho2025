document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('acess-simples');
    const toggle = document.getElementById('toggle-acess');
    const controles = document.querySelector('.controles');
    const html = document.documentElement;

    // Estados
    let fonteBase = 16;
    let brilho = 1;
    let contraste = false;
    let noturno = false;

    // Toggle menu
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        controles.classList.toggle('ativo');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) {
            controles.classList.remove('ativo');
        }
    });

    // Controles
    document.querySelectorAll('.btn-acess').forEach(btn => {
        btn.addEventListener('click', () => {
            const acao = btn.dataset.acao;
            
            switch(acao) {
                case 'fonte+':
                    fonteBase = Math.min(fonteBase + 2, 24);
                    break;
                case 'fonte-':
                    fonteBase = Math.max(fonteBase - 2, 12);
                    break;
                case 'brilho+':
                    brilho = Math.min(brilho + 0.2, 1.5);
                    break;
                case 'brilho-':
                    brilho = Math.max(brilho - 0.2, 0.5);
                    break;
                case 'contraste':
                    contraste = !contraste;
                    break;
                case 'noturno':
                    noturno = !noturno;
                    break;
            }

            aplicarEstilos();
            salvarPreferencias();
        });
    });

    function aplicarEstilos() {
        html.style.fontSize = `${fonteBase}px`;
        html.style.filter = `brightness(${brilho}) ${contraste ? 'invert(1)' : ''}`;
        html.style.backgroundColor = noturno ? '#1a1a1a' : '';
        html.style.color = noturno ? '#fff' : '';
    }

    function salvarPreferencias() {
        localStorage.setItem('acessConfig', JSON.stringify({
            fonteBase,
            brilho,
            contraste,
            noturno
        }));
    }

    // Carregar preferências
    const configSalva = localStorage.getItem('acessConfig');
    if (configSalva) {
        const config = JSON.parse(configSalva);
        fonteBase = config.fonteBase;
        brilho = config.brilho;
        contraste = config.contraste;
        noturno = config.noturno;
        aplicarEstilos();
    }
});