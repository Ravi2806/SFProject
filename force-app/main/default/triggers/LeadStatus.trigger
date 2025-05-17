trigger LeadStatus on Lead (before update) {
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
}