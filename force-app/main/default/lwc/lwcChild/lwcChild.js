import { LightningElement,api } from 'lwc';

export default class LwcChild extends LightningElement {  
   @api nameInp;
   handleChangeName(event){ 
     this.nameInp = event.target.value;
     const myDemoEvent = new CustomEvent('demoevent',{
         detail:this.nameInp
        });
     this.dispatchEvent(myDemoEvent);
     //window.console.log('nameInpBBB' + this.nameInp);
   }

}