import { LightningElement, track, wire} from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

import getTaskList from '@salesforce/apex/taskController.getTaskList';

import getTasksBySubject from '@salesforce/apex/taskController.getTasksBySubject';

export default class TaskFunctionality extends NavigationMixin(LightningElement) {

    @track tasks = [];
    @track addedTasks = [];
    @track showDropdown = false;
    @track selectedTasks = [];
    error;

    connectedCallback() {
        getTaskList().then(result => {
            this.tasks = result;
        }).catch(error => console.error(error));
    }

    handleFocus() {
        this.showDropdown = true;
    }

    handleCheckboxChange(event){
        const taskId = event.currentTarget.dataset.id;
        if(event.target.checked){
            this.selectedTasks.push(taskId);
        }else if(!(event.target.checked)){
            this.selectedTasks = this.selectedTasks.filter(task => task.Id != taskId);
        }
    }

    handleClick(){
        if (!this.selectedTasks || this.selectedTasks.length === 0) {
            console.warn('No contacts selected for addding it to the To Do List');
            return;
        }
    
        const selected = this.tasks.filter(task => this.selectedTasks.includes(task.Id));
    
        const newTasks = selected.filter(task => !this.addedTasks.some(t => t.Id === task.Id));
    
        this.addedTasks = [...this.addedTasks, ...newTasks];
    
        this.selectedTasks = [];
        this.showDropdown = false;

    }

    handleRemove(event){
        const taskId = event.currentTarget.dataset.id;
        this.addedTasks = this.addedtasks.filter(task => !this.addedTasks.includes(task.Id));
    }
}