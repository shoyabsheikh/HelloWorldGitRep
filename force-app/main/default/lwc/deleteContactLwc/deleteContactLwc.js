import { LightningElement, track, wire } from 'lwc';
import displayContactRecord from '@salesforce/apex/lwcAppExampleApex.displayContactRecord';
import {deleteRecord} from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class DeleteContactLwc extends LightningElement {
  @wire (displayContactRecord) getContact;
  @track recordId;

  handleContactDelete(event){
     this.recordId = event.target.value;
     //window.console.log('recordId# ' + this.recordId);
     deleteRecord(this.recordId) 
     .then(() =>{

        const toastEvent = new ShowToastEvent({
            title:'Record Deleted',
            message:'Record deleted successfully',
            variant:'success',
        })
        this.dispatchEvent(toastEvent);

        return refreshApex(this.getContact);
        
     })
     .catch(error =>{
         window.console.log('Unable to delete record due to ' + error.body.message);
     });
  }
  
}