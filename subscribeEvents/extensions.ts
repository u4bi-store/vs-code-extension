import {
    window,
    commands,
    ExtensionContext,
    Disposable
} from 'vscode';

export function activate(context: ExtensionContext) {

    console.log('activate log');

    let subscribeEvents = new SubscribeEvents();

    let disposable = commands.registerCommand('extension.subscribe_events', () => {
        subscribeEvents.show();
    });

    context.subscriptions.push(subscribeEvents);
    context.subscriptions.push(disposable);
}

class SubscribeEvents {

    private _disposable: Disposable;

    public show(){
        
        let subscriptions: Disposable[] = [];

        window.onDidChangeTextEditorSelection( (e)=> { // cursor position
            console.log('change text editor selection', e);
        }, this, subscriptions);

        window.onDidChangeActiveTextEditor( (e) => { // active editor changes
            console.log('change active text editor', e);
        }, this, subscriptions);

        this._disposable = Disposable.from(...subscriptions);   

    }

    dispose() {
        this._disposable.dispose();
    }

}


/*

change text editor selection                            extension.js:18
Object
textEditor:Object
    _disposed:false
    _proxy:Object
    _id:"vs.editor.ICodeEditor:1,$model1"
    _documentData:Object
    _selections:Array[1]
    _options:Object
    _proxy:Object
    _id:"vs.editor.ICodeEditor:1,$model1"
    _tabSize:2
    _insertSpaces:true
    _cursorStyle:1
    _lineNumbers:1
    _viewColumn:1
selections:Array[1]
kind:1

*/

/*

change active text editor                               extension.js:21
Object
    _disposed:false
    _proxy:Object
    _id:"vs.editor.ICodeEditor:1,$model4"
    _documentData:Object
    _selections:Array[1]
    _options:Object
    _viewColumn:1

*/