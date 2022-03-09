// create number sequence generator function
function* generator(from: number, to: number) {
    for (let i = from; i <= to; i++) {
        yield i
    }
}

// simple wrapper function
function sequenceOf(from: number, to: number): number[] {
    return [...generator(from, to)]
}

console.log([...sequenceOf(5, 50)]);

// simple wrapper class
class Sequence {
    constructor(
        private from: number,
        private to: number
    ) {}

    [Symbol.iterator] = () => {
        return generator(this.from, this.to)
    }
}

console.log([...new Sequence(5, 25)]);


// create simple generator
function* sampleGenerator() {
    yield "Hello"
    yield "Everyone,"
    yield "Welcome to"
    yield "My Channel"

    return "I don`t speak English:)"
}

//  simple handling implementation of generator class using Finite state machine pattern
class StringGenerator implements Iterator<string> {

    private step = 0

    next() : IteratorResult<string> {
        
        let value = ""
        let done = false

        switch(this.step) {
            case 0: // yield 1
                value = "Hello"; 
                this.step++
                break;

            case 1: // yield 2
                value = "Everyone,";
                this.step++
                break;
                
            case 2: // yield 3
                value = "Welcome to";
                this.step++
                break;

            case 3: // yield 4
                value = "My Channel";
                this.step++
                break;

            case 4: // return -> finish state machine
                value = "I don`t speak English:)"
                this.step++
                done = true
                break;
            default: 
                return { value: undefined, done: true }
        }

        return { value, done }
    }
}

/* uncomment next line for use generator function 
   or use StringGenerator class.
   both work the same 
*/
// let gen = sampleGenerator()
let gen = new StringGenerator()

console.log('> handle log generator values');

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().value); // return
console.log(gen.next().value); // undefined - because generator has been reached.

// or iterate generator
console.log('> iterate generator');
for (const value of sampleGenerator()) {
    console.log(value);
}