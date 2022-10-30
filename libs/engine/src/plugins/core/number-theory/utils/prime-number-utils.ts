function getNumbersFrom2ToN(n: number) {
    return new Array(n - 1).fill(0).map((_, index) => index + 2);
}

export function sieveOfEratosthenes(n: number): number[] {
    const numbers = getNumbersFrom2ToN(n);
    let reversedNumbers = [...numbers].reverse();
    const result: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
        const primeNumber = reversedNumbers.pop();
        result.push(primeNumber);
        if (primeNumber << 1 > n) {
            return result.concat(reversedNumbers).sort((a, b) => a - b);
        }
        reversedNumbers = reversedNumbers.filter((value) => value % primeNumber !== 0);
    }
}

export function getNthPrimeNumber(n: number) {
    let sizeFactor = 2;
    let primes;
    do {
        primes = sieveOfEratosthenes(sizeFactor * n);
        sizeFactor++;
    } while (primes.length <= n);
    return primes[n - 1];
}

export function isPrimeNumber(number: number) {
    if (number % 1 !== 0 || number < 2) {
        return false;
    }
    const numbers = getNumbersFrom2ToN(number);
    numbers.pop();
    return !numbers.some((value) => number % value === 0);
}
