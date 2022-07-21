import { getDefaultContext, init } from '..';
import createNumberNode from '../create/create-number-node';
import { createOptions } from '../utils/context-utils';
import { createTestContext, integrationTest, integrationTestThrow } from '../utils/integration-test-utils';

init();

const defaultStack = getDefaultContext().stack;
const germanTextContext = createTestContext(defaultStack, createOptions({ decimalSeparator: ',' }));
const radiansTestContext = createTestContext(defaultStack, createOptions({ angleUnit: 'radians' }));

integrationTest('1', '1');
integrationTest('[1,2,3]', '[1, 2, 3]');
integrationTest('1 + 2', '3');
integrationTest('1 - 2', '-1');
integrationTest('-2', '-2');
integrationTest('--2', '2');
integrationTest('2 * 3', '6');
integrationTest('4 / 2', '2');
integrationTest('2 ^ 3', '8');
integrationTest('true & false', 'false');
integrationTest('true & true', 'true');
integrationTest('true | false', 'true');
integrationTest('false | false', 'false');
integrationTest('-true', 'false');
integrationTest('2 < 3 < 4', 'true');
integrationTest('2 < 3 < 3', 'false');
integrationTest('1 < 2 <= 2 = 2 >= 2 > 1', 'true');
integrationTest('2 + 3 * 4 ^ 5 / 32 = 98', 'true');
integrationTest('10 / 2 / 5', '1');
integrationTest('10 - 5 - 3 - 2', '0');
integrationTest('-2 + 4', '2');
integrationTest('2 + -4', '-2');
integrationTest('2 * -2', '-4');
integrationTest('2 / -2', '-1');
integrationTest('-2^4', '-16');
integrationTest('2^-1', '0.5');
integrationTest('[[1, 2], 3] + [[3, 2], 1]', '[[4, 4], 4]');
integrationTest('[[3,2,1],[1,0,2]]*[[1,2],[0,1],[4,0]]', '[[7, 8], [9, 2]]');
integrationTest('[1,2,3]*[3,2,1]', '10');
integrationTest('[[1,0],[0,1]]*[4,5]', '[4, 5]');
integrationTest('[4,5]*[[1,0],[0,1]]', '[4, 5]');
integrationTest('[2,4,6]/2', '[1, 2, 3]');
integrationTest('a + 1', '42', createTestContext([{ a: createNumberNode(41) }]));
integrationTest('sin(pi)', '0', radiansTestContext);
integrationTest('sin(180)', '0');
integrationTest('sin(pi/2)', '1', radiansTestContext);
integrationTest('sin(90)', '1');
integrationTest('((x)->x^2)(2)', '4');
integrationTest('((x: number) -> x+1)(3)', '4');
integrationTest('((x: number) -> x) + ((y: number) -> y^2)', '(x: number) → x + x^2');
integrationTest('((x: number) -> x) + ((x: number) -> x^2)', '(x: number) → x + x^2');
integrationTest('nsolve(sin(x)=0) * 1/ pi', '[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]', radiansTestContext);
integrationTest('nsolve(sin(x)=0, -180, -1) * 1 / 180', '[-1]');
integrationTest('nsolve(1/x=0)', '[]');
integrationTest('nsolve(x^3 -4*x^2 +3=0)', '[-0.791288, 1, 3.791288]');
integrationTest('nsolve(x^(34)-1234.32323=0)', '[-1.23289, 1.23289]');
integrationTest('nsolve((1+n)*n/2=34)', '[-8.761356, 7.761356]');
integrationTest('lsolve(2*x+3*y=-6, -3*x-4*y=7)', '[x = 3, y = -4]');
integrationTest('lsolve(x=2, x=3-y)', '[x = 2, y = 1]');
integrationTest('nintegrate((x)->x^2,0,1)', '0.333333');
integrationTest('nintegrate((x)->2*x^2,0,1)', '0.666667');
integrationTest('nintegrate((x)->1/x, -1, 1)', '0');
integrationTest('nderive((x) -> x^2, 2)', '4');
integrationTest('nderive((x) -> x^2, 2, 1)', '4');
integrationTest('nderive((x) -> x^2, 3, 2)', '2');
integrationTest('nderive((x) -> x^2, pi^2, 2)', '2');
integrationTest('nderive((x) -> x, 0)', '1');
integrationTest('log(8,2)', '3');
integrationTest('exp(2)', '7.389056');
integrationTest('ln(exp(2))', '2');
integrationTest('lg(1000)', '3');
integrationTest('e', '2.718282');
integrationTest('min(-1,1,2,3)', '-1');
integrationTest('max(-1,1,2,3,2,1)', '3');
integrationTest('abs(-7)', '7');
integrationTest('abs(7)', '7');
integrationTest('length([1,2,2])', '3');
integrationTest('fraction(1/3)', '1 / 3');
integrationTest('fraction(1/3+1/3)', '2 / 3');
integrationTest('fraction(1/3-1/3)', '0');
integrationTest('1,2+1,3', '2,5', germanTextContext);
integrationTest('((x; y) -> x + y)(1;2)', '3', germanTextContext);
integrationTest('cross([1,2,3],[-7,8,9])', '[-6, -30, 22]');
integrationTest('cross([1,0,0],[0,1,0])', '[0, 0, 1]');
integrationTest('sqrt(4)', '2');
integrationTest('root(8,3)', '2');
integrationTest('fact(0)', '1');
integrationTest('fact(1)', '1');
integrationTest('fact(7)', '5040');
integrationTest('ite(true, 1, 2)', '1');
integrationTest('ite(true, 1+2, 2)', '3');
integrationTest('ite(false, 1, 2)', '2');
integrationTest('foo:bar:=42', '42');
integrationTest('table((x)->x^2,0,2,1)', '[[0, 0], [1, 1], [2, 4]]');
integrationTest('table((x: number)->x^2,0,2,1)', '[[0, 0], [1, 1], [2, 4]]');
integrationTest('physics:c', '2.997925 * 10^8');
integrationTest('physics:m_p', '1.672622 * 10^(-27)');
integrationTest('physics:m_n', '1.674927 * 10^(-27)');
integrationTest('physics:m_e', '9.109384 * 10^(-31)');
integrationTest('physics:m_mu', '1.883532 * 10^(-28)');
integrationTest('physics:a_0', '5.291772 * 10^(-11)');
integrationTest('physics:h', '6.62607 * 10^(-34)');
integrationTest('physics:mu_N', '5.050784 * 10^(-27)');
integrationTest('physics:mu_B', '9.27401 * 10^(-24)');
integrationTest('physics:alpha', '0.007297');
integrationTest('physics:R_inf', '1.097373 * 10^7');
integrationTest('physics:F', '96485.332123');
integrationTest('physics:e', '1.602177 * 10^(-19)');
integrationTest('physics:N_A', '6.022141 * 10^23');
integrationTest('physics:k', '1.380649 * 10^(-23)');
integrationTest('physics:R', '8.314463');
integrationTest('physics:epsilon_0', '8.854188 * 10^(-12)');
integrationTest('physics:mu_0', '0.000001');
integrationTest('physics:G', '6.674 * 10^(-11)');
integrationTest('mod(2, 3)', '2');
integrationTest('mod(-2, 3)', '1');
integrationTest('mod(2, -3)', '-1');
integrationTest('mod(-2, -3)', '-2');
integrationTest('idiv(4, 3)', '1');
integrationTest('idiv(-4, 3)', '-1');
integrationTest('idiv(4, -3)', '-1');
integrationTest('idiv(4, 3)', '1');
integrationTest('matrix:det([[1]])', '1');
integrationTest('matrix:det([[1, 0], [0, 1]])', '1');
integrationTest('matrix:det([[1, 2],[3, 4]])', '-2');
integrationTest('matrix:id(1)', '[[1]]');
integrationTest('matrix:id(3)', '[[1, 0, 0], [0, 1, 0], [0, 0, 1]]');
integrationTest('matrix:inverse([[2, 1, 0], [1, 2, -2], [0, -1, 1]])', '[[0, 1, 2], [1, -2, -4], [1, -2, -3]]');
integrationTest('matrix:transpose([[1, 2],[4, 3],[3, 4]])', '[[1, 4, 3], [2, 3, 4]]');
integrationTest('matrix:adj([[4, 3], [5, 7]])', '[[7, -3], [-5, 4]]');
integrationTest('matrix:cof([[4, 3], [5, 7]])', '[[7, -5], [-3, 4]]');
integrationTest('fib(1)', '1');
integrationTest('fib(2)', '1');
integrationTest('fib(19)', '4181');

