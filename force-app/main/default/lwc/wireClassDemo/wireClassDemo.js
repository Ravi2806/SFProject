import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
export default class WireClassDemo extends LightningElement {
    @api recordId;
    @wire(getContacts,{accIds : '$recordId'})
    contacts;
}