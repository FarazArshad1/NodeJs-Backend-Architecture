/**
 * Utility to print a cleaned-up error trace to the console.
 * Helpful for quick debugging in development.
 */
export function printError(e: any) {
  const errorType = e.constructor?.name ?? "Error";
  const errorName = e.message || "No additional information available";

  // First "at ..." line in the stack is where the error originated
  let location = "unknown";
  const frame = e.stack?.split("\n").find((l: string) => l.trim().startsWith("at "));
  
  if (frame) {
    const cleaned = frame.trim().replace(/^at\s+/, "");      // drop "at " / "at fnName "
    const m = cleaned.match(/(?:.*\()?(.+):(\d+):(\d+)\)?$/); // file:line:col
    if (m) location = `${m[1]}:${m[2]}`;
  }

  console.error(
    `\n[CLEAN ERROR TRACE]\n` +
    `Error Type: ${errorType}\n` +
    `Error Name: ${errorName}\n` +
    `Line where error occurred: ${location}\n` +
    `------------------------------\n`
  );
}
