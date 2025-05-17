import { LightningElement, track} from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';

import deleteContacts from '@salesforce/apex/ContactSearchController.deleteContacts';

import {deleteRecord} from 'lightning/uiRecordApi';

import searchContacts from '@salesforce/apex/ContactSearchController.searchContacts';

export default class searchContactLWC extends NavigationMixin(LightningElement) {

    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track contacts = [];
    @track isDisabled = true;
    @track error;
    @track isVisible = false;
    @track selectedContacts = [];



    /*@wire(searchContacts,{firstName : '$firstName', lastName : '$lastName', email : '$email'})
        wiredcontacts({data, error}){
            if(data){
                this.contacts = data;
                this.error = undefined;
            } else if (error){
                this.error = error;
                this.contacts = [];
            }
        }*/

    handleInputChange(event){

        const field = event.target.name;
        this[field] = event.target.value;
        this.isDisabled = !(this.firstName || this.lastName || this.email); 
       
        if(this.isDisabled){
            this.contacts = [];
            this.isVisible = false;
    }
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

        navigateToRecord(event) {
            const contactId = event.currentTarget.dataset.id;
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: contactId,
                    objectApiName: 'Contact',
                    actionName: 'view'
                }
            });
        }

            handleDelete(event){
                const contactId = event.currentTarget.dataset.id;
                deleteRecord(contactId)
                .then(()=>{
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record deleted',
                            variant: 'success'
                        })
                    );
                    this.contacts = this.contacts.filter(contact => contact.Id !== contactId);
                  })
                  .catch((error) => {
                console.error('Error deleting contacts:', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Failed to delete records. Please try again later.',
                        variant: 'error',
                    })
                );
            });
                }

            handleEdit(event){
                const contactId = event.currentTarget.dataset.id;
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId : contactId,
                        objectApiName : 'Contact',
                        actionName: 'edit'
                    }
                })
            }

        handleCheckboxChange(event){
           /* console.log('Event:', event);
            
            console.log('Before', this.selectedContacts);
            if(event.target.checked){
                const contactIds = event.currentTarget.dataset.id;
                
                console.log('ContactID',contactIds);
                this.selectedContacts.push(contactIds);
                console.log('Array Length:', this.selectedContacts.length);
                //this.selectedContacts.push(contactId);
                console.log('Is selectedContacts an array?', Array.isArray(this.selectedContacts));
                //console.log('ContactID:', contactId, 'Type:', typeof contactId);
                console.log('selectedContacts type:', typeof this.selectedContacts);
                    console.log('selectedContacts AFTER:', JSON.parse(JSON.stringify(this.selectedContacts))); // Log the updated contents

                this.isVisible =true;
                console.log('After Inside if ', this.selectedContacts);
            }console.log('After', this.selectedContacts);*/
            const contactId = event.currentTarget.dataset.id;
            if(event.target.checked){
                this.selectedContacts.push(contactId);
                this.isVisible =true;
            }else if(!(event.target.checked) && this.selectedContacts.includes(contactId)){
                this.selectedContacts = this.selectedContacts.filter(Id => Id != contactId);
                    if(this.selectedContacts.length ===0){
                        this.isVisible = false;
                    }
            }
          
        }

        handleDelete2(){
       /* console.log('Selected Contacts:', this.selectedContacts);*/
        // Check if there are contacts to delete
        if (!this.selectedContacts || this.selectedContacts.length === 0) {
            console.warn('No contacts selected for deletion');
            return;
        }
        const contactIds = [...this.selectedContacts];
        deleteContacts({contactIds})
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Selected Records Deleted',
                        variant: 'success',
                    })
                );
                // Resetting state
                this.contacts = this.contacts.filter(contact => !this.selectedContacts.includes(contact.Id) );
                this.selectedContacts = [];
                this.isVisible = false;
            })
            .catch((error) => {
                console.error('Error deleting contacts:', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Failed to delete records. Please try again later.',
                        variant: 'error',
                    })
                );
            });
            
    }
           
}