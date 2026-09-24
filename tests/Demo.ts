
// tsc file.ts -> Converts ts file to js.

// Datatype must be defined
let message : string = "Hello";

// There is also any definition for datatype
let message2 : any = 12345;
message2 = "With any datatype definition this works."

// In function also return type needs to be defined
function add(a : number , b : number) : number
{
    return a + b;
}

// Defining object
let user : {name : string, age : number} = {name : "Bob", age :  30};
