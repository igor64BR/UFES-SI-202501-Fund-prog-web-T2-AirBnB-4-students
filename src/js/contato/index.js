const sendEmail = (emailSendingEvent) => {
    emailSendingEvent.preventDefault();
    const form = emailSendingEvent.target;
    const { email, assunto, mensagem } = form.elements;

    window.location.href = `mailto:${email.value}?subject=${encodeURIComponent(assunto.value)}&body=${encodeURIComponent(mensagem.value)}`;
}