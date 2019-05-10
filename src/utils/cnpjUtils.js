export function validateCNPJ(cnpj = ''){
    var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    if(cnpj.length !== 14)
        return false;

    if(/0{14}/.test(cnpj))
        return false;

    for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
    if(Number(cnpj[12]) !== (((n %= 11) < 2) ? 0 : 11 - n))
        return false;

    for (i = 0, n = 0; i <= 12; n += cnpj[i] * b[i++]);
    if(Number(cnpj[13]) !== (((n %= 11) < 2) ? 0 : 11 - n))
        return false;
    return true;
};