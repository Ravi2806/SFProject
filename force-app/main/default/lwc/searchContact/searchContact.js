import { LightningElement, track} from 'lwc';

import searchContacts from '@salesforce/apex/ContactSearchController.searchContacts';

export default class SearchContact extends LightningElement {

    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track contacts = [];
    @track isDisabled = true;
    @track error;

    handleInputChange(event){
        const field = event.target.name;
        this[field] = event.target.value;
    }
    handleSearch(){
        searchContacts({firstName : this.firstName, lastName : this.lastName, email : this.email}).then(result =>{
            this.contacts = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.contacts = [];
        });
    }

    }