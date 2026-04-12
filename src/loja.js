function gerarLinkWhatsApp(numero) {
    return `https://api.whatsapp.com/send?phone=${numero}`;
}

// Usage
const link = gerarLinkWhatsApp('5532992192572');
console.log(link);