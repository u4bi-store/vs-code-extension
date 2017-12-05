import { window,
    commands,
    ExtensionContext,
    StatusBarItem,
    StatusBarAlignment
} from 'vscode';

export function activate(context: ExtensionContext) {

    console.log('activate log');

    let basic = new Basic();

    let disposable = commands.registerCommand('extension.basic', () => {
        basic.show();
        window.showInformationMessage('Basic!');
    });

    context.subscriptions.push(basic);
    context.subscriptions.push(disposable);
}

class Basic {

private _statusBarItem: StatusBarItem;

    public show(){    

        if (!this._statusBarItem) this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        
        this._statusBarItem.text = 'basic';
        this._statusBarItem.show();
        console.log('show');
    }

    dispose(){
        this._statusBarItem.dispose();
    }

}