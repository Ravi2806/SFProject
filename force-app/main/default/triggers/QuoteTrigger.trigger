trigger QuoteTrigger on Quote (after insert, after update) {
    
    if(Trigger.isAfter && Trigger.isInsert){
        QuoteTriggerHandler.handleActivitiesAfterInsert(Trigger.New);
    }
	
    if(Trigger.isAfter && Trigger.IsUpdate){
        QuoteTriggerHandler.handleActivitiesAfterUpdate(Trigger.New,Trigger.oldMap);
    }
}