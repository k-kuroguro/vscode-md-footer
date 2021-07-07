import { window, commands, ExtensionContext, Position, Range } from 'vscode';
import { convert } from './convert';

export function activate(context: ExtensionContext) {
   context.subscriptions.push(
      commands.registerCommand('vscode-md-footer.generateFooter', generateFooter)
   );
}

export function deactivate() { }

function generateFooter() {
   if (!window.activeTextEditor) return;
   const editor = window.activeTextEditor;
   const start = new Position(0, 0);
   const end = new Position(editor.document.lineCount - 1, editor.document.lineAt(editor.document.lineCount - 1).text.length);
   editor.edit(builder => {
      builder.replace(new Range(start, end), convert(editor.document.getText()));
   });
}
