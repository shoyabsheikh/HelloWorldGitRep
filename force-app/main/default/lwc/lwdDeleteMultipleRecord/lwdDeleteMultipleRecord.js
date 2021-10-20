import { LightningElement, wire,api, track } from 'lwc';
import fetchContactRecord from '@salesforce/apex/lwcAppExampleApex.fetchContactRecord';
import deleteMultipleContactRecord from '@salesforce/apex/lwcAppExampleApex.deleteMultipleContactRecord';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class LwdDeleteMultipleRecord extends LightningElement {
    @api  columns =[
        { label: 'First Name', fieldName: 'FirstName', type:'text'},
        { label: 'Last Name', fieldName: 'LastName',type:'text' },
        { label: 'Email', fieldName: 'Email', type:'Email'}       
    ];

        
    @wire (fetchContactRecord) wireContact;

    @api selectedContactIdList=[];
    @track errorMsg;


    getSelectedIdAction(event){
        const selectedContactRows = event.detail.selectedRows;
        window.console.log('selectedContactRows# ' + JSON.stringify(selectedContactRows));
        this.selectedContactRows=[];
        
        for (let i = 0; i<selectedContactRows.length; i++){
            this.selectedContactIdList.push(selectedContactRows[i].Id);
        }

       // window.console.log('selectedContactRows1 ' + this.selectedContactRows + selectedContactRows.length );
    }
  
   
    deleteContactRowAction(){
        deleteMultipleContactRecord({conObj:this.selectedContactIdList})
        .then(()=>{
            this.template.querySelector('lightning-datatable').selectedContactRows=[];

            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record deleted successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);

            return refreshApex(this.wireContact);
        })
        .catch(error =>{
            this.errorMsg =error;
            window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
        });
    }

}