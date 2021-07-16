import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import { convert } from '../../convert';

suite('Convert Test Suite', () => {

   const testFileCount = (() => {
      let index = 0;
      while (true) {
         try {
            fs.readFileSync(path.join(__dirname, 'test.md', `test${index}.in`));
            index++;
         } catch {
            break;
         }
      }
      return index;
   })();

   for (let i = 0; i < testFileCount; i++) {
      test(`Convert test${i}`, () => {
         const input = fs.readFileSync(path.join(__dirname, 'test.md', `test${i}.in`)).toString();
         const expectOutput = fs.readFileSync(path.join(__dirname, 'test.md', `test${i}.out`)).toString();
         const output = convert(input);
         assert.strictEqual(output.replace(/\r\n/g, '\n'), expectOutput.replace(/\r\n/g, '\n')); //consistent eol
      });
   }

});
