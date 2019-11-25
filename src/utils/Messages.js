export const getErrorMessage = (errorCode) => {
    switch(errorCode){
        case 'auth/wrong-password':
            return 'Senha inválida.';
        case 'auth/email-already-in-use':
            return 'Este e-mail já está em uso.'
        case 'auth/user-not-found':
            return 'Este e-mail não está cadastrado.'
        default:
            return 'Erro.';
    }
}