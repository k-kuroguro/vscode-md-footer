import { window, commands, ExtensionContext, Position, Range } from 'vscode';
import { generateLinks } from 'md-footer';

export function activate(context: ExtensionContext) {
   context.subscriptions.push(
      commands.registerCommand('md-footer.generateFooter', generateFooter)
   );
}

export function deactivate() { }

function generateFooter(): void {
   if (!window.activeTextEditor) return;
   const editor = window.activeTextEditor;
   const start = new Position(0, 0);
   const end = new Position(editor.document.lineCount - 1, editor.document.lineAt(editor.document.lineCount - 1).text.length);
   editor.edit(builder => {
      builder.replace(new Range(start, end), generateLinks(editor.document.getText()));
   });
}
