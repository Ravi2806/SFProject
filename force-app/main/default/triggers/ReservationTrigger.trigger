trigger ReservationTrigger on Reservation__c (before insert, before update, after insert, after update, after delete, after undelete) {
    
    if(Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)){
        ReservationTriggerHandler.handleActivitiesBeforeUpdateInsert(Trigger.New);
    }
    
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete || Trigger.isUndelete)){
        ReservationTriggerHandler.handleActivitiesAfterUpdateInsertDeleteUndelete(Trigger.New, Trigger.OldMap);
    }
}