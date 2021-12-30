import { LightningElement, api } from 'lwc';

export default class ContactListItem extends LightningElement {
    @api contact;

    selectHandler(event) {
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();

        // Creates the event with the contact ID data.
        const selectedEvent = new CustomEvent('selected', { detail: this.contact.Id });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
}