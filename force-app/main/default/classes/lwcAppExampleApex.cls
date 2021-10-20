public with sharing class lwcAppExampleApex {   
    

    //delete multiple contact record in LWC
     @AuraEnabled(cacheable=true)
     public static List<Contact> fetchContactRecord(){
         List<Contact> conList = [Select Id, FirstName, LastName, Email, Phone From Contact Order By createdDate desc Limit 10 ];
         return conList;
     }
 
     @AuraEnabled
     public static List<Contact> deleteMultipleContactRecord(List<String> conObj){
         List<Contact> conObjItem = new   List<Contact>();
       List<Contact> conObjList = [Select Id, Name  From Contact Where Id IN:conObj];
       for(Contact con:conObjList){
         conObjItem.add(con);
       }
       if(conObjItem.size()>0){
           try{
             delete conObjItem;           
           }
           catch (Exception exp) {
             throw new AuraHandledException(exp.getMessage());
         }
       }
       return fetchContactRecord();
     }
 
 }