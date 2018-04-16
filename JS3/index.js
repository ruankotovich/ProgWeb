let someFn = (num) => {
    let _value = num;
    return (add) => {
        return _value += add;
    }
};

let adicionar = someFn(1);

console.log('Primeira chamada', adicionar(3));
console.log('Segunda chamada', adicionar(1));
console.log('Terceira chamada', adicionar(5));