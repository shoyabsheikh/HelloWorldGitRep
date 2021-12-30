global with sharing class ContactController {
    public ContactController() {

    }
    
    @AuraEnabled
    global static List<contact> getContactList (){
        try {

            return [Select Id,name,title,phone,email from contact limit 10];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
