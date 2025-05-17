trigger OpportunityTrigger on Opportunity (after Update, before Update, after Insert ) {
    
     if(Trigger.isUpdate && Trigger.isBefore){
       OpportunityTriggerHandler.handleActivitiesBeforeUpdate(Trigger.New);
    }
    
    /*if(Trigger.isUpdate && Trigger.isAfter){
       OpportunityTriggerHandler.handleActivitiesAfterUpdate(Trigger.New);
    }
    
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)){
        OpportunityTriggerHandler.handleActivitiesAfterInsertUpdate(Trigger.New);
    }*/
    
  
}