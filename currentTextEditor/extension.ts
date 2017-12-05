import {
    window,
    commands,
    ExtensionContext
} from 'vscode';

export function activate(context: ExtensionContext) {

    console.log('activate log');

    let currentTextEditor = new CurrentTextEditor();

    let disposable = commands.registerCommand('extension.current_text_editor', () => {
        currentTextEditor.show();
    });

    context.subscriptions.push(disposable);
}

class CurrentTextEditor {

    public show(){

        let editor = window.activeTextEditor;

        if(!editor) return console.log('current text editor does not exist');
        
        let doc = editor.document;
        console.log('current text editor document', doc);
        console.log('get text', doc.getText());

    }

}

/*
    activate log                                                extension.js:5
    current text editor does not exist                          extension.js:17

    current text editor document                                extension.js:19
    Object
        {
            uri : {
                $mid:1
                fsPath:"/Users/***************d/data.json"
                external:"file:///***************d/data.json"
                path:"/Users/***************d/data.json"
                scheme:"file"
            },
            fileName:"/Users/***************d/data.json",
            isUntitled:false,
            languageId:"json",
            version:1,
            isClosed:false,
            isDirty:false,
            eol:1,
            lineCount:128
        }

    get text Object{}                                           extension.js:20
*/