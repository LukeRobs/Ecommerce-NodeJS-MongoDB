import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'



export const verificarToken = (token) => {
		try {
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (erro) {
			return null;
		}
	}

export const verificarCpf = (cpf) => {
	if (typeof cpf !== 'string') cpf = String(cpf);
	cpf = cpf.replace(/[^\d]+/g, '');

	if(cpf.length != 11) {
		return false
	}
	if (/^(\d)\1+$/.test(cpf)) {
		return false;
	}

	let soma = 0;
  	for (let i = 0; i < 9; i++) {
    	soma += parseInt(cpf.charAt(i)) * (10 - i);
  	}
  	let resto = 11 - (soma % 11);
  	let digito1 = resto === 10 || resto === 11 ? 0 : resto;
  	if (digito1 !== parseInt(cpf.charAt(9))) return false;

  	soma = 0;
  	for (let i = 0; i < 10; i++) {
    	soma += parseInt(cpf.charAt(i)) * (11 - i);
  	}
  	resto = 11 - (soma % 11);
  	let digito2 = resto === 10 || resto === 11 ? 0 : resto;
  	if (digito2 !== parseInt(cpf.charAt(10))){
		return false;
	}
	else {
		return true;
	} 
  	
}