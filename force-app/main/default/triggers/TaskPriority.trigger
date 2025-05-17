trigger TaskPriority on Task (before insert) {
    
    if(Trigger.isInsert && Trigger.isBefore){
        for(Task taskRecord : Trigger.New){
            System.debug('Found the Task');
            taskRecord.Priority = 'High';
        }
    }

}