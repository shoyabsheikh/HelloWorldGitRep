public with sharing class lwcAppExampleApex {

    
  @AuraEnabled(cacheable=true)
  public static List<Contact> displayContactRecord(){
      List<Contact> conList = [Select Id, FirstName, LastName, Email From Contact limit 10];
      return conList;
  }


}