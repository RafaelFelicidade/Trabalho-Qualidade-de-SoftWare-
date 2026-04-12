function gerarLinkWhatsApp(numero) {
    return `https://api.whatsapp.com/send?phone=${numero}`;
}

// Usage
const link = gerarLinkWhatsApp('5532998237029');
console.log(link);
