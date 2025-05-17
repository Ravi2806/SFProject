import { LightningElement, api } from 'lwc';

export default class Pubpridemo extends LightningElement {
    message = 'Private Property';
   @api recordId;

}