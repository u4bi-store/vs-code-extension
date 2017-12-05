import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let previewUri = vscode.Uri.parse('u4bi://');

	class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
        
        private createCssSnippet = () => `
            <style>
                h1 { color : #ff00ff; }
            </style>
            <body>
                <h1>TEST</h1>
            </body>`;

        public provideTextDocumentContent = (uri: vscode.Uri): string => this.createCssSnippet();
    }

	let provider = new TextDocumentContentProvider();
	let registration = vscode.workspace.registerTextDocumentContentProvider('u4bi', provider);

    let disposable = vscode.commands.registerCommand('extension.showCssPropertyPreview', () => vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'u4bi test')
        .then((success) => {
            console.log('success', success);
        }, (reason) => {
            vscode.window.showErrorMessage('error', reason);
        }));

	context.subscriptions.push(disposable, registration);
}