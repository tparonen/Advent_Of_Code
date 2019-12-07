const hasTwoAdjacentDigitsThatAreSame = (num) => {
    const numStr = num.toString();
    for (let i = 0; i < numStr.length; i++) {
        const prevPrevDigit = i-2 >= 0 ? numStr.charAt(i-2) : undefined;
        const prevDigit = i-1 >= 0 ? numStr.charAt(i-1) : undefined;
        const nextDigit = i+1 < numStr.length ? numStr.charAt(i+1) : undefined;
        const nextNextDigit = i+2 < numStr.length ? numStr.charAt(i+2) : undefined;
        const digit = numStr.charAt(i);
        if (digit === prevDigit && digit !== prevPrevDigit && digit !== nextDigit) {
            return true;
        }
        if (digit === nextDigit && digit !== nextNextDigit && digit !== prevDigit) {
            return true;
        }
    }
    return false;
};

const digitsNeverDecrease = (num) => {
    const numStr = num.toString();
    let prevDigit = undefined;
    for (let i = 0; i < numStr.length; i++) {
        const digit = numStr.charAt(i);
        if (digit < prevDigit) {
            return false;
        }
        prevDigit = digit;
    }
    return true;
};

const validatePassword = (num) => {
    return (
        hasTwoAdjacentDigitsThatAreSame(num) &&
        digitsNeverDecrease(num)
    );
};

module.exports.hasTwoAdjacentDigitsThatAreSame = hasTwoAdjacentDigitsThatAreSame;
module.exports.digitsNeverDecrease = digitsNeverDecrease;
module.exports.validatePassword = validatePassword;