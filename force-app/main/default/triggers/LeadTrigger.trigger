trigger LeadTrigger on Lead (before update, after insert, after update, before delete) {
    for(Lead leadRecord : Trigger.New){
        
    if(Trigger.isUpdate && Trigger.isBefore){
            leadRecord.Status = 'Working-Contacted';
        
        if(leadRecord.Industry == 'Healthcare'){
            leadRecord.LeadSource = 'Purchased List';
            leadRecord.SICCode__c = '1100';
            leadRecord.Primary__c = 'Yes';
        	}
        }   
    }
    if(Trigger.isInsert && Trigger.isAfter){
   		LeadTriggerHandler.handleActivitiesAfterInsert(Trigger.New,null);
}
    if(Trigger.isUpdate && Trigger.isAfter){
    	LeadTriggerHandler.handleActivitiesAfterInsert(Trigger.New, trigger.oldMap);
}
    if(Trigger.isDelete && Trigger.isBefore){
      	LeadTriggerHandler.handleActivitiesBeforeDelete(Trigger.Old);
    }
}