integrationTestThrow('1 + true');
integrationTestThrow('2 + [1,2,3]');
integrationTestThrow('2 ^ 3 ^ 4');
integrationTestThrow('4 * true');
integrationTestThrow('[[1,2],3]+[1,2,3]');
integrationTestThrow('[1,2]+[1,2,3]');
integrationTestThrow('(-1)^2.1');
integrationTestThrow('lsolve(x+y=1,2*x+2*y=1)');
integrationTestThrow('nintegrate((x)->x&true, -1, 1)');
integrationTestThrow('log(-1, 1)');
integrationTestThrow('log(1, -1)');
integrationTestThrow('log(1, 0)');
integrationTestThrow('log(0, 0)');
integrationTestThrow('ln(-1)');
integrationTestThrow('lg(-1)');
integrationTestThrow('1,2+1,3');
integrationTestThrow('((x; y) -> x + y)(1;2)');
integrationTestThrow('sqrt(-1)');
integrationTestThrow('root(-1, 2)');
integrationTestThrow('root(1, -2)');
integrationTestThrow('nderive((x) -> 1/x, 0)');
integrationTestThrow('table((x: boolean)->x^2,0,2,1)');
integrationTestThrow('mod(3,0)');
integrationTestThrow('mod(-3,0)');
integrationTestThrow('idiv(3,0)');
integrationTestThrow('idiv(-3,0)');
integrationTestThrow('matrix:det([[1, 2],[4, 3],[3, 4]])');
integrationTestThrow('matrix:det([[1, 2],[4,3,-3],[3, 4]])');
integrationTestThrow('matrix:det([[1, a],[3, 4]]');
integrationTestThrow('matrix:id(3.5)');
integrationTestThrow('matrix:id(-3)');
integrationTestThrow('matrix:id(0)');
integrationTestThrow('matrix:inverse([[1, 2],[4, 3],[3, 4]])');
integrationTestThrow('matrix:inverse([[1, 2],[4, 3, -3],[3, 4]])');
integrationTestThrow('matrix:inverse([[1, a],[3, 4]]');
integrationTestThrow('matrix:inverse([[2, 1, 0], [1, 2, -2], [4, 2, 0]])');
integrationTestThrow('matrix:transpose([1])');
integrationTestThrow('matrix:adj([[1, a],[3, 4]]');
integrationTestThrow('matrix:adj([[2, 1, 0], [1, 2], [4, 2, 0]])');
integrationTestThrow('matrix:adj([1])');
integrationTestThrow('matrix:cof([[1, a],[3, 4]]');
integrationTestThrow('matrix:cof([[2, 1, 0], [1, 2], [4, 2, 0]])');
integrationTestThrow('matrix:cof([1])');
integrationTestThrow('fib(0)');
integrationTestThrow('fib(3.5)');
