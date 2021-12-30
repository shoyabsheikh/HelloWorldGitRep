import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class EventWithData extends LightningElement {
    selectedContact;

    @wire(getContactList) contacts;

    contactSelected(event) {
        const contactId = event.detail;
        this.selectedContact = this.contacts.data.find(contact => contact.Id === contactId);
    }

    get listIsNotEmpty() {
        return this.contacts && Array.isArray(this.contacts.data) && this.contacts.data.length > 0;
    }
}