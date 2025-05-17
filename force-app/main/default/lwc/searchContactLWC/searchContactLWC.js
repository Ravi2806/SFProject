import { LightningElement, track, wire} from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';

import {deleteRecord} from 'lightning/uiRecordApi';

import searchContacts2 from '@salesforce/apex/ContactSearchController.searchContacts';

export default class searchContactLWC extends NavigationMixin(LightningElement) {

    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track contacts = [];
    @track isDisabled = true;
    @track error;
    @track isVisible = false;
    @track selectedContacts = [];



    /*@wire(searchContacts2,{firstName : '$firstName', lastName : '$lastName', email : '$email'})
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
    }
    }

    
    handleSearch(){
        searchContacts2({firstName : this.firstName, lastName : this.lastName, email : this.email}).then(result =>{
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
                    this.contacts = this.contacts.filter(contact => contact.Id != contactId);
                  })

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
          const contactId = event.currentTarget.dataset.id;

          if(event.target.checked){
            this.selectedContacts = [...this.selectedContacts,contactId];
          }else{
            this.selectedContacts = this.selectedContacts.filter(contact => contact.Id != contactId);
          }
        this.isVisible = this.selectedContacts.length > 0;
        }
           
    }