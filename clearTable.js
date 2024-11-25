// Declaring function "delDailyChecksRecs" //
function delDailyChecksRecs() {
    var gr = new GlideRecord("u_diagnostics_page");
    // Enacts a query of the targeted database AKA "u_diagnostics_page" //
    gr.query();
    //Don't fire Business rule,notifications //
    gr.setWorkflow(false);
    // Deletes all records in targeted table //
    gr.deleteMultiple();
  }
  
  // Enacting function "delDailyChecksRecs" //
  delDailyChecksRecs();