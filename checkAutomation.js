var gr = new GlideRecord("u_diagnostics_page");
gr.setWorkflow(false);
var diag = new Diagnostics();

while (diag.nextNode()) {
  var diagNode = diag.getNode();
  var nodeName = diagNode.name;
  var errors = Number(diagNode.stats["servlet.errors.handled"]);
  var transactions = Number(diagNode.stats["servlet.transactions"]);
  var loggedUsers = Number(diagNode.stats.sessionsummary["@logged_in"]);
  var status = diagNode.status == "online" ? "online" : "offline";
  var jvmUptime = diagNode.stats['jvm.time_friendly'];
  var schedulerRunning = diagNode.stats['scheduler.is.running'];


  // Calculate record count
  gr.query();
  var recordCount = gr.getRowCount();
  gs.info("Records in table: " + recordCount);

  // Calculate average transactions
  var avgTransactions =
    recordCount == 0 ? transactions : calculateAverage("u_transactions");

  // Calculate average errors
  var avgErrors = recordCount == 0 ? errors : calculateAverage("u_errors");

  // Insert a new record
  gr.newRecord();
  gr.u_scheduler_running = schedulerRunning;
  gr.u_jvm_uptime = jvmUptime;
  gr.u_avg_transactions = avgTransactions;
  gr.u_avg_errors = avgErrors;
  gr.u_node_name = nodeName;
  gr.u_errors = errors;
  gr.u_transactions = transactions;
  gr.u_logged_in_users = loggedUsers;
  gr.u_status = status;
  gr.insert();
}

function calculateAverage(fieldName) {
  var total = 0; // Initialize the total to 0
  gr.query();
  while (gr.next()) {
    total += Number(gr.getValue(fieldName));
  }
  return total / recordCount;
}