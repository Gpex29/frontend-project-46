import { readFileSync } from 'node:fs';

export default (argument) => JSON.parse(readFileSync(argument));
