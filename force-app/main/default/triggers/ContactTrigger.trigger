trigger ContactTrigger on Contact (before insert, after Update , after Insert) {
    
    if(Trigger.isBefore && Trigger.isInsert){
    ContactTriggerHandler.handleActivitiesBeforeInsert(Trigger.New);
}
    if(trigger.isAfter && trigger.isUpdate){
        ContactTriggerHandler.handleActivitiesAfterInsertUpdate(Trigger.New,Trigger.oldMap);
    }
}