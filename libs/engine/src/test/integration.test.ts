import { getDefaultContext, init } from '..';
import createNumberNode from '../create/create-number-node';
import { createOptions } from '../utils/context-utils';
import { createTestContext, integrationTest, integrationTestThrow } from '../utils/integration-test-utils';

init();

const defaultStack = getDefaultContext().stack;
const germanTextContext = createTestContext(defaultStack, createOptions({ decimalSeparator: ',' }));

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
integrationTest('a + 1', '42', createTestContext([new Map(Object.entries({ a: createNumberNode(41) }))]));
integrationTest('"foo"', '"foo"');
integrationTest("'foo'", '"foo"');
integrationTest('((x)->x^2)(2)', '4');
integrationTest('((x: number) -> x+1)(3)', '4');
integrationTest('((x: number) -> x) + ((y: number) -> y^2)', '(x: number) → x + x^2');
integrationTest('((x: number) -> x) + ((x: number) -> x^2)', '(x: number) → x + x^2');
integrationTest('ite(true, 1, 2)', '1');
integrationTest('ite(true, 1+2, 2)', '3');
integrationTest('ite(false, 1, 2)', '2');
integrationTest('foo:bar:=42', '42');
integrationTest('[1, 2, 3]^3', '[14, 28, 42]');
integrationTest('[1, 2, 3]^1', '[1, 2, 3]');
integrationTest('[[1, 2], [3, 4]]^3', '[[37, 54], [81, 118]]');
integrationTest('[[1, 2], [3, 4]]^1', '[[1, 2], [3, 4]]');
integrationTest('[[1, 2], [3, 4]]^0', '[[1, 0], [0, 1]]');
integrationTest('((x->x)+(y->2*y))(2)', '6');
integrationTest('tensor:rank([])', '1');
integrationTest('tensor:rank([1])', '1');
integrationTest('tensor:rank([1, 2])', '1');
integrationTest('tensor:rank([[1,2],[3,4]])', '2');
integrationTest('tensor:dims([])', '[0]');
integrationTest('tensor:dims([1])', '[1]');
integrationTest('tensor:dims([1, 2])', '[2]');
integrationTest('tensor:dims([[1,2],[3,4]])', '[2, 2]');
integrationTest('list:filter(x->x>=5,[1,2,3,4,5,6,7,8,9,10])', '[5, 6, 7, 8, 9, 10]');
integrationTest('list:map(x->x^2,[1,2,3])', '[1, 4, 9]');
integrationTest('list:reduce((a,b)->a+b,[1,2,3])', '6');
integrationTest('list:reduce((a,b)->a+b,[1,2,3], 2)', '8');
integrationTest('list:reduce((a,b)->a+b,[1], 2)', '3');
integrationTest('list:reverse([1,2,3])', '[3, 2, 1]');
integrationTest('list:concat([1,2,3], [1,2,3])', '[1, 2, 3, 1, 2, 3]');
integrationTest('list:sort([3, 2, 8, 5, 3])', '[2, 3, 3, 5, 8]');
integrationTest('list:range(1, 4)', '[1, 2, 3, 4]');
integrationTest('list:range(4, 1)', '[1, 2, 3, 4]');
integrationTest('list:range(4, 1, 2)', '[1, 3]');
integrationTest('list:range(4, 1, 4)', '[1]');
integrationTest('list:range(1, -1)', '[-1, 0, 1]');
integrationTest('(__proto__ -> __proto__)(2)', '2');
integrationTest('[1;2;3]', '[1; 2; 3]', germanTextContext);
integrationTest('1,2+1,3', '2,5', germanTextContext);
integrationTest('((x; y) -> x + y)(1;2)', '3', germanTextContext);
integrationTest('((x; y) -> x + y)', '(x: any; y: any) → x + y', germanTextContext);
integrationTest('\\sqrt {4}', '2');
integrationTest('\\sqrt [3] {8}', '2');
integrationTest('\\frac {4} {8}', '0.5');
integrationTest('\\frac {4} {\\sqrt { 4 } }', '2');

integrationTestThrow('1 + true');
integrationTestThrow('2 + [1,2,3]');
integrationTestThrow('2 ^ 3 ^ 4');
integrationTestThrow('4 * true');
integrationTestThrow('[[1,2],3]+[1,2,3]');
integrationTestThrow('[1,2]+[1,2,3]');
integrationTestThrow('(-1)^2.1');
integrationTestThrow('1,2+1,3');
integrationTestThrow('((x; y) -> x + y)(1;2)');
integrationTestThrow('[1, [2, 3]]^1');
integrationTestThrow('[1, 2]^(-1)');
integrationTestThrow('[1, 2]^1.5');
integrationTestThrow('[[[1]]]^2');
integrationTestThrow('[[1], [2]]^2');
integrationTestThrow('[1, 2, 3]^0');
integrationTestThrow('tensor:rank([1,[2,3]])');
integrationTestThrow('tensor:dims([1,[2,3]])');
integrationTestThrow('[1, [2, 3]]^1');
integrationTestThrow('[1, 2]^(-1)');
integrationTestThrow('[1, 2]^1.5');
integrationTestThrow('[[[1]]]^2');
integrationTestThrow('[[1], [2]]^2');
integrationTestThrow('[1, 2, 3]^0');
integrationTestThrow('tensor:rank([1,[2,3]])');
integrationTestThrow('tensor:dims([1,[2,3]])');
integrationTestThrow('list:filter((x,y)->true, [1,2,3])');
integrationTestThrow('list:filter((x)->x, [1,2,3])');
integrationTestThrow('list:map((x, y)->x, [1,2,3])');
integrationTestThrow('list:map((x)->x - 2, [true, false, true])');
integrationTestThrow('list:reduce((a,b)->a+b,[])');
integrationTestThrow('list:reduce((a,b)->a+b,[1])');
integrationTestThrow('list:reduce((a)->a,[1])');
integrationTestThrow('list:sort([1, true, 2])');
integrationTestThrow('list:range(1, 10, 0)');
