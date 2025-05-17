trigger AccountTrigger on Account (before Insert,before update, after update, after Insert) {

    if(Trigger.isBefore && Trigger.isUpdate){
    	AccountTriggerHandler.handleActivitiesBeforeUpdate(Trigger.New, Trigger.oldMap);

        }
    if(Trigger.isAfter && Trigger.isUpdate){
     //   AccountTriggerHandler.handleActivitiesAfterUpdate(Trigger.New, Trigger.oldMap);
   		}
    if(Trigger.isAfter && Trigger.isInsert){
     //   AccountTriggerHandler.handleActivitiesAfterInsert(Trigger.New);
    }
    if(Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)){
        AccountTriggerHandler.handleActivitiesBeforeInsertUpdate(Trigger.New);
    }
    /*if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)){
        AccountTriggerHandler.handleActivitiesAfterInsertUpdate(Trigger.New);
    }*/
   
}