export function convert(text: string): string {
   const collected: string[] = [];
   let isCodeBlock: boolean = false;
   let isHyperLink: boolean = false;
   let hyperLink: string = '';
   let last: string = '';
   let out: string = '';

   for (let p = 0; p < text.length; p++) {
      const c = text.charAt(p);

      if (c === '`' && isCodeBlock) {
         isCodeBlock = false;
         out += c;
      } else if (c === '`' && !isCodeBlock) {
         isCodeBlock = true;
         out += c;
      } else if (c === '[' && !isCodeBlock && !isHyperLink) {
         out += c;
      } else if (c === '(' && last === ']' && !isCodeBlock) {
         hyperLink = '';
         isHyperLink = true;
      } else if (c === ')' && !isCodeBlock && isHyperLink) {
         isHyperLink = false;

         if (hyperLink !== '') {
            const link = hyperLink;
            let pointer = -1;

            for (let i = 0; i < collected.length; i++) {
               if (collected[i] === link) {
                  pointer = i + 1;
                  break;
               }
            }

            if (pointer === -1) {
               collected.push(link);
               pointer = collected.length;
            }

            out += `[${pointer}]`;
         } else {
            out += c;
         }
      } else if (!isCodeBlock && isHyperLink) {
         hyperLink += c;
      } else {
         out += c;
      }
      last = c;
   }

   if (collected.length !== 0) {
      out += '\n\n';
      for (let i = 0; i < collected.length; i++) {
         out += `[${i + 1}]:${collected[i]}\n`;
      }
   }

   return out;
}
