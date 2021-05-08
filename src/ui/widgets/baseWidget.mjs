export class BaseWidget{
    render(){
        return this._generateHTML();
    }

    _generateHTML() {
        return new HTMLElement();
    }
}