import {LightningElement,api} from 'lwc';
export default class LwcParent extends LightningElement {
       @api currentVal;
       handleChange(event){
        this.currentVal=event.detail;
        //window.console.log('fldInp# ' + this.nameInp);        
        }
